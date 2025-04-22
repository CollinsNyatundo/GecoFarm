import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Sidebar from '../components/Sidebar';
import TasksList from '../components/TasksList';
import WeatherWidget from '../components/WeatherWidget';
import CurrentSeason from '../components/CurrentSeason';
import { useAuth } from '../contexts/AuthContext';

const EmployeeDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <TopBar toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route path="/" element={<EmployeeDashboardHome />} />
            <Route path="/tasks" element={<EmployeeTasks />} />
            <Route path="/weather" element={<div>Weather Forecast</div>} />
            <Route path="/profile" element={<div>My Profile</div>} />
            <Route path="/settings" element={<div>Settings</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const EmployeeDashboardHome: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Hello, {user?.name}</h1>
        <p className="text-gray-600">Here's what's happening on the farm today</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-5 mb-6">
            <h3 className="font-medium text-gray-700 mb-3">Your Role: {user?.role.position}</h3>
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <p className="text-green-800 text-sm">You're assigned to farm operations today. Check your tasks below.</p>
            </div>
          </div>
          <TasksList isAdmin={false} limit={3} />
        </div>
        <div>
          <div className="mb-6">
            <WeatherWidget />
          </div>
          <CurrentSeason />
        </div>
      </div>
      
      <div className="mt-6">
        <div className="bg-white rounded-lg shadow-md p-5">
          <h3 className="font-medium text-gray-700 mb-3">Farm Announcements</h3>
          <div className="border-l-4 border-blue-500 pl-4 mb-4">
            <h4 className="font-medium text-gray-800">New Irrigation Schedule</h4>
            <p className="text-sm text-gray-600 mt-1">
              The irrigation schedule for Field C has been updated. Please check the new timings.
            </p>
            <p className="text-xs text-gray-500 mt-1">Posted 2 days ago</p>
          </div>
          <div className="border-l-4 border-yellow-500 pl-4">
            <h4 className="font-medium text-gray-800">Equipment Maintenance</h4>
            <p className="text-sm text-gray-600 mt-1">
              Scheduled maintenance for tractors next Monday. Plan accordingly.
            </p>
            <p className="text-xs text-gray-500 mt-1">Posted 4 days ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmployeeTasks: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        <p className="text-gray-600">View and manage all your assigned tasks</p>
      </div>
      <TasksList isAdmin={false} />
    </div>
  );
};

export default EmployeeDashboard;