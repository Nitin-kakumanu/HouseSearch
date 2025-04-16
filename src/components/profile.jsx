import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Home, Calendar, Lock, LogIn, LogOut, Edit, Heart, ShoppingCart } from 'lucide-react';
import Navbar from './navbar'; // Import your Navbar component
import Footer from './footer'; // Import your Footer component

const ProfilePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [userDetails, setUserDetails] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 9876543210',
    address: '123, Palm Grove, Bandra West, Mumbai',
    memberSince: 'January 2023',
    savedProperties: 5,
    activeListings: 2,
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you would authenticate here
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-stone-50 text-gray-800 flex flex-col">
      <Navbar />
      
      <main className="flex-grow my-24">
        {/* Profile Header */}

        {/* Profile Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {isLoggedIn ? (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* User Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100">
                  <div className="bg-amber-800 h-24"></div>
                  <div className="px-6 pb-6 relative">
                    <div className="flex justify-center -mt-12 mb-4">
                      <img
                        src={userDetails.profileImage}
                        alt="Profile"
                        className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
                      />
                    </div>
                    <div className="text-center">
                      <h2 className="text-2xl font-semibold text-gray-800">{userDetails.name}</h2>
                      <p className="text-gray-600 flex items-center justify-center mt-1">
                        <Mail size={16} className="mr-1 text-amber-800" />
                        {userDetails.email}
                      </p>
                    </div>
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center text-gray-700">
                        <Phone size={18} className="mr-3 text-amber-800" />
                        <span>{userDetails.phone}</span>
                      </div>
                      <div className="flex items-start text-gray-700">
                        <MapPin size={18} className="mr-3 mt-1 text-amber-800" />
                        <span>{userDetails.address}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Calendar size={18} className="mr-3 text-amber-800" />
                        <span>Member since {userDetails.memberSince}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="mt-6 w-full bg-amber-800 hover:bg-amber-900 text-white py-2 px-4 rounded-lg flex items-center justify-center transition"
                    >
                      <LogOut size={18} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>

              {/* User Activities */}
              <div className="lg:col-span-2 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    className="bg-white rounded-xl shadow-md p-6 border border-amber-100"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center">
                      <div className="bg-amber-100 p-3 rounded-full mr-4">
                        <Heart size={24} className="text-amber-800" />
                      </div>
                      <div>
                        <h3 className="text-gray-600">Saved Properties</h3>
                        <p className="text-2xl font-bold text-gray-800">{userDetails.savedProperties}</p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="bg-white rounded-xl shadow-md p-6 border border-amber-100"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center">
                      <div className="bg-amber-100 p-3 rounded-full mr-4">
                        <Home size={24} className="text-amber-800" />
                      </div>
                      <div>
                        <h3 className="text-gray-600">Active Listings</h3>
                        <p className="text-2xl font-bold text-gray-800">{userDetails.activeListings}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100">
                  <div className="bg-amber-800 px-6 py-3">
                    <h3 className="text-white font-semibold">Recent Activity</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                          <div className="bg-amber-100 p-2 rounded-full mr-4 mt-1">
                            <ShoppingCart size={18} className="text-amber-800" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">Property viewed</h4>
                            <p className="text-sm text-gray-600">3BHK Apartment in Bandra West</p>
                            <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Edit Profile Button */}
                <motion.button
                  className="w-full md:w-auto bg-white border border-amber-800 text-amber-800 hover:bg-amber-50 px-6 py-3 rounded-lg flex items-center justify-center transition mt-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <Edit size={18} className="mr-2" />
                  Edit Profile
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 border border-amber-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <div className="bg-amber-100 inline-flex p-4 rounded-full mb-4">
                  <User size={32} className="text-amber-800" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Sign In to Your Account</h2>
                <p className="text-gray-600 mt-2">Access your saved properties and listings</p>
              </div>
              <form onSubmit={handleLogin}>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-3 text-amber-800" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={loginForm.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-3 text-amber-800" />
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={loginForm.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-800 hover:bg-amber-900 text-white py-3 px-4 rounded-lg flex items-center justify-center transition"
                >
                  <LogIn size={18} className="mr-2" />
                  Sign In
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <button className="text-amber-800 hover:text-amber-900 font-medium">
                    Register here
                  </button>
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;