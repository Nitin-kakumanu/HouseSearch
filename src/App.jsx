// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/home"; 
import AboutPage from "./components/about";
import CartPage from "./components/cart";
import SearchPage from "./components/search";
import CreatePage from "./components/create";
import ProfilePage from "./components/profile";
import PropertiesPage from "./components/Properties";
import Properties from "./components/propertysell";
import Propertyrent from "./components/propertyrent";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/properties/buy" element={<PropertiesPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/properties/sell" element={<Properties />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/properties/rent" element={<Propertyrent />} />
      </Routes>
    </Router>
  );
}

export default App;
