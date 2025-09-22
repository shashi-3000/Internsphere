
import { Users, Building2 } from 'lucide-react';
import img from "../assets/rajivGandhiSealink.jpg"

export default function UserTypeSelection() {
  return (
    <div className=" relative bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 min-h-screen flex items-center justify-center px-6 p-12"
        style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative text-center max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-sky-400 to-purple-500 mb-4">
            Join InternSphere
          </h1>
          <p className="text-xl text-gray-300">
            Choose how you want to get started with our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Student Registration Card */}
          <div className="group">
            <a href="/register/student" className="block">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/15 hover:border-emerald-400/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-emerald-600/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-600/30 transition-colors">
                    <Users className="w-10 h-10 text-emerald-400" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-4">
                    I'm a Student
                  </h2>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Looking for internship opportunities? Register to get AI-powered matches based on your skills and preferences.
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-400">
                    <div>✓ Find matching internships</div>
                    <div>✓ AI-powered recommendations</div>
                    <div>✓ Track applications</div>
                    <div>✓ Build your profile</div>
                  </div>
                  
                  <div className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-lg group-hover:bg-emerald-700 transition-colors">
                    Register as Student
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Industry Registration Card */}
          <div className="group">
            <a href="/register/industry" className="block">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/15 hover:border-sky-400/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-sky-600/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-sky-600/30 transition-colors">
                    <Building2 className="w-10 h-10 text-sky-400" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-4">
                    I'm an Industry/Company
                  </h2>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Post internship opportunities and find the best candidates using our smart matching system.
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-400">
                    <div>✓ Post internship opportunities</div>
                    <div>✓ Get matched candidates</div>
                    <div>✓ Manage applications</div>
                    <div>✓ Analytics dashboard</div>
                  </div>
                  
                  <div className="mt-6 px-6 py-2 bg-sky-600 text-white rounded-lg group-hover:bg-sky-700 transition-colors">
                    Register as Recruiter
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}