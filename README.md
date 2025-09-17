# Internsphere

## InternSphere: AI-Powered Internship Matching Platform
🚀 Project Overview
InternSphere is a functional prototype developed for the Smart India Hackathon (SIH). It addresses the challenge of efficiently and optimally matching student interns with suitable industry opportunities under government-sponsored schemes.

The core of the project is a smart, automated system that moves beyond simple recommendations. It uses an AI-based matchmaking engine to perform a system-wide optimal allocation, ensuring the best fit for both students and industries while considering various factors like skills, qualifications, location, and affirmative action policies.

✅ Current Status (As of September 17, 2025)
The project is currently divided into two main, fully functional services: a React frontend and a Node.js backend. The data collection and user management layers are 100% complete.

## Frontend (React + Vite)
Robust Authentication: Fully implemented user signup, login, and logout flow.

Centralized State Management: Uses React Context (AuthContext) to manage user authentication state across the entire application.

Detailed Onboarding: Multi-step registration process for both Students and Industries, collecting a rich set of data points for the AI engine.

Dynamic UI:

A smart, conditional navigation bar that changes based on login status and user type.

A dynamic profile page that correctly displays detailed information for either a student or an industry user.

Visually appealing and functional dashboard mockups.

Secure API Communication: A centralized axios service layer with interceptors automatically handles attaching JWT access tokens to protected requests.

Backend (Node.js + Express.js)
Secure Authentication API: Full implementation of user registration and login using JSON Web Tokens (JWT), including access and refresh token logic.

Advanced Data Modeling: Mongoose schemas designed to handle two distinct user types (student, industry) linked to a single User model for authentication, using refPath for dynamic population.

Complete Profile Management: Protected API endpoints for creating and fetching detailed student and industry profiles.

Data-Rich Endpoints: API routes are in place to securely provide all student and industry data needed for the AI engine.

Professional Structure: The backend follows a clean, scalable structure, separating logic into routes, controllers, models, and middleware.

Database Connectivity: Successfully connected to and performing CRUD operations on a MongoDB Atlas cluster.

## 💻 Tech Stack
Area

Technology

Frontend

React.js, Vite, Tailwind CSS, React Router, Axios

Backend

Node.js, Express.js

Database

MongoDB with Mongoose

Authentication

JSON Web Tokens (JWT), bcrypt

## 🛠️ How to Run the Project Locally
You need to run two separate servers for the application to work.

1. Running the Backend Server
Navigate to the backend directory:

cd backend

Install all the required packages. The npm install command reads the package.json file and automatically downloads all the necessary dependencies.

npm install

Create a .env file in the backend root and add your environment variables:

PORT=3000
MONGODB_URI=<Your_MongoDB_Atlas_Connection_String>
DB_NAME=<Your_Database_Name> # e.g., Niyati
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=<Your_Secret_Key>
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=<Your_Other_Secret_Key>
REFRESH_TOKEN_EXPIRY=10d

Start the server:

npm run dev

The backend will be running on http://localhost:3000.

2. Running the Frontend Server
Open a new terminal and navigate to the frontend directory:

cd frontend

Install all the required packages from package.json:

npm install

Start the development server:

npm run dev

## Database Setup

This project uses MongoDB. Each teammate should:

1. Create their own MongoDB instance (local or MongoDB Atlas free cluster).  
2. Create a `.env` file in the root directory.  
3. Add their MongoDB connection URI in `.env`:
