// import { useAuth } from '../context/AuthContext';
// import { Link } from 'react-router-dom';

// // Dummy data for matched candidates
// const dummyMatchedCandidates = [
//   { id: 1, name: 'Niyati Sharma', skills: 'React, Node.js, Python', cgpa: '8.9' },
//   { id: 2, name: 'Rohan Verma', skills: 'Data Analysis, ML, SQL', cgpa: '9.1' },
//   { id: 3, name: 'Priya Singh', skills: 'JavaScript, HTML, CSS', cgpa: '8.5' },
// ];

// // Dummy data for recent applicants
// const dummyRecentApplicants = [
//     { id: 4, name: 'Amit Kumar', appliedFor: 'Frontend Developer Intern' },
//     { id: 5, name: 'Sunita Devi', appliedFor: 'Frontend Developer Intern' },
// ];

// export default function IndustryDashboard() {
//   const { user } = useAuth();
//   const companyName = user?.profileId?.companyDetails?.companyName || user?.username;

//   return (
//     <div className="bg-gradient-to-br from-slate-900 to-indigo-900 min-h-screen py-12 px-6">
//       <div className="max-w-5xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-white">Welcome, {companyName}!</h1>
//           <p className="text-gray-300 mt-2">Manage your internships and find the best talent.</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Main Content Area */}
//           <div className="md:col-span-2 space-y-8">
//             {/* Top Matched Candidates */}
//             <section className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
//               <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Top Candidates for Your Internship</h2>
//               <div className="space-y-4">
//                 {dummyMatchedCandidates.map(candidate => (
//                   <div key={candidate.id} className="bg-slate-800/50 p-4 rounded-lg flex justify-between items-center">
//                     <div>
//                       <h3 className="font-bold text-white">{candidate.name}</h3>
//                       <p className="text-sm text-gray-300">Skills: {candidate.skills}</p>
//                       <p className="text-sm text-gray-300">CGPA: {candidate.cgpa}</p>
//                     </div>
//                     <Link to={`/student/profile/${candidate.id}`} className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">
//                       View Profile
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Recent Applicants */}
//             <section className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
//               <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Recent Applicants</h2>
//               <div className="space-y-4">
//                 {dummyRecentApplicants.map(app => (
//                   <div key={app.id} className="bg-slate-800/50 p-4 rounded-lg flex justify-between items-center">
//                     <div>
//                       <h3 className="font-bold text-white">{app.name}</h3>
//                       <p className="text-sm text-gray-300">Applied for: {app.appliedFor}</p>
//                     </div>
//                      <Link to={`/student/profile/${app.id}`} className="px-4 py-2 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 transition">
//                       Review
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </div>

//           {/* Sidebar */}
//           <aside className="space-y-8">
//             <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
//                 <h3 className="text-xl font-semibold text-white mb-4">Your Active Internship</h3>
//                 <div className="bg-slate-800/50 p-4 rounded-lg">
//                     <h4 className="font-bold text-white">{user?.profileId?.internshipDetails?.title || 'No active internship'}</h4>
//                     <p className="text-sm text-gray-300 mt-1">{user?.profileId?.internshipDetails?.department}</p>
//                 </div>
//                 <div className="mt-6 space-y-2">
//                     <Link to="/industry/post" className="block w-full px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition text-center">Post New Internship</Link>
//                     <Link to="/industry/applicants" className="block w-full px-4 py-2 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition text-center">View All Applicants</Link>
//                 </div>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }












import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api'; // Import our API service

export default function IndustryDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({ topCandidates: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const companyName = user?.profileId?.companyDetails?.companyName || user?.username;

  useEffect(() => {
    // Fetch the dashboard data from our new backend endpoint
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
    <div className="bg-gradient-to-br from-slate-900 to-indigo-900 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Welcome, {companyName}!</h1>
          <p className="text-gray-300 mt-2">Manage your internships and find the best talent.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-8">
            <section className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Top Matched Candidates for Your Internship</h2>
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
            {/* You can add another section here for "Recent Applicants" later */}
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
    </div>
  );
}