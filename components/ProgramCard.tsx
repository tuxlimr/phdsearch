import React from 'react';
import { Program } from '../types';

interface ProgramCardProps {
  program: Program;
  onClick: (program: Program) => void;
  isApplied: boolean;
  onToggleApplied: () => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, onClick, isApplied, onToggleApplied }) => {
  const isFullyFunded = program.scholarshipStatus === 'Fully Funded';
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick(program);
  };

  const handleAppliedClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleApplied();
  }

  return (
    <div className={`group p-5 bg-surface-light dark:bg-surface-dark rounded-xl border transition-all duration-300 hover:shadow-lg hover:scale-[1.01] ${
      isApplied 
        ? 'border-green-500/50 dark:border-green-500/50 bg-green-50/10 dark:bg-green-900/10 shadow-sm' 
        : 'border-border-light dark:border-border-dark hover:border-primary/40 dark:hover:border-primary/40'
    }`}>
      <div className="flex items-start justify-between gap-6 relative">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Application Deadline: {program.deadline}</p>
              {isApplied && (
                 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 md:hidden">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Applied
                 </span>
              )}
            </div>
            
            <button 
              onClick={handleClick}
              className="text-left text-lg font-bold text-text-light dark:text-text-dark group-hover:text-primary dark:group-hover:text-primary transition-colors block mt-1 mb-1"
            >
              {program.title}
            </button>
            <div className="text-gray-500 dark:text-gray-400 text-sm flex flex-wrap gap-1 items-center">
              <button onClick={handleClick} className="hover:text-primary hover:underline transition-colors font-medium text-left">
                {program.university}
              </button>
              <span>, {program.country} • {program.degreeType}</span>
            </div>
            {program.duration && (
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
                Duration: {program.duration}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {program.scholarshipStatus && (
                <span 
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isFullyFunded 
                      ? 'bg-accent/20 text-accent-darker text-yellow-700 dark:text-yellow-500' 
                      : 'bg-secondary/20 text-secondary'
                  }`}
                >
                  {program.scholarshipStatus}
                </span>
              )}
            </div>
            
            {/* Desktop Action for Applied Status */}
            <button
               onClick={handleAppliedClick}
               className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-colors border ${
                 isApplied
                   ? 'bg-green-100 border-green-200 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-900/50'
                   : 'bg-transparent border-gray-300 text-gray-500 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800'
               }`}
               title={isApplied ? "Mark as not applied" : "Mark as applied"}
            >
               <span className="material-symbols-outlined text-[16px]">
                 {isApplied ? 'check_circle' : 'radio_button_unchecked'}
               </span>
               {isApplied ? 'Applied' : 'Mark Applied'}
            </button>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
           <button 
             onClick={handleClick}
             className="w-40 h-28 bg-center bg-no-repeat bg-cover rounded-lg flex-shrink-0 group-hover:opacity-90 group-hover:ring-2 group-hover:ring-primary/20 transition-all block border border-border-light dark:border-border-dark" 
             role="img"
             aria-label={`${program.university} campus`}
             style={{ backgroundImage: `url("${program.imageUrl}")` }}
           ></button>
           
           {/* Mobile Toggle Button (Below Image) */}
           <button
               onClick={handleAppliedClick}
               className={`md:hidden inline-flex items-center justify-center w-full py-1.5 rounded-md text-xs font-semibold transition-colors border ${
                 isApplied
                   ? 'bg-green-100 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300'
                   : 'bg-transparent border-gray-300 text-gray-500 dark:border-gray-600 dark:text-gray-400'
               }`}
            >
               {isApplied ? 'Applied' : 'Mark Applied'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;