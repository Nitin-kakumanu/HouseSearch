import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  X, 
  Eye,
  CheckCircle,
  XCircle,
  Upload,
  Loader,
  Save,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import Navbar from './Navbar';

const AdminPropertiesPage = () => {
  // State for property list
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 10,
    offset: 0,
    pages: 0
  });
  
  // Filters state
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    property_type: '',
    min_price: '',
    max_price: '',
    sort: 'created_at',
    order: 'DESC'
  });
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    price: '',
    amenities: [],
    status: 'Active',
    user_id: 1
  });
  
  const [amenityInput, setAmenityInput] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Property types
  const propertyTypes = [
    "Apartment", "Villa", "House", "Plot", "Commercial", "Farm House"
  ];
  
  // Status options
  const statusOptions = ["Active", "Pending", "Sold", "Inactive"];
  
  // API URL - replace with your actual API URL
  const API_URL = 'http://localhost/house/sell_api.php';
  
  // Fetch properties with current filters and pagination
  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Build query string
      const queryParams = new URLSearchParams();
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.property_type) queryParams.append('property_type', filters.property_type);
      if (filters.min_price) queryParams.append('min_price', filters.min_price);
      if (filters.max_price) queryParams.append('max_price', filters.max_price);
      queryParams.append('sort', filters.sort);
      queryParams.append('order', filters.order);
      queryParams.append('limit', pagination.limit);
      queryParams.append('offset', pagination.offset);
      
      const response = await fetch(`${API_URL}?${queryParams.toString()}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        setProperties(data.data);
        setPagination(data.pagination);
      } else {
        setError(data.message || 'Failed to fetch properties');
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch property details by ID
  const fetchPropertyDetails = async (id) => {
    try {
      const response = await fetch(`${API_URL}?id=${id}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to fetch property details');
      }
    } catch (error) {
      console.error('Error fetching property details:', error);
      throw error;
    }
  };
  
  // Load properties on component mount and when filters/pagination change
  useEffect(() => {
    fetchProperties();
  }, [pagination.offset, pagination.limit, filters.sort, filters.order]);
  
  // Reset pagination offset when filters change
  const applyFilters = () => {
    setPagination(prev => ({
      ...prev,
      offset: 0
    }));
    fetchProperties();
    setShowFilters(false);
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      search: '',
      status: '',
      property_type: '',
      min_price: '',
      max_price: '',
      sort: 'created_at',
      order: 'DESC'
    });
  };
  
  // Handle page change
  const handlePageChange = (newOffset) => {
    setPagination(prev => ({
      ...prev,
      offset: newOffset
    }));
  };
  
  // Handle sort change
  const handleSortChange = (field) => {
    setFilters(prev => ({
      ...prev,
      sort: field,
      order: prev.sort === field && prev.order === 'ASC' ? 'DESC' : 'ASC'
    }));
  };
  
  // Form input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Add amenity to form data
  const addAmenity = () => {
    if (amenityInput.trim() && !formData.amenities.includes(amenityInput)) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenityInput]
      }));
      setAmenityInput('');
    }
  };
  
  // Remove amenity from form data
  const removeAmenity = (index) => {
    const newAmenities = [...formData.amenities];
    newAmenities.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      amenities: newAmenities
    }));
  };
  
  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Create preview URLs
    const newPreviewImages = files.map(file => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviewImages]);
    
    // In a real app, you'd upload these images to your server here
    // This is a placeholder for demonstration
    const fakeUploadedUrls = newPreviewImages.map((_, index) => 
      `property-image-${Date.now()}-${index}.jpg`
    );
    setUploadedImages([...uploadedImages, ...fakeUploadedUrls]);
  };
  
  // Remove uploaded image
  const removeImage = (index) => {
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
    
    const newUploadedImages = [...uploadedImages];
    newUploadedImages.splice(index, 1);
    setUploadedImages(newUploadedImages);
  };
  
  // Open add property modal
  const openAddModal = () => {
    // Reset form data
    setFormData({
      title: '',
      location: '',
      description: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      price: '',
      amenities: [],
      status: 'Active',
      user_id: 1
    });
    setAmenityInput('');
    setUploadedImages([]);
    setPreviewImages([]);
    setShowAddModal(true);
  };
  
  // Open edit property modal
  const openEditModal = async (id) => {
    try {
      setLoading(true);
      const propertyData = await fetchPropertyDetails(id);
      
      // Set form data
      setFormData({
        title: propertyData.title,
        location: propertyData.location,
        description: propertyData.description,
        propertyType: propertyData.property_type,
        bedrooms: propertyData.bedrooms,
        bathrooms: propertyData.bathrooms,
        area: propertyData.area,
        price: propertyData.price,
        amenities: propertyData.amenities.map(item => item.amenity),
        status: propertyData.status,
        user_id: propertyData.user_id
      });
      
      // Set images
      setPreviewImages(propertyData.images.map(img => img.image_url));
      setUploadedImages(propertyData.images.map(img => img.image_url));
      
      setCurrentProperty(propertyData);
      setShowEditModal(true);
    } catch (error) {
      alert('Failed to load property details');
    } finally {
      setLoading(false);
    }
  };
  
  // Open view property modal
  const openViewModal = async (id) => {
    try {
      setLoading(true);
      const propertyData = await fetchPropertyDetails(id);
      setCurrentProperty(propertyData);
      setShowViewModal(true);
    } catch (error) {
      alert('Failed to load property details');
    } finally {
      setLoading(false);
    }
  };
  
  // Open delete confirmation modal
  const openDeleteModal = (property) => {
    setCurrentProperty(property);
    setShowDeleteModal(true);
  };
  
  // Handle form submission for add/edit property
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    
    try {
      const method = showAddModal ? 'POST' : 'PUT';
      const endpoint = showAddModal ? API_URL : `${API_URL}?id=${currentProperty.id}`;
      
      // Transform formData to match API expectations
      const submitData = {
        title: formData.title,
        location: formData.location,
        description: formData.description,
        property_type: formData.propertyType,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area: parseFloat(formData.area),
        price: parseFloat(formData.price),
        amenities: formData.amenities,
        status: formData.status,
        user_id: formData.user_id,
        images: uploadedImages
      };
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        // Close modal and refresh property list
        setShowAddModal(false);
        setShowEditModal(false);
        fetchProperties();
        alert(showAddModal ? 'Property added successfully' : 'Property updated successfully');
      } else {
        throw new Error(data.message || 'Failed to save property');
      }
    } catch (error) {
      console.error('Error saving property:', error);
      alert('Failed to save property');
    } finally {
      setFormSubmitting(false);
    }
  };
  
  // Handle property delete
  const handleDelete = async () => {
    if (!currentProperty) return;
    
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}?id=${currentProperty.id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setShowDeleteModal(false);
        fetchProperties();
        alert('Property deleted successfully');
      } else {
        throw new Error(data.message || 'Failed to delete property');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property');
    } finally {
      setLoading(false);
    }
  };
  
  // Format price with commas
  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString('en-US');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
        <Navbar isAdmin={true} />
      <div className="flex justify-between my-12 items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
           Property Management
        </h1>
        
        <button 
          onClick={openAddModal} 
          className="bg-amber-800 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="mr-1" size={18} /> Add Property
        </button>
      </div>
      
      {/* Search and Filter Section */}
      <div className="mb-6 bg-white p-4 rounded-md shadow">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="flex flex-1 relative">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              placeholder="Search properties..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          
          {/* Filter button */}
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center px-4 py-2 border rounded-md bg-white"
          >
            <Filter size={18} className="mr-2" />
            Filters
          </button>
          
          {/* Apply filters button */}
          <button 
            onClick={applyFilters}
            className="flex items-center justify-center px-4 py-2 bg-amber-800 text-white rounded-md"
          >
            Search
          </button>
        </div>
        
        {/* Extended filter options */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status filter */}
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            {/* Property type filter */}
            <div>
              <label className="block text-sm font-medium mb-1">Property Type</label>
              <select
                value={filters.property_type}
                onChange={(e) => setFilters({...filters, property_type: e.target.value})}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            {/* Price range filter */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium mb-1">Price Range</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.min_price}
                  onChange={(e) => setFilters({...filters, min_price: e.target.value})}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.max_price}
                  onChange={(e) => setFilters({...filters, max_price: e.target.value})}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {/* Reset filters button */}
            <div className="md:col-span-3 flex justify-end">
              <button 
                onClick={resetFilters}
                className="px-4 py-2 text-gray-600 flex items-center"
              >
                <X size={18} className="mr-1" /> Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Loading state */}
      {loading && (
        <div className="flex justify-center my-8">
          <Loader className="animate-spin" size={32} />
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {/* Properties Table */}
      {!loading && !error && (
        <div className="bg-white rounded-md shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSortChange('title')}
                >
                  <div className="flex items-center">
                    Title
                    {filters.sort === 'title' && (
                      filters.order === 'ASC' ? 
                        <ArrowUp size={14} className="ml-1" /> : 
                        <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSortChange('price')}
                >
                  <div className="flex items-center">
                    Price
                    {filters.sort === 'price' && (
                      filters.order === 'ASC' ? 
                        <ArrowUp size={14} className="ml-1" /> : 
                        <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSortChange('created_at')}
                >
                  <div className="flex items-center">
                    Created At
                    {filters.sort === 'created_at' && (
                      filters.order === 'ASC' ? 
                        <ArrowUp size={14} className="ml-1" /> : 
                        <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {properties.length > 0 ? (
                properties.map(property => (
                  <tr key={property.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.images && property.images.length > 0 ? (
                        <img 
                          src={property.images[0].image_url} 
                          alt={property.title}
                          className="h-12 w-16 object-cover rounded"
                        />
                      ) : (
                        <div className="h-12 w-16 bg-gray-200 rounded flex items-center justify-center">
                          <Home size={16} className="text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{property.title}</div>
                      <div className="text-sm text-gray-500">{property.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{property.property_type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">${formatPrice(property.price)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        property.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        property.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        property.status === 'Sold' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(property.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => openViewModal(property.id)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => openEditModal(property.id)}
                        className="text-yellow-600 hover:text-yellow-900 mr-3"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => openDeleteModal(property)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No properties found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Showing {pagination.offset + 1} to {Math.min(pagination.offset + pagination.limit, pagination.total)} of {pagination.total} properties
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(Math.max(0, pagination.offset - pagination.limit))}
                disabled={pagination.offset === 0}
                className={`px-3 py-1 rounded-md ${
                  pagination.offset === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              {[...Array(pagination.pages)].map((_, i) => {
                const pageOffset = i * pagination.limit;
                const isCurrentPage = pagination.offset === pageOffset;
                return (
                  <button
                    key={i}
                    onClick={() => handlePageChange(pageOffset)}
                    className={`px-3 py-1 rounded-md ${
                      isCurrentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(Math.min(pagination.total - pagination.limit, pagination.offset + pagination.limit))}
                disabled={pagination.offset + pagination.limit >= pagination.total}
                className={`px-3 py-1 rounded-md ${
                  pagination.offset + pagination.limit >= pagination.total ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Property Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Add New Property</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-1">Property Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium mb-1">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium mb-1">Property Type *</label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                {/* Price */}
                <div>
                  <label className="block text-sm font-medium mb-1">Price ($) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium mb-1">Bedrooms</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Bathrooms */}
                <div>
                  <label className="block text-sm font-medium mb-1">Bathrooms</label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Area */}
                <div>
                  <label className="block text-sm font-medium mb-1">Area (sq ft)</label>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium mb-1">Status *</label>
                  <select
                                  name="status"
                                  value={formData.status}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  {statusOptions.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                  ))}
                                </select>
                              </div>
                              
                              {/* Description */}
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                  name="description"
                                  value={formData.description}
                                  onChange={handleInputChange}
                                  rows={3}
                                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              
                              {/* Amenities */}
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Amenities</label>
                                <div className="flex gap-2 mb-2">
                                  <input
                                    type="text"
                                    value={amenityInput}
                                    onChange={(e) => setAmenityInput(e.target.value)}
                                    placeholder="Add amenity"
                                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                  <button
                                    type="button"
                                    onClick={addAmenity}
                                    className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                                  >
                                    Add
                                  </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {formData.amenities.map((amenity, index) => (
                                    <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                                      <span className="mr-1">{amenity}</span>
                                      <button
                                        type="button"
                                        onClick={() => removeAmenity(index)}
                                        className="text-gray-500 hover:text-gray-700"
                                      >
                                        <X size={16} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Image Upload */}
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Images *</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
                                  <div className="flex flex-col items-center justify-center">
                                    <Upload className="text-gray-400 mb-2" size={24} />
                                    <p className="text-sm text-gray-600 mb-2">Drag & drop images here or click to browse</p>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      multiple
                                      onChange={handleImageUpload}
                                      className="hidden"
                                      id="property-images"
                                    />
                                    <label
                                      htmlFor="property-images"
                                      className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
                                    >
                                      Select Images
                                    </label>
                                  </div>
                                </div>
                                
                                {/* Preview Images */}
                                {previewImages.length > 0 && (
                                  <div className="mt-4">
                                    <h4 className="text-sm font-medium mb-2">Selected Images ({previewImages.length})</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                      {previewImages.map((img, index) => (
                                        <div key={index} className="relative group">
                                          <img
                                            src={img}
                                            alt={`Preview ${index + 1}`}
                                            className="h-32 w-full object-cover rounded-md"
                                          />
                                          <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                          >
                                            <X size={16} />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end gap-3">
                              <button
                                type="button"
                                onClick={() => setShowAddModal(false)}
                                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={formSubmitting || previewImages.length === 0}
                                className={`px-4 py-2 rounded-md text-white flex items-center ${
                                  formSubmitting || previewImages.length === 0 ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                              >
                                {formSubmitting ? (
                                  <>
                                    <Loader className="animate-spin mr-2" size={18} />
                                    Saving...
                                  </>
                                ) : (
                                  <>
                                    <Save className="mr-2" size={18} />
                                    Save Property
                                  </>
                                )}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                    
                    {/* Edit Property Modal */}
                    {showEditModal && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto">
                          <div className="p-6 border-b">
                            <div className="flex justify-between items-center">
                              <h2 className="text-xl font-bold">Edit Property</h2>
                              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={20} />
                              </button>
                            </div>
                          </div>
                          
                          <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Title */}
                              <div>
                                <label className="block text-sm font-medium mb-1">Property Title *</label>
                                <input
                                  type="text"
                                  name="title"
                                  value={formData.title}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              
                              {/* Location */}
                              <div>
                                <label className="block text-sm font-medium mb-1">Location *</label>
                                <input
                                  type="text"
                                  name="location"
                                  value={formData.location}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              
                              {/* Property Type */}
                              <div>
                                <label className="block text-sm font-medium mb-1">Property Type *</label>
                                <select
                                  name="propertyType"
                                  value={formData.propertyType}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="">Select Type</option>
                                  {propertyTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                  ))}
                                </select>
                              </div>
                              
                              {/* Price */}
                              <div>
                                <label className="block text-sm font-medium mb-1">Price ($) *</label>
                                <input
                                  type="number"
                                  name="price"
                                  value={formData.price}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              
                              {/* Bedrooms */}
                              <div>
                                <label className="block text-sm font-medium mb-1">Bedrooms</label>
                                <input
                                  type="number"
                                  name="bedrooms"
                                  value={formData.bedrooms}
                                  onChange={handleInputChange}
                                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              
                              {/* Bathrooms */}
                              <div>
                                <label className="block text-sm font-medium mb-1">Bathrooms</label>
                                <input
                                  type="number"
                                  name="bathrooms"
                                  value={formData.bathrooms}
                                  onChange={handleInputChange}
                                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              
                              {/* Area */}
                              <div>
                                <label className="block text-sm font-medium mb-1">Area (sq ft)</label>
                                <input
                                  type="number"
                                  name="area"
                                  value={formData.area}
                                  onChange={handleInputChange}
                                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              
                              {/* Status */}
                              <div>
                                <label className="block text-sm font-medium mb-1">Status *</label>
                                <select
                                  name="status"
                                  value={formData.status}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  {statusOptions.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                  ))}
                                </select>
                              </div>
                              
                              {/* Description */}
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                  name="description"
                                  value={formData.description}
                                  onChange={handleInputChange}
                                  rows={3}
                                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              
                              {/* Amenities */}
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Amenities</label>
                                <div className="flex gap-2 mb-2">
                                  <input
                                    type="text"
                                    value={amenityInput}
                                    onChange={(e) => setAmenityInput(e.target.value)}
                                    placeholder="Add amenity"
                                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                  <button
                                    type="button"
                                    onClick={addAmenity}
                                    className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                                  >
                                    Add
                                  </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {formData.amenities.map((amenity, index) => (
                                    <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                                      <span className="mr-1">{amenity}</span>
                                      <button
                                        type="button"
                                        onClick={() => removeAmenity(index)}
                                        className="text-gray-500 hover:text-gray-700"
                                      >
                                        <X size={16} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Image Upload */}
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Images *</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
                                  <div className="flex flex-col items-center justify-center">
                                    <Upload className="text-gray-400 mb-2" size={24} />
                                    <p className="text-sm text-gray-600 mb-2">Drag & drop images here or click to browse</p>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      multiple
                                      onChange={handleImageUpload}
                                      className="hidden"
                                      id="edit-property-images"
                                    />
                                    <label
                                      htmlFor="edit-property-images"
                                      className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
                                    >
                                      Add More Images
                                    </label>
                                  </div>
                                </div>
                                
                                {/* Preview Images */}
                                {previewImages.length > 0 && (
                                  <div className="mt-4">
                                    <h4 className="text-sm font-medium mb-2">Current Images ({previewImages.length})</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                      {previewImages.map((img, index) => (
                                        <div key={index} className="relative group">
                                          <img
                                            src={img}
                                            alt={`Preview ${index + 1}`}
                                            className="h-32 w-full object-cover rounded-md"
                                          />
                                          <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                          >
                                            <X size={16} />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end gap-3">
                              <button
                                type="button"
                                onClick={() => setShowEditModal(false)}
                                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={formSubmitting || previewImages.length === 0}
                                className={`px-4 py-2 rounded-md text-white flex items-center ${
                                  formSubmitting || previewImages.length === 0 ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                              >
                                {formSubmitting ? (
                                  <>
                                    <Loader className="animate-spin mr-2" size={18} />
                                    Updating...
                                  </>
                                ) : (
                                  <>
                                    <Save className="mr-2" size={18} />
                                    Update Property
                                  </>
                                )}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                    
                    {/* View Property Modal */}
                    {showViewModal && currentProperty && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto">
                          <div className="p-6 border-b">
                            <div className="flex justify-between items-center">
                              <h2 className="text-xl font-bold">{currentProperty.title}</h2>
                              <button onClick={() => setShowViewModal(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={20} />
                              </button>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Property Images */}
                              <div className="md:col-span-2">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                  {currentProperty.images && currentProperty.images.length > 0 ? (
                                    currentProperty.images.map((image, index) => (
                                      <img
                                        key={index}
                                        src={image.image_url}
                                        alt={`Property ${index + 1}`}
                                        className="h-48 w-full object-cover rounded-md"
                                      />
                                    ))
                                  ) : (
                                    <div className="h-48 w-full bg-gray-200 rounded-md flex items-center justify-center col-span-2 md:col-span-3">
                                      <Home size={32} className="text-gray-400" />
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Basic Info */}
                              <div>
                                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                                <div className="space-y-3">
                                  <div>
                                    <span className="text-sm text-gray-500">Location:</span>
                                    <p className="font-medium">{currentProperty.location}</p>
                                  </div>
                                  <div>
                                    <span className="text-sm text-gray-500">Property Type:</span>
                                    <p className="font-medium">{currentProperty.property_type}</p>
                                  </div>
                                  <div>
                                    <span className="text-sm text-gray-500">Status:</span>
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      currentProperty.status === 'Active' ? 'bg-green-100 text-green-800' : 
                                      currentProperty.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                      currentProperty.status === 'Sold' ? 'bg-blue-100 text-blue-800' :
                                      'bg-gray-100 text-gray-800'
                                    }`}>
                                      {currentProperty.status}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-sm text-gray-500">Price:</span>
                                    <p className="font-medium">${formatPrice(currentProperty.price)}</p>
                                  </div>
                                  <div>
                                    <span className="text-sm text-gray-500">Created At:</span>
                                    <p className="font-medium">{new Date(currentProperty.created_at).toLocaleDateString()}</p>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Property Details */}
                              <div>
                                <h3 className="text-lg font-semibold mb-4">Property Details</h3>
                                <div className="space-y-3">
                                  <div>
                                    <span className="text-sm text-gray-500">Bedrooms:</span>
                                    <p className="font-medium">{currentProperty.bedrooms || 'N/A'}</p>
                                  </div>
                                  <div>
                                    <span className="text-sm text-gray-500">Bathrooms:</span>
                                    <p className="font-medium">{currentProperty.bathrooms || 'N/A'}</p>
                                  </div>
                                  <div>
                                    <span className="text-sm text-gray-500">Area:</span>
                                    <p className="font-medium">{currentProperty.area ? `${currentProperty.area} sq ft` : 'N/A'}</p>
                                  </div>
                                  <div>
                                    <span className="text-sm text-gray-500">Description:</span>
                                    <p className="font-medium">{currentProperty.description || 'No description provided'}</p>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Amenities */}
                              {currentProperty.amenities && currentProperty.amenities.length > 0 && (
                                <div className="md:col-span-2">
                                  <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {currentProperty.amenities.map((amenity, index) => (
                                      <div key={index} className="bg-gray-100 px-3 py-1 rounded-full">
                                        {amenity.amenity}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="mt-6 flex justify-end">
                              <button
                                onClick={() => setShowViewModal(false)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Delete Confirmation Modal */}
                    {showDeleteModal && currentProperty && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg w-full max-w-md">
                          <div className="p-6 border-b">
                            <div className="flex justify-between items-center">
                              <h2 className="text-xl font-bold">Confirm Delete</h2>
                              <button onClick={() => setShowDeleteModal(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={20} />
                              </button>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <div className="flex flex-col items-center text-center">
                              <Trash2 size={48} className="text-red-500 mb-4" />
                              <p className="text-lg mb-4">Are you sure you want to delete this property?</p>
                              <p className="font-medium mb-2">{currentProperty.title}</p>
                              <p className="text-gray-600 mb-6">{currentProperty.location}</p>
                            </div>
                            
                            <div className="flex justify-end gap-3">
                              <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleDelete}
                                disabled={loading}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                              >
                                {loading ? (
                                  <>
                                    <Loader className="animate-spin mr-2" size={18} />
                                    Deleting...
                                  </>
                                ) : (
                                  <>
                                    <Trash2 className="mr-2" size={18} />
                                    Delete Property
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
        );
    };
                
export default AdminPropertiesPage;