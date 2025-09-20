from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

# Import our new logic
from matcher.scoring import create_score_matrix
from matcher.allocation import run_allocation

app = Flask(__name__)
CORS(app)

@app.route('/match', methods=['POST'])
def match_students():
    """
    The main API endpoint for running the matchmaking process.
    """
    data = request.get_json()

    if not data or 'students' not in data or 'internships' not in data:
        return jsonify({"error": "Invalid input"}), 400

    students_json = data['students']
    internships_json = data['internships']
    
    if not students_json or not internships_json:
        return jsonify({"matches": {}}) # Return empty if no data

    print(f"Received {len(students_json)} students and {len(internships_json)} internships.")

    # Stage 1: Run the Scoring Engine
    print("Stage 1: Calculating score matrix...")
    score_matrix = create_score_matrix(students_json, internships_json)
    print("✅ Score matrix calculated.")

    # Stage 2: Run the Allocation Engine
    print("Stage 2: Running allocation algorithm...")
    students_df = pd.DataFrame(students_json)
    internships_df = pd.DataFrame(internships_json)
    final_matches = run_allocation(score_matrix, students_df, internships_df)
    print("✅ Allocation complete.")

    return jsonify({
        "message": "Matchmaking process completed successfully.",
        "matches": final_matches
    })

if __name__ == '__main__':
    app.run(debug=True, port=8000)

