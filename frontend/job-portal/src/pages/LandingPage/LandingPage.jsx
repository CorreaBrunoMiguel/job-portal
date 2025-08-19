import React from "react";

import Hero from "./components/Hero";
import Header from "./components/Header";
import Features from "./components/Features";
import Analytics from "./components/Analytics";

const LandingPage = () => {
  return (
    <div className="mb-[100vh] min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Analytics />
    </div>
  );
};

export default LandingPage;
