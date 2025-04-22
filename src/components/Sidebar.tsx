import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Clipboard, 
  BarChart, 
  TrendingUp, 
  Leaf, 
  Droplet, 
  Settings,
  Calendar,
  Cloud
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const { isAdmin } = useAuth();
  
  const isAdmin_ = isAdmin();
  const adminRoutes = [
    { path: '/admin', name: 'Dashboard', icon: <Home size={20} /> },
    { path: '/admin/users', name: 'Employees', icon: <Users size={20} /> },
    { path: '/admin/tasks', name: 'Tasks', icon: <Clipboard size={20} /> },
    { path: '/admin/finances', name: 'Finances', icon: <BarChart size={20} /> },
    { path: '/admin/products', name: 'Products', icon: <TrendingUp size={20} /> },
    { path: '/admin/crops', name: 'Crops', icon: <Leaf size={20} /> },
    { path: '/admin/livestock', name: 'Livestock', icon: <Droplet size={20} /> },
    { path: '/admin/reports', name: 'Reports', icon: <Calendar size={20} /> },
    { path: '/admin/settings', name: 'Settings', icon: <Settings size={20} /> }
  ];
  
  const employeeRoutes = [
    { path: '/employee', name: 'Dashboard', icon: <Home size={20} /> },
    { path: '/employee/tasks', name: 'My Tasks', icon: <Clipboard size={20} /> },
    { path: '/employee/weather', name: 'Weather', icon: <Cloud size={20} /> },
    { path: '/employee/profile', name: 'My Profile', icon: <Users size={20} /> },
    { path: '/employee/settings', name: 'Settings', icon: <Settings size={20} /> }
  ];
  
  const routes = isAdmin_ ? adminRoutes : employeeRoutes;
  
  return (
    <div 
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0`}
    >
      <div className="h-full flex flex-col">
        <div className="px-4 py-6 bg-green-800 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Geco Farm</h2>
            <button 
              onClick={toggleSidebar}
              className="md:hidden rounded-md p-1 hover:bg-green-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-green-200 mt-1">
            {isAdmin_ ? 'Admin Panel' : 'Employee Portal'}
          </p>
        </div>
        
        <div className="py-4 flex-1 overflow-y-auto">
          <nav className="px-2 space-y-1">
            {routes.map((route) => {
              const isActive = location.pathname === route.path;
              return (
                <Link
                  key={route.path}
                  to={route.path}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-green-100 text-green-900'
                      : 'text-gray-700 hover:bg-green-50'
                  }`}
                >
                  <span className={`mr-3 ${isActive ? 'text-green-700' : 'text-gray-500 group-hover:text-green-600'}`}>
                    {route.icon}
                  </span>
                  {route.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="text-sm">
              <p className="font-medium text-gray-700">Current Season</p>
              <p className="text-gray-500">Planting Season 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;