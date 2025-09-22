
def run_allocation(score_matrix, students_df, internships_df):
    """
    Takes the score matrix and finds the optimal stable matching
    using the Gale-Shapley algorithm.
    """
    
    student_prefs = {}
    for student_id in score_matrix.index:
        student_prefs[student_id] = score_matrix.loc[student_id].sort_values(ascending=False).index.tolist()

    internship_prefs = {}
    for internship_id in score_matrix.columns:
        internship_prefs[internship_id] = score_matrix[internship_id].sort_values(ascending=False).index.tolist()

   
    internship_slots = []
    for _, internship in internships_df.iterrows():
        capacity = int(internship['internshipDetails'].get('numberOfPositions', 1))
        for i in range(capacity):
            internship_slots.append(f"{internship['_id']}_slot_{i+1}")

    
    slot_prefs = {slot: internship_prefs[slot.split('_slot_')[0]] for slot in internship_slots}
    
    
    unmatched_students = list(students_df['_id'])
    matches = {} 
    slot_matches = {slot: None for slot in internship_slots}

    while unmatched_students:
        student = unmatched_students.pop(0)
        for internship_slot in student_prefs[student]:
            
            original_internship_id = internship_slot.split('_slot_')[0]
            
            
            found_slot = False
            for slot in internship_slots:
                if slot.startswith(original_internship_id) and slot_matches[slot] is None:
                    
                    slot_matches[slot] = student
                    matches[student] = slot
                    found_slot = True
                    break
            
            if found_slot:
                break 
        
        
    final_matches = {student: slot.split('_slot_')[0] for student, slot in matches.items()}
    
    return final_matches
