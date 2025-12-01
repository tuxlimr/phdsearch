import React, { useState, useMemo, useRef, useEffect } from 'react';
import { PROFILE_IMAGE } from '../constants';
import { Program } from '../types';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  programs: Program[];
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, programs }) => {
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleClear = () => setSearchQuery('');

  // Close suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchContainerRef]);

  // Generate autocomplete suggestions based on query
  const suggestions = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query || query.length < 2) return [];

    const uniqueSuggestions = new Set<string>();

    programs.forEach(program => {
      // Add matching titles
      if (program.title.toLowerCase().includes(query)) {
        uniqueSuggestions.add(program.title);
      }
      // Add matching universities
      if (program.university.toLowerCase().includes(query)) {
        uniqueSuggestions.add(program.university);
      }
      // Add matching countries
      if (program.country.toLowerCase().includes(query)) {
        uniqueSuggestions.add(program.country);
      }
    });

    // Return top 5 matches
    return Array.from(uniqueSuggestions).slice(0, 5);
  }, [searchQuery, programs]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setIsFocused(false);
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark px-6 lg:px-10 py-3 bg-surface-light dark:bg-surface-dark sticky top-0 z-50 gap-4">
      <div className="flex items-center gap-8 shrink-0">
        <a href="#" className="flex items-center gap-3 text-text-light dark:text-text-dark hover:opacity-80 transition-opacity">
          <div className="size-6 text-primary-darker dark:text-primary">
            <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm-1 9.13L3.14 8.24 12 4.36 20.86 8.24 12 12.13zM12 14.47l-9-4.91v4.76L12 19l9-4.68v-4.76l-9 4.91z"></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold tracking-tight hidden sm:block">PhD Portal</h2>
        </a>
      </div>

      {/* Desktop Search Bar */}
      <div className="hidden md:flex flex-1 max-w-xl mx-4">
        <div className="relative w-full group" ref={searchContainerRef}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-gray-400 text-[20px]">search</span>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-10 py-2 border border-border-light dark:border-border-dark rounded-lg leading-5 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm transition-all"
            placeholder="Search programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
          />
          {searchQuery && (
            <button
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Clear search"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}

          {/* Autocomplete Dropdown */}
          {isFocused && suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-1 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg shadow-lg overflow-hidden z-50">
              <ul className="py-1">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <span className="material-symbols-outlined text-[16px] text-gray-400">search</span>
                      <span className="truncate">{suggestion}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-6 items-center shrink-0">
        <nav className="hidden lg:flex items-center gap-8">
          <a className="text-sm font-medium hover:text-primary dark:hover:text-primary" href="#">Home</a>
          <a className="text-sm font-medium hover:text-primary dark:hover:text-primary" href="#">About</a>
          <a className="text-sm font-medium hover:text-primary dark:hover:text-primary" href="#">Contact</a>
        </nav>
        <div className="flex gap-2">
          <button className="hidden sm:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-[0.015em] hover:bg-opacity-90 transition-colors">
            <span className="truncate">Log In</span>
          </button>
          <button className="hidden sm:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark text-sm font-bold tracking-[0.015em] border border-border-light dark:border-border-dark hover:bg-border-light dark:hover:bg-border-dark transition-colors">
            <span className="truncate">Sign Up</span>
          </button>
        </div>
        <div 
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" 
          role="img"
          aria-label="User profile picture"
          style={{ backgroundImage: `url("${PROFILE_IMAGE}")` }}
        ></div>
      </div>
    </header>
  );
};

export default Header;