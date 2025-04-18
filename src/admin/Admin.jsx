import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { 
  Home,
  Users,
  FileText,
  Settings,
  MessageSquare,
  BarChart2,
  Shield,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Search,
  Star,
  MapPin,
  Bed,
  Bath,
  Ruler,
  DollarSign,
  TrendingUp,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const Dashboard = () => {
  // Sample data
  const stats = [
    {
      title: "Total Properties",
      value: "1,248",
      change: "+12%",
      changeType: "increase",
      icon: <Home className="text-amber-800" size={20} />
    },
    {
      title: "Revenue",
      value: "₹42.8L",
      change: "+8.2%",
      changeType: "increase",
      icon: <DollarSign className="text-green-600" size={20} />
    },
    {
      title: "Active Listings",
      value: "892",
      change: "+5.1%",
      changeType: "increase",
      icon: <FileText className="text-blue-600" size={20} />
    },
    {
      title: "New Users",
      value: "243",
      change: "-2.4%",
      changeType: "decrease",
      icon: <Users className="text-purple-600" size={20} />
    }
  ];

  const recentActivities = [
    { id: 1, property: "Luxury Villa, Mumbai", action: "New listing added", time: "2 mins ago", user: "Admin" },
    { id: 2, property: "Commercial Space, Delhi", action: "Status changed to Sold", time: "1 hour ago", user: "Agent" },
    { id: 3, property: "Plot in Hyderabad", action: "Price updated", time: "3 hours ago", user: "Admin" },
    { id: 4, property: "Modern Apartment, Bangalore", action: "New images uploaded", time: "5 hours ago", user: "Agent" }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your properties today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1 text-gray-900">{stat.value}</p>
                <div className={`mt-2 flex items-center text-sm ${
                  stat.changeType === "increase" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.changeType === "increase" ? (
                    <ArrowUp className="mr-1" size={16} />
                  ) : (
                    <ArrowDown className="mr-1" size={16} />
                  )}
                  {stat.change} from last month
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Property Types Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Property Distribution</h2>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-amber-500 focus:border-transparent">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
            </select>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            <BarChart2 size={48} />
            <span className="ml-2">Property type chart visualization</span>
          </div>
        </div>

        {/* Performance Metric */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Listing Conversion</span>
                <span className="text-sm font-medium text-amber-800">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-800 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Avg. Time on Market</span>
                <span className="text-sm font-medium text-amber-800">24 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-800 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Customer Satisfaction</span>
                <span className="text-sm font-medium text-amber-800">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-800 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <button className="text-sm text-amber-800 hover:text-amber-900 font-medium">
            View All
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="py-3 flex items-start">
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                <FileText className="text-amber-800" size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {activity.property} - {activity.action}
                </p>
                <p className="text-sm text-gray-500">
                  {activity.time} • by {activity.user}
                </p>
              </div>
              <button className="text-gray-400 hover:text-gray-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const [properties, setProperties] = useState([
    { 
      id: 1, 
      title: 'Luxury Villa in Mumbai', 
      type: 'Villa', 
      price: '2,50,00,000', 
      status: 'Active', 
      date: '2023-05-15',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      rating: 4.8,
      location: 'Bandra West, Mumbai'
    },
    { 
      id: 2, 
      title: 'Modern Apartment in Bangalore', 
      type: 'Apartment', 
      price: '85,00,000', 
      status: 'Pending', 
      date: '2023-06-22',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      rating: 4.5,
      location: 'Whitefield, Bangalore'
    },
    { 
      id: 3, 
      title: 'Commercial Space in Delhi', 
      type: 'Commercial', 
      price: '1,20,00,000', 
      status: 'Sold', 
      date: '2023-04-10',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      bedrooms: 0,
      bathrooms: 2,
      area: 5000,
      rating: 4.2,
      location: 'Connaught Place, Delhi'
    },
    { 
      id: 4, 
      title: 'Plot in Hyderabad', 
      type: 'Plot', 
      price: '45,00,000', 
      status: 'Inactive', 
      date: '2023-07-05',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      bedrooms: 0,
      bathrooms: 0,
      area: 2400,
      rating: 0,
      location: 'Gachibowli, Hyderabad'
    },
  ]);

  const adminTabs = [
    { id: 'dashboard', name: 'Dashboard', icon: <Home size={18} /> },
    { id: 'properties', name: 'Properties', icon: <FileText size={18} /> },
    { id: 'users', name: 'Users', icon: <Users size={18} /> },
    { id: 'listings', name: 'Listings', icon: <FileText size={18} /> },
    { id: 'messages', name: 'Messages', icon: <MessageSquare size={18} /> },
    { id: 'reports', name: 'Reports', icon: <BarChart2 size={18} /> },
    { id: 'settings', name: 'Settings', icon: <Settings size={18} /> },
  ];

  const handleDeleteProperty = (id) => {
    setProperties(properties.filter(property => property.id !== id));
  };

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Sold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAdmin={true} />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <Shield size={24} className="text-amber-800 mr-2" />
            <span className="text-xl font-bold text-amber-800">Admin Panel</span>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <nav className="px-4 py-6 space-y-1">
              {adminTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-amber-100 text-amber-800 font-medium'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => navigate('/')}
              className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut size={18} className="mr-3" />
              Exit Admin
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          {/* Page header */}
          <div className="bg-white border-b border-gray-200">
            <div className="px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {adminTabs.find(tab => tab.id === activeTab)?.name || 'Dashboard'}
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage your {adminTabs.find(tab => tab.id === activeTab)?.name.toLowerCase()}
                  </p>
                </div>
                {activeTab === 'properties' && (
                  <button
                    onClick={() => navigate('/admin/properties/add')}
                    className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors shadow-sm"
                  >
                    <Plus size={18} className="mr-2" />
                    Add Property
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Page content */}
          <main>
            {activeTab === 'dashboard' && <Dashboard />}

            {activeTab === 'properties' && (
              <>
                {/* Search bar */}
                <div className="p-6">
                  <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search properties..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Properties grid */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredProperties.length > 0 ? (
                    filteredProperties.map((property) => (
                      <div key={property.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative">
                          <img 
                            src={property.image} 
                            alt={property.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                              {property.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
                            {property.rating > 0 && (
                              <div className="flex items-center bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm">
                                <Star size={14} className="mr-1 fill-current" />
                                {property.rating}
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-2 flex items-center text-gray-600">
                            <MapPin size={14} className="mr-1" />
                            <span className="text-sm">{property.location}</span>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                            <div className="p-2 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-center text-gray-500">
                                <Bed size={16} className="mr-1" />
                                <span className="text-sm">{property.bedrooms}</span>
                              </div>
                              <span className="text-xs text-gray-400">Beds</span>
                            </div>
                            <div className="p-2 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-center text-gray-500">
                                <Bath size={16} className="mr-1" />
                                <span className="text-sm">{property.bathrooms}</span>
                              </div>
                              <span className="text-xs text-gray-400">Baths</span>
                            </div>
                            <div className="p-2 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-center text-gray-500">
                                <Ruler size={16} className="mr-1" />
                                <span className="text-sm">{property.area}</span>
                              </div>
                              <span className="text-xs text-gray-400">sq.ft</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-lg font-bold text-amber-800">₹{property.price}</span>
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => {/* Edit functionality */}}
                                className="p-2 text-amber-800 hover:bg-amber-100 rounded-lg"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button 
                                onClick={() => handleDeleteProperty(property.id)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                      <Search size={48} className="mx-auto text-gray-400" />
                      <h3 className="mt-4 text-lg font-medium text-gray-900">No properties found</h3>
                      <p className="mt-1 text-gray-500">
                        {properties.length === 0 
                          ? "Get started by adding a new property." 
                          : "Try adjusting your search query."}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Other tabs */}
            {activeTab !== 'dashboard' && activeTab !== 'properties' && (
              <div className="p-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {adminTabs.find(tab => tab.id === activeTab)?.name} Management
                  </h2>
                  <p className="text-gray-500">
                    {adminTabs.find(tab => tab.id === activeTab)?.name.toLowerCase()} management functionality will be implemented here.
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;