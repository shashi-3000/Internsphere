import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import img from "../assets/gradientbg.jpg";


const ProfileSection = ({ title, data }) => {
    if (!data || typeof data !== 'object') {
        return null;
    }

    return (
        <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-emerald-400 mb-4 border-b border-white/20 pb-2">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
                {Object.entries(data).map(([key, value]) => {
                    if (key === '_id' || key === '__v' || key === 'user') return null;
                    
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
    const { user, profile, hasProfile, loading } = useAuth();

    if (loading) {
        return <div className="text-white text-center p-12">Loading Profile...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!hasProfile || !profile) {
        return (
            
            <section 
                className="relative min-h-screen text-white flex items-center justify-center"
                style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed"
                }}
            >
                <div className="absolute inset-0 bg-slate-900 bg-opacity-80"></div>
                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="bg-white/10 p-8 rounded-lg">
                        <h2 className="text-2xl font-bold text-white mb-4">Welcome, {user.username}!</h2>
                        <p className="text-gray-300 mb-6">Your profile is not yet complete. Please complete your profile to access all features.</p>
                        <Link 
                            to="/register" 
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            Complete Profile
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    const isStudent = user.userType === 'student';

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
            <div className="relative max-w-4xl mx-auto py-20 px-6">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-400">
                        My Profile
                    </h1>
                    <p className="text-gray-300 mt-2">Welcome, {profile.fullName || user.username}!</p>
                </div>

                <div className="space-y-8">
                    <ProfileSection title="Account Information" data={{ 
                        username: user.username, 
                        email: user.email,
                        userType: user.userType,
                        memberSince: new Date(user.createdAt).toLocaleDateString()
                    }} />

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
                            <ProfileSection title="Academic Details" data={profile.academicDetails} />
                            <ProfileSection 
                                title="Skills & Interests" 
                                data={{ 
                                    technicalSkills: profile.skills?.technicalSkills,
                                    softSkills: profile.skills?.softSkills,
                                    preferredSectors: profile.skills?.preferredSectors
                                }} 
                            />
                            <ProfileSection title="Location Preferences" data={profile.location} />
                            <ProfileSection title="Experience" data={profile.experience} />
                            <ProfileSection title="Internship Preferences" data={profile.preferences} />
                            {profile.affirmativeAction && (
                                <ProfileSection 
                                    title="Affirmative Action Details" 
                                    data={profile.affirmativeAction} 
                                />
                            )}
                        </>
                    ) : (
                        <>
                            <ProfileSection title="Company Information" data={profile.companyDetails} />
                            <ProfileSection title="Contact Person" data={profile.contactPerson} />
                        </>
                    )}
                    
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
        </section>
    );
}

