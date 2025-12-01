import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import FilterSidebar from './components/FilterSidebar';
import ProgramCard from './components/ProgramCard';
import ProgramDetails from './components/ProgramDetails';
import ProgramSkeleton from './components/ProgramSkeleton';
import { MOCK_PROGRAMS } from './constants';
import { FilterState, Program } from './types';

type SortOption = 'relevance' | 'deadline_asc' | 'deadline_desc' | 'scholarship';

const App: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    deadlineStart: '',
    deadlineEnd: '',
    scholarshipAvailable: false,
    fullyFunded: false,
    phd: true,
    master: false,
    countrySearch: ''
  });

  const [searchQuery, setSearchQuery] = useState('PhD in Computational Neuroscience');
  const [sortOption, setSortOption] = useState<SortOption>('relevance');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  
  // Navigation State
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  // Loading and Data States
  const [isLoading, setIsLoading] = useState(true);
  const [displayedPrograms, setDisplayedPrograms] = useState<Program[]>([]);

  // Applied Programs State
  const [appliedProgramIds, setAppliedProgramIds] = useState<number[]>([]);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'deadline_asc', label: 'Deadline (Earliest First)' },
    { value: 'deadline_desc', label: 'Deadline (Latest First)' },
    { value: 'scholarship', label: 'Scholarship (Fully Funded First)' },
  ];

  // Load applied programs from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('phd_portal_applied_ids');
    if (saved) {
      try {
        setAppliedProgramIds(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse applied programs", e);
      }
    }
  }, []);

  const handleToggleApplied = (programId: number) => {
    setAppliedProgramIds(prev => {
      const newIds = prev.includes(programId)
        ? prev.filter(id => id !== programId)
        : [...prev, programId];
      
      localStorage.setItem('phd_portal_applied_ids', JSON.stringify(newIds));
      return newIds;
    });
  };

  // Close sort dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sortDropdownRef]);

  // Reset selected program when search changes to keep context (optional, but good UX often to stay on details or reset)
  useEffect(() => {
    if (searchQuery) {
       // Search logic usually resets view to list, but we'll keep it simple
    }
  }, [searchQuery]);

  // Async Filter and Sort logic
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase().trim();
      
      // 1. Filter by search query
      let result = MOCK_PROGRAMS;
      
      if (query) {
        const queryTokens = query.split(/\s+/).filter(Boolean);
        result = result.filter((program) => {
          const searchableText = `${program.title} ${program.university} ${program.country} ${program.degreeType}`.toLowerCase();
          return queryTokens.every(token => searchableText.includes(token));
        });
      }

      // 2. Filter by sidebar options
      result = result.filter(program => {
        // Degree Type
        const degreeMatch = (filters.phd && program.degreeType === 'PhD') || 
                            (filters.master && (program.degreeType === 'MSc' || program.degreeType === 'Master'));
        
        if ((filters.phd || filters.master) && !degreeMatch) return false;

        // Scholarship
        if (filters.scholarshipAvailable && program.scholarshipStatus !== 'Scholarship Available' && program.scholarshipStatus !== 'Fully Funded') return false;
        if (filters.fullyFunded && program.scholarshipStatus !== 'Fully Funded') return false;

        // Country
        if (filters.countrySearch && !program.country.toLowerCase().includes(filters.countrySearch.toLowerCase())) return false;

        // Date Range Filtering
        if (filters.deadlineStart || filters.deadlineEnd) {
          const programDate = new Date(program.deadline);
          
          if (filters.deadlineStart) {
            const startDate = new Date(filters.deadlineStart + 'T00:00:00');
            if (programDate < startDate) return false;
          }

          if (filters.deadlineEnd) {
            const endDate = new Date(filters.deadlineEnd + 'T23:59:59');
            if (programDate > endDate) return false;
          }
        }

        return true;
      });

      // 3. Sort results
      result = [...result];

      switch (sortOption) {
        case 'deadline_asc':
          result.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
          break;
        case 'deadline_desc':
          result.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());
          break;
        case 'scholarship':
          result.sort((a, b) => {
            const getScore = (status: string | null) => {
              if (status === 'Fully Funded') return 2;
              if (status === 'Scholarship Available') return 1;
              return 0;
            };
            return getScore(b.scholarshipStatus) - getScore(a.scholarshipStatus);
          });
          break;
        default:
          result.sort((a, b) => a.id - b.id);
          break;
      }

      setDisplayedPrograms(result);
      setIsLoading(false);
    }, 800); 

    return () => clearTimeout(timer);
  }, [searchQuery, sortOption, filters]);

  const clearSearch = () => setSearchQuery('');

  const getSortLabel = (option: SortOption) => {
    return sortOptions.find(o => o.value === option)?.label || 'Relevance';
  };

  const handleSaveSearch = () => {
    const name = window.prompt("Enter a name to save this search:");
    if (!name || name.trim() === "") return;

    try {
      const savedSearch = {
        id: Date.now(),
        name: name.trim(),
        searchQuery,
        filters,
        timestamp: new Date().toISOString()
      };

      const existingSearchesJSON = localStorage.getItem('phd_portal_saved_searches');
      const existingSearches = existingSearchesJSON ? JSON.parse(existingSearchesJSON) : [];
      
      const newSearches = [...existingSearches, savedSearch];
      localStorage.setItem('phd_portal_saved_searches', JSON.stringify(newSearches));
      
      alert(`Search "${name}" has been saved successfully!`);
    } catch (e) {
      console.error("Error saving search:", e);
      alert("There was an error saving your search.");
    }
  };

  const handleProgramClick = (program: Program) => {
    setSelectedProgram(program);
    window.scrollTo(0, 0);
  };

  const handleBackToResults = () => {
    setSelectedProgram(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark font-display">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        programs={MOCK_PROGRAMS}
      />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedProgram ? (
          // Detailed View
          <ProgramDetails 
            program={selectedProgram} 
            onBack={handleBackToResults} 
            isApplied={appliedProgramIds.includes(selectedProgram.id)}
            onToggleApplied={() => handleToggleApplied(selectedProgram.id)}
          />
        ) : (
          // List View
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Sidebar */}
            <FilterSidebar filters={filters} onFilterChange={setFilters} />

            {/* Right Column: Search Results */}
            <div className="w-full lg:w-3/4 xl:w-4/5">
              
              {/* Mobile Search Bar (Hidden on Desktop) */}
              <div className="mb-6 md:hidden">
                <label className="flex flex-col min-w-40 h-12 w-full mb-4">
                  <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
                    <div className="text-gray-500 flex border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark items-center justify-center pl-4 rounded-l-xl border-r-0">
                      <span className="material-symbols-outlined">search</span>
                    </div>
                    <input 
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary border-y border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark h-full placeholder:text-gray-400 px-4 pl-2 text-base" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for programs..."
                    />
                    <div className="flex items-center justify-center rounded-r-xl border-l-0 border-y border-r border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark pr-4">
                      {searchQuery && (
                        <button 
                          onClick={clearSearch}
                          className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-transparent text-gray-500 gap-2 text-base font-bold h-auto min-w-0 px-0 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                          aria-label="Clear search"
                        >
                          <span className="material-symbols-outlined">close</span>
                        </button>
                      )}
                    </div>
                  </div>
                </label>
              </div>
              
              {/* Heading & Stats */}
              <div className="mb-6">
                <div className="flex flex-wrap justify-between gap-3 items-end">
                  <div className="flex min-w-72 flex-col gap-1">
                    {isLoading ? (
                      <div className="h-9 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
                    ) : (
                      <p className="text-3xl font-black tracking-tighter">
                        Showing {displayedPrograms.length} program{displayedPrograms.length !== 1 ? 's' : ''}
                      </p>
                    )}
                    <p className="text-gray-500 dark:text-gray-400 text-base">Based on your search</p>
                  </div>
                </div>
              </div>

              {/* Sort Chips & Actions */}
              <div className="flex gap-3 pb-4 border-b border-border-light dark:border-border-dark mb-6 overflow-x-auto overflow-y-visible items-center">
                
                {/* Dropdown Sort Button */}
                <div className="relative" ref={sortDropdownRef}>
                  <button 
                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                    className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary/20 text-primary-darker dark:text-primary dark:bg-primary/30 pl-4 pr-2 hover:bg-primary/30 transition-colors cursor-pointer"
                    aria-haspopup="true"
                    aria-expanded={isSortDropdownOpen}
                    id="sort-menu-button"
                  >
                    <p className="text-sm font-medium whitespace-nowrap">Sort by: {getSortLabel(sortOption)}</p>
                    <span className="material-symbols-outlined !text-xl">arrow_drop_down</span>
                  </button>
                  
                  {isSortDropdownOpen && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-72 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg shadow-xl z-20 py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="sort-menu-button"
                    >
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortOption(option.value);
                            setIsSortDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between group ${
                            sortOption === option.value 
                              ? 'bg-primary/5 text-primary' 
                              : 'text-text-light dark:text-text-dark'
                          }`}
                          role="menuitem"
                        >
                          <span className={sortOption === option.value ? 'font-bold' : ''}>
                            {option.label}
                          </span>
                          {sortOption === option.value && (
                            <span className="material-symbols-outlined text-base">check</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Static Quick Filters */}
                <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-border-light dark:bg-border-dark hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors pl-4 pr-2">
                  <p className="text-sm font-medium whitespace-nowrap">All Deadlines</p>
                  <span className="material-symbols-outlined !text-xl">arrow_drop_down</span>
                </button>
                <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-border-light dark:bg-border-dark hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors pl-4 pr-2">
                  <p className="text-sm font-medium whitespace-nowrap">Scholarship Status</p>
                  <span className="material-symbols-outlined !text-xl">arrow_drop_down</span>
                </button>

                {/* Save Search Button */}
                <button 
                  onClick={handleSaveSearch}
                  className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-primary text-primary hover:bg-primary/5 transition-colors pl-3 pr-3 ml-auto"
                  title="Save this search"
                >
                   <span className="material-symbols-outlined !text-[20px]">bookmark_add</span>
                   <span className="text-sm font-medium whitespace-nowrap">Save Search</span>
                </button>
              </div>

              {/* Program Cards List */}
              <div className="space-y-4">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, idx) => (
                    <ProgramSkeleton key={idx} />
                  ))
                ) : displayedPrograms.length > 0 ? (
                  displayedPrograms.map(program => (
                    <ProgramCard 
                      key={program.id} 
                      program={program} 
                      onClick={handleProgramClick}
                      isApplied={appliedProgramIds.includes(program.id)}
                      onToggleApplied={() => handleToggleApplied(program.id)}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 flex flex-col items-center">
                    <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">search_off</span>
                    <p className="text-xl font-medium text-gray-500 dark:text-gray-400">No programs found matching your search.</p>
                    <button 
                      onClick={clearSearch}
                      className="mt-4 text-primary font-bold hover:underline"
                    >
                      Clear search filters
                    </button>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {!isLoading && displayedPrograms.length > 0 && (
                <nav aria-label="Pagination" className="flex items-center justify-between border-t border-border-light dark:border-border-dark mt-8 pt-4">
                  <div className="hidden sm:block">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(displayedPrograms.length, 10)}</span> of <span className="font-medium">{displayedPrograms.length}</span> results
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
              )}

            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;