// import { Link, NavLink } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="bg-gradient-to-r from-indigo-900 via-sky-700 via-emerald-400 to-purple-900


//  text-white shadow-md">
//       <div className="container mx-auto flex items-center justify-between px-6 py-4">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-extrabold tracking-wide">
//           InternSphere
//         </Link>

//         {/* Center Links */}
//         <div className="hidden md:flex space-x-8">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive ? "font-semibold border-b-2 border-white pb-1" : "hover:opacity-80"
//             }
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/about"
//             className={({ isActive }) =>
//               isActive ? "font-semibold border-b-2 border-white pb-1" : "hover:opacity-80"
//             }
//           >
//             About
//           </NavLink>
//           <NavLink
//             to="/register"
//             className={({ isActive }) =>
//               isActive ? "font-semibold border-b-2 border-white pb-1" : "hover:opacity-80"
//             }
//           >
//             Register
//           </NavLink>
//         </div>

//         {/* Right Section → Profile */}
//         <div className="flex items-center space-x-4">
//           {/* Login / Signup */}
//           <Link
//             to="/login"
//             className="hidden md:inline px-4 py-2 rounded-lg bg-white text-indigo-700 font-medium hover:bg-gray-100"
//           >
//             Login
//           </Link>
//           <Link
//             to="/signup"
//             className="hidden md:inline px-4 py-2 rounded-lg bg-emerald-500 text-gray-900 font-medium hover:bg-teal-500"
//           >
//             Signup
//           </Link>

//           {/* Profile Avatar */}
//           <Link to="/profile">
//             <div className="w-10 h-10 flex items-center justify-center bg-white text-2xl rounded-full shadow hover:scale-105 transition">
//               👤
//             </div>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export default function Navbar() {
  const { user, logout, loading } = useAuth(); // Get auth state and logout function

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-sky-700 via-emerald-400 to-purple-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-wide">
          InternSphere
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "font-semibold border-b-2 border-white pb-1" : "hover:opacity-80"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "font-semibold border-b-2 border-white pb-1" : "hover:opacity-80"
            }
          >
            About
          </NavLink>
          
          {/* Keep Register link always visible - it's for profile completion */}
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "font-semibold border-b-2 border-white pb-1" : "hover:opacity-80"
            }
          >
            Register
          </NavLink>
        </div>

        {/* Right Section → Conditional based on authentication */}
        <div className="flex items-center space-x-4">
          {!loading && (
            <>
              {/* If user is NOT logged in, show Login/Signup */}
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="hidden md:inline px-4 py-2 rounded-lg bg-white text-indigo-700 font-medium hover:bg-gray-100 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="hidden md:inline px-4 py-2 rounded-lg bg-emerald-500 text-gray-900 font-medium hover:bg-teal-500 transition-colors"
                  >
                    Signup
                  </Link>
                </>
              ) : (
                /* If user IS logged in, show user info and logout */
                <>
                  {/* Welcome message */}
                  <span className="hidden md:inline text-sm text-gray-200">
                    Welcome, {user.username}!
                  </span>
                  
                  {/* Logout button */}
                  <button
                    onClick={logout}
                    className="hidden md:inline px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}

              {/* Profile Avatar - only show if user is logged in */}
              {user && (
                <Link to="/profile">
                  <div className="w-10 h-10 flex items-center justify-center bg-white text-2xl rounded-full shadow hover:scale-105 transition transform">
                    👤
                  </div>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Mobile menu - you can expand this later if needed */}
      <div className="md:hidden px-6 pb-4">
        {!loading && (
          <>
            {!user ? (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="flex-1 text-center px-4 py-2 rounded-lg bg-white text-indigo-700 font-medium hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex-1 text-center px-4 py-2 rounded-lg bg-emerald-500 text-gray-900 font-medium hover:bg-teal-500"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-200">Welcome, {user.username}!</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}