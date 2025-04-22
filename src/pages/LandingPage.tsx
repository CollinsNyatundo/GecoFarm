import React from 'react';
import { Link } from 'react-router-dom';
import { Car as Farm, Users, BarChart4, Leaf } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Farm size={32} />
            <span className="text-2xl font-bold">Geco Farm</span>
          </div>
          <div className="space-x-4">
            <Link to="/login" className="px-4 py-2 rounded hover:bg-green-700 transition">Login</Link>
            <Link to="/register" className="px-4 py-2 bg-white text-green-800 rounded font-semibold hover:bg-gray-100 transition">Register</Link>
          </div>
        </nav>
        
        <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 flex flex-col items-start">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Smart Farm Management System
            </h1>
            <p className="text-xl mb-8">
              Streamline your farm operations, track tasks, and boost productivity with our comprehensive management solution.
            </p>
            <Link 
              to="/register" 
              className="px-8 py-3 bg-white text-green-800 rounded-full font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105 duration-200"
            >
              Get Started
            </Link>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <img 
              src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Farm" 
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Users size={30} className="text-green-700" />
              </div>
              <h3 className="text-xl font-bold mb-4">Employee Management</h3>
              <p className="text-gray-600">Track roles, assignments, and performance of your farm staff efficiently.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <BarChart4 size={30} className="text-green-700" />
              </div>
              <h3 className="text-xl font-bold mb-4">Financial Tracking</h3>
              <p className="text-gray-600">Monitor income, expenses, and profit margins with intuitive charts and analytics.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Leaf size={30} className="text-green-700" />
              </div>
              <h3 className="text-xl font-bold mb-4">Crop & Livestock</h3>
              <p className="text-gray-600">Manage all aspects of crop production and livestock care in one place.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 bg-green-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your farm management?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Join hundreds of farms that have optimized their operations with our system.
          </p>
          <Link 
            to="/register" 
            className="px-8 py-3 bg-white text-green-800 rounded-full font-bold text-lg hover:bg-gray-100 inline-block transition transform hover:scale-105 duration-200"
          >
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <Farm size={24} />
                <span className="text-xl font-bold">Geco Farm</span>
              </div>
              <p className="text-gray-400 max-w-xs">
                The complete solution for digital farm management and optimization.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Testimonials</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Support</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between">
            <p className="text-gray-400 text-sm">© 2025 Geco Farm. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition mr-4">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;