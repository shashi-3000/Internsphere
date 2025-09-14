// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css'
// import About from './pages/About.jsx'
// import Home from './pages/Home.jsx'
// import Login from './pages/Login.jsx'
// import Profile from './pages/Profile.jsx'
// import Registration from './pages/Registration.jsx'
// import Signup from './pages/Signup.jsx'
// import Layout from "./components/layout/Layout.jsx";

// // New imports for additional pages
// import UserTypeSelection from './pages/UserTypeSelection.jsx'
// import StudentRegistration from './pages/StudentRegistration.jsx'
// import IndustryRegistration from './pages/IndustryRegistration.jsx'
// import StudentDashboard from './pages/StudentDashboard.jsx'
// import IndustryDashboard from './pages/IndustryDashboard.jsx'
// import InternshipListing from './pages/InternshipListing.jsx'
// import InternshipDetails from './pages/InternshipDetails.jsx'
// import PostInternship from './pages/PostInternship.jsx'
// import Applications from './pages/Application.jsx'
// import Applicants from './pages/Applicants.jsx'

// function App() {

//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route element={<Layout />}>
//             {/* Basic Pages */}
//             <Route path="/" element={<Home/>} />
//             <Route path="/about" element={<About/>}/>
            
//             {/* Auth Pages */}
//             <Route path="/login" element={<Login/>} />
//             <Route path="/signup" element={<Signup/>} />
            
//             {/* Registration Flow */}
//             <Route path="/register" element={<UserTypeSelection/>} />
//             <Route path="/register/student" element={<StudentRegistration/>} />
//             <Route path="/register/industry" element={<IndustryRegistration/>} />
            
//             {/* Student Routes */}
//             <Route path="/student/dashboard" element={<StudentDashboard/>} />
//             <Route path="/student/internships" element={<InternshipListing/>} />
//             <Route path="/student/applications" element={<Applications/>} />
            
//             {/* Industry Routes */}
//             <Route path="/industry/dashboard" element={<IndustryDashboard/>} />
//             <Route path="/industry/post" element={<PostInternship/>} />
//             <Route path="/industry/applicants" element={<Applicants/>} />
            
//             {/* Common Routes */}
//             <Route path="/internship/:id" element={<InternshipDetails/>} />
//             <Route path="/profile" element={<Profile/>} />
            
//             {/* Keep your old Registration route if needed */}
//             <Route path="/old-register" element={<Registration/>}/>
//           </Route>
//         </Routes>
//       </Router>
//     </>
//   )
// }

// export default App


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
// import { AuthProvider } from "./context/AuthContext.jsx"; // 1. Import the AuthProvider
import { AuthProvider } from "./context/AuthContext.jsx";

// --- Your Page Imports ---
import About from './pages/About.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Registration from './pages/Registration.jsx'
import Signup from './pages/Signup.jsx'
import Layout from "./components/layout/Layout.jsx";
import UserTypeSelection from './pages/UserTypeSelection.jsx'
import StudentRegistration from './pages/StudentRegistration.jsx'
import IndustryRegistration from './pages/IndustryRegistration.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import IndustryDashboard from './pages/IndustryDashboard.jsx'
import InternshipListing from './pages/InternshipListing.jsx'
import InternshipDetails from './pages/InternshipDetails.jsx'
import PostInternship from './pages/PostInternship.jsx'
import Applications from './pages/Application.jsx'
import Applicants from './pages/Applicants.jsx'

function App() {

  return (
    <>
      <Router>
        {/* 2. Wrap your entire Routes component with the AuthProvider */}
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              {/* Basic Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />

              {/* Auth Pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Registration Flow */}
              <Route path="/register" element={<UserTypeSelection />} />
              <Route path="/register/student" element={<StudentRegistration />} />
              <Route path="/register/industry" element={<IndustryRegistration />} />

              {/* Student Routes */}
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/internships" element={<InternshipListing />} />
              <Route path="/student/applications" element={<Applications />} />

              {/* Industry Routes */}
              <Route path="/industry/dashboard" element={<IndustryDashboard />} />
              <Route path="/industry/post" element={<PostInternship />} />
              <Route path="/industry/applicants" element={<Applicants />} />

              {/* Common Routes */}
              <Route path="/internship/:id" element={<InternshipDetails />} />
              <Route path="/profile" element={<Profile />} />

              {/* Keep your old Registration route if needed */}
              <Route path="/old-register" element={<Registration />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App