import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Sidebar from '../components/Sidebar';
import TasksList from '../components/TasksList';
import WeatherWidget from '../components/WeatherWidget';
import FinanceChart from '../components/FinanceChart';
import CurrentSeason from '../components/CurrentSeason';

const AdminDashboard: React.FC = () => {
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
            <Route path="/" element={<AdminDashboardHome />} />
            <Route path="/users" element={<div>Employees Management</div>} />
            <Route path="/tasks" element={<div>Tasks Management</div>} />
            <Route path="/finances" element={<div>Finances</div>} />
            <Route path="/products" element={<div>Products</div>} />
            <Route path="/crops" element={<div>Crops</div>} />
            <Route path="/livestock" element={<div>Livestock</div>} />
            <Route path="/reports" element={<div>Reports</div>} />
            <Route path="/settings" element={<div>Settings</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const AdminDashboardHome: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the farm management system</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FinanceChart type="line" title="Financial Overview" />
        </div>
        <div>
          <WeatherWidget />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <TasksList isAdmin={true} />
        </div>
        <div>
          <div className="mb-6">
            <CurrentSeason />
          </div>
          <FinanceChart type="pie" title="Product Distribution" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;