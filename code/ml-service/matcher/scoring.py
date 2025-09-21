# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity

# def calculate_skill_similarity(student_skills, internship_skills):
#     """Calculates skill similarity using TF-IDF and Cosine Similarity."""
#     vectorizer = TfidfVectorizer()
    
#     # Combine the skills into single strings for vectorization
#     student_skills_str = ' '.join(student_skills)
#     internship_skills_str = ' '.join(internship_skills)
    
#     # Create the TF-IDF matrix
#     tfidf_matrix = vectorizer.fit_transform([student_skills_str, internship_skills_str])
    
#     # Calculate cosine similarity
#     # The result is a 2x2 matrix, the value at [0, 1] is what we need
#     similarity_score = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
    
#     return similarity_score

# def calculate_cgpa_score(student_cgpa_str, min_cgpa_str):
#     """Calculates a score based on CGPA. Returns 1 if above min, 0 otherwise."""
#     try:
#         # Basic parsing to handle strings like "8.5" or "70%"
#         student_cgpa = float(str(student_cgpa_str).replace('%', ''))
#         min_cgpa = float(str(min_cgpa_str).replace('%', ''))
        
#         if student_cgpa >= min_cgpa:
#             return 1.0
#         else:
#             return 0.0
#     except (ValueError, TypeError):
#         # If CGPA is not specified or invalid, we don't penalize
#         return 0.5 # Neutral score

# def calculate_scores(students, internships):
#     """
#     Calculates a compatibility score for every student-internship pair.
#     Returns a dictionary of scores.
#     """
#     scores = {}
    
#     # Define weights for each scoring factor
#     weights = {
#         'skills': 0.6,
#         'cgpa': 0.2,
#         'location': 0.1,
#         'affirmative_action': 0.1
#     }

#     for student in students:
#         student_id = student.get('_id')
#         scores[student_id] = {}
        
#         for internship in internships:
#             internship_id = internship.get('_id') # Assuming industry profile ID is the internship ID
            
#             # --- SKILL SCORE ---
#             student_skills = student.get('skills', {}).get('technicalSkills', [])
#             internship_reqs = internship.get('requirements', {}).get('requiredSkills', [])
#             skill_score = calculate_skill_similarity(student_skills, internship_reqs)
            
#             # --- CGPA SCORE ---
#             student_cgpa = student.get('academicDetails', {}).get('cgpa', '0')
#             min_cgpa = internship.get('requirements', {}).get('minimumCGPA', '0')
#             cgpa_score = calculate_cgpa_score(student_cgpa, min_cgpa)

#             # --- LOCATION SCORE ---
#             student_city = student.get('location', {}).get('currentCity', '').lower()
#             internship_city = internship.get('companyDetails', {}).get('city', '').lower()
#             location_score = 1.0 if student_city == internship_city else 0.0

#             # --- AFFIRMATIVE ACTION BONUS ---
#             is_rural = student.get('affirmativeAction', {}).get('isFromRuralArea', False)
#             rural_welcome = internship.get('preferences', {}).get('ruralCandidatesWelcome', False)
#             affirmative_action_bonus = 0.0
#             if is_rural and rural_welcome:
#                 affirmative_action_bonus = 1.0 # Give a full bonus point
                
#             # --- FINAL WEIGHTED SCORE ---
#             final_score = (
#                 (skill_score * weights['skills']) +
#                 (cgpa_score * weights['cgpa']) +
#                 (location_score * weights['location']) +
#                 (affirmative_action_bonus * weights['affirmative_action'])
#             )
            
#             scores[student_id][internship_id] = round(final_score, 4)

#     return scores


import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def calculate_skill_score(students_df, internships_df):
    """Calculates skill scores using TF-IDF and cosine similarity."""
    # Combine skills into a single string for vectorization
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
        # Example: Check for rural area
        if student['affirmativeAction'].get('isFromRuralArea', False):
            for j, internship in internships_df.iterrows():
                if internship['preferences'].get('ruralCandidatesWelcome', False):
                    bonus_matrix[i, j] = 1.0 # Give a full point bonus
    return bonus_matrix

def create_score_matrix(students_json, internships_json):
    """
    Main function to orchestrate the scoring process.
    Takes raw JSON data and returns a final score DataFrame.
    """
    students_df = pd.DataFrame(students_json)
    internships_df = pd.DataFrame(internships_json)

    # Define weights for each scoring component
    weights = {'skills': 0.6, 'cgpa': 0.3, 'diversity': 0.1}

    # Calculate individual score matrices
    skill_scores = calculate_skill_score(students_df, internships_df)
    cgpa_scores = calculate_cgpa_score(students_df, internships_df)
    diversity_bonuses = calculate_diversity_bonus(students_df, internships_df)

    # Calculate the final weighted score
    composite_scores = (
        weights['skills'] * skill_scores +
        weights['cgpa'] * cgpa_scores +
        weights['diversity'] * diversity_bonuses
    )

    # Filter out impossible matches (where CGPA requirement was not met)
    final_scores = composite_scores * cgpa_scores

    score_df = pd.DataFrame(
        final_scores,
        index=students_df['_id'],
        columns=internships_df['_id']
    )
    
    return score_df

