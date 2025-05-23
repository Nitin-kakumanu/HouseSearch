import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Star,
  Search,
  Filter,
  ChevronDown,
  X
} from 'lucide-react';
import Navbar from './navbar';
import Footer from './footer';

const RentPropertyPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    bedrooms: '',
    priceRange: '',
    propertyType: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch properties from backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost/house/rents.php');
        
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

    fetchProperties();
    
    // Load favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
    
    window.scrollTo(0, 0);
  }, []);

  const toggleFavorite = (property) => {
    // Get current cart from localStorage
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if property already exists in cart
    const existingIndex = currentCart.findIndex(item => item.id === property.id);
    
    let updatedCart;
    if (existingIndex >= 0) {
      // If exists, remove it
      updatedCart = currentCart.filter(item => item.id !== property.id);
      setFavorites(favorites.filter(favId => favId !== property.id));
    } else {
      // If new, add to cart
      updatedCart = [...currentCart, { ...property, quantity: 1 }];
      setFavorites([...favorites, property.id]);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    // Also save favorites separately
    localStorage.setItem('favorites', JSON.stringify(favorites.includes(property.id) 
      ? favorites.filter(id => id !== property.id) 
      : [...favorites, property.id]));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      bedrooms: '',
      priceRange: '',
      propertyType: ''
    });
    setSearchQuery('');
  };

  const filteredProperties = properties.filter(property => {
    // Search filter
    const matchesSearch = 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Other filters
    const matchesBedrooms = !filters.bedrooms || property.bedrooms >= parseInt(filters.bedrooms);
    const matchesPrice = !filters.priceRange || 
      (filters.priceRange === 'under-20k' && property.price < 20000) ||
      (filters.priceRange === '20k-40k' && property.price >= 20000 && property.price <= 40000) ||
      (filters.priceRange === 'above-40k' && property.price > 40000);
    const matchesType = !filters.propertyType || property.type === filters.propertyType;
    
    return matchesSearch && matchesBedrooms && matchesPrice && matchesType;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="text-red-500 text-5xl mb-4">!</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Properties</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative my-24 bg-amber-800 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Find Your Perfect Rental</h1>
          <p className="text-amber-100 text-lg">
            Discover homes that match your lifestyle and budget
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Filter Options */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button 
              className="flex items-center text-amber-800 font-medium"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2" size={18} />
              Filters
              <ChevronDown className={`ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} size={18} />
            </button>
            {(filters.bedrooms || filters.priceRange || filters.propertyType) && (
              <button 
                className="text-sm text-gray-500 hover:text-amber-800"
                onClick={clearFilters}
              >
                Clear all filters
              </button>
            )}
          </div>
          
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                <select
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-800 outline-none"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <select
                  name="priceRange"
                  value={filters.priceRange}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-800 outline-none"
                >
                  <option value="">Any</option>
                  <option value="under-20k">Under ₹20,000</option>
                  <option value="20k-40k">₹20,000 - ₹40,000</option>
                  <option value="above-40k">Above ₹40,000</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <select
                  name="propertyType"
                  value={filters.propertyType}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-800 outline-none"
                >
                  <option value="">Any</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Studio">Studio</option>
                  <option value="House">House</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {filteredProperties.length} Properties Available
          </h2>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Sort by:</span>
            <select className="px-3 py-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-800 outline-none">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>

        {/* Property Listings */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <motion.div
                key={property.id}
                className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                    onClick={() => setSelectedProperty(property)}
                  />
                  <button 
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-amber-50 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(property);
                    }}
                  >
                    <Heart
                      size={20}
                      className={favorites.includes(property.id) ? "text-red-500 fill-red-500" : "text-amber-800"}
                    />
                  </button>
                  <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent w-full h-20"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-amber-800 text-white px-3 py-1 rounded-full text-sm">
                      For Rent
                    </span>
                  </div>
                </div>
                <div className="p-6" onClick={() => setSelectedProperty(property)}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 group-hover:text-amber-800 transition">
                        {property.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1 flex items-center">
                        <MapPin size={14} className="mr-1" /> {property.location}
                      </p>
                    </div>
                    <p className="text-amber-800 font-semibold">
                      ₹{property.price.toLocaleString()}/month
                    </p>
                  </div>

                  <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between text-sm text-gray-600">
                    <span className="flex items-center">
                      <Bed size={14} className="mr-1" /> {property.bedrooms} Beds
                    </span>
                    <span className="flex items-center">
                      <Bath size={14} className="mr-1" /> {property.bathrooms} Baths
                    </span>
                    <span className="flex items-center">
                      <Square size={14} className="mr-1" /> {property.area} sq.ft
                    </span>
                  </div>

                  <div className="mt-4 flex items-center">
                    <div className="flex text-amber-500 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < property.rating ? "#f59e0b" : "none"} 
                          stroke="#f59e0b" 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({property.reviews} reviews)</span>
                  </div>

                  <button 
                    className="mt-6 w-full py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-lg font-medium transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProperty(property);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any properties matching your criteria. Try adjusting your filters.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Property Detail Modal */}
        {selectedProperty && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div 
              className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="relative">
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.title}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                <button 
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-amber-50 transition"
                  onClick={() => setSelectedProperty(null)}
                >
                  <X size={20} className="text-amber-800" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-amber-800 text-white px-3 py-1 rounded-full text-sm">
                    For Rent
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedProperty.title}</h2>
                    <p className="text-gray-600 flex items-center mt-2">
                      <MapPin size={16} className="mr-2" /> {selectedProperty.location}
                    </p>
                  </div>
                  <p className="text-amber-800 font-bold text-xl">
                    ₹{selectedProperty.price.toLocaleString()}/month
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 my-6">
                  <div className="bg-amber-50 p-4 rounded-lg text-center">
                    <Bed size={20} className="mx-auto text-amber-800 mb-2" />
                    <p className="font-medium">{selectedProperty.bedrooms} Bedrooms</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg text-center">
                    <Bath size={20} className="mx-auto text-amber-800 mb-2" />
                    <p className="font-medium">{selectedProperty.bathrooms} Bathrooms</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg text-center">
                    <Square size={20} className="mx-auto text-amber-800 mb-2" />
                    <p className="font-medium">{selectedProperty.area} sq.ft</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-600">
                    {selectedProperty.description || `This beautiful ${selectedProperty.type.toLowerCase()} features modern amenities and 
                    is located in the heart of ${selectedProperty.location.split(',')[0]}. 
                    The property has been well-maintained and comes with all necessary furnishings.`}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['Parking', 'Security', 'Elevator', 'Swimming Pool', 'Gym', '24/7 Water'].map(amenity => (
                      <div key={amenity} className="flex items-center">
                        <div className="w-2 h-2 bg-amber-800 rounded-full mr-2"></div>
                        <span className="text-gray-600">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center">
                    <div className="flex text-amber-500 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          fill={i < selectedProperty.rating ? "#f59e0b" : "none"} 
                          stroke="#f59e0b" 
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">({selectedProperty.reviews} reviews)</span>
                  </div>
                  <button 
                    className="px-6 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-lg font-medium transition"
                    onClick={() => {
                      toggleFavorite(selectedProperty);
                      setSelectedProperty(null);
                    }}
                  >
                    {favorites.includes(selectedProperty.id) ? 'Remove from Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Pagination */}
        {filteredProperties.length > 0 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                Previous
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                    page === 1
                      ? "bg-amber-800 text-white"
                      : "border border-gray-300 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-amber-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Can't find what you're looking for?</h2>
          <p className="text-amber-100 mb-6">
            Sign up for alerts and we'll notify you when new properties matching your criteria become available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button className="px-6 py-3 bg-white text-amber-800 font-medium rounded-lg hover:bg-amber-100 transition">
              Get Alerts
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RentPropertyPage;