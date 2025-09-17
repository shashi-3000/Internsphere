/// src/pages/IndustryRegistration.jsx
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../services/api'; // 1. Import our api service

// export default function IndustryRegistration() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     // --- Your existing flat formData state ---
//     companyName: '',
//     companyEmail: '',
//     companyPhone: '',
//     website: '',
//     companySize: '',
//     industry: '',
//     companyAddress: '',
//     city: '',
//     state: '',
//     contactPersonName: '',
//     contactPersonDesignation: '',
//     contactPersonEmail: '',
//     contactPersonPhone: '',
//     internshipTitle: '',
//     department: '',
//     internshipType: '',
//     duration: '',
//     startDate: '',
//     numberOfPositions: '',
//     requiredSkills: [],
//     preferredCourse: [],
//     minimumCGPA: '',
//     yearOfStudy: [],
//     stipend: '',
//     providesAccommodation: '',
//     providesMeals: '',
//     providesTransport: '',
//     otherBenefits: '',
//     workMode: '',
//     workingHours: '',
//     jobDescription: '',
//     learningOutcomes: '',
//     preferredStates: [],
//     diversityPreferences: '',
//     ruralCandidatesWelcome: '',
//     registrationNumber: '',
//     gstNumber: '',
//     panNumber: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleMultiSelect = (name, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [name]: prev[name].includes(value) 
//         ? prev[name].filter(item => item !== value)
//         : [...prev[name], value]
//     }));
//   };

//   // --- MODIFIED handleSubmit ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     // 2. Transform flat data to the nested structure the backend expects
//     const profileData = {
//         companyDetails: {
//             companyName: formData.companyName,
//             companyEmail: formData.companyEmail,
//             companyPhone: formData.companyPhone,
//             website: formData.website,
//             companySize: formData.companySize,
//             industry: formData.industry,
//             companyAddress: formData.companyAddress,
//             city: formData.city,
//             state: formData.state,
//         },
//         contactPerson: {
//             name: formData.contactPersonName,
//             designation: formData.contactPersonDesignation,
//             email: formData.contactPersonEmail,
//             phone: formData.contactPersonPhone,
//         },
//         internshipDetails: {
//             title: formData.internshipTitle,
//             department: formData.department,
//             internshipType: formData.internshipType,
//             duration: formData.duration,
//             startDate: formData.startDate,
//             numberOfPositions: formData.numberOfPositions,
//             workMode: formData.workMode,
//             workingHours: formData.workingHours,
//         },
//         requirements: {
//             requiredSkills: formData.requiredSkills,
//             preferredCourse: formData.preferredCourse,
//             minimumCGPA: formData.minimumCGPA,
//             yearOfStudy: formData.yearOfStudy,
//         },
//         compensation: {
//             stipend: formData.stipend,
//             providesAccommodation: formData.providesAccommodation === 'yes',
//             providesMeals: formData.providesMeals === 'yes',
//             providesTransport: formData.providesTransport === 'yes',
//             otherBenefits: formData.otherBenefits,
//         },
//         workDetails: {
//             jobDescription: formData.jobDescription,
//             learningOutcomes: formData.learningOutcomes,
//         },
//         preferences: {
//             preferredStates: formData.preferredStates,
//             diversityPreferences: formData.diversityPreferences,
//             ruralCandidatesWelcome: formData.ruralCandidatesWelcome === 'yes',
//         },
//         verification: {
//             registrationNumber: formData.registrationNumber,
//             gstNumber: formData.gstNumber,
//             panNumber: formData.panNumber,
//         },
//     };

//     try {
//       // 3. Send the transformed data to the backend
//       await api.post('/industry/complete-profile', profileData);
//       alert('Industry profile created successfully!');
//       navigate('/industry/dashboard');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Profile submission failed. Please check your data.');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//     const skillsOptions = [
//     'Python', 'JavaScript', 'Java', 'C++', 'React', 'Node.js',
//     'Data Analysis', 'Machine Learning', 'Web Development',
//     'Mobile Development', 'UI/UX Design', 'Digital Marketing',
//     'Content Writing', 'Graphic Design', 'Video Editing',
//     'Sales', 'Business Development', 'Research', 'Finance'
//   ];

//   const coursesOptions = [
//     'B.Tech/B.E.', 'BCA', 'MCA', 'MBA', 'B.Sc', 'M.Sc',
//     'BBA', 'B.Com', 'M.Com', 'Arts', 'Any Graduate'
//   ];

//   const industryOptions = [
//     'Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing',
//     'Consulting', 'E-commerce', 'Media', 'Government', 'NGO',
//     'Automotive', 'Pharmaceutical', 'Banking', 'Insurance'
//   ];

//   const statesOptions = [
//     'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Gujarat', 'Haryana',
//     'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha',
//     'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh',
//     'West Bengal'
//   ];

//   return (
//     <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 min-h-screen py-12 px-6">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-400">
//             Industry Registration
//           </h1>
//           <p className="text-gray-300 mt-2">Register your company and post internship opportunities</p>
//         </div>

//         <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8">
//           <form onSubmit={handleSubmit} className="space-y-8">
            
//             {/* Company Details */}
//             <section>
//               <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
//                 Company Information
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Company Name *</label>
//                   <input
//                     type="text"
//                     name="companyName"
//                     value={formData.companyName}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                     placeholder="Enter company name"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Company Email *</label>
//                   <input
//                     type="email"
//                     name="companyEmail"
//                     value={formData.companyEmail}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                     placeholder="company@example.com"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Company Phone *</label>
//                   <input
//                     type="tel"
//                     name="companyPhone"
//                     value={formData.companyPhone}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                     placeholder="Enter phone number"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Website</label>
//                   <input
//                     type="url"
//                     name="website"
//                     value={formData.website}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                     placeholder="https://company.com"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Company Size *</label>
//                   <select
//                     name="companySize"
//                     value={formData.companySize}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                   >
//                     <option value="">Select Company Size</option>
//                     <option value="startup">Startup (1-50)</option>
//                     <option value="small">Small (51-200)</option>
//                     <option value="medium">Medium (201-1000)</option>
//                     <option value="large">Large (1000+)</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Industry *</label>
//                   <select
//                     name="industry"
//                     value={formData.industry}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                   >
//                     <option value="">Select Industry</option>
//                     {industryOptions.map(industry => (
//                       <option key={industry} value={industry}>{industry}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Company Address *</label>
//                   <textarea
//                     name="companyAddress"
//                     value={formData.companyAddress}
//                     onChange={handleChange}
//                     required
//                     rows={2}
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                     placeholder="Enter complete company address"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">City *</label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                     placeholder="Enter city"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">State *</label>
//                   <select
//                     name="state"
//                     value={formData.state}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                   >
//                     <option value="">Select State</option>
//                     {statesOptions.map(state => (
//                       <option key={state} value={state}>{state}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </section>

//             {/* Contact Person */}
//             <section>
//               <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
//                 Contact Person Details
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Contact Person Name *</label>
//                   <input
//                     type="text"
//                     name="contactPersonName"
//                     value={formData.contactPersonName}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                     placeholder="Enter contact person name"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Designation *</label>
//                   <input
//                     type="text"
//                     name="contactPersonDesignation"
//                     value={formData.contactPersonDesignation}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                     placeholder="e.g., HR Manager, CEO"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Contact Email *</label>
//                   <input
//                     type="email"
//                     name="contactPersonEmail"
//                     value={formData.contactPersonEmail}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                     placeholder="contact@company.com"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Contact Phone *</label>
//                   <input
//                     type="tel"
//                     name="contactPersonPhone"
//                     value={formData.contactPersonPhone}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                     placeholder="Enter contact phone"
//                   />
//                 </div>
//               </div>
//             </section>

//             {/* Internship Details */}
//             <section>
//               <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
//                 Internship Details
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Internship Title *</label>
//                   <input
//                     type="text"
//                     name="internshipTitle"
//                     value={formData.internshipTitle}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                     placeholder="e.g., Software Development Intern"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Department *</label>
//                   <input
//                     type="text"
//                     name="department"
//                     value={formData.department}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                     placeholder="e.g., IT, Marketing, HR"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Internship Type *</label>
//                   <select
//                     name="internshipType"
//                     value={formData.internshipType}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                   >
//                     <option value="">Select Type</option>
//                     <option value="full-time">Full-time</option>
//                     <option value="part-time">Part-time</option>
//                     <option value="project-based">Project-based</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Duration *</label>
//                   <select
//                     name="duration"
//                     value={formData.duration}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                   >
//                     <option value="">Select Duration</option>
//                     <option value="1-2 months">1-2 months</option>
//                     <option value="3-4 months">3-4 months</option>
//                     <option value="5-6 months">5-6 months</option>
//                     <option value="6+ months">6+ months</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Expected Start Date</label>
//                   <input
//                     type="date"
//                     name="startDate"
//                     value={formData.startDate}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Number of Positions *</label>
//                   <input
//                     type="number"
//                     name="numberOfPositions"
//                     value={formData.numberOfPositions}
//                     onChange={handleChange}
//                     required
//                     min="1"
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                     placeholder="Enter number of positions"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Work Mode *</label>
//                   <select
//                     name="workMode"
//                     value={formData.workMode}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                   >
//                     <option value="">Select Work Mode</option>
//                     <option value="office">Office</option>
//                     <option value="remote">Remote</option>
//                     <option value="hybrid">Hybrid</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Working Hours</label>
//                   <input
//                     type="text"
//                     name="workingHours"
//                     value={formData.workingHours}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                     placeholder="e.g., 9 AM - 5 PM"
//                   />
//                 </div>
//               </div>
//             </section>

//             {/* Requirements */}
//             <section>
//               <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
//                 Requirements
//               </h2>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Required Skills *</label>
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                     {skillsOptions.map(skill => (
//                       <label key={skill} className="flex items-center space-x-2 text-gray-300 cursor-pointer hover:text-white transition">
//                         <input
//                           type="checkbox"
//                           checked={formData.requiredSkills.includes(skill)}
//                           onChange={() => handleMultiSelect('requiredSkills', skill)}
//                           className="rounded border-white/20 bg-white/5 text-emerald-600 focus:ring-emerald-500"
//                         />
//                         <span className="text-sm">{skill}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-200 mb-2">Preferred Course/Degree</label>
//                     <div className="space-y-2">
//                       {coursesOptions.map(course => (
//                         <label key={course} className="flex items-center space-x-2 text-gray-300 cursor-pointer hover:text-white transition">
//                           <input
//                             type="checkbox"
//                             checked={formData.preferredCourse.includes(course)}
//                             onChange={() => handleMultiSelect('preferredCourse', course)}
//                             className="rounded border-white/20 bg-white/5 text-emerald-600 focus:ring-emerald-500"
//                           />
//                           <span className="text-sm">{course}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
                  
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-200 mb-2">Minimum CGPA</label>
//                       <input
//                         type="text"
//                         name="minimumCGPA"
//                         value={formData.minimumCGPA}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                         placeholder="e.g., 7.0 or 70%"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-200 mb-2">Year of Study</label>
//                       <div className="space-y-2">
//                         {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Post Graduate'].map(year => (
//                           <label key={year} className="flex items-center space-x-2 text-gray-300 cursor-pointer hover:text-white transition">
//                             <input
//                               type="checkbox"
//                               checked={formData.yearOfStudy.includes(year)}
//                               onChange={() => handleMultiSelect('yearOfStudy', year)}
//                               className="rounded border-white/20 bg-white/5 text-emerald-600 focus:ring-emerald-500"
//                             />
//                             <span className="text-sm">{year}</span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Compensation & Benefits */}
//             <section>
//               <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
//                 Compensation & Benefits
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Monthly Stipend *</label>
//                   <select
//                     name="stipend"
//                     value={formData.stipend}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                   >
//                     <option value="">Select Stipend Range</option>
//                     <option value="unpaid">Unpaid</option>
//                     <option value="5000-10000">₹5,000 - ₹10,000</option>
//                     <option value="10000-20000">₹10,000 - ₹20,000</option>
//                     <option value="20000-30000">₹20,000 - ₹30,000</option>
//                     <option value="30000+">₹30,000+</option>
//                   </select>
//                 </div>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-200 mb-2">Additional Benefits</label>
//                     <div className="space-y-2">
//                       <label className="flex items-center space-x-2 text-gray-300">
//                         <input
//                           type="checkbox"
//                           name="providesAccommodation"
//                           checked={formData.providesAccommodation === 'yes'}
//                           onChange={(e) => setFormData(prev => ({...prev, providesAccommodation: e.target.checked ? 'yes' : ''}))}
//                           className="rounded border-white/20 bg-white/5 text-emerald-600 focus:ring-emerald-500"
//                         />
//                         <span className="text-sm">Accommodation</span>
//                       </label>
//                       <label className="flex items-center space-x-2 text-gray-300">
//                         <input
//                           type="checkbox"
//                           name="providesMeals"
//                           checked={formData.providesMeals === 'yes'}
//                           onChange={(e) => setFormData(prev => ({...prev, providesMeals: e.target.checked ? 'yes' : ''}))}
//                           className="rounded border-white/20 bg-white/5 text-emerald-600 focus:ring-emerald-500"
//                         />
//                         <span className="text-sm">Meals</span>
//                       </label>
//                       <label className="flex items-center space-x-2 text-gray-300">
//                         <input
//                           type="checkbox"
//                           name="providesTransport"
//                           checked={formData.providesTransport === 'yes'}
//                           onChange={(e) => setFormData(prev => ({...prev, providesTransport: e.target.checked ? 'yes' : ''}))}
//                           className="rounded border-white/20 bg-white/5 text-emerald-600 focus:ring-emerald-500"
//                         />
//                         <span className="text-sm">Transportation</span>
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Job Description */}
//             <section>
//               <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
//                 Job Description & Learning Outcomes
//               </h2>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Job Description *</label>
//                   <textarea
//                     name="jobDescription"
//                     value={formData.jobDescription}
//                     onChange={handleChange}
//                     required
//                     rows={4}
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                     placeholder="Describe the role, responsibilities, and day-to-day tasks..."
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Learning Outcomes</label>
//                   <textarea
//                     name="learningOutcomes"
//                     value={formData.learningOutcomes}
//                     onChange={handleChange}
//                     rows={3}
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                     placeholder="What will the intern learn from this opportunity?"
//                   />
//                 </div>
//               </div>
//             </section>

//             {/* Diversity & Inclusion */}
//             <section>
//               <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
//                 Diversity & Inclusion Preferences
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Welcome candidates from rural areas?</label>
//                   <div className="flex space-x-4">
//                     <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="ruralCandidatesWelcome"
//                         value="yes"
//                         checked={formData.ruralCandidatesWelcome === 'yes'}
//                         onChange={handleChange}
//                         className="text-emerald-600 focus:ring-emerald-500 bg-white/5"
//                       />
//                       <span>Yes</span>
//                     </label>
//                     <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="ruralCandidatesWelcome"
//                         value="no"
//                         checked={formData.ruralCandidatesWelcome === 'no'}
//                         onChange={handleChange}
//                         className="text-emerald-600 focus:ring-emerald-500 bg-white/5"
//                       />
//                       <span>No</span>
//                     </label>
//                   </div>
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-200 mb-2">Diversity Preferences</label>
//                     <select
//                         name="diversityPreferences"
//                         value={formData.diversityPreferences}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                     >
//                         <option value="">No Preference</option>
//                         <option value="women">Encourage Women Candidates</option>
//                         <option value="disability">Encourage Candidates with Disabilities</option>
//                         <option value="lgbtq">Encourage LGBTQ+ Candidates</option>
//                     </select>
//                 </div>
//               </div>
//             </section>

//             {/* Company Verification */}
//             <section>
//                 <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
//                     Company Verification
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-200 mb-2">Registration Number</label>
//                         <input
//                             type="text"
//                             name="registrationNumber"
//                             value={formData.registrationNumber}
//                             onChange={handleChange}
//                             className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                             placeholder="e.g., U72900KA2008PTC045934"
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-200 mb-2">GST Number</label>
//                         <input
//                             type="text"
//                             name="gstNumber"
//                             value={formData.gstNumber}
//                             onChange={handleChange}
//                             className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                             placeholder="e.g., 29ABCDE1234F1Z5"
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-200 mb-2">PAN Number</label>
//                         <input
//                             type="text"
//                             name="panNumber"
//                             value={formData.panNumber}
//                             onChange={handleChange}
//                             className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//                             placeholder="e.g., ABCDE1234F"
//                         />
//                     </div>
//                 </div>
//             </section>

//             {/* Submit Button */}
//             <div className="mt-8 text-center">
//                 <button
//                     type="submit"
//                     className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-slate-900 transition-all duration-300 transform hover:scale-105"
//                 >
//                     Register and Post Internship
//                 </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // 1. Import our api service

export default function IndustryRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // --- Your existing flat formData state is perfect ---
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    website: '',
    companySize: '',
    industry: '',
    companyAddress: '',
    city: '',
    state: '',
    contactPersonName: '',
    contactPersonDesignation: '',
    contactPersonEmail: '',
    contactPersonPhone: '',
    internshipTitle: '',
    department: '',
    internshipType: '',
    duration: '',
    startDate: '',
    numberOfPositions: '',
    requiredSkills: [],
    preferredCourse: [],
    minimumCGPA: '',
    yearOfStudy: [],
    stipend: '',
    providesAccommodation: '',
    providesMeals: '',
    providesTransport: '',
    otherBenefits: '',
    workMode: '',
    workingHours: '',
    jobDescription: '',
    learningOutcomes: '',
    preferredStates: [],
    diversityPreferences: '',
    ruralCandidatesWelcome: '',
    registrationNumber: '',
    gstNumber: '',
    panNumber: ''
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

  // --- MODIFIED handleSubmit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 2. Transform flat data to the nested structure the backend expects
    const profileData = {
        companyDetails: {
            companyName: formData.companyName,
            companyEmail: formData.companyEmail,
            companyPhone: formData.companyPhone,
            website: formData.website,
            companySize: formData.companySize,
            industry: formData.industry,
            companyAddress: formData.companyAddress,
            city: formData.city,
            state: formData.state,
        },
        contactPerson: {
            name: formData.contactPersonName,
            designation: formData.contactPersonDesignation,
            email: formData.contactPersonEmail,
            phone: formData.contactPersonPhone,
        },
        internshipDetails: {
            title: formData.internshipTitle,
            department: formData.department,
            internshipType: formData.internshipType,
            duration: formData.duration,
            startDate: formData.startDate,
            numberOfPositions: formData.numberOfPositions,
            workMode: formData.workMode,
            workingHours: formData.workingHours,
        },
        requirements: {
            requiredSkills: formData.requiredSkills,
            preferredCourse: formData.preferredCourse,
            minimumCGPA: formData.minimumCGPA,
            yearOfStudy: formData.yearOfStudy,
        },
        compensation: {
            stipend: formData.stipend,
            providesAccommodation: formData.providesAccommodation === 'yes',
            providesMeals: formData.providesMeals === 'yes',
            providesTransport: formData.providesTransport === 'yes',
            otherBenefits: formData.otherBenefits,
        },
        workDetails: {
            jobDescription: formData.jobDescription,
            learningOutcomes: formData.learningOutcomes,
        },
        preferences: {
            preferredStates: formData.preferredStates,
            diversityPreferences: formData.diversityPreferences,
            ruralCandidatesWelcome: formData.ruralCandidatesWelcome === 'yes',
        },
        verification: {
            registrationNumber: formData.registrationNumber,
            gstNumber: formData.gstNumber,
            panNumber: formData.panNumber,
        },
    };

    try {
      // 3. Send the transformed data to the backend
      await api.post('/industry/complete-profile', profileData);
      alert('Industry profile created successfully!');
      navigate('/industry/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Profile submission failed. Please check your data.');
    } finally {
      setLoading(false);
    }
  };
  
    const skillsOptions = [
    'Python', 'JavaScript', 'Java', 'C++', 'React', 'Node.js',
    'Data Analysis', 'Machine Learning', 'Web Development',
    'Mobile Development', 'UI/UX Design', 'Digital Marketing',
    'Content Writing', 'Graphic Design', 'Video Editing',
    'Sales', 'Business Development', 'Research', 'Finance'
  ];

  const coursesOptions = [
    'B.Tech/B.E.', 'BCA', 'MCA', 'MBA', 'B.Sc', 'M.Sc',
    'BBA', 'B.Com', 'M.Com', 'Arts', 'Any Graduate'
  ];

  const industryOptions = [
    'Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing',
    'Consulting', 'E-commerce', 'Media', 'Government', 'NGO',
    'Automotive', 'Pharmaceutical', 'Banking', 'Insurance'
  ];

  const statesOptions = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Gujarat', 'Haryana',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha',
    'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh',
    'West Bengal'
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-400">
            Industry Registration
          </h1>
          <p className="text-gray-300 mt-2">Register your company and post internship opportunities</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Company Details */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                Company Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Company Email *</label>
                  <input
                    type="email"
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="company@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Company Phone *</label>
                  <input
                    type="tel"
                    name="companyPhone"
                    value={formData.companyPhone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="https://company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Company Size *</label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                  >
                    <option value="">Select Company Size</option>
                    <option value="startup">Startup (1-50)</option>
                    <option value="small">Small (51-200)</option>
                    <option value="medium">Medium (201-1000)</option>
                    <option value="large">Large (1000+)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Industry *</label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                  >
                    <option value="">Select Industry</option>
                    {industryOptions.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-200 mb-2">Company Address *</label>
                  <textarea
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    required
                    rows={2}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="Enter complete company address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">State *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                  >
                    <option value="">Select State</option>
                    {statesOptions.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* Contact Person */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                Contact Person Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Contact Person Name *</label>
                  <input
                    type="text"
                    name="contactPersonName"
                    value={formData.contactPersonName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="Enter contact person name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Designation *</label>
                  <input
                    type="text"
                    name="contactPersonDesignation"
                    value={formData.contactPersonDesignation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="e.g., HR Manager, CEO"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Contact Email *</label>
                  <input
                    type="email"
                    name="contactPersonEmail"
                    value={formData.contactPersonEmail}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="contact@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Contact Phone *</label>
                  <input
                    type="tel"
                    name="contactPersonPhone"
                    value={formData.contactPersonPhone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="Enter contact phone"
                  />
                </div>
              </div>
            </section>

            {/* Internship Details */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                Internship Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Internship Title *</label>
                  <input
                    type="text"
                    name="internshipTitle"
                    value={formData.internshipTitle}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="e.g., Software Development Intern"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Department *</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="e.g., IT, Marketing, HR"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Internship Type *</label>
                  <select
                    name="internshipType"
                    value={formData.internshipType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                  >
                    <option value="">Select Type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="project-based">Project-based</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Duration *</label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
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
                  <label className="block text-sm font-medium text-gray-200 mb-2">Expected Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Number of Positions *</label>
                  <input
                    type="number"
                    name="numberOfPositions"
                    value={formData.numberOfPositions}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="Enter number of positions"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Work Mode *</label>
                  <select
                    name="workMode"
                    value={formData.workMode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                  >
                    <option value="">Select Work Mode</option>
                    <option value="office">Office</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Working Hours</label>
                  <input
                    type="text"
                    name="workingHours"
                    value={formData.workingHours}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="e.g., 9 AM - 5 PM"
                  />
                </div>
              </div>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                Requirements
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Required Skills *</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {skillsOptions.map(skill => (
                      <label key={skill} className="flex items-center space-x-2 text-gray-300 cursor-pointer hover:text-white transition">
                        <input
                          type="checkbox"
                          checked={formData.requiredSkills.includes(skill)}
                          onChange={() => handleMultiSelect('requiredSkills', skill)}
                          className="rounded border-white/20 bg-white/5 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Preferred Course/Degree</label>
                    <div className="space-y-2">
                      {coursesOptions.map(course => (
                        <label key={course} className="flex items-center space-x-2 text-gray-300 cursor-pointer hover:text-white transition">
                          <input
                            type="checkbox"
                            checked={formData.preferredCourse.includes(course)}
                            onChange={() => handleMultiSelect('preferredCourse', course)}
                            className="rounded border-white/20 bg-white/5 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="text-sm">{course}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Minimum CGPA</label>
                      <input
                        type="text"
                        name="minimumCGPA"
                        value={formData.minimumCGPA}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                        placeholder="e.g., 7.0 or 70%"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Year of Study</label>
                      <div className="space-y-2">
                        {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Post Graduate'].map(year => (
                          <label key={year} className="flex items-center space-x-2 text-gray-300 cursor-pointer hover:text-white transition">
                            <input
                              type="checkbox"
                              checked={formData.yearOfStudy.includes(year)}
                              onChange={() => handleMultiSelect('yearOfStudy', year)}
                              className="rounded border-white/20 bg-white/5 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-sm">{year}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Compensation & Benefits */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                Compensation & Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Monthly Stipend *</label>
                  <select
                    name="stipend"
                    value={formData.stipend}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                  >
                    <option value="">Select Stipend Range</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="5000-10000">₹5,000 - ₹10,000</option>
                    <option value="10000-20000">₹10,000 - ₹20,000</option>
                    <option value="20000-30000">₹20,000 - ₹30,000</option>
                    <option value="30000+">₹30,000+</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Additional Benefits</label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-gray-300">
                        <input
                          type="checkbox"
                          name="providesAccommodation"
                          checked={formData.providesAccommodation === 'yes'}
                          onChange={(e) => setFormData(prev => ({...prev, providesAccommodation: e.target.checked ? 'yes' : ''}))}
                          className="rounded border-white/20 bg-white/5 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm">Accommodation</span>
                      </label>
                      <label className="flex items-center space-x-2 text-gray-300">
                        <input
                          type="checkbox"
                          name="providesMeals"
                          checked={formData.providesMeals === 'yes'}
                          onChange={(e) => setFormData(prev => ({...prev, providesMeals: e.target.checked ? 'yes' : ''}))}
                          className="rounded border-white/20 bg-white/5 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm">Meals</span>
                      </label>
                      <label className="flex items-center space-x-2 text-gray-300">
                        <input
                          type="checkbox"
                          name="providesTransport"
                          checked={formData.providesTransport === 'yes'}
                          onChange={(e) => setFormData(prev => ({...prev, providesTransport: e.target.checked ? 'yes' : ''}))}
                          className="rounded border-white/20 bg-white/5 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm">Transportation</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Job Description */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                Job Description & Learning Outcomes
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Job Description *</label>
                  <textarea
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="Describe the role, responsibilities, and day-to-day tasks..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Learning Outcomes</label>
                  <textarea
                    name="learningOutcomes"
                    value={formData.learningOutcomes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    placeholder="What will the intern learn from this opportunity?"
                  />
                </div>
              </div>
            </section>

            {/* Diversity & Inclusion */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                Diversity & Inclusion Preferences
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Welcome candidates from rural areas?</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                      <input
                        type="radio"
                        name="ruralCandidatesWelcome"
                        value="yes"
                        checked={formData.ruralCandidatesWelcome === 'yes'}
                        onChange={handleChange}
                        className="text-emerald-600 focus:ring-emerald-500 bg-white/5"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                      <input
                        type="radio"
                        name="ruralCandidatesWelcome"
                        value="no"
                        checked={formData.ruralCandidatesWelcome === 'no'}
                        onChange={handleChange}
                        className="text-emerald-600 focus:ring-emerald-500 bg-white/5"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Diversity Preferences</label>
                    <select
                        name="diversityPreferences"
                        value={formData.diversityPreferences}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                    >
                        <option value="">No Preference</option>
                        <option value="women">Encourage Women Candidates</option>
                        <option value="disability">Encourage Candidates with Disabilities</option>
                        <option value="lgbtq">Encourage LGBTQ+ Candidates</option>
                    </select>
                </div>
              </div>
            </section>

            {/* Company Verification */}
            <section>
                <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                    Company Verification
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Registration Number</label>
                        <input
                            type="text"
                            name="registrationNumber"
                            value={formData.registrationNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                            placeholder="e.g., U72900KA2008PTC045934"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">GST Number</label>
                        <input
                            type="text"
                            name="gstNumber"
                            value={formData.gstNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                            placeholder="e.g., 29ABCDE1234F1Z5"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">PAN Number</label>
                        <input
                            type="text"
                            name="panNumber"
                            value={formData.panNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                            placeholder="e.g., ABCDE1234F"
                        />
                    </div>
                </div>
            </section>

            {error && <p className="text-red-400 text-sm text-center py-4">{error}</p>}

            {/* Submit Button */}
            <div className="mt-8 text-center">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-slate-900 transition-all duration-300 transform hover:scale-105"
                >
                    {loading ? 'Submitting...' : 'Register and Post Internship'}
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}