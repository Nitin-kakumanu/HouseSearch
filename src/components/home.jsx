import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { Star } from 'lucide-react';
import { motion } from "framer-motion";
import {
  Home,
  Search,
  MapPin,
  PhoneCall,
  Building2,
  Landmark,
  Lightbulb,
  ShoppingCart,
  DollarSign,
  Heart,
  Calendar
} from "lucide-react";



export default function HomePage() {
  const handleViewAllListings = () => {
    navigate('/properties');
  };
  return (
    <div className="overflow-x-hidden bg-stone-50 text-gray-800 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative bg-center bg-cover h-[90vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-white text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Find Your <span className="text-amber-700">Perfect</span> Home
          </h1>
          <p className="text-slate-100 text-lg md:text-xl max-w-2xl mx-auto drop-shadow mb-8">
            Explore thousands of homes and apartments available for rent or sale.
            Verified listings. Smart filters. Instant connections.
          </p>
          <motion.button
            className="mt-4 px-8 py-3 bg-amber-800 text-white rounded-lg shadow-lg hover:bg-amber-900 transition"
            whileHover={{ scale: 1.05 }}
          >
            Explore Listings
          </motion.button>
        </motion.div>
      </section>

      {/* Recommendation Section */}
      <section className="bg-white py-20">
        <div className="max-w-screen-xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Section: Get Home Recommendations */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">Personalized For You</div>
            <h3 className="text-3xl font-semibold text-slate-800 mb-4">Get Home Recommendations</h3>
            <p className="text-gray-700">
              We'll suggest homes based on your preferences, desired location, and budget. Create an account to get started with personalized recommendations.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <motion.button
                className="px-6 py-3 bg-amber-800 text-white rounded-lg shadow-md hover:bg-amber-900 transition"
                whileHover={{ scale: 1.03 }}
              >
                Sign In
              </motion.button>
              
              <motion.button
                className="px-6 py-3 border border-amber-800 text-amber-800 rounded-lg hover:bg-amber-50 transition"
                whileHover={{ scale: 1.03 }}
              >
                Create Account
              </motion.button>
            </div>
          </motion.div>

          {/* Right Section: Image */}
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <img
              src="https://www.zillowstatic.com/s3/web-platform/sub-apps/hops-homepage/hops-homepage.prod.master.9040452.1ff639a6/web/1d9d5bce566c85fa242cb21ad3292cb8.webp"
              alt="Home Recommendations"
              className="rounded-xl shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Find Homes Section */}
      <section className="bg-stone-100 py-20">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <div className="inline-block mb-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">Featured Properties</div>
          <h2 className="text-3xl font-semibold text-slate-800 mb-4">Find Your Perfect Home</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">Browse our hand-picked premium listings available for rent or sale across India's top cities.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all group overflow-hidden"
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img
                  src="https://media.istockphoto.com/id/155396123/photo/ranthambhore-np-in-rajasthan-india.jpg?s=612x612&w=0&k=20&c=LnWdEYBvIvLVURZUdUJuRlKM5pSl-JpR8M_uxNF_71E="
                  alt="2-BHK Apartment in Mumbai"
                  className="w-full h-64 object-cover"
                />
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-amber-50 transition">
                  <Heart size={20} className="text-amber-800" />
                </button>
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent w-full h-20"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-amber-800 text-white px-3 py-1 rounded-full text-sm">For Rent</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg text-slate-800 group-hover:text-amber-800 transition">2-BHK Apartment in Mumbai</h4>
                    <p className="text-gray-500 text-sm mt-1 flex items-center">
                      <MapPin size={14} className="mr-1" /> Bandra West, Mumbai
                    </p>
                  </div>
                  <p className="text-amber-800 font-semibold">₹45,000/month</p>
                </div>
                
                <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between text-sm text-gray-600">
                  <span>2 Beds</span>
                  <span>2 Baths</span>
                  <span>950 sq.ft</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all group overflow-hidden"
              initial={{ y: -60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img
                  src="https://media.istockphoto.com/id/157533612/photo/indian-palace.jpg?s=612x612&w=0&k=20&c=6Q2B7L2iSiYihFfMtDpNi9V0RSSECCV-vXhlLTf9t6s="
                  alt="3-BHK Villa in Bangalore"
                  className="w-full h-64 object-cover"
                />
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-amber-50 transition">
                  <Heart size={20} className="text-amber-800" />
                </button>
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent w-full h-20"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-amber-800 text-white px-3 py-1 rounded-full text-sm">For Sale</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg text-slate-800 group-hover:text-amber-800 transition">3-BHK Villa in Bangalore</h4>
                    <p className="text-gray-500 text-sm mt-1 flex items-center">
                      <MapPin size={14} className="mr-1" /> Whitefield, Bangalore
                    </p>
                  </div>
                  <p className="text-amber-800 font-semibold">₹1.2 Cr</p>
                </div>
                
                <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between text-sm text-gray-600">
                  <span>3 Beds</span>
                  <span>3 Baths</span>
                  <span>1850 sq.ft</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all group overflow-hidden"
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img
                  src="https://media.istockphoto.com/id/175391091/photo/ranthambhore-np-in-rajasthan-india.jpg?s=612x612&w=0&k=20&c=86MVH1uCNFXO9WRlJ78U7dYPxGNkcKSyQm0ekyEj5zc=" 
                  alt="Studio Flat in Delhi"
                  className="w-full h-64 object-cover"
                />
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-amber-50 transition">
                  <Heart size={20} className="text-amber-800" />
                </button>
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent w-full h-20"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-amber-800 text-white px-3 py-1 rounded-full text-sm">For Rent</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg text-slate-800 group-hover:text-amber-800 transition">Studio Flat in Delhi</h4>
                    <p className="text-gray-500 text-sm mt-1 flex items-center">
                      <MapPin size={14} className="mr-1" /> Connaught Place, Delhi
                    </p>
                  </div>
                  <p className="text-amber-800 font-semibold">₹18,000/month</p>
                </div>
                
                <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between text-sm text-gray-600">
                  <span>1 Bed</span>
                  <span>1 Bath</span>
                  <span>450 sq.ft</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.button
            className="mt-12 px-8 py-3 bg-amber-800 text-white rounded-lg shadow-md hover:bg-amber-900 transition"
            whileHover={{ scale: 1.05 }}
            onClick={handleViewAllListings}
          >
            View All Listings
          </motion.button>
        </div>
      </section>

      {/* Buy a Home / Sell a Home / Rent a Home Section */}
      <section className="bg-white py-20">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <div className="inline-block mb-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">Our Services</div>
          <h2 className="text-3xl font-semibold text-slate-800 mb-10">How We Can Help You</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Buy a Home",
                bg: "bg-amber-50",
                btnBg: "bg-amber-800",
                btnHover: "hover:bg-amber-900",
                borderColor: "border-amber-200",
                icon: <Home size={32} className="text-amber-800" />,
                image:
                  "https://media.istockphoto.com/id/1409298953/photo/real-estate-agents-shake-hands-after-the-signing-of-the-contract-agreement-is-complete.jpg?s=612x612&w=0&k=20&c=SFybbpGMB0wIoI0tJotFqptzAYK_mICVITNdQIXqnyc=",
                buttonText: "Start Buying",
              },
              {
                title: "Sell a Home",
                bg: "bg-amber-50",
                btnBg: "bg-amber-800",
                btnHover: "hover:bg-amber-900",
                borderColor: "border-amber-200",
                icon: <DollarSign size={32} className="text-amber-800" />,
                image:
                  "https://media.istockphoto.com/id/171021377/photo/for-sale-sign-in-yard-of-house.jpg?s=612x612&w=0&k=20&c=4qhQYHOBROsTnP-63dQja5oCWT1mL8hEO0hbTDVDiKI=",
                buttonText: "Start Selling",
              },
              {
                title: "Rent a Home",
                bg: "bg-amber-50",
                btnBg: "bg-amber-800",
                btnHover: "hover:bg-amber-900",
                borderColor: "border-amber-200",
                icon: <Calendar size={32} className="text-amber-800" />,
                image:
                  "https://media.istockphoto.com/id/178150004/photo/smiling-hispanic-family-outside-rental-home.jpg?s=612x612&w=0&k=20&c=gNTKBytu6Akft5lp8QnLhIpHHb73c3Z0JvpbzEMql74=",
                buttonText: "Start Renting",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className={`${item.bg} p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border ${item.borderColor}`}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.3 }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mt-2 text-slate-800">{item.title}</h3>
                <p className="text-gray-700 mt-3 mb-6">
                  {item.title === "Buy a Home" &&
                    "Find your dream home with expert guidance and support throughout your buying journey."}
                  {item.title === "Sell a Home" &&
                    "List your property and reach thousands of verified potential buyers with our trusted platform."}
                  {item.title === "Rent a Home" &&
                    "Browse quality rental listings and find the perfect space to call home today."}
                </p>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <motion.button
                  className={`px-6 py-3 ${item.btnBg} text-white rounded-lg shadow-md ${item.btnHover} transition w-full`}
                  whileHover={{ scale: 1.03 }}
                >
                  {item.buttonText}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="bg-stone-100 py-24">
        <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.img
            src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1470&q=80"
            alt="Modern home interior"
            className="rounded-2xl shadow-xl"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">Premium Experience</div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">
              Explore Premium Listings
            </h2>
            <p className="text-gray-700 mb-6">
              Experience homes like never before with interactive virtual tours, detailed floor plans, and comprehensive neighborhood information before scheduling a visit.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-amber-100 p-2 rounded-full mr-4 mt-1">
                  <Lightbulb size={20} className="text-amber-800" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-800">360° Virtual Tours</h3>
                  <p className="text-gray-600 text-sm">Explore every corner of the property from the comfort of your home.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-amber-100 p-2 rounded-full mr-4 mt-1">
                  <MapPin size={20} className="text-amber-800" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-800">Walkability Scores</h3>
                  <p className="text-gray-600 text-sm">Know how accessible essential amenities are from your potential home.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-amber-100 p-2 rounded-full mr-4 mt-1">
                  <DollarSign size={20} className="text-amber-800" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-800">Live Price Updates</h3>
                  <p className="text-gray-600 text-sm">Stay informed with real-time market value changes and pricing trends.</p>
                </div>
              </div>
            </div>
            
            <motion.button
              className="mt-8 px-6 py-3 bg-amber-800 text-white rounded-lg shadow-md hover:bg-amber-900 transition"
              whileHover={{ scale: 1.05 }}
            >
              Explore Premium
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-screen-xl mx-auto px-6 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">Our Benefits</div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Why Choose UrbanNest</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We simplify your home search with verified listings, trusted partners, and innovative tools to make finding your next home a breeze.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Home size={32} className="text-amber-800" />,
              title: "Verified Properties",
              text: "Every listing is verified by our team to ensure you only see genuine options.",
            },
            {
              icon: <Search size={32} className="text-amber-800" />,
              title: "Advanced Search",
              text: "Find your ideal home using our powerful filters for area, price, and more.",
            },
            {
              icon: <MapPin size={32} className="text-amber-800" />,
              title: "Location Smart",
              text: "Discover properties in your desired neighborhoods with precise location mapping.",
            },
            {
              icon: <Building2 size={32} className="text-amber-800" />,
              title: "Commercial Spaces",
              text: "Browse verified shops, offices, and commercial buildings for your business.",
            },
            {
              icon: <Landmark size={32} className="text-amber-800" />,
              title: "Trusted Agencies",
              text: "Connect with top-rated, verified real estate professionals in your area.",
            },
            {
              icon: <PhoneCall size={32} className="text-amber-800" />,
              title: "Support 24/7",
              text: "Our dedicated support team is always available to assist with your queries.",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-xl shadow-md hover:shadow-xl p-8 text-center transition border border-stone-100"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="bg-amber-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mt-2 text-slate-800">{feature.title}</h3>
              <p className="text-gray-600 mt-3">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">Testimonials</div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from people who found their perfect homes through UrbanNest.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Anika Patel",
                location: "Mumbai",
                quote: "UrbanNest helped me find my dream apartment in just two weeks. The filters are so precise that every property I viewed was worth considering.",
              },
              {
                name: "Rahul Verma",
                location: "Bangalore",
                quote: "As a first-time home buyer, I was nervous about the process. UrbanNest guided me through every step with verified listings and responsive support.",
              },
              {
                name: "Meera & Suresh",
                location: "Delhi",
                quote: "We needed to relocate quickly for work. UrbanNest's rental options were plentiful and legitimate - no time wasted on fake listings.",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition border border-stone-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#f59e0b" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="ml-3">
                    <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm flex items-center">
                      <MapPin size={12} className="mr-1" /> {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-amber-800 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Find Your Perfect Home?
            </h2>
            <p className="text-amber-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who found their dream homes through UrbanNest.
              Start your journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-3 bg-white text-amber-800 font-medium rounded-lg shadow-lg hover:bg-amber-50 transition"
                whileHover={{ scale: 1.05 }}
              >
                Browse Listings
              </motion.button>
              <motion.button
                className="px-8 py-3 bg-transparent text-white border border-white rounded-lg hover:bg-amber-700 transition"
                whileHover={{ scale: 1.05 }}
              >
                Contact Agent
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}