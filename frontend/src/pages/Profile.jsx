// import { useAuth } from '../context/AuthContext';
// import { Navigate } from 'react-router-dom';

// // Helper component to display a section of the profile
// const ProfileSection = ({ title, data }) => {
//     // --- THE FIX ---
//     // If data is missing or not an object, don't render anything.
//     if (!data || typeof data !== 'object') {
//         return null;
//     }

//     return (
//         <div className="bg-white/10 p-6 rounded-lg">
//             <h3 className="text-xl font-semibold text-emerald-400 mb-4 border-b border-white/20 pb-2">{title}</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
//                 {Object.entries(data).map(([key, value]) => {
//                     // Don't render internal keys like _id or __v
//                     if (key === '_id' || key === '__v') return null;
                    
//                     return (
//                         <div key={key}>
//                             <p className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
//                             <p className="font-medium">{String(value) || 'N/A'}</p>
//                         </div>
//                     )
//                 })}
//             </div>
//         </div>
//     );
// };


// export default function Profile() {
//     const { user, loading } = useAuth();

//     if (loading) {
//         return <div className="text-white text-center p-12">Loading Profile...</div>;
//     }

//     if (!user) {
//         // If no user is logged in, redirect to the login page
//         return <Navigate to="/login" />;
//     }

//     // The user object has the main user info and the populated profileId
//     const profile = user.profileId;

//     if (!profile) {
//         return (
//              <div className="text-white text-center p-12">
//                 <h2 className="text-2xl font-bold">Welcome, {user.username}!</h2>
//                 <p className="mt-4">Your profile is not yet complete. Please go to the registration page to finish setting up your account.</p>
//             </div>
//         )
//     }

//     const isStudent = user.userType === 'student';

//     return (
//         <div className="bg-gradient-to-br from-slate-900 to-indigo-900 min-h-screen py-12 px-6">
//             <div className="max-w-4xl mx-auto">
//                 <div className="text-center mb-8">
//                     <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-400">
//                         My Profile
//                     </h1>
//                     <p className="text-gray-300 mt-2">Welcome, {user.username}!</p>
//                 </div>

//                 <div className="space-y-8">
//                     {/* Display user's basic login info */}
//                     <ProfileSection title="Account Information" data={{ username: user.username, email: user.email }} />

//                     {/* Conditionally render Student or Industry profile details */}
//                     {isStudent ? (
//                         <>
//                             <ProfileSection title="Basic Information" data={{ fullName: profile.fullName, phone: profile.phone, gender: profile.gender }} />
//                             <ProfileSection title="Academic Details" data={profile.academicDetails} />
//                             {/* You can create more ProfileSection components for skills, location, etc. */}
//                         </>
//                     ) : (
//                         <>
//                             <ProfileSection title="Company Information" data={profile.companyDetails} />
//                             <ProfileSection title="Contact Person" data={profile.contactPerson} />
//                             {/* You can create more ProfileSection components for internship details, etc. */}
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

// Helper component to display a section of the profile
const ProfileSection = ({ title, data }) => {
    // If data is missing or not an object, don't render anything.
    if (!data || typeof data !== 'object') {
        return null;
    }

    return (
        <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-emerald-400 mb-4 border-b border-white/20 pb-2">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
                {Object.entries(data).map(([key, value]) => {
                    // Don't render internal keys like _id or __v
                    if (key === '_id' || key === '__v' || key === 'user') return null;
                    
                    // Handle array values (like skills)
                    if (Array.isArray(value)) {
                        return (
                            <div key={key} className="col-span-1 md:col-span-2">
                                <p className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                                <p className="font-medium">{value.length > 0 ? value.join(', ') : 'N/A'}</p>
                            </div>
                        );
                    }
                    
                    // Handle boolean values
                    if (typeof value === 'boolean') {
                        return (
                            <div key={key}>
                                <p className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                                <p className="font-medium">{value ? 'Yes' : 'No'}</p>
                            </div>
                        );
                    }
                    
                    return (
                        <div key={key}>
                            <p className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                            <p className="font-medium">{String(value) || 'N/A'}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default function Profile() {
    const { user, profile, hasProfile, loading } = useAuth(); // Updated to get profile data from context

    if (loading) {
        return <div className="text-white text-center p-12">Loading Profile...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    // Check if user has completed their detailed profile
    if (!hasProfile || !profile) {
        return (
            <div className="bg-gradient-to-br from-slate-900 to-indigo-900 min-h-screen py-12 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Welcome, {user.username}!</h2>
                    <div className="bg-white/10 p-8 rounded-lg">
                        <p className="text-gray-300 mb-6">Your profile is not yet complete. Please complete your profile to access all features.</p>
                        <button 
                            onClick={() => window.location.href = '/student-registration'} 
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            Complete Profile
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const isStudent = user.userType === 'student';

    return (
        <div className="bg-gradient-to-br from-slate-900 to-indigo-900 min-h-screen py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-400">
                        My Profile
                    </h1>
                    <p className="text-gray-300 mt-2">Welcome, {profile.fullName || user.username}!</p>
                </div>

                <div className="space-y-8">
                    {/* Display user's basic account info */}
                    <ProfileSection title="Account Information" data={{ 
                        username: user.username, 
                        email: user.email,
                        userType: user.userType,
                        memberSince: new Date(user.createdAt).toLocaleDateString()
                    }} />

                    {/* Display detailed profile based on user type */}
                    {isStudent ? (
                        <>
                            <ProfileSection 
                                title="Basic Information" 
                                data={{ 
                                    fullName: profile.fullName, 
                                    phone: profile.phone, 
                                    gender: profile.gender 
                                }} 
                            />
                            
                            <ProfileSection 
                                title="Academic Details" 
                                data={profile.academicDetails} 
                            />
                            
                            <ProfileSection 
                                title="Technical Skills" 
                                data={{ 
                                    technicalSkills: profile.skills?.technicalSkills,
                                    softSkills: profile.skills?.softSkills,
                                    preferredSectors: profile.skills?.preferredSectors
                                }} 
                            />
                            
                            <ProfileSection 
                                title="Location Preferences" 
                                data={profile.location} 
                            />
                            
                            <ProfileSection 
                                title="Experience" 
                                data={profile.experience} 
                            />
                            
                            <ProfileSection 
                                title="Internship Preferences" 
                                data={profile.preferences} 
                            />
                            
                            {profile.affirmativeAction && (
                                <ProfileSection 
                                    title="Affirmative Action Details" 
                                    data={profile.affirmativeAction} 
                                />
                            )}
                        </>
                    ) : (
                        // Industry profile sections (when you implement industry profiles)
                        <>
                            <ProfileSection title="Company Information" data={profile.companyDetails} />
                            <ProfileSection title="Contact Person" data={profile.contactPerson} />
                        </>
                    )}

                    {/* Action buttons */}
                    <div className="text-center pt-8">
                        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium transition-colors mr-4">
                            Edit Profile
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}