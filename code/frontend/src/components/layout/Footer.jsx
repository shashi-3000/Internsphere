import { Globe, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-indigo-900 via-sky-900 to-emerald-900 text-gray-300 pt-12 pb-6 relative">
      {/* Aurora Accent */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-sky-500 via-emerald-400 to-purple-600"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">🌌 InternSphere</h2>
          <p className="mt-3 text-sm text-gray-400">
            Connecting students with the right opportunities through smart AI matchmaking.  
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-emerald-400">About</a></li>
            <li><a href="/register" className="hover:text-emerald-400">Register</a></li>
            <li><a href="/profile" className="hover:text-emerald-400">Profile</a></li>
            <li><a href="/login" className="hover:text-emerald-400">Login</a></li>
            <li><a href="/signup" className="hover:text-emerald-400">Signup</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Stay Connected</h3>
          <p className="text-sm text-gray-400 mb-3">
            Reach out to us for internships & collaborations.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-sky-400"><Globe size={22} /></a>
            <a href="mailto:info@internconnect.com" className="hover:text-sky-400"><Mail size={22} /></a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} InternConnect. All rights reserved.
      </div>
    </footer>
  );
}

