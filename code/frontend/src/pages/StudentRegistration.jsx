// src/pages/StudentRegistration.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js'; 

export default function StudentRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    
    fullName: '',
    email: '', 
    phone: '',
    gender: '',
    
    
    institution: '',
    course: '',
    yearOfStudy: '',
    cgpa: '',
    
    // Location Preferences (Flat)
    currentCity: '',
    currentState: '',
    preferredCities: [],
    willingToRelocate: '',
    
    // Skills & Interests (Flat)
    technicalSkills: [],
    softSkills: [], 
    preferredSectors: [],
    
    // Affirmative Action Data (Flat)
    socialCategory: '',
    isFromRuralArea: '',
    isFromAspirationDistrict: '',
    
    // Experience (Flat)
    pastInternshipExperience: '',
    projects: '',
    achievements: '',
    
    // Preferences (Flat)
    internshipDuration: '',
    stipendExpectation: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelect = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value) 
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    
    const profileData = {
        fullName: formData.fullName,
        phone: formData.phone,
        gender: formData.gender,
        academicDetails: {
            institution: formData.institution,
            course: formData.course,
            yearOfStudy: formData.yearOfStudy,
            cgpa: formData.cgpa,
        },
        skills: {
            technicalSkills: formData.technicalSkills,
            softSkills: formData.softSkills,
            preferredSectors: formData.preferredSectors,
        },
        location: {
            currentCity: formData.currentCity,
            currentState: formData.currentState,
            preferredCities: formData.preferredCities,
            willingToRelocate: formData.willingToRelocate === 'yes' ? true : false,
        },
        affirmativeAction: {
            socialCategory: formData.socialCategory,
            isFromRuralArea: formData.isFromRuralArea === 'yes' ? true : false,
            isFromAspirationDistrict: formData.isFromAspirationDistrict === 'yes' ? true : false,
        },
        experience: {
            pastInternshipExperience: formData.pastInternshipExperience,
            projects: formData.projects,
            achievements: formData.achievements,
        },
        preferences: {
            internshipDuration: formData.internshipDuration,
            stipendExpectation: formData.stipendExpectation,
        },
    };

    try {
      
      await api.post('/students/complete-profile', profileData);
      alert('Profile completed successfully!');
      navigate('/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Profile submission failed. Please check your data and try again.');
    } finally {
      setLoading(false);
    }
  };

  const technicalSkillsOptions = [
    'Python', 'JavaScript', 'Java', 'C++', 'React', 'Node.js', 
    'Data Analysis', 'Machine Learning', 'Web Development', 
    'Mobile Development', 'UI/UX Design', 'Digital Marketing',
    'Content Writing', 'Graphic Design', 'Video Editing'
  ];

  const sectorsOptions = [
    'Technology', 'Finance', 'Healthcare', 'Education', 'Marketing',
    'Engineering', 'Research', 'Government', 'NGO', 'Startups',
    'Manufacturing', 'Media', 'Consulting', 'E-commerce'
  ];

  const citiesOptions = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune',
    'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kochi', 'Indore'
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-400">
            Student Registration
          </h1>
          <p className="text-gray-300 mt-2">Complete your profile to get personalized internship matches</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            

            {/* Basic Information */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Academic Details */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                Academic Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Institution *</label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="Enter your college/university name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Course/Degree *</label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="e.g., B.Tech CSE, MBA, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Year of Study *</label>
                  <select
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                  >
                    <option value="">Select Year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                    <option value="postgraduate">Post Graduate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">CGPA/Percentage</label>
                  <input
                    type="text"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="e.g., 8.5 or 85%"
                  />
                </div>
              </div>
            </section>

             {/* Skills & Interests */}
             <section>
               <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                 Skills & Interests
               </h2>
               <div>
                 <label className="block text-sm font-medium text-gray-200 mb-2">Technical Skills *</label>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                   {technicalSkillsOptions.map(skill => (
                     <label key={skill} className="flex items-center space-x-2 text-gray-300 cursor-pointer hover:text-white transition">
                       <input
                         type="checkbox"
                         checked={formData.technicalSkills.includes(skill)}
                         onChange={() => handleMultiSelect('technicalSkills', skill)}
                         className="rounded border-white/20 bg-white/5 text-emerald-600 focus:ring-emerald-500"
                       />
                       <span className="text-sm">{skill}</span>
                     </label>
                   ))}
                 </div>
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-200 mb-2">Preferred Sectors *</label>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                   {sectorsOptions.map(sector => (
                     <label key={sector} className="flex items-center space-x-2 text-gray-300 cursor-pointer hover:text-white transition">
                       <input
                         type="checkbox"
                         checked={formData.preferredSectors.includes(sector)}
                         onChange={() => handleMultiSelect('preferredSectors', sector)}
                         className="rounded border-white/20 bg-white/5 text-emerald-600 focus:ring-emerald-500"
                       />
                       <span className="text-sm">{sector}</span>
                     </label>
                   ))}
                 </div>
               </div>
             </section>

             {/* Location Preferences */}
            <section>
               <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                 Location Preferences
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-200 mb-2">Current City *</label>
                   <input
                     type="text"
                     name="currentCity"
                     value={formData.currentCity}
                     onChange={handleChange}
                     required
                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                     placeholder="Enter your current city"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-200 mb-2">Current State *</label>
                   <input
                     type="text"
                     name="currentState"
                     value={formData.currentState}
                     onChange={handleChange}
                     required
                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                     placeholder="Enter your current state"
                   />
                 </div>
               </div>
               
               <div className="mb-4">
                 <label className="block text-sm font-medium text-gray-200 mb-2">Preferred Cities for Internship</label>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                   {citiesOptions.map(city => (
                     <label key={city} className="flex items-center space-x-2 text-gray-300 cursor-pointer hover:text-white transition">
                       <input
                         type="checkbox"
                         checked={formData.preferredCities.includes(city)}
                         onChange={() => handleMultiSelect('preferredCities', city)}
                         className="rounded border-white/20 bg-white/5 text-emerald-600 focus:ring-emerald-500"
                       />
                       <span className="text-sm">{city}</span>
                     </label>
                   ))}
                 </div>
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-200 mb-2">Willing to Relocate? *</label>
                 <div className="flex space-x-4">
                   <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                     <input
                       type="radio"
                       name="willingToRelocate"
                       value="yes"
                       checked={formData.willingToRelocate === 'yes'}
                       onChange={handleChange}
                       className="text-emerald-600 focus:ring-emerald-500"
                     />
                     <span>Yes</span>
                   </label>
                   <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                     <input
                       type="radio"
                       name="willingToRelocate"
                       value="no"
                       checked={formData.willingToRelocate === 'no'}
                       onChange={handleChange}
                       className="text-emerald-600 focus:ring-emerald-500"
                     />
                     <span>No</span>
                   </label>
                 </div>
               </div>
             </section>

             {/* Affirmative Action (PM Scheme Requirements) */}
             <section>
               <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                 Additional Information (For PM Internship Scheme)
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-200 mb-2">Social Category</label>
                   <select
                     name="socialCategory"
                     value={formData.socialCategory}
                     onChange={handleChange}
                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                   >
                     <option value="">Select Category</option>
                     <option value="general">General</option>
                     <option value="obc">OBC</option>
                     <option value="sc">SC</option>
                     <option value="st">ST</option>
                     <option value="ews">EWS</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-200 mb-2">Are you from a rural area?</label>
                   <div className="flex space-x-4 mt-2">
                     <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                       <input
                         type="radio"
                         name="isFromRuralArea"
                         value="yes"
                         checked={formData.isFromRuralArea === 'yes'}
                         onChange={handleChange}
                         className="text-emerald-600 focus:ring-emerald-500"
                       />
                       <span>Yes</span>
                     </label>
                     <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                       <input
                         type="radio"
                         name="isFromRuralArea"
                         value="no"
                         checked={formData.isFromRuralArea === 'no'}
                         onChange={handleChange}
                         className="text-emerald-600 focus:ring-emerald-500"
                       />
                       <span>No</span>
                     </label>
                   </div>
                 </div>
                 <div className="md:col-span-2">
                   <label className="block text-sm font-medium text-gray-200 mb-2">Are you from an Aspirational District?</label>
                   <div className="flex space-x-4 mt-2">
                     <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                       <input
                         type="radio"
                         name="isFromAspirationDistrict"
                         value="yes"
                         checked={formData.isFromAspirationDistrict === 'yes'}
                         onChange={handleChange}
                         className="text-emerald-600 focus:ring-emerald-500"
                       />
                       <span>Yes</span>
                     </label>
                     <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                       <input
                         type="radio"
                         name="isFromAspirationDistrict"
                         value="no"
                         checked={formData.isFromAspirationDistrict === 'no'}
                         onChange={handleChange}
                         className="text-emerald-600 focus:ring-emerald-500"
                       />
                       <span>No</span>
                     </label>
                   </div>
                 </div>
               </div>
             </section>

             {/* Experience & Preferences */}
             <section>
               <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                 Experience & Preferences
               </h2>
               <div className="space-y-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-200 mb-2">Past Internship Experience</label>
                   <textarea
                     name="pastInternshipExperience"
                     value={formData.pastInternshipExperience}
                     onChange={handleChange}
                     rows={3}
                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                     placeholder="Describe your previous internship experiences (if any)"
                   />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-200 mb-2">Preferred Duration</label>
                     <select
                       name="internshipDuration"
                       value={formData.internshipDuration}
                       onChange={handleChange}
                       className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                     >
                       <option value="">Select Duration</option>
                       <option value="1-2 months">1-2 months</option>
                       <option value="3-4 months">3-4 months</option>
                       <option value="5-6 months">5-6 months</option>
                       <option value="6+ months">6+ months</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-200 mb-2">Expected Stipend (per month)</label>
                     <select
                       name="stipendExpectation"
                       value={formData.stipendExpectation}
                       onChange={handleChange}
                       className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                     >
                       <option value="">Select Range</option>
                       <option value="unpaid">Unpaid</option>
                       <option value="5000-10000">₹5,000 - ₹10,000</option>
                       <option value="10000-20000">₹10,000 - ₹20,000</option>
                       <option value="20000-30000">₹20,000 - ₹30,000</option>
                       <option value="30000+">₹30,000+</option>
                     </select>
                   </div>
                 </div>
               </div>
             </section>

            {error && <p className="text-red-400 text-sm text-center py-4">{error}</p>}

            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 text-white font-semibold rounded-lg shadow-lg transition"
              >
                {loading ? 'Submitting...' : 'Complete Registration'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}