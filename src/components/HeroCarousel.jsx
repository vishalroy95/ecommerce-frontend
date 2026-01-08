// // src/components/HeroCarousel.jsx
// import React, { useState, useEffect } from "react";

// const heroImages = [
//   "/assets/hero1.jpg",
//   "/assets/hero2.jpg",
//   "/assets/hero3.jpg",
// ];

// const HeroCarousel = () => {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % heroImages.length);
//     }, 5000); 
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative w-full h-[450px] overflow-hidden">
//       {heroImages.map((src, idx) => (
//         <img
//           key={idx}
//           src={src}
//           alt={`Slide ${idx + 1}`}
//           className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
//             current === idx ? "opacity-100" : "opacity-0"
//           }`}
//         />
//       ))}

//       {/* Manual navigation arrows */}
//       <button
//         onClick={() => setCurrent((current - 1 + heroImages.length) % heroImages.length)}
//         className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-60 rounded-full p-3"
//       >
//         ◀
//       </button>
//       <button
//         onClick={() => setCurrent((current + 1) % heroImages.length)}
//         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-60 rounded-full p-3"
//       >
//         ▶
//       </button>
//     </div>
//   );
// };

// export default HeroCarousel;




//  responsive



// src/components/HeroCarousel.jsx
import React, { useState, useEffect, useRef } from "react";

const heroImages = [
  "/assets/hero1.jpg",
  "/assets/hero2.jpg",
  "/assets/hero3.jpg",
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);

  // auto slide
  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [paused]);

  // swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      setCurrent((current + 1) % heroImages.length);
    } else if (diff < -50) {
      setCurrent(
        (current - 1 + heroImages.length) % heroImages.length
      );
    }
  };

  return (
    <div
      className="
        relative w-full overflow-hidden
        h-[180px] sm:h-[260px] md:h-[360px] lg:h-[450px]
      "
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
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

      {/* Left Arrow */}
      <button
        onClick={() =>
          setCurrent(
            (current - 1 + heroImages.length) % heroImages.length
          )
        }
        className="
          absolute left-3 sm:left-5 top-1/2 -translate-y-1/2
          w-10 h-10 sm:w-12 sm:h-12
          bg-black/60 hover:bg-black/80
          text-white
          rounded-full
          flex items-center justify-center
          backdrop-blur
          shadow-lg
          transition
        "
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={() =>
          setCurrent((current + 1) % heroImages.length)
        }
        className="
          absolute right-3 sm:right-5 top-1/2 -translate-y-1/2
          w-10 h-10 sm:w-12 sm:h-12
          bg-black/60 hover:bg-black/80
          text-white
          rounded-full
          flex items-center justify-center
          backdrop-blur
          shadow-lg
          transition
        "
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              current === idx
                ? "bg-white"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;

