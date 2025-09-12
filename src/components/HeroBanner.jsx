// src/components/HeroBanner.jsx
import React from 'react';

const HeroBanner = () => {
  return (
    <div className="w-full">
      <img
        src="/assets/hero-banner.jpg"
        alt="Hero Banner"
        className="w-full h-[400px] object-cover"
      />
    </div>
  );
};

export default HeroBanner;
