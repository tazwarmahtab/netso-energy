import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DesignedForBangladesh from './components/DesignedForBangladesh';
import RooftopLounge from './components/RooftopLounge';
import HowItWorks from './components/HowItWorks';
import Solutions from './components/Solutions';
import SavingsCalculator from './components/SavingsCalculator';
import RecentInstallations from './components/RecentInstallations';
import SmartMonitoring from './components/SmartMonitoring';
import PartnerProgram from './components/PartnerProgram';
import Pricing from './components/Pricing';
import SmartStorage from './components/SmartStorage';
import PassiveIncome from './components/PassiveIncome';
import { ReactLenis } from 'lenis/react';

function App() {
  return (
    <ReactLenis root>
      <div className="bg-white min-h-screen">
        <Navbar />
        <Hero />
        <DesignedForBangladesh />
        <RooftopLounge />
        <HowItWorks />
        <Solutions />
        <SavingsCalculator />
        <RecentInstallations />
        <SmartMonitoring />
        <Pricing />
        <SmartStorage />
        <PassiveIncome />
        <PartnerProgram />
      </div>
    </ReactLenis>
  );
}

export default App;
