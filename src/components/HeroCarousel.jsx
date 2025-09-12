// src/components/HeroCarousel.jsx
import React, { useState, useEffect } from "react";

const heroImages = [
  "/assets/hero1.jpg",
  "/assets/hero2.jpg",
  "/assets/hero3.jpg",
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[450px] overflow-hidden">
      {heroImages.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Slide ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            current === idx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Manual navigation arrows */}
      <button
        onClick={() => setCurrent((current - 1 + heroImages.length) % heroImages.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-60 rounded-full p-3"
      >
        ◀
      </button>
      <button
        onClick={() => setCurrent((current + 1) % heroImages.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-60 rounded-full p-3"
      >
        ▶
      </button>
    </div>
  );
};

export default HeroCarousel;
