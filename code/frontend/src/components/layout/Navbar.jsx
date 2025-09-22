
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useAuth(); 

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-sky-700 to-purple-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        
        <Link to="/" className="text-2xl font-extrabold tracking-wide">
          InternSphere
        </Link>

        
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
          
          
          
          {user && (
            <NavLink
              to={user.userType === 'student' ? '/student/dashboard' : '/industry/dashboard'}
              className={({ isActive }) =>
                isActive ? "font-semibold border-b-2 border-white pb-1" : "hover:opacity-80"
              }
            >
              Dashboard
            </NavLink>
          )}

          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "font-semibold border-b-2 border-white pb-1" : "hover:opacity-80"
            }
          >
            Register
          </NavLink>
        </div>

        
        <div className="flex items-center space-x-4">
          {!loading && (
            <>
              
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
                    className="hidden md:inline px-4 py-2 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-400 transition-colors"
                  >
                    Signup
                  </Link>
                </>
              ) : (
                
                <>
                  <span className="hidden md:inline text-sm text-gray-200">
                    Welcome, {user.username}!
                  </span>
                  
                  <button
                    onClick={logout}
                    className="hidden md:inline px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}

              
              {user && (
                <Link to="/profile">
                  <div className="w-10 h-10 flex items-center justify-center bg-white text-indigo-700 text-xl font-bold rounded-full shadow hover:scale-105 transition transform">
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
      
      
      <div className="md:hidden px-6 pb-4">
        
      </div>
    </nav>
  );
}