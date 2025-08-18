import React from "react";

import Hero from "./components/Hero";
import Header from "./components/Header";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
    </div>
  );
};

export default LandingPage;
