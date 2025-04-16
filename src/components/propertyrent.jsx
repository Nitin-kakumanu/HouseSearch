import React, { useState } from 'react';
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
  ChevronDown
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

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
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

  const filteredProperties = rentProperties.filter(property => {
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
                className="bg-white rounded-xl shadow-md overflow-hidden group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <button 
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-amber-50 transition"
                    onClick={() => toggleFavorite(property.id)}
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

                  <button className="mt-6 w-full py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-lg font-medium transition">
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

// Sample data for rent properties
const rentProperties = [
  {
    id: 1,
    title: "Modern 2BHK Apartment",
    location: "Koramangala, Bangalore",
    price: 25000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    type: "Apartment",
    rating: 4,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 2,
    title: "Luxury 3BHK Apartment",
    location: "Bandra West, Mumbai",
    price: 45000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    type: "Apartment",
    rating: 5,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 3,
    title: "Cozy Studio Apartment",
    location: "Connaught Place, Delhi",
    price: 18000,
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    type: "Studio",
    rating: 4,
    reviews: 8,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 4,
    title: "Spacious 3BHK Villa",
    location: "Whitefield, Bangalore",
    price: 55000,
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    type: "Villa",
    rating: 5,
    reviews: 7,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 5,
    title: "Elegant 2BHK Apartment",
    location: "Gurgaon",
    price: 32000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    type: "Apartment",
    rating: 4,
    reviews: 10,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 6,
    title: "Premium 1BHK Apartment",
    location: "Pune",
    price: 22000,
    bedrooms: 1,
    bathrooms: 1,
    area: 700,
    type: "Apartment",
    rating: 3,
    reviews: 5,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
];

export default RentPropertyPage;