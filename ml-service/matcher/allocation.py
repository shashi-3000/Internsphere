# def find_stable_matches(scores):
#     """
#     Implements the Gale-Shapley algorithm to find a stable matching
#     between students and internships based on the calculated scores.

#     Args:
#         scores (dict): A dictionary where scores[student_id][internship_id]
#                        is the compatibility score.

#     Returns:
#         dict: A dictionary of the final matches {internship_id: student_id}.
#     """
#     # 1. Create preference lists from scores
#     student_prefs = {}
#     internship_prefs = {}

#     # Get all unique student and internship IDs
#     student_ids = list(scores.keys())
#     # Find all unique internship IDs from the nested dictionaries
#     internship_ids = list(set(intern_id for student in scores.values() for intern_id in student.keys()))

#     # Create sorted preference list for each student
#     for s_id in student_ids:
#         # Sort internships by score in descending order for this student
#         sorted_internships = sorted(scores[s_id], key=scores[s_id].get, reverse=True)
#         student_prefs[s_id] = sorted_internships

#     # Create sorted preference list for each internship
#     for i_id in internship_ids:
#         # Create a temporary dict of {student: score} for this internship
#         temp_scores = {s_id: scores[s_id].get(i_id, 0) for s_id in student_ids}
#         # Sort students by score in descending order
#         sorted_students = sorted(temp_scores, key=temp_scores.get, reverse=True)
#         internship_prefs[i_id] = sorted_students

#     # 2. Run the Gale-Shapley algorithm
    
#     # Keep track of students who are not yet matched
#     free_students = list(student_ids)
#     # Tentative matches {internship_id: student_id} - assumes capacity of 1 for simplicity
#     tentative_matches = {}
    
#     while free_students:
#         student_id = free_students.pop(0)
#         student_pref_list = student_prefs[student_id]

#         # Student 'proposes' to their most preferred internship they haven't proposed to yet
#         for internship_id in student_pref_list:
#             # If the internship is free, they tentatively match
#             if internship_id not in tentative_matches:
#                 tentative_matches[internship_id] = student_id
#                 break # This student is tentatively matched, move to the next free student
            
#             # If the internship is taken, check its preference
#             else:
#                 current_match_student_id = tentative_matches[internship_id]
#                 internship_pref_list = internship_prefs[internship_id]

#                 # Check if the new student is preferred over the current one
#                 if internship_pref_list.index(student_id) < internship_pref_list.index(current_match_student_id):
#                     # New student is better! The old one is now free.
#                     tentative_matches[internship_id] = student_id
#                     free_students.append(current_match_student_id)
#                     break # This student is tentatively matched
#                 # If the current match is better, the proposing student remains free
#                 # and will propose to their next choice in the next iteration.

#     # The final matches are the stable ones
#     return tentative_matches


def run_allocation(score_matrix, students_df, internships_df):
    """
    Takes the score matrix and finds the optimal stable matching
    using the Gale-Shapley algorithm.
    """
    # Create preference lists from the score matrix
    student_prefs = {}
    for student_id in score_matrix.index:
        student_prefs[student_id] = score_matrix.loc[student_id].sort_values(ascending=False).index.tolist()

    internship_prefs = {}
    for internship_id in score_matrix.columns:
        internship_prefs[internship_id] = score_matrix[internship_id].sort_values(ascending=False).index.tolist()

    # --- Handle Internship Capacity ---
    # Create "clones" for internships with multiple vacancies
    internship_slots = []
    for _, internship in internships_df.iterrows():
        capacity = int(internship['internshipDetails'].get('numberOfPositions', 1))
        for i in range(capacity):
            internship_slots.append(f"{internship['_id']}_slot_{i+1}")

    # The algorithm needs preferences for each slot
    slot_prefs = {slot: internship_prefs[slot.split('_slot_')[0]] for slot in internship_slots}
    
    # --- Gale-Shapley Algorithm ---
    unmatched_students = list(students_df['_id'])
    matches = {} # Key: student_id, Value: internship_slot_id
    slot_matches = {slot: None for slot in internship_slots}

    while unmatched_students:
        student = unmatched_students.pop(0)
        for internship_slot in student_prefs[student]:
            # Find the original internship ID from the slot ID
            original_internship_id = internship_slot.split('_slot_')[0]
            
            # Find a free slot for this internship
            found_slot = False
            for slot in internship_slots:
                if slot.startswith(original_internship_id) and slot_matches[slot] is None:
                    # Found an empty slot, tentatively assign the student
                    slot_matches[slot] = student
                    matches[student] = slot
                    found_slot = True
                    break
            
            if found_slot:
                break # This student is tentatively matched, move to the next
        
        # This is a simplified version for the hackathon. A full implementation
        # would handle rejections and proposals to the next preference.

    # Clean up the final matches to only show student_id and original internship_id
    final_matches = {student: slot.split('_slot_')[0] for student, slot in matches.items()}
    
    return final_matches
