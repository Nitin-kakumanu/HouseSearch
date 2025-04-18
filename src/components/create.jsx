import React, { useState } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, User, Lock, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CreateAccountPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.agreeTerms) {
      errors.agreeTerms = "You must agree to the terms and conditions";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Handle form submission
      console.log("Form submitted:", formData);
      
      // Redirect to home page or login page
      navigate('/');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="overflow-x-hidden bg-stone-50 text-gray-800 font-sans min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow my-24 py-16">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Form Section */}
            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg border border-stone-100"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Create Your Account</h1>
                <p className="text-gray-600">Join UrbanNest to find your perfect home</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700 text-sm font-medium mb-2">First Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${formErrors.firstName ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition pl-10`}
                        placeholder="John"
                      />
                      <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
                    </div>
                    {formErrors.firstName && <p className="mt-1 text-sm text-red-500">{formErrors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-gray-700 text-sm font-medium mb-2">Last Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${formErrors.lastName ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition pl-10`}
                        placeholder="Doe"
                      />
                      <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
                    </div>
                    {formErrors.lastName && <p className="mt-1 text-sm text-red-500">{formErrors.lastName}</p>}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.email ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition pl-10`}
                      placeholder="john.doe@example.com"
                    />
                    <Mail size={18} className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                  {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.password ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition pl-10 pr-10`}
                      placeholder="••••••••"
                    />
                    <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
                    <button 
                      type="button" 
                      onClick={toggleShowPassword}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {formErrors.password && <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>}
                  <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters long</p>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.confirmPassword ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition pl-10 pr-10`}
                      placeholder="••••••••"
                    />
                    <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
                    <button 
                      type="button" 
                      onClick={toggleShowConfirmPassword}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {formErrors.confirmPassword && <p className="mt-1 text-sm text-red-500">{formErrors.confirmPassword}</p>}
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeTerms"
                      name="agreeTerms"
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="w-4 h-4 text-amber-800 border-gray-300 rounded focus:ring-amber-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeTerms" className="text-gray-700">
                      I agree to the <a href="#" className="text-amber-800 hover:text-amber-900 font-medium">Terms of Service</a> and <a href="#" className="text-amber-800 hover:text-amber-900 font-medium">Privacy Policy</a>
                    </label>
                    {formErrors.agreeTerms && <p className="mt-1 text-sm text-red-500">{formErrors.agreeTerms}</p>}
                  </div>
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full px-6 py-3 bg-amber-800 text-white rounded-lg shadow-md hover:bg-amber-900 transition font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Create Account
                </motion.button>
                
                <div className="mt-4 text-center">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <a 
                      href="/login" 
                      className="text-amber-800 hover:text-amber-900 font-medium"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/login');
                      }}
                    >
                      Sign In
                    </a>
                  </p>
                </div>
              </form>
              
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <motion.button
                    type="button"
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition"
                    whileHover={{ scale: 1.02 }}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
  <path
    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    fill="#4285F4"
  />
  <path
    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    fill="#34A853"
  />
  <path
    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    fill="#FBBC05"
  />
  <path
    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    fill="#EA4335"
  />
</svg>
                    Google
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition"
                    whileHover={{ scale: 1.02 }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 2.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                        clipRule="evenodd"
                      />
                    </svg>
                    GitHub
                  </motion.button>
                </div>
              </div>
            </motion.div>
            
            {/* Right: Image and Info Section */}
            <motion.div
              className="relative hidden md:block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-xl h-full min-h-[500px]">
                <img 
                  src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1470&q=80" 
                  alt="Beautiful home" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex flex-col justify-end p-8">
                  <h3 className="text-white text-2xl font-bold mb-2">Join UrbanNest Today</h3>
                  <p className="text-white/90 mb-6">Create your account and start discovering your perfect home with verified listings and personalized recommendations.</p>
                  
                  <div className="space-y-4">
                    {[
                      { text: "Personalized home recommendations" },
                      { text: "Save and compare favorite properties" },
                      { text: "Get notified about price drops" },
                      { text: "Connect with trusted agents" }
                    ].map((benefit, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="bg-amber-800 rounded-full p-1 mr-3">
                          <Check size={14} className="text-white" />
                        </div>
                        <span className="text-white">{benefit.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}