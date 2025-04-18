import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Home,
  MapPin,
  Bed,
  Bath,
  Square,
  DollarSign,
  Upload,
  Image,
  Trash2,
  Plus,
  Check,
  Loader
} from 'lucide-react';
import Navbar from './navbar';
import Footer from './footer';

const SellPropertyPage = () => {
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
    user_id: 1 // Default user ID - in a real app, you'd get this from auth
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [amenityInput, setAmenityInput] = useState('');
  const [listedProperties, setListedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const propertyTypes = [
    "Apartment", "Villa", "House", "Plot", "Commercial", "Farm House"
  ];

  // Fetch user's listed properties
  useEffect(() => {
    fetchListedProperties();
    window.scrollTo(0, 0);
  }, []);

  const fetchListedProperties = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost/house/cards.php?action=list&user_id=${formData.user_id}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        setListedProperties(data.data);
      } else {
        console.error('Error fetching properties:', data.message);
      }
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // In a real implementation, you would upload these files to your server
    // and get back URLs. For now, we'll use local object URLs
    const newPreviewImages = files.map(file => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviewImages]);
    
    // In a real app, you'd replace this with actual uploaded image URLs
    // This is a placeholder - normally you'd upload the image and get a URL back
    const fakeUploadedUrls = newPreviewImages.map((_, index) => 
      `property-image-${Date.now()}-${index}.jpg`
    );
    setUploadedImages([...uploadedImages, ...fakeUploadedUrls]);
  };

  const removeImage = (index) => {
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
    
    const newUploadedImages = [...uploadedImages];
    newUploadedImages.splice(index, 1);
    setUploadedImages(newUploadedImages);
  };

  const addAmenity = () => {
    if (amenityInput.trim() && !formData.amenities.includes(amenityInput)) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenityInput]
      }));
      setAmenityInput('');
    }
  };

  const removeAmenity = (index) => {
    const newAmenities = [...formData.amenities];
    newAmenities.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      amenities: newAmenities
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    
    try {
      // Prepare data for submission
      const submissionData = {
        ...formData,
        images: uploadedImages
      };
      
      // Send data to the server
      const response = await fetch('http://localhost/house/cards.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        setSubmitSuccess(true);
        
        // Reset form
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
          user_id: formData.user_id
        });
        setUploadedImages([]);
        setPreviewImages([]);
        setCurrentStep(1);
        
        // Refresh the listed properties
        fetchListedProperties();
        
        // Show success message
        alert('Property listing submitted successfully!');
      } else {
        setSubmitError(result.message || 'Failed to submit property listing');
      }
    } catch (error) {
      console.error('Error submitting property:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      
      <main className="max-w-7xl my-24 mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sell Your Property</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            List your property with us and connect with genuine buyers. Fill in the details below to get started.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              {/* Form Steps */}
              <div className="flex border-b border-gray-200">
                <button
                  className={`flex-1 py-4 font-medium text-center ${currentStep === 1 ? 'text-amber-800 border-b-2 border-amber-800' : 'text-gray-500'}`}
                  onClick={() => setCurrentStep(1)}
                >
                  Basic Details
                </button>
                <button
                  className={`flex-1 py-4 font-medium text-center ${currentStep === 2 ? 'text-amber-800 border-b-2 border-amber-800' : 'text-gray-500'}`}
                  onClick={() => setCurrentStep(2)}
                >
                  Photos & Amenities
                </button>
                <button
                  className={`flex-1 py-4 font-medium text-center ${currentStep === 3 ? 'text-amber-800 border-b-2 border-amber-800' : 'text-gray-500'}`}
                  onClick={() => setCurrentStep(3)}
                >
                  Review & Submit
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-6">
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Property Title*</label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 text-amber-800" size={18} />
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Property Type*</label>
                        <select
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none appearance-none"
                          required
                        >
                          <option value="">Select Property Type</option>
                          {propertyTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)*</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 text-amber-800" size={18} />
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms*</label>
                        <div className="relative">
                          <Bed className="absolute left-3 top-3 text-amber-800" size={18} />
                          <input
                            type="number"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms*</label>
                        <div className="relative">
                          <Bath className="absolute left-3 top-3 text-amber-800" size={18} />
                          <input
                            type="number"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none"
                            required
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Area (sq.ft)*</label>
                        <div className="relative">
                          <Square className="absolute left-3 top-3 text-amber-800" size={18} />
                          <input
                            type="number"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none"
                            required
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows="4"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none"
                          required
                        ></textarea>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Image Upload */}
                    <div className="mb-8">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Upload Property Images*</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <Upload className="w-10 h-10 text-amber-800 mb-2" />
                          <p className="text-gray-600 mb-2">Drag & drop images here or click to browse</p>
                          <label className="px-4 py-2 bg-amber-800 text-white rounded-lg cursor-pointer hover:bg-amber-900 transition">
                            Select Images
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                          <p className="text-xs text-gray-500 mt-2">JPEG, PNG up to 5MB each</p>
                        </div>
                      </div>

                      {/* Image Previews */}
                      {previewImages.length > 0 && (
                        <div className="mt-4">
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {previewImages.map((img, index) => (
                              <div key={index} className="relative group">
                                <img
                                  src={img}
                                  alt={`Preview ${index}`}
                                  className="w-full h-24 object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute top-1 right-1 bg-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                                >
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            {previewImages.length} image(s) selected
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Amenities */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                      <div className="flex mb-2">
                        <input
                          type="text"
                          value={amenityInput}
                          onChange={(e) => setAmenityInput(e.target.value)}
                          placeholder="Add amenity (e.g. Swimming Pool)"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none"
                        />
                        <button
                          type="button"
                          onClick={addAmenity}
                          className="px-4 py-2 bg-amber-800 text-white rounded-r-lg hover:bg-amber-900 transition"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center bg-amber-50 text-amber-800 px-3 py-1 rounded-full">
                            <span className="text-sm">{amenity}</span>
                            <button
                              type="button"
                              onClick={() => removeAmenity(index)}
                              className="ml-2 text-amber-800 hover:text-amber-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Review Your Listing</h3>
                    
                    <div className="bg-stone-50 rounded-lg p-6 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Basic Details</h4>
                          <div className="space-y-2">
                            <p><span className="text-gray-500">Title:</span> {formData.title || '-'}</p>
                            <p><span className="text-gray-500">Location:</span> {formData.location || '-'}</p>
                            <p><span className="text-gray-500">Type:</span> {formData.propertyType || '-'}</p>
                            <p><span className="text-gray-500">Price:</span> {formData.price ? `₹${parseInt(formData.price).toLocaleString()}` : '-'}</p>
                          </div>
                        </div>
                        <div>
                        <h4 className="font-medium text-gray-700 mb-2">Property Specifications</h4>
                          <div className="space-y-2">
                            <p><span className="text-gray-500">Bedrooms:</span> {formData.bedrooms || '-'}</p>
                            <p><span className="text-gray-500">Bathrooms:</span> {formData.bathrooms || '-'}</p>
                            <p><span className="text-gray-500">Area:</span> {formData.area ? `${formData.area} sq.ft` : '-'}</p>
                            <p><span className="text-gray-500">Amenities:</span> {formData.amenities.length > 0 ? formData.amenities.join(', ') : '-'}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                      <p className="text-gray-600">{formData.description || 'No description provided'}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Images ({previewImages.length})</h4>
                      {previewImages.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {previewImages.slice(0, 3).map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`Preview ${index}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                          ))}
                          {previewImages.length > 3 && (
                            <div className="flex items-center justify-center bg-stone-100 rounded-lg">
                              <span className="text-gray-500">+{previewImages.length - 3} more</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-500">No images uploaded</p>
                      )}
                    </div>
                    
                    {submitError && (
                      <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
                        {submitError}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Form Navigation */}
                <div className="flex justify-between mt-8">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="px-6 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <Loader className="animate-spin mr-2" size={18} />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Check className="mr-2" size={18} />
                          Submit Listing
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Previously Listed Properties */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800">Your Listed Properties</h3>
              </div>
              
              {loading ? (
                <div className="p-12 flex justify-center">
                  <Loader className="animate-spin text-amber-800" />
                </div>
              ) : listedProperties.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {listedProperties.map(property => (
                    <div key={property.id} className="p-4 flex items-center">
                      <img
                        src={property.image || "https://via.placeholder.com/150"}
                        alt={property.title}
                        className="w-16 h-16 object-cover rounded-lg mr-4"
                      />
                      <div>
                        <h4 className="font-medium text-gray-800">{property.title}</h4>
                        <p className="text-sm text-gray-500">{property.location}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-amber-800 font-medium">₹{parseInt(property.price).toLocaleString()}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            property.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {property.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <Image className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">You haven't listed any properties yet</p>
                </div>
              )}
            </div>

            {/* Help Card */}
            <div className="bg-amber-50 rounded-xl shadow-md overflow-hidden mt-6 p-6">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Our property experts can help you create an attractive listing that sells faster.
              </p>
              <button className="w-full py-2 border border-amber-800 text-amber-800 rounded-lg hover:bg-amber-100 transition">
                Request Assistance
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SellPropertyPage;