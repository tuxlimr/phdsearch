import React from 'react';
import { FilterState } from '../types';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.checked });
  };

  const clearAll = () => {
    onFilterChange({
      deadlineStart: '',
      deadlineEnd: '',
      scholarshipAvailable: false,
      fullyFunded: false,
      phd: true,
      master: false,
      countrySearch: ''
    });
  };

  return (
    <aside className="w-full lg:w-1/4 xl:w-1/5">
      <div className="sticky top-24">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-text-light dark:text-text-dark">Filters</h3>
          <button 
            onClick={clearAll}
            className="text-sm font-medium text-primary hover:underline bg-transparent border-none cursor-pointer"
          >
            Clear all
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Application Deadline Filter (Date Range) */}
          <div>
            <h4 className="font-bold mb-3 text-text-light dark:text-text-dark">Application Deadline</h4>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="deadlineStart" className="text-xs font-medium text-gray-500 dark:text-gray-400">From</label>
                <input 
                  type="date" 
                  id="deadlineStart"
                  name="deadlineStart" 
                  value={filters.deadlineStart}
                  onChange={handleTextChange}
                  className="form-input block w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark text-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="deadlineEnd" className="text-xs font-medium text-gray-500 dark:text-gray-400">To</label>
                <input 
                  type="date" 
                  id="deadlineEnd"
                  name="deadlineEnd" 
                  value={filters.deadlineEnd}
                  onChange={handleTextChange}
                  className="form-input block w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark text-sm focus:border-primary focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Scholarship Filter */}
          <div>
            <h4 className="font-bold mb-3 text-text-light dark:text-text-dark">Scholarship Status</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="scholarshipAvailable"
                  checked={filters.scholarshipAvailable}
                  onChange={handleCheckboxChange}
                  className="form-checkbox rounded text-primary-darker focus:ring-primary-darker" 
                />
                <span>Scholarship available</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                   type="checkbox" 
                   name="fullyFunded"
                   checked={filters.fullyFunded}
                   onChange={handleCheckboxChange}
                   className="form-checkbox rounded text-primary-darker focus:ring-primary-darker" 
                />
                <span>Fully funded</span>
              </label>
            </div>
          </div>

          {/* Degree Type Filter */}
          <div>
            <h4 className="font-bold mb-3 text-text-light dark:text-text-dark">Degree Type</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="phd"
                  checked={filters.phd}
                  onChange={handleCheckboxChange}
                  className="form-checkbox rounded text-primary-darker focus:ring-primary-darker" 
                />
                <span>PhD</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                   type="checkbox" 
                   name="master"
                   checked={filters.master}
                   onChange={handleCheckboxChange}
                   className="form-checkbox rounded text-primary-darker focus:ring-primary-darker" 
                />
                <span>Master</span>
              </label>
            </div>
          </div>

          {/* Country Filter */}
          <div>
            <h4 className="font-bold mb-3 text-text-light dark:text-text-dark">Country</h4>
            <label className="flex flex-col min-w-40 h-10 w-full">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div className="text-text-light dark:text-text-dark flex border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark items-center justify-center pl-3 rounded-l-lg border-r-0">
                  <span className="material-symbols-outlined !text-xl">search</span>
                </div>
                <input 
                  name="countrySearch"
                  value={filters.countrySearch}
                  onChange={handleTextChange}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-1 focus:ring-primary border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-full placeholder:text-gray-400 px-2 text-sm" 
                  placeholder="Search country..." 
                />
              </div>
            </label>
          </div>
        </div>
        
        <button className="mt-6 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary-darker text-white text-sm font-bold tracking-[0.015em] hover:bg-opacity-90 transition-colors">
          <span className="truncate">Apply Filters</span>
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;