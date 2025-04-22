import React, { useState, useEffect } from 'react';
import { Bell, Menu, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface TopBarProps {
  toggleSidebar: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <header className="bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden md:block ml-4">
              <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:block mr-6">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{format(currentDateTime, 'EEEE, MMMM d, yyyy')}</span>
                <span className="ml-2 text-gray-500">{format(currentDateTime, 'h:mm:ss a')}</span>
              </div>
            </div>
            
            <div className="ml-3 relative">
              <div>
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-1 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 relative"
                >
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                </button>
              </div>
              {isNotificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-700">Notifications</p>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="px-4 py-3 border-b border-gray-200 hover:bg-gray-50">
                        <p className="text-sm font-medium text-gray-900">New task assigned</p>
                        <p className="text-xs text-gray-500 mt-1">Check feeding schedule for dairy cows</p>
                        <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                      </div>
                      <div className="px-4 py-3 border-b border-gray-200 hover:bg-gray-50">
                        <p className="text-sm font-medium text-gray-900">Weather alert</p>
                        <p className="text-xs text-gray-500 mt-1">Heavy rain expected tomorrow</p>
                        <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50">
                        <p className="text-sm font-medium text-gray-900">Inventory update</p>
                        <p className="text-xs text-gray-500 mt-1">Feed stock running low</p>
                        <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-2">
                      <a href="#" className="text-xs text-green-600 hover:text-green-500">View all notifications</a>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="ml-3 relative">
              <div>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.profilePhoto || "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg"}
                    alt="Profile"
                  />
                  <span className="hidden md:block ml-2 text-sm font-medium text-gray-700">
                    {user?.name || "User"}
                  </span>
                </button>
              </div>
              {isProfileMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <Settings className="mr-3 h-4 w-4" />
                        Settings
                      </div>
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <LogOut className="mr-3 h-4 w-4" />
                        Sign out
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;