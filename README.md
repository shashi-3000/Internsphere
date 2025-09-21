# PS No. - SIH25033
# Al-Based Smart Allocation Engine for PM Internship Scheme

## InternSphere: AI-Powered Internship Allocation System
A smart, automated platform designed to solve the challenge of internship placements at scale for the Smart India Hackathon 2025.InternSphere moves beyond simple recommendation engines. It's an intelligent allocation system that finds the optimal set of pairings for the entire ecosystem of students and companies.


## Team Details

### Team Name: INNOVATRIX

### Team Leader: @USERNAME 

### Team Members:

MEMBER_1 - 2023UCS1734 - @USERNAME

MEMBER_2 - 2023UCS1729 - @USERNAME

MEMBER_3 - 2023UCS1694 - @USERNAME

MEMBER_4 - 2023UCS1703 - @USERNAME

MEMBER_5 - 2023UCS1620 - @USERNAME

MEMBER_6 - 2023UCS1553 - @USERNAME

## Project Links
### SIH Presentation: [Final SIH Presentation](URL TO PPT UPLOADED TO GITHUB)
### Video Demonstration: [Watch Video](UNLISTED YOUTUBE LINK)
### Live Deployment: [View Deployment](DEPLOYED LINK IF ANY)
### Source Code: [GitHub Repository](GITHUB LINK TO THE REPO)
### Additional Resources: [Other Relevant Links](ANY OTHER RELEVANT LINKS)



## ✨ Key Features

### Frontend (React.js)
Secure Authentication: Full user signup, login, and JWT-based session management.

Dynamic UI: Smart navigation and dashboards that adapt based on user type (Student vs. Industry) and login status.

Multi-Step Onboarding: User-friendly forms for detailed student and industry profile creation.

Live Dashboards: Displays real, AI-generated matches for both students and industries.

Polished Design: A modern, responsive interface built with Tailwind CSS.

### Backend (Node.js)
Robust API: A secure Express.js server to manage all data and authentication.

Advanced Data Modeling: Mongoose schemas designed to handle two distinct user types linked to a single User model for authentication.

Microservice Communication: Acts as the orchestrator, fetching data and communicating with the Python ML service to run the matchmaking.

AI/ML Service (Python)
Intelligent Scoring Engine: Uses NLP (TF-IDF & Cosine Similarity) to calculate a detailed compatibility score for every student-internship pair.

Optimal Allocation Engine: Implements the Nobel Prize-winning Gale-Shapley algorithm to find a fair and stable set of matches for the entire system, respecting all constraints like company capacity and affirmative action.

### 💻 Tech Stack
Area

Technology

Frontend

React.js, Vite, Tailwind CSS, React Router, Axios

Backend

Node.js, Express.js

Database

MongoDB with Mongoose

AI/ML Service

Python, Flask, Pandas, Scikit-learn

Authentication

JSON Web Tokens (JWT), bcrypt