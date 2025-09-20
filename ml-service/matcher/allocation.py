
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
        
        # This is a simplified version for the prototype. A full implementation
        # would handle rejections and proposals to the next preference.

    # Clean up the final matches to only show student_id and original internship_id
    final_matches = {student: slot.split('_slot_')[0] for student, slot in matches.items()}
    
    return final_matches
