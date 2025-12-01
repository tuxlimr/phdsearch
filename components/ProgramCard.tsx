import React from 'react';
import { Program } from '../types';

interface ProgramCardProps {
  program: Program;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const isFullyFunded = program.scholarshipStatus === 'Fully Funded';
  
  return (
    <div className="p-5 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Application Deadline: {program.deadline}</p>
            <p className="text-lg font-bold text-text-light dark:text-text-dark">{program.title}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{program.university}, {program.country} • {program.degreeType}</p>
          </div>
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
        </div>
        <div 
          className="w-40 h-28 bg-center bg-no-repeat bg-cover rounded-lg flex-shrink-0" 
          role="img"
          aria-label={`${program.university} campus`}
          style={{ backgroundImage: `url("${program.imageUrl}")` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgramCard;