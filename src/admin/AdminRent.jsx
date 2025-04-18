import React, { useState, useEffect } from 'react';
import { 
  Pencil, 
  Trash2, 
  Plus, 
  Search,
  X,
  Save,
  AlertTriangle
} from 'lucide-react';
import Navbar from './Navbar';

const AdminPropertyDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    type: 'Apartment',
    rating: '4',
    reviews: '0',
    image: '',
    description: ''
  });
  
  // Confirmation modal state
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    propertyId: null,
    propertyTitle: ''
  });
  
  // Alert state
  const [alert, setAlert] = useState({
    isOpen: false,
    type: '',
    message: ''
  });

  // Fetch properties from backend - FIXED: added the missing fetch request
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const API_URL = 'http://localhost/house/rent_api.php';      
      
      // This line was missing - actually making the fetch request
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setProperties(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setError("Failed to load properties. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = 'http://localhost/house/admin_properties.php';
      const method = isEditMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Show success message
      setAlert({
        isOpen: true,
        type: 'success',
        message: isEditMode ? 'Property updated successfully!' : 'Property added successfully!'
      });
      
      // Close form and reset
      setIsFormOpen(false);
      setIsEditMode(false);
      setFormData({
        id: '',
        title: '',
        location: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        type: 'Apartment',
        rating: '4',
        reviews: '0',
        image: '',
        description: ''
      });
      
      // Refresh property list
      fetchProperties();
      
      // Auto close alert after 3 seconds
      setTimeout(() => {
        setAlert({ isOpen: false, type: '', message: '' });
      }, 3000);
      
    } catch (error) {
      console.error("Error saving property:", error);
      setAlert({
        isOpen: true,
        type: 'error',
        message: `Error: ${error.message}`
      });
    }
  };

  // Handle delete property
  const handleDelete = async (id) => {
    try {
      const response = await fetch('http://localhost/house/admin_properties.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // Close confirmation modal
      setDeleteConfirmation({
        isOpen: false,
        propertyId: null,
        propertyTitle: ''
      });
      
      // Show success message
      setAlert({
        isOpen: true,
        type: 'success',
        message: 'Property deleted successfully!'
      });
      
      // Refresh property list
      fetchProperties();
      
      // Auto close alert after 3 seconds
      setTimeout(() => {
        setAlert({ isOpen: false, type: '', message: '' });
      }, 3000);
      
    } catch (error) {
      console.error("Error deleting property:", error);
      setAlert({
        isOpen: true,
        type: 'error',
        message: `Error: ${error.message}`
      });
    }
  };

  // Open edit form with property data
  const handleEdit = (property) => {
    setFormData({
      id: property.id,
      title: property.title,
      location: property.location,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      type: property.type,
      rating: property.rating,
      reviews: property.reviews,
      image: property.image,
      description: property.description || ''
    });
    
    setIsEditMode(true);
    setIsFormOpen(true);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter properties based on search query
  const filteredProperties = searchQuery 
    ? properties.filter(property => 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : properties;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error && !isFormOpen) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="text-red-500 text-5xl mb-4">!</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Properties</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => fetchProperties()}
            className="px-6 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar isAdmin={true} />
      {/* Navbar component is referenced but not defined - I'll add a placeholder */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Property Management</h1>
          <button
            onClick={() => {
              setIsEditMode(false);
              setFormData({
                id: '',
                title: '',
                location: '',
                price: '',
                bedrooms: '',
                bathrooms: '',
                area: '',
                type: 'Apartment',
                rating: '4',
                reviews: '0',
                image: '',
                description: ''
              });
              setIsFormOpen(true);
            }}
            className="flex items-center px-4 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition"
          >
            <Plus size={18} className="mr-2" />
            Add New Property
          </button>
        </div>
        
        {/* Alert Message */}
        {alert.isOpen && (
          <div className={`mb-6 p-4 rounded-lg ${
            alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {alert.message}
          </div>
        )}
        
        {/* Add/Edit Property Form */}
        {isFormOpen && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {isEditMode ? 'Edit Property' : 'Add New Property'}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Property Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location*
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price Per Month (₹)*
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                </div>
                
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type*
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Studio">Studio</option>
                    <option value="House">House</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                    Bedrooms*
                  </label>
                  <input
                    type="number"
                    id="bedrooms"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                </div>
                
                <div>
                  <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
                    Bathrooms*
                  </label>
                  <input
                    type="number"
                    id="bathrooms"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                </div>
                
                <div>
                  <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                    Area (sq.ft)*
                  </label>
                  <input
                    type="number"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                </div>
                
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL*
                  </label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                </div>
                
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                    Rating (1-5)*
                  </label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                </div>
                
                <div>
                  <label htmlFor="reviews" className="block text-sm font-medium text-gray-700 mb-1">
                    Reviews Count*
                  </label>
                  <input
                    type="number"
                    id="reviews"
                    name="reviews"
                    value={formData.reviews}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800"
                ></textarea>
              </div>
              
              {formData.image && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Image Preview</p>
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-full h-40 object-cover rounded-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
                    }}
                  />
                </div>
              )}
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900"
                >
                  <Save size={18} className="mr-2" />
                  {isEditMode ? 'Update' : 'Save'} Property
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-800 focus:border-transparent outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        
        {/* Properties Table */}
        <div className="bg-white overflow-hidden shadow-md rounded-lg">
          {filteredProperties.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price/Month
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProperties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={property.image} 
                              alt={property.title}
                              onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = 'https://via.placeholder.com/40?text=X';
                              }} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {property.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {property.type}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{property.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-amber-800 font-semibold">
                          ₹{Number(property.price).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {property.bedrooms} Bed • {property.bathrooms} Bath • {property.area} sq.ft
                        </div>
                        <div className="text-sm text-gray-500">
                          Rating: {property.rating}/5 ({property.reviews} reviews)
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(property)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmation({
                              isOpen: true,
                              propertyId: property.id,
                              propertyTitle: property.title
                            })}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="mx-auto text-gray-400 w-12 h-12" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No properties found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {properties.length === 0 
                  ? "Get started by adding a new property." 
                  : "Try adjusting your search query."}
              </p>
              {properties.length === 0 && (
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setIsEditMode(false);
                      setFormData({
                        id: '',
                        title: '',
                        location: '',
                        price: '',
                        bedrooms: '',
                        bathrooms: '',
                        area: '',
                        type: 'Apartment',
                        rating: '4',
                        reviews: '0',
                        image: '',
                        description: ''
                      });
                      setIsFormOpen(true);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-800 hover:bg-amber-900"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Property
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-center mb-6 text-red-600">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Delete Property
            </h3>
            <p className="text-center text-gray-600 mb-6">
              Are you sure you want to delete "{deleteConfirmation.propertyTitle}"? This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setDeleteConfirmation({
                  isOpen: false,
                  propertyId: null,
                  propertyTitle: ''
                })}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmation.propertyId)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPropertyDashboard;