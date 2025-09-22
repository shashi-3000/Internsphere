import React from 'react';
import img from "../assets/profilebg.jpg"; 


const BrainCircuitIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.3 1.08 2.87.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z"/></svg>
);
const ScaleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 0 0 9-9h-9v9Z"/><path d="M12 3a9 9 0 0 0-9 9h9V3Z"/></svg>
);
const TargetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);


export default function About() {
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

        
        <div className="relative max-w-5xl mx-auto py-20 px-6">
            
            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-400 leading-tight">
                    About InternSphere
                </h1>
                <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                    An intelligent, automated system designed to solve the challenge of internship placements at scale, directly addressing the goals of the PM Internship Scheme.
                </p>
            </div>

            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 mb-12">
                <h2 className="text-3xl font-bold text-center text-white mb-6">The Challenge</h2>
                <p className="text-gray-300 text-center leading-relaxed">
                    The PM Internship Scheme is a vital initiative for providing students with industry exposure. However, the manual process of matching thousands of applicants to suitable opportunities is a significant challenge, often leading to **suboptimal selections and delays**. This is the problem InternSphere is built to solve.
                </p>
            </div>

            
            <h2 className="text-3xl font-bold text-center text-white mb-8">Our Solution: A Smart, Automated System</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center mb-12">
                <div className="bg-white/5 p-6 rounded-lg">
                    <div className="flex justify-center text-emerald-400 mb-4"><BrainCircuitIcon /></div>
                    <h3 className="text-xl font-semibold text-white mb-2">Intelligent Matchmaking</h3>
                    <p className="text-gray-400 text-sm">Our AI/ML engine performs a holistic analysis based on **skills, qualifications, sector interests, and location preferences** to find the true best fit for every student.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg">
                    <div className="flex justify-center text-emerald-400 mb-4"><ScaleIcon /></div>
                    <h3 className="text-xl font-semibold text-white mb-2">Fairness & Inclusivity</h3>
                    <p className="text-gray-400 text-sm">The system is designed to promote **affirmative action**, accounting for representation from rural/aspirational districts and different social categories to ensure equitable opportunities.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg">
                    <div className="flex justify-center text-emerald-400 mb-4"><TargetIcon /></div>
                    <h3 className="text-xl font-semibold text-white mb-2">Capacity Aware</h3>
                    <p className="text-gray-400 text-sm">Our allocation algorithm respects the **internship capacity** of each industry, preventing over-subscription and ensuring a realistic and stable set of matches.</p>
                </div>
            </div>
            
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 mb-12">
                <h2 className="text-3xl font-bold text-center text-white mb-6">How It Works</h2>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                    <div className="text-center p-4">
                        <div className="text-5xl font-bold text-emerald-400">1</div>
                        <h3 className="text-xl font-semibold mt-2">Score</h3>
                        <p className="text-gray-400 mt-1 text-sm">Our engine analyzes every student against every internship, calculating a detailed compatibility score.</p>
                    </div>
                    <div className="text-gray-500 text-2xl">→</div>
                    <div className="text-center p-4">
                        <div className="text-5xl font-bold text-emerald-400">2</div>
                        <h3 className="text-xl font-semibold mt-2">Allocate</h3>
                        <p className="text-gray-400 mt-1 text-sm">The Gale-Shapley algorithm finds the single best "Top Match" for every student, ensuring a fair and stable outcome for the whole system.</p>
                    </div>
                    <div className="text-gray-500 text-2xl">→</div>
                    <div className="text-center p-4">
                        <div className="text-5xl font-bold text-emerald-400">3</div>
                        <h3 className="text-xl font-semibold mt-2">Empower Choice</h3>
                        <p className="text-gray-400 mt-1 text-sm">We present the AI's allocation as a powerful "Top Match" recommendation, giving students the final choice to accept or apply to other roles.</p>
                    </div>
                </div>
            </div>

            
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Our Technology</h2>
                <div className="flex justify-center gap-4 flex-wrap">
                    <span className="bg-sky-500/20 text-sky-300 px-4 py-2 rounded-full text-sm font-medium">React.js</span>
                    <span className="bg-sky-500/20 text-sky-300 px-4 py-2 rounded-full text-sm font-medium">Node.js</span>
                    <span className="bg-sky-500/20 text-sky-300 px-4 py-2 rounded-full text-sm font-medium">Express.js</span>
                    <span className="bg-sky-500/20 text-sky-300 px-4 py-2 rounded-full text-sm font-medium">MongoDB</span>
                    <span className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium">Python</span>
                    <span className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium">Flask</span>
                    <span className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium">Scikit-learn</span>
                </div>
            </div>
        </div>
    </section>
  );
}