// // src/pages/Login.jsx
// import { useState } from 'react';

// export default function Login() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle login logic here
//     console.log('Login data:', formData);
//   };

//   return (
//     <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 min-h-screen flex items-center justify-center px-6">
//       <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 w-full max-w-md">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-400">
//             Welcome Back
//           </h1>
//           <p className="text-gray-300 mt-2">Sign in to your account</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-200 mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-200 mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
//               placeholder="Enter your password"
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
//               />
//               <label className="ml-2 block text-sm text-gray-300">
//                 Remember me
//               </label>
//             </div>

//             <div className="text-sm">
//               <a href="#" className="text-emerald-400 hover:text-emerald-300">
//                 Forgot password?
//               </a>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-lg transition"
//           >
//             Sign In
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-gray-300">
//             Don't have an account?{' '}
//             <a href="/signup" className="text-emerald-400 hover:text-emerald-300 font-medium">
//               Sign up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // 1. Import the useAuth hook
import { Link } from 'react-router-dom';      // 2. Import Link for navigation

export default function Login() {
    const { login } = useAuth(); // 3. Get the login function from our context
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // 4. Implement the API call on submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(formData);
            // Navigation is handled automatically inside the login function
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 min-h-screen flex items-center justify-center px-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-400">
                        Welcome Back
                    </h1>
                    <p className="text-gray-300 mt-2">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                            Email
                        </label>
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
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* 5. Display loading and error states */}
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-300">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link to="#" className="text-emerald-400 hover:text-emerald-300">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 text-white font-semibold rounded-lg shadow-lg transition"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-300">
                        Don't have an account?{' '}
                        {/* 6. Use Link for single-page navigation */}
                        <Link to="/signup" className="text-emerald-400 hover:text-emerald-300 font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}