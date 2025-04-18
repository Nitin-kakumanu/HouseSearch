import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home,
  ShoppingCart,
  DollarSign,
  Calendar,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Navbar = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { name: 'Buy', path: '/admin/buy', icon: <ShoppingCart size={18} className="mr-2" /> },
    { name: 'Sell', path: '/admin/sell', icon: <DollarSign size={18} className="mr-2" /> },
    { name: 'Rent', path: '/admin/rent', icon: <Calendar size={18} className="mr-2" /> },
    ...(isAdmin ? [{ name: 'Admin', path: '/admin', icon: <User size={18} className="mr-2" /> }] : [])
  ];

  return (
    <nav className="bg-amber-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center text-white hover:text-amber-200 transition-colors"
            >
              <Home size={24} className="mr-2" />
              <span className="text-xl font-bold tracking-tight">UrbanNest</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  window.location.pathname === item.path
                    ? 'bg-amber-700 text-white'
                    : 'text-amber-100 hover:bg-amber-700 hover:text-white'
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
            
            {/* User Dropdown */}
            <div className="relative ml-4">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-1 text-white hover:text-amber-200 focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-amber-700 flex items-center justify-center">
                  <User size={16} />
                </div>
                {dropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setDropdownOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 w-full text-left"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate('/settings');
                      setDropdownOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 w-full text-left"
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      navigate('/logout');
                      setDropdownOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 w-full text-left"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-amber-200 hover:bg-amber-700 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-amber-700 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium ${
                  window.location.pathname === item.path
                    ? 'bg-amber-600 text-white'
                    : 'text-amber-100 hover:bg-amber-600 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </button>
            ))}
            
            <div className="border-t border-amber-600 pt-2">
              <button
                onClick={() => {
                  navigate('/profile');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-amber-100 hover:bg-amber-600 hover:text-white"
              >
                <User size={18} className="mr-3" />
                Profile
              </button>
              <button
                onClick={() => {
                  navigate('/settings');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-amber-100 hover:bg-amber-600 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                Settings
              </button>
              <button
                onClick={() => {
                  navigate('/logout');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-amber-100 hover:bg-amber-600 hover:text-white"
              >
                <LogOut size={18} className="mr-3" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;