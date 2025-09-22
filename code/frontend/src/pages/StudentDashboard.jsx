import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api'; 
import img from "/assests/gradientbg.jpg"; 

export default function StudentDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({ topMatches: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/students/dashboard')
      .then(response => {
        setDashboardData(response.data.data);
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Failed to load dashboard data.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-white text-center p-12">Loading Dashboard...</div>;
  }

  return (
    
    <section 
        className="relative min-h-screen text-white"
        style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
        }}
    >
      <div className="absolute inset-0 bg-slate-900 bg-opacity-80"></div>

      
      <div className="relative max-w-5xl mx-auto py-12 px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Welcome, {user?.username}!</h1>
          <p className="text-gray-300 mt-2">Here's your personalized internship dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-8">
            <section className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Your AI Top Allocation</h2>
              {error && <p className="text-red-400">{error}</p>}
              <div className="space-y-4">
                {dashboardData.topMatches.length > 0 ? (
                  dashboardData.topMatches.map(internship => (
                    <div key={internship.internshipId} className="bg-slate-800/50 p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-white">{internship.title}</h3>
                        <p className="text-sm text-gray-300">{internship.company} - {internship.location}</p>
                      </div>
                      <Link to={`/internship/${internship.internshipId}`} className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">
                        View
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No matches found yet. The matching process may not have been run.</p>
                )}
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
    </section>
  );
}
