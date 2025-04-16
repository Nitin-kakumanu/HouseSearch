import { ShoppingCart, Tag, User, Home, Package, Search, Info, ChevronDown, DollarSign, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPropertyOptions, setShowPropertyOptions] = useState(false);

  const isActiveLink = (path) => location.pathname === path;

  const handlePropertyAction = (action) => {
    setShowPropertyOptions(false);
    navigate(`/properties/${action}`);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full bg-white text-gray-800 shadow-md p-4 flex items-center justify-between z-50 border-b border-amber-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo and Brand Name */}
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <div className="bg-amber-800 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl">UN</div>
        <span className="font-semibold text-2xl text-amber-800">UrbanNest</span>
      </div>

      {/* Navigation Links and Icons */}
      <div className="flex items-center space-x-10">
        {/* Home Icon */}
        <div
          onClick={() => navigate('/')}
          className={`flex flex-col items-center justify-center cursor-pointer p-3 transition-all duration-200 rounded-lg ${
            isActiveLink('/') ? 'bg-amber-800 text-white' : 'hover:bg-amber-50 text-gray-600 hover:text-amber-800'
          }`}
        >
          <Home size={22} />
          <span className="text-sm mt-1 font-medium">Home</span>
        </div>

        {/* Search Icon */}
        <div
          onClick={() => navigate('/search')}
          className={`flex flex-col items-center justify-center cursor-pointer p-3 transition-all duration-200 rounded-lg ${
            isActiveLink('/search') ? 'bg-amber-800 text-white' : 'hover:bg-amber-50 text-gray-600 hover:text-amber-800'
          }`}
        >
          <Search size={22} />
          <span className="text-sm mt-1 font-medium">Search</span>
        </div>

        {/* Properties Dropdown */}
        <div className="relative">
          <div
            onClick={() => setShowPropertyOptions(!showPropertyOptions)}
            className={`flex flex-col items-center justify-center cursor-pointer p-3 transition-all duration-200 rounded-lg ${
              isActiveLink('/properties/buy') || 
              isActiveLink('/properties/sell') || 
              isActiveLink('/properties/rent') 
                ? 'bg-amber-800 text-white' 
                : 'hover:bg-amber-50 text-gray-600 hover:text-amber-800'
            }`}
          >
            <div className="flex items-center">
              <Package size={22} />
              <ChevronDown 
                size={16} 
                className={`ml-1 transition-transform ${showPropertyOptions ? 'rotate-180' : ''}`}
              />
            </div>
            <span className="text-sm mt-1 font-medium">Properties</span>
          </div>

          <AnimatePresence>
            {showPropertyOptions && (
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-xl border border-amber-100 z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-2 space-y-1">
                  <motion.button
                    className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-800 rounded-md transition-colors"
                    whileHover={{ x: 5 }}
                    onClick={() => handlePropertyAction('buy')}
                  >
                    <Tag size={18} className="mr-3 text-amber-800" />
                    <span className="font-medium">Buy</span>
                  </motion.button>

                  <motion.button
                    className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-800 rounded-md transition-colors"
                    whileHover={{ x: 5 }}
                    onClick={() => handlePropertyAction('sell')}
                  >
                    <DollarSign size={18} className="mr-3 text-amber-800" />
                    <span className="font-medium">Sell</span>
                  </motion.button>

                  <motion.button
                    className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-800 rounded-md transition-colors"
                    whileHover={{ x: 5 }}
                    onClick={() => handlePropertyAction('rent')}
                  >
                    <Calendar size={18} className="mr-3 text-amber-800" />
                    <span className="font-medium">Rent</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* About Us Section */}
        <div
          onClick={() => navigate('/about')}
          className={`flex flex-col items-center justify-center cursor-pointer p-3 transition-all duration-200 rounded-lg ${
            isActiveLink('/about') ? 'bg-amber-800 text-white' : 'hover:bg-amber-50 text-gray-600 hover:text-amber-800'
          }`}
        >
          <Info size={22} />
          <span className="text-sm mt-1 font-medium">About Us</span>
        </div>

        {/* Profile Icon */}
        <motion.div
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center justify-center cursor-pointer p-3 transition-all duration-200 rounded-lg ${
            isActiveLink('/profile') ? 'bg-amber-800 text-white' : 'hover:bg-amber-50 text-gray-600 hover:text-amber-800'
          }`}
          whileHover={{ scale: 1.05 }}
        >
          <User size={22} />
          <span className="text-sm mt-1 font-medium">Profile</span>
        </motion.div>
      </div>

      {/* Right Section - Post Property Button */}
      <motion.button
        className="bg-amber-800 text-white px-5 py-2 rounded-lg shadow-md hover:bg-amber-900 transition font-medium text-sm flex items-center"
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate('/post-property')}
      >
        <ShoppingCart size={18} className="mr-2" />
        Post Property
      </motion.button>
    </motion.nav>
  );
}

export default Navbar;