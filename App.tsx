import React, { useState } from 'react';
import Header from './components/Header';
import FilterSidebar from './components/FilterSidebar';
import ProgramCard from './components/ProgramCard';
import { MOCK_PROGRAMS } from './constants';
import { FilterState } from './types';

const App: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    deadline: '1_month',
    scholarshipAvailable: false,
    fullyFunded: false,
    phd: true,
    master: false,
    countrySearch: ''
  });

  const [searchQuery, setSearchQuery] = useState('PhD in Computational Neuroscience');

  // Logic to clear search
  const clearSearch = () => setSearchQuery('');

  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark font-display">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar */}
          <FilterSidebar filters={filters} onFilterChange={setFilters} />

          {/* Right Column: Search Results */}
          <div className="w-full lg:w-3/4 xl:w-4/5">
            
            {/* Search Bar & Heading */}
            <div className="mb-6">
              <label className="flex flex-col min-w-40 h-12 w-full mb-4">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
                  <div className="text-gray-500 flex border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark items-center justify-center pl-4 rounded-l-xl border-r-0">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input 
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary border-y border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark h-full placeholder:text-gray-400 px-4 pl-2 text-base" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="flex items-center justify-center rounded-r-xl border-l-0 border-y border-r border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark pr-4">
                    <button 
                      onClick={clearSearch}
                      className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-transparent text-gray-500 gap-2 text-base font-bold h-auto min-w-0 px-0"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                </div>
              </label>
              
              <div className="flex flex-wrap justify-between gap-3">
                <div className="flex min-w-72 flex-col gap-1">
                  <p className="text-3xl font-black tracking-tighter">Showing 250 programs</p>
                  <p className="text-gray-500 dark:text-gray-400 text-base">Based on your search</p>
                </div>
              </div>
            </div>

            {/* Sort Chips */}
            <div className="flex gap-3 pb-4 border-b border-border-light dark:border-border-dark mb-6 overflow-x-auto">
              <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary/20 text-primary-darker dark:text-primary dark:bg-primary/30 pl-4 pr-2">
                <p className="text-sm font-medium">Sort by: Relevance</p>
                <span className="material-symbols-outlined !text-xl">arrow_drop_down</span>
              </button>
              <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-border-light dark:bg-border-dark hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors pl-4 pr-2">
                <p className="text-sm font-medium">All Deadlines</p>
                <span className="material-symbols-outlined !text-xl">arrow_drop_down</span>
              </button>
              <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-border-light dark:bg-border-dark hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors pl-4 pr-2">
                <p className="text-sm font-medium">Scholarship Status</p>
                <span className="material-symbols-outlined !text-xl">arrow_drop_down</span>
              </button>
            </div>

            {/* Program Cards List */}
            <div className="space-y-4">
              {MOCK_PROGRAMS.map(program => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>

            {/* Pagination */}
            <nav aria-label="Pagination" className="flex items-center justify-between border-t border-border-light dark:border-border-dark mt-8 pt-4">
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">250</span> results
                </p>
              </div>
              <div className="flex flex-1 justify-between sm:justify-end">
                <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-surface-light dark:bg-surface-dark px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Previous
                </a>
                <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-surface-light dark:bg-surface-dark px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Next
                </a>
              </div>
            </nav>

          </div>
        </div>
      </main>
    </div>
  );
};

export default App;