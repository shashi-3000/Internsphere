import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

// Dummy data for matched internships - this will come from your API
const dummyMatchedInternships = [
  { id: 1, title: 'Frontend Developer Intern', company: 'Innovate Solutions', location: 'Gurugram' },
  { id: 2, title: 'Data Science Intern', company: 'TechCorp', location: 'Remote' },
  { id: 3, title: 'Marketing Intern', company: 'MarketPro', location: 'Mumbai' },
];

// Dummy data for applications
const dummyApplications = [
  { id: 1, title: 'UI/UX Designer', company: 'Creative Minds', status: 'Applied' },
  { id: 2, title: 'Backend Developer', company: 'ServerSide Inc.', status: 'Under Review' },
];

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-br from-slate-900 to-indigo-900 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Welcome, {user?.username}!</h1>
          <p className="text-gray-300 mt-2">Here's your personalized internship dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-8">
            {/* AI-Matched Internships */}
            <section className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Your Top Matches</h2>
              <div className="space-y-4">
                {dummyMatchedInternships.map(internship => (
                  <div key={internship.id} className="bg-slate-800/50 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white">{internship.title}</h3>
                      <p className="text-sm text-gray-300">{internship.company} - {internship.location}</p>
                    </div>
                    <Link to={`/internship/${internship.id}`} className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">
                      View
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {/* My Applications */}
            <section className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Application Status</h2>
              <div className="space-y-4">
                {dummyApplications.map(app => (
                  <div key={app.id} className="bg-slate-800/50 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white">{app.title}</h3>
                      <p className="text-sm text-gray-300">{app.company}</p>
                    </div>
                    <span className="text-sm font-medium bg-sky-500/20 text-sky-300 px-3 py-1 rounded-full">{app.status}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">{user?.username?.charAt(0).toUpperCase()}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{user?.profileId?.fullName || user?.username}</h3>
                <p className="text-sm text-gray-400">{user?.email}</p>
                <div className="mt-6 space-y-2">
                    <Link to="/profile" className="block w-full px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition">Edit Profile</Link>
                    <Link to="/student/internships" className="block w-full px-4 py-2 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition">View All Internships</Link>
                </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}