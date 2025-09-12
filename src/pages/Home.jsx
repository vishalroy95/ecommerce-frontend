// // src/pages/Home.jsx
// import React from "react";
// import HeroCarousel from "../components/HeroCarousel";

// const Home = () => {
//   return (
//     <div>
//       <HeroCarousel />
//       {/* You can add additional sections below */}
//     </div>
//   );
// };

// export default Home;



// src/pages/Home.jsx
import React from "react";
import HeroCarousel from "../components/HeroCarousel";
import BestDeals from "../components/BestDeals"; // ⬅️ import the section

const Home = () => {
  return (
    <div>
      <HeroCarousel />

      {/* Best Deals Section */}
      <BestDeals />

      {/* You can add more sections here later like Trending, New Arrivals, etc. */}
    </div>
  );
};

export default Home;




// import React from "react";
// import HeroBanner from "../components/HeroBanner";
// import BestDeals from "../components/BestDeals";


// const Home = () => {
//   return (
//     <div>
      
//       <HeroBanner />
//       <BestDeals /> {/* Yeh wahi component hai jisme tu chah raha product listing ho */}
      
//     </div>
//   );
// };

// export default Home;
