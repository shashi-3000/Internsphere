# InternSphere: AI-Powered Internship Allocation System
A smart, automated platform designed to solve the challenge of internship placements at scale for the Smart India Hackathon 2025.

## 🚀 The Challenge
The PM Internship Scheme is a vital initiative, but the manual process of matching thousands of applicants to suitable opportunities is a significant challenge. This often leads to suboptimal selections and delays, which undermines the effectiveness of the scheme. InternSphere is built to solve this problem.

## ✨ Our Solution
InternSphere moves beyond simple recommendation engines. It's an intelligent allocation system that finds the optimal set of pairings for the entire ecosystem of students and companies.

Our unique two-stage AI engine ensures fairness, efficiency, and a higher success rate for all participants:

AI Scoring Engine: Using Natural Language Processing (TF-IDF & Cosine Similarity), the engine calculates a detailed "Compatibility Score" for every possible student-internship pair, considering skills, qualifications, sector interests, and location.

AI Allocation Engine: The scores are then fed into the Nobel Prize-winning Gale-Shapley algorithm to find a "stable" and fair set of matches that respects company capacities and affirmative action policies.

The result is not just a list of suggestions; it's a globally optimized recommendation presented as a "Top Match" to each student, empowering them with the best possible starting point while still giving them the final choice.

## 🔧 Technical Architecture
Our system uses a modern microservice architecture to ensure scalability and a clean separation of concerns.

Frontend (React): A dynamic and responsive user interface where students and industries manage their profiles and view dashboard results.

Backend API (Node.js/Express): The central hub that manages user authentication (JWT), profile data, and communicates with the other services. It stores all data in a MongoDB database.

ML Service (Python/Flask): A specialized "brain" that receives data from the Node.js backend, runs the scoring and allocation algorithms, and returns the final, optimal matches.

## 💻 Tech Stack

Technology

### Frontend

React.js, Vite, Tailwind CSS, React Router, Axios

### Backend

Node.js, Express.js

Database

MongoDB with Mongoose

AI/ML Service

Python, Flask, Pandas, Scikit-learn

Authentication

JSON Web Tokens (JWT), bcrypt

## 🛠️ How to Run the Project Locally

To run the full application, you need to start all three services in separate terminals.

### 1. Backend Server (Node.js)
Navigate to the backend directory:

cd code/backend

Install dependencies from package.json:

npm install

Create a .env file and add your environment variables:

PORT=3000
MONGODB_URI=<Your_MongoDB_Atlas_Connection_String>
DB_NAME=<Your_Database_Name>
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=<Your_Secret_Key>
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=<Your_Other_Secret_Key>
REFRESH_TOKEN_EXPIRY=10d

Start the server:

npm run dev

(Backend will run on http://localhost:3000)

### 2. Frontend Server (React)
Open a new terminal and navigate to the frontend directory:

cd code/frontend

Install dependencies from package.json:

npm install

Start the development server:

npm run dev

(Frontend will run on http://localhost:5173)

### 3. ML Service (Python)
Open a third terminal and navigate to the ML service directory:

cd code/ml-service

Install dependencies from requirements.txt:

pip install -r requirements.txt

Start the Flask server:

python app.py
