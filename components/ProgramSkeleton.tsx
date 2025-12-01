import React from 'react';

const ProgramSkeleton: React.FC = () => {
  return (
    <div className="p-5 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark animate-pulse">
      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-1">
            {/* Deadline placeholder - matches text-sm */}
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            
            {/* Title placeholder - matches text-lg font-bold with vertical margins */}
            <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-3/4 my-1"></div>
            
            {/* University details placeholder - matches text-sm */}
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
          
          {/* Tag placeholder - matches rounded-full pill */}
          <div className="flex items-center gap-2">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
          </div>
        </div>
        
        {/* Image placeholder - exact dimensions w-40 h-28 */}
        <div className="w-40 h-28 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0"></div>
      </div>
    </div>
  );
};

export default ProgramSkeleton;