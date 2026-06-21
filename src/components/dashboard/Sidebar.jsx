import React from 'react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full flex flex-col p-6 fixed left-0 top-0 z-20">
      <div className="mb-8 cursor-pointer text-gray-800" data-testid="sidebar-hamburger">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </div>

      <div className="flex flex-col items-center mb-8 border-b border-gray-200 pb-8">
        <div className="w-16 h-16 rounded-full bg-gray-200 mb-4 overflow-hidden" data-testid="sidebar-profile-img">
          {/* Placeholder for Profile Picture */}
          <img src="https://ui-avatars.com/api/?name=Mudassar&background=random" alt="Mudassar" className="w-full h-full object-cover" />
        </div>
        <h3 className="font-semibold text-gray-800 text-sm" data-testid="sidebar-profile-name">Mudassar</h3>
        <p className="text-xs text-gray-500 mt-1" data-testid="sidebar-profile-email">mudassardurvaish@gmail.com</p>
      </div>

      <nav className="flex-1">
        <a href="#mytasks" className="flex items-center gap-3 bg-[#f4f5f7] text-black px-4 py-3 rounded-md font-medium text-sm" data-testid="sidebar-nav-mytasks">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 11 12 14 22 4"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
          My Tasks
        </a>
      </nav>
    </aside>
  );
}
