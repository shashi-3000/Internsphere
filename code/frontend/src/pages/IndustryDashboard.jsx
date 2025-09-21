import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api'; 
import img from "../assets/gradientbg.jpg"; 

export default function IndustryDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({ topCandidates: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const companyName = user?.profileId?.companyDetails?.companyName || user?.username;

  useEffect(() => {
    api.get('/industry/dashboard')
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
            <h1 className="text-4xl font-bold text-white">Welcome, {companyName}!</h1>
            <p className="text-gray-300 mt-2">Manage your internships and get the best talent.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="md:col-span-2 space-y-8">
                <section className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Top Allocated Candidates for Your Internship</h2>
                {error && <p className="text-red-400">{error}</p>}
                <div className="space-y-4">
                    {dashboardData.topCandidates.length > 0 ? (
                    dashboardData.topCandidates.map(candidate => (
                        <div key={candidate.studentId} className="bg-slate-800/50 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-white">{candidate.name}</h3>
                            <p className="text-sm text-gray-300">Skills: {candidate.skills}</p>
                            <p className="text-sm text-gray-300">CGPA: {candidate.cgpa}</p>
                        </div>
                        <Link to={`/student/profile/${candidate.studentId}`} className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">
                            View Profile
                        </Link>
                        </div>
                    ))
                    ) : (
                    <p className="text-gray-400">No matched candidates found yet. Have you run the matchmaking process?</p>
                    )}
                </div>
                </section>
                
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Your Active Internship</h3>
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                        <h4 className="font-bold text-white">{user?.profileId?.internshipDetails?.title || 'No active internship'}</h4>
                        <p className="text-sm text-gray-300 mt-1">{user?.profileId?.internshipDetails?.department}</p>
                    </div>
                    <div className="mt-6 space-y-2">
                        <Link to="/industry/post" className="block w-full px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition text-center">Post New Internship</Link>
                        <Link to="/industry/applicants" className="block w-full px-4 py-2 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition text-center">View All Applicants</Link>
                    </div>
                </div>
            </aside>
            </div>
        </div>
    </section>
  );
}