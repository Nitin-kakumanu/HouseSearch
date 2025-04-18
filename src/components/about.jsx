import React from "react";
import { motion } from "framer-motion";
import Navbar from "./navbar";
import Footer from "./footer";
import {
  Users,
  Medal,
  Clock,
  Building,
  Sparkles,
  ChartBar,
  CheckCircle,
  Star,
  Lightbulb,
  MapPin,
  PhoneCall
} from "lucide-react";
import { useEffect } from 'react';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="overflow-x-hidden bg-stone-50 text-gray-800 font-sans">
  <Navbar />
  
  {/* Hero Section */}
  <section className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 text-white py-24 mt-16">
    <div className="max-w-screen-xl mx-auto px-6 text-center">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About UrbanNest
      </motion.h1>
      <motion.p
        className="text-lg max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        India's smart home search engine. We simplify your journey to buy, rent,
        or sell properties, making the process transparent, fast, and accessible.
      </motion.p>
    </div>
  </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1470&q=80"
            alt="About Us Visual"
            className="rounded-2xl shadow-xl"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-block mb-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">Our Story</div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              Built for India, Powered by Tech
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              UrbanNest was born to solve the challenges faced by millions of
              Indians while buying or renting a home. With verified listings,
              powerful filters, and geo-intelligent suggestions, we bring
              efficiency and clarity to your real estate experience.
            </p>
            <p className="text-gray-600">
              From the bustling metros to quiet towns, we connect you with your
              future home—backed by data, driven by design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Sparkles size={28} className="text-amber-800" />
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To empower every Indian to find their ideal home with ease,
                confidence, and joy. Whether you're buying your dream house,
                renting your next space, or selling property, we're here to help you
                make smarter moves.
              </p>
            </motion.div>
            
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Lightbulb size={28} className="text-amber-800" />
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To revolutionize India's real estate experience by creating the most
                trusted, innovative, and user-friendly platform where finding a home
                is a journey of discovery rather than a task of frustration.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">Our Values</div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              What We Stand For
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core values guide everything we do, from the way we build our platform
              to how we interact with our customers and partners.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: "Transparency",
                desc: "No hidden charges, no gimmicks. Just honest listings with clear information.",
                icon: <CheckCircle size={28} className="text-amber-800" />,
              },
              {
                title: "User First",
                desc: "From UI to support, we obsess over making your property journey seamless and satisfying.",
                icon: <Users size={28} className="text-amber-800" />,
              },
              {
                title: "Tech Driven",
                desc: "Our smart search engine learns with you to show what matters most to your home preferences.",
                icon: <ChartBar size={28} className="text-amber-800" />,
              },
              {
                title: "Quality",
                desc: "We verify every listing to ensure you get access to only genuine property options.",
                icon: <Medal size={28} className="text-amber-800" />,
              },
              {
                title: "Responsiveness",
                desc: "Quick responses to your queries and timely updates on property status changes.",
                icon: <Clock size={28} className="text-amber-800" />,
              },
              {
                title: "Accessibility",
                desc: "Making home hunting accessible to everyone across India with multilingual support.",
                icon: <Building size={28} className="text-amber-800" />,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-stone-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition border border-stone-100"
              >
                <div className="bg-amber-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">Our Team</div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Meet the Experts Behind UrbanNest
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our diverse team combines expertise in real estate, technology, and customer service
              to create the best home-finding experience for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80",
              },
              {
                name: "Raj Malhotra",
                role: "Chief Technology Officer",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
              },
              {
                name: "Anita Desai",
                role: "Head of Operations",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
              },
              {
                name: "Vikram Singh",
                role: "Real Estate Director",
                image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?auto=format&fit=crop&w=500&q=80",
              },
            ].map((member, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-lg text-slate-800 group-hover:text-amber-800 transition">{member.name}</h3>
                  <p className="text-amber-800 text-sm mt-1">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">Our Journey</div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Key Milestones
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tracing our growth from a small startup to India's trusted property platform.
            </p>
          </div>
          
          <div className="space-y-12">
            {[
              {
                year: "2018",
                title: "The Beginning",
                description: "UrbanNest was founded with a vision to transform India's real estate experience.",
              },
              {
                year: "2019",
                title: "First 1,000 Users",
                description: "Reached our first milestone of connecting 1,000 families with their dream homes.",
              },
              {
                year: "2020",
                title: "Expanded to 10 Cities",
                description: "Our platform grew to cover major metropolitan areas across India.",
              },
              {
                year: "2022",
                title: "1 Million Monthly Visitors",
                description: "Became one of India's most visited property platforms with verified listings.",
              },
              {
                year: "2024",
                title: "AI-Powered Recommendations",
                description: "Launched next-generation property matching using artificial intelligence.",
              },
            ].map((milestone, i) => (
              <motion.div
                key={i}
                className="flex flex-col md:flex-row gap-6 items-start"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="flex-shrink-0">
                  <div className="bg-amber-100 text-amber-800 font-bold text-xl px-6 py-3 rounded-lg">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-amber-900 to-amber-700 text-white text-center">
        <motion.div
          className="max-w-screen-md mx-auto px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Have Questions? We're Here to Help
          </h2>
          <p className="mb-6 text-lg">
            Our support team is available 7 days a week to assist you with your property search.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-white text-amber-800 font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-amber-50 transition shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <PhoneCall size={18} />
              Contact Us
            </motion.button>
            <motion.button
              className="bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-amber-800 transition flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <MapPin size={18} />
              Find Our Offices
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}