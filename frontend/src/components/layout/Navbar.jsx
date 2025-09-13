import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-sky-700 via-emerald-400 to-purple-900


 text-white shadow-md">
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
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "font-semibold border-b-2 border-white pb-1" : "hover:opacity-80"
            }
          >
            Register
          </NavLink>
        </div>

        {/* Right Section → Profile */}
        <div className="flex items-center space-x-4">
          {/* Login / Signup */}
          <Link
            to="/login"
            className="hidden md:inline px-4 py-2 rounded-lg bg-white text-indigo-700 font-medium hover:bg-gray-100"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="hidden md:inline px-4 py-2 rounded-lg bg-emerald-500 text-gray-900 font-medium hover:bg-teal-500"
          >
            Signup
          </Link>

          {/* Profile Avatar */}
          <Link to="/profile">
            <div className="w-10 h-10 flex items-center justify-center bg-white text-2xl rounded-full shadow hover:scale-105 transition">
              👤
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
