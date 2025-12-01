import React from 'react';
import { Program } from '../types';
import Tooltip from './Tooltip';

interface ProgramDetailsProps {
  program: Program;
  onBack: () => void;
  isApplied: boolean;
  onToggleApplied: () => void;
}

const ProgramDetails: React.FC<ProgramDetailsProps> = ({ program, onBack, isApplied, onToggleApplied }) => {
  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-300">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
        <button onClick={onBack} className="hover:text-primary transition-colors">Home</button>
        <span className="mx-2">/</span>
        <button onClick={onBack} className="hover:text-primary transition-colors">Search Results</button>
        <span className="mx-2">/</span>
        <span className="font-medium text-text-light dark:text-text-dark truncate max-w-xs sm:max-w-md">{program.title}</span>
      </nav>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8 border-b border-border-light dark:border-border-dark pb-8">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-black text-text-light dark:text-text-dark mb-2 tracking-tight">
            {program.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
            {program.university}
            {program.department && <span className="text-gray-400 font-normal">, {program.department}</span>}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Tooltip content="Proceed to the official university application portal">
            <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-darker text-white px-6 py-2.5 rounded-lg font-bold transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[20px]">assignment_add</span>
              Apply Now
            </button>
          </Tooltip>

          <Tooltip content={isApplied ? "Mark program as not applied" : "Mark program as applied"}>
             <button 
                onClick={onToggleApplied}
                className={`flex items-center justify-center gap-2 border px-4 py-2.5 rounded-lg font-bold transition-colors ${
                   isApplied 
                   ? 'bg-green-100 border-green-200 text-green-700 hover:bg-green-200 dark:bg-green-900/40 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-900/60'
                   : 'border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-900/20'
                }`}
             >
                <span className="material-symbols-outlined text-[20px]">
                   {isApplied ? 'check_circle' : 'check'}
                </span>
                {isApplied ? 'Applied' : 'Mark Applied'}
             </button>
          </Tooltip>
          
          <Tooltip content="Save this program to your dashboard">
            <button className="flex items-center justify-center gap-2 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 text-text-light dark:text-text-dark px-4 py-2.5 rounded-lg font-medium transition-colors">
              <span className="material-symbols-outlined text-[20px]">bookmark_border</span>
              Save
            </button>
          </Tooltip>

          <Tooltip content="Share via email or social media">
            <button className="flex items-center justify-center gap-2 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 text-text-light dark:text-text-dark px-4 py-2.5 rounded-lg font-medium transition-colors">
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
          </Tooltip>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Program Description */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6 shadow-sm">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">Program Description</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {program.description || "No description available for this program."}
            </p>
          </div>

          {/* Eligibility Requirements */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6 shadow-sm">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">Eligibility Requirements</h2>
            {program.eligibility ? (
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                {program.eligibility.map((item, index) => (
                  <li key={index} className="leading-relaxed pl-1">{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No eligibility criteria listed.</p>
            )}
          </div>

          {/* Application Deadlines */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">calendar_clock</span>
              <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Application Deadlines</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Early Bird Deadline Card */}
              {program.deadlines?.early && (
                <div className="relative overflow-hidden p-5 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 transition-all hover:shadow-md group">
                  <div className="absolute -top-2 -right-2 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                     <span className="material-symbols-outlined text-7xl text-blue-600">event_available</span>
                  </div>
                  <div className="relative z-10">
                    <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">Early Bird Deadline</p>
                    <p className="text-xl font-bold text-text-light dark:text-text-dark">{program.deadlines.early}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Recommended for scholarship consideration</p>
                  </div>
                </div>
              )}

              {/* Final Deadline Card */}
              <div className={`relative overflow-hidden p-5 rounded-xl transition-all hover:shadow-md group ${
                program.deadlines?.early 
                  ? 'bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-800' // Red if secondary
                  : 'bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700' // Neutral if only one
              }`}>
                <div className="absolute -top-2 -right-2 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                   <span className={`material-symbols-outlined text-7xl ${program.deadlines?.early ? 'text-red-600' : 'text-gray-400'}`}>event_busy</span>
                </div>
                <div className="relative z-10">
                  <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${program.deadlines?.early ? 'text-red-600 dark:text-red-400' : 'text-gray-500'}`}>
                    Final Deadline
                  </p>
                  <p className="text-xl font-bold text-text-light dark:text-text-dark">{program.deadline}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Applications close at 11:59 PM (Local Time)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Information & Scholarship Details (Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6 shadow-sm">
              <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-3">Fee Information</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {program.tuition || "Tuition information not available."}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Additional fees for health insurance and student activities may apply.
              </p>
            </div>
            
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6 shadow-sm">
              <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-3">Scholarship Details</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {program.scholarshipStatus === 'Fully Funded' 
                  ? "All admitted students are fully funded, which includes a tuition waiver and a competitive stipend for living expenses."
                  : program.scholarshipStatus === 'Scholarship Available'
                  ? "Various merit-based and need-based scholarships are available for qualified applicants. Separate application may be required."
                  : "Funding opportunities are limited. Students are encouraged to seek external funding."
                }
              </p>
            </div>
          </div>

        </div>

        {/* Right Sidebar: At a Glance */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6 shadow-sm">
            <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-6 border-b border-border-light dark:border-border-dark pb-4">At a Glance</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">school</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Degree Level</p>
                  <p className="font-semibold text-text-light dark:text-text-dark">{program.degreeType}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">hourglass_top</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Duration</p>
                  <p className="font-semibold text-text-light dark:text-text-dark">{program.duration || "N/A"}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">schedule</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Mode of Study</p>
                  <p className="font-semibold text-text-light dark:text-text-dark">{program.mode || "Full-time"}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">flag</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Start Date</p>
                  <p className="font-semibold text-text-light dark:text-text-dark">{program.startDate || "TBD"}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">location_on</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Location</p>
                  <p className="font-semibold text-text-light dark:text-text-dark">{program.location || program.country}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border-light dark:border-border-dark">
               <button className="w-full text-center text-primary font-bold hover:underline">
                 Visit University Website
               </button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default ProgramDetails;