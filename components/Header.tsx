import React from 'react';
import { PROFILE_IMAGE } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark px-6 lg:px-10 py-3 bg-surface-light dark:bg-surface-dark sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 text-text-light dark:text-text-dark">
          <div className="size-6 text-primary-darker dark:text-primary">
            <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm-1 9.13L3.14 8.24 12 4.36 20.86 8.24 12 12.13zM12 14.47l-9-4.91v4.76L12 19l9-4.68v-4.76l-9 4.91z"></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold tracking-tight">PhD Portal</h2>
        </div>
      </div>
      <div className="flex flex-1 justify-end gap-6 items-center">
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-sm font-medium hover:text-primary dark:hover:text-primary" href="#">Home</a>
          <a className="text-sm font-medium hover:text-primary dark:hover:text-primary" href="#">About</a>
          <a className="text-sm font-medium hover:text-primary dark:hover:text-primary" href="#">Contact</a>
        </nav>
        <div className="flex gap-2">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-[0.015em] hover:bg-opacity-90 transition-colors">
            <span className="truncate">Log In</span>
          </button>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark text-sm font-bold tracking-[0.015em] border border-border-light dark:border-border-dark hover:bg-border-light dark:hover:bg-border-dark transition-colors">
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