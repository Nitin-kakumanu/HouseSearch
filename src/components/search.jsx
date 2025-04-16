import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./navbar";
import Footer from "./footer";
import { Search, MapPin, Home, Heart, Bed, Bath, Square, Star } from "lucide-react";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);

  const properties = [
    {
      id: 1,
      title: "2BHK Apartment in Mumbai",
      location: "Bandra West, Mumbai",
      type: "Apartment",
      price: 45000,
      bedrooms: 2,
      bathrooms: 2,
      area: 950,
      purpose: "Rent",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      title: "3BHK Villa in Bangalore",
      location: "Whitefield, Bangalore",
      type: "Villa",
      price: 12000000,
      bedrooms: 3,
      bathrooms: 3,
      area: 1850,
      purpose: "Buy",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 3,
      title: "Studio Flat in Delhi",
      location: "Connaught Place, Delhi",
      type: "Studio",
      price: 18000,
      bedrooms: 1,
      bathrooms: 1,
      area: 450,
      purpose: "Rent",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 4,
      title: "4BHK House in Pune",
      location: "Koregaon Park, Pune",
      type: "House",
      price: 8500000,
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      purpose: "Buy",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 5,
      title: "1BHK Apartment in Hyderabad",
      location: "Gachibowli, Hyderabad",
      type: "Apartment",
      price: 22000,
      bedrooms: 1,
      bathrooms: 1,
      area: 650,
      purpose: "Rent",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 6,
      title: "5BHK Farmhouse in Gurgaon",
      location: "Sohna Road, Gurgaon",
      type: "Farmhouse",
      price: 25000000,
      bedrooms: 5,
      bathrooms: 4,
      area: 3500,
      purpose: "Buy",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredProperties([]);
      return;
    }

    const results = properties.filter(property => {
      const query = searchQuery.toLowerCase();
      return (
        property.title.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query) ||
        property.type.toLowerCase().includes(query) ||
        property.purpose.toLowerCase().includes(query) ||
        property.price.toString().includes(query) ||
        property.bedrooms.toString().includes(query)
      );
    });

    setFilteredProperties(results);
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

  return (
    <div className="bg-stone-50 min-h-screen">
      <Navbar />
      
      <div className="max-w-6xl my-24 mx-auto px-4 py-12">
        {/* Search Bar */}
        <motion.div 
          className="bg-white shadow-lg rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-amber-800" size={20} />
              <input
                type="text"
                placeholder="Search by location, property type, price, etc..."
                className="w-full pl-12 pr-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-amber-800 hover:bg-amber-900 text-white px-6 py-3 rounded-lg transition font-medium flex items-center justify-center"
            >
              <Search size={20} className="mr-2" />
              Search
            </button>
          </div>
        </motion.div>

        {/* Results */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <motion.div
                key={property.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-56 object-cover"
                  />
                  <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-amber-50 transition">
                    <Heart size={20} className="text-amber-800" />
                  </button>
                  <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent w-full h-20"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-amber-800 text-white px-3 py-1 rounded-full text-sm">
                      For {property.purpose}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-slate-800">{property.title}</h3>
                      <p className="text-gray-500 text-sm mt-1 flex items-center">
                        <MapPin size={14} className="mr-1" /> {property.location}
                      </p>
                    </div>
                    <p className="text-amber-800 font-semibold">
                      {property.purpose === "Rent" 
                        ? `₹${property.price.toLocaleString()}/month` 
                        : formatPrice(property.price)}
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
                        <Star key={i} size={16} fill={i < 4 ? "#f59e0b" : "none"} stroke="#f59e0b" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(12 reviews)</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-12">
            <div className="bg-amber-50 inline-flex p-4 rounded-full mb-4">
              <Search className="h-8 w-8 text-amber-800" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No properties found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search query</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilteredProperties([]);
              }}
              className="text-amber-800 font-medium hover:text-amber-900"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-amber-50 inline-flex p-4 rounded-full mb-4">
              <Home className="h-8 w-8 text-amber-800" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Search for properties</h3>
            <p className="text-gray-500">Enter location, property type, price range, etc. to find your perfect home</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchPage;