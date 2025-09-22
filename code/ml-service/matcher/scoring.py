

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def calculate_skill_score(students_df, internships_df):
    """Calculates skill scores using TF-IDF and cosine similarity."""
    
    students_df['skills_str'] = students_df['skills'].apply(lambda x: ' '.join(x.get('technicalSkills', [])))
    internships_df['skills_str'] = internships_df['requirements'].apply(lambda x: ' '.join(x.get('requiredSkills', [])))
    
    vectorizer = TfidfVectorizer()
    all_skills = pd.concat([students_df['skills_str'], internships_df['skills_str']]).unique()
    vectorizer.fit(all_skills)
    
    student_vectors = vectorizer.transform(students_df['skills_str'])
    internship_vectors = vectorizer.transform(internships_df['skills_str'])
    
    return cosine_similarity(student_vectors, internship_vectors)

def calculate_cgpa_score(students_df, internships_df):
    """Creates a matrix where 1 means the student meets the CGPA requirement."""
    cgpa_matrix = np.zeros((len(students_df), len(internships_df)))
    for i, student in students_df.iterrows():
        for j, internship in internships_df.iterrows():
            student_cgpa = float(student['academicDetails'].get('cgpa', 0))
            min_cgpa = float(internship['requirements'].get('minimumCGPA', 0) or 0)
            if student_cgpa >= min_cgpa:
                cgpa_matrix[i, j] = 1.0
    return cgpa_matrix

def calculate_diversity_bonus(students_df, internships_df):
    """Adds a bonus if a student meets diversity criteria and the company encourages it."""
    bonus_matrix = np.zeros((len(students_df), len(internships_df)))
    for i, student in students_df.iterrows():
        
        if student['affirmativeAction'].get('isFromRuralArea', False):
            for j, internship in internships_df.iterrows():
                if internship['preferences'].get('ruralCandidatesWelcome', False):
                    bonus_matrix[i, j] = 1.0 
    return bonus_matrix

def create_score_matrix(students_json, internships_json):
    """
    Main function to orchestrate the scoring process.
    Takes raw JSON data and returns a final score DataFrame.
    """
    students_df = pd.DataFrame(students_json)
    internships_df = pd.DataFrame(internships_json)

    
    weights = {'skills': 0.6, 'cgpa': 0.3, 'diversity': 0.1}

    
    skill_scores = calculate_skill_score(students_df, internships_df)
    cgpa_scores = calculate_cgpa_score(students_df, internships_df)
    diversity_bonuses = calculate_diversity_bonus(students_df, internships_df)

    
    composite_scores = (
        weights['skills'] * skill_scores +
        weights['cgpa'] * cgpa_scores +
        weights['diversity'] * diversity_bonuses
    )

    
    final_scores = composite_scores * cgpa_scores

    score_df = pd.DataFrame(
        final_scores,
        index=students_df['_id'],
        columns=internships_df['_id']
    )
    
    return score_df

