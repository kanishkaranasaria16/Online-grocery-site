import React from "react";
import "./about.css";
import banner from '../IMAGE/aboutus.webp'

const AboutUs = () => {
  return (
    <div>
    
    <div className="about-us-container">
      {/* Banner Section */}
      <div className="banner-section">
        <img 
          src={banner} 
          alt="About Us Banner" 
          className="banner-image" 
        />
        <div className="banner-overlay">
          <h1>About Us</h1>
        </div>
      </div>

      {/* About Us Content */}
      <div className="content-section">
        <h2>Welcome to Our Store</h2>
        <p>
          We are a leading eCommerce store offering a wide range of products to cater
          to your every need. Our journey started with a simple vision: to create a 
          seamless shopping experience for everyone, everywhere.
        </p>
        <p>
          Our dedicated team works tirelessly to provide you with high-quality
          products, exceptional customer service, and the best online shopping
          experience.
        </p>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
