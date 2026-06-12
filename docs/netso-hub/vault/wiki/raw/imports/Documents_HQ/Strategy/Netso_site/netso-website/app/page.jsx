"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import RooftopLounge from "./sections/RooftopLounge";
import DesignedForBD from "./sections/DesignedForBD";
import HowItWorks from "./sections/HowItWorks";
import Solutions from "./sections/Solutions";
import SeeYourSavings from "./sections/SeeYourSavings";
import SmartMonitoring from "./sections/SmartMonitoring";
import RecentInstallations from "./sections/RecentInstallations";
import PartnerWithNetso from "./sections/PartnerWithNetso";
import MissionScroll from "./sections/MissionScroll";
import Pricing from "./sections/Pricing";
import ContactCTA from "./sections/ContactCTA";
import Footer from "./sections/Footer";
import FinancingCalculatorModal from "./components/FinancingCalculatorModal";

export default function Home() {
  const [openCalc, setOpenCalc] = useState(false);

  return (
    <main className="bg-gray-950">
      <Navbar onOpenCalculator={() => setOpenCalc(true)} />
      <Hero onOpenCalculator={() => setOpenCalc(true)} />
      <About />
      <RooftopLounge />
      <DesignedForBD />
      <HowItWorks />
      <Solutions />
      <SeeYourSavings onOpenCalculator={() => setOpenCalc(true)} />
      <SmartMonitoring />
      <RecentInstallations />
      <PartnerWithNetso />
      <MissionScroll />
      <Pricing onOpenCalculator={() => setOpenCalc(true)} />
      <ContactCTA onOpenCalculator={() => setOpenCalc(true)} />
      <Footer />
      <FinancingCalculatorModal 
        open={openCalc} 
        onClose={() => setOpenCalc(false)} 
      />
    </main>
  );
}
