import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import TaskDashboard from '../components/dashboard/TaskDashboard';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f9fafc] flex flex-col font-sans">
      {/* Main Content Area */}
      <div className="flex flex-1">
        <Sidebar />
        
        {/* Dashboard Content Container */}
        <main className="flex-1 ml-64 flex flex-col px-8 relative bg-[#f4f5f7] min-h-screen">
          <div className="flex-1">
            <TaskDashboard />
          </div>
          
          <footer 
            className="pb-8 pt-4 text-center text-xs text-gray-400" 
            data-testid="dashboard-footer"
          >
            © 2026
          </footer>
        </main>
      </div>
    </div>
  );
}
