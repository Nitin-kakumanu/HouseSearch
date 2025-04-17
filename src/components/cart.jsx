import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Bed,
  Bath,
  Square,
  ShoppingCart,
  Trash2,
  ArrowLeft,
  X,
  Star,
  Home
} from 'lucide-react';
import Navbar from './navbar';
import Footer from './footer';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const loadCart = () => {
      try {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Error loading cart from local storage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  const removeFromCart = (propertyId) => {
    const updatedCart = cart.filter(property => property.id !== propertyId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    if (selectedProperty?.id === propertyId) {
      setSelectedProperty(null);
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    setSelectedProperty(null);
  };

  const formatPrice = (price, isRent = false) => {
    if (!price) return '';
    
    if (isRent) {
      return `₹${price.toLocaleString()}/month`;
    }
    
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} Lakh`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-amber-800">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto my-24 py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Saved Properties</h1>
            <p className="text-gray-600 mt-1">
              {cart.length} {cart.length === 1 ? 'property' : 'properties'} saved
            </p>
          </div>
          
          <div className="flex space-x-4">
            <Link to="/" className="flex items-center px-4 py-2 text-amber-800 border border-amber-800 rounded-lg hover:bg-amber-50">
              <ArrowLeft size={18} className="mr-2" />
              Continue Browsing
            </Link>
            
            {cart.length > 0 && (
              <button 
                className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
                onClick={clearCart}
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Cart Contents */}
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {cart.map((property) => (
              <motion.div
                key={property.id}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedProperty(property)}
              >
                <div className="p-6 flex flex-col sm:flex-row gap-4">
                  {/* Property Image */}
                  <div className="sm:w-1/4">
                    <img
                      src={property.image || "/api/placeholder/400/320"}
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Property Details */}
                  <div className="sm:w-3/4">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-xl text-gray-800">
                        {property.title}
                      </h3>
                      <button 
                        className="text-gray-400 hover:text-red-500 ml-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCart(property.id);
                        }}
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <p className="text-gray-500 text-sm mt-1 flex items-center">
                      <MapPin size={14} className="mr-1" /> {property.location}
                    </p>
                    
                    <div className="mt-4 flex gap-6 text-sm text-gray-600">
                      {property.bedrooms && (
                        <span className="flex items-center">
                          <Bed size={16} className="mr-1" /> {property.bedrooms} Beds
                        </span>
                      )}
                      {property.bathrooms && (
                        <span className="flex items-center">
                          <Bath size={16} className="mr-1" /> {property.bathrooms} Baths
                        </span>
                      )}
                      {property.area && (
                        <span className="flex items-center">
                          <Square size={16} className="mr-1" /> {property.area} sq.ft
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-4 flex justify-between items-end">
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                          property.forRent 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {property.forRent ? 'For Rent' : 'For Sale'}
                        </span>
                      </div>
                      
                      <div className="text-amber-800 font-semibold text-lg">
                        {property.forRent 
                          ? formatPrice(property.price, true)
                          : formatPrice(property.price)
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">You haven't saved any properties yet</h2>
            <p className="text-gray-600 mb-8">Browse our listings and save properties you're interested in</p>
            <Link to="/" className="px-6 py-3 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition">
              Browse Properties
            </Link>
          </div>
        )}
      </div>

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
                src={selectedProperty.image || "/api/placeholder/400/320"}
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
              <span className={`px-3 py-1 rounded-full text-sm ${
  selectedProperty.forRent 
    ? 'bg-blue-100 text-blue-800' 
    : 'bg-green-100 text-green-800'
}`}>
  {selectedProperty.forRent ? 'For Rent' : 'For Sale'}
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
                  {selectedProperty.forRent 
                    ? formatPrice(selectedProperty.price, true)
                    : formatPrice(selectedProperty.price)
                  }
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
                  This beautiful {selectedProperty.type?.toLowerCase() || 'property'} features modern amenities and 
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
                        fill={i < (selectedProperty.rating || 4) ? "#f59e0b" : "none"} 
                        stroke="#f59e0b" 
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({selectedProperty.reviews || 0} reviews)</span>
                </div>
                <button 
                  className="px-6 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-lg font-medium transition"
                  onClick={() => {
                    removeFromCart(selectedProperty.id);
                    setSelectedProperty(null);
                  }}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CartPage;