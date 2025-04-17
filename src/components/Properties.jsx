import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { motion } from 'framer-motion';
import { 
  Home, 
  DollarSign, 
  Tag, 
  ArrowRight,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Star,
  X
} from 'lucide-react';

const PropertyPage = () => {
  const [selectedOption, setSelectedOption] = useState('buy');
  const [favorites, setFavorites] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Initialize favorites from localStorage on component mount
  useEffect(() => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const favoriteIds = currentCart.map(item => item.id);
    setFavorites(favoriteIds);
  }, []);

  const toggleFavorite = (property, e) => {
    // Stop event propagation to prevent modal from opening
    if (e) {
      e.stopPropagation();
    }
    
    // Get current cart from localStorage
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if property already exists in cart
    const existingItemIndex = currentCart.findIndex(item => item.id === property.id);
    
    let updatedCart;
    
    if (existingItemIndex >= 0) {
      // If exists, remove from cart
      updatedCart = currentCart.filter(item => item.id !== property.id);
      setFavorites(favorites.filter(favId => favId !== property.id));
    } else {
      // If new, add to cart with quantity 1
      updatedCart = [...currentCart, { ...property, quantity: 1 }];
      setFavorites([...favorites, property.id]);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} Lakh`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const openPropertyDetails = (property) => {
    setSelectedProperty(property);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closePropertyDetails = () => {
    setSelectedProperty(null);
    // Re-enable scrolling when modal is closed
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Property Services</h1>
          <p className="mt-2 text-gray-600">
            Choose how you'd like to proceed with your property journey
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Property Listings */}
        {selectedOption === 'buy' && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Properties For Sale</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {buyProperties.map((property) => (
                <motion.div
                  key={property.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => openPropertyDetails(property)}
                >
                  <div className="relative">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <button 
                      className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-amber-50 transition"
                      onClick={(e) => toggleFavorite(property, e)}
                    >
                      <Heart
                        size={20}
                        className={favorites.includes(property.id) ? "text-red-500 fill-red-500" : "text-amber-800"}
                      />
                    </button>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-amber-800 text-white px-3 py-1 rounded-full text-sm">
                        For Sale
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
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
                        {formatPrice(property.price)}
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
                        openPropertyDetails(property);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Property Detail Modal - Updated to match RentPropertyPage style */}
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
                  onClick={closePropertyDetails}
                >
                  <X size={20} className="text-amber-800" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-amber-800 text-white px-3 py-1 rounded-full text-sm">
                    For Sale
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
                    {formatPrice(selectedProperty.price)}
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
                    This beautiful {selectedProperty.type ? selectedProperty.type.toLowerCase() : 'property'} features modern amenities and 
                    is located in the heart of {selectedProperty.location.split(',')[0]}. 
                    The property has been well-maintained and comes with all necessary furnishings.
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
                      closePropertyDetails();
                    }}
                  >
                    {favorites.includes(selectedProperty.id) ? 'Remove from Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Bottom Section */}
        <div className="mt-16 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Need help finding your dream home?</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our property experts can help you find the perfect property that matches all your requirements.
            </p>
            <button className="mt-6 px-6 py-3 bg-amber-800 hover:bg-amber-900 text-white rounded-lg font-medium transition">
              Contact Our Agents
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Sample data for buy properties
const buyProperties = [
  {
    id: 1,
    title: "Luxury 3BHK Apartment",
    location: "Bandra West, Mumbai",
    price: 12500000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    type: "Apartment",
    rating: 4,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 2,
    title: "Modern 4BHK Villa",
    location: "Whitefield, Bangalore",
    price: 18500000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    type: "Villa",
    rating: 5,
    reviews: 8,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 3,
    title: "Premium Penthouse",
    location: "South Mumbai",
    price: 35000000,
    bedrooms: 3,
    bathrooms: 3,
    area: 3200,
    type: "Penthouse",
    rating: 5,
    reviews: 4,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 4,
    title: "Heritage Bungalow",
    location: "Alibaug",
    price: 18000000,
    bedrooms: 5,
    bathrooms: 4,
    area: 4200,
    type: "Bungalow",
    rating: 5,
    reviews: 5,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 5,
    title: "Gated Community House",
    location: "Pune",
    price: 8500000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    type: "House",
    rating: 4,
    reviews: 6,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 6,
    title: "Luxury Sea-Facing Villa",
    location: "Goa",
    price: 25000000,
    bedrooms: 4,
    bathrooms: 4,
    area: 3800,
    type: "Villa",
    rating: 5,
    reviews: 9,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
];

export default PropertyPage;