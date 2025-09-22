// src/pages/Home.jsx
import { Briefcase, Sparkles, UserCheck } from "lucide-react";
import Card from "../components/ui/Card";
import img from "/assets/workTable.jpg";
import img2 from "/assets/career.jpg"

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 min-h-screen text-white">
      {/* Hero Section */}
      <section
        className="relative h-screen min-h-[500px] flex items-center justify-center px-6"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="relative text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-sky-400 to-purple-500">
            Find Your Perfect Internship
          </h1>
          <p className="mt-6 text-lg text-gray-200">
            InternSphere connects students with top companies using AI-driven
            matching. Build your future with the right opportunities today.
          </p>

          <div className="mt-8 flex justify-center space-x-4">
            <a
              href="/register"
              className="px-6 py-3 bg-emerald-600 hover:bg-teal-600 text-white rounded-lg shadow-md transition"
            >
              Get Started
            </a>
            <a
              href="/about"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features / Cards */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-gradient-to-br from-indigo-900 via-sky-900 to-emerald-900">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose InternSphere?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            icon={Briefcase}
            title="Verified Companies"
            description="Work with trusted, vetted companies offering real opportunities."
          />
          <Card
            icon={Sparkles}
            title="AI-Powered Matching"
            description="Get personalized internship matches tailored to your skills."
          />
          <Card
            icon={UserCheck}
            title="Easy Setup"
            description="Create your profile in minutes and start applying instantly."
          />
        </div>
      </section>

      {/* Call To Action */}
        <section className="relative text-center py-16 px-6 bg-gradient-to-r from-slate-800 via-indigo-800 to-purple-800 "
            style={{
                backgroundImage: `url(${img2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black/70"></div>
            <h2 className="relative text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-400">
                Ready to Kickstart Your Career?
            </h2>
            <p className="relative text-gray-300 mb-6">
                Join InternSphere today and discover internships tailored just for you.
            </p>
            <a
                href="/signup"
                className="relative px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-lg transition"
            >
                Sign Up Now
            </a>
        </section>
    </div>
  );
}
