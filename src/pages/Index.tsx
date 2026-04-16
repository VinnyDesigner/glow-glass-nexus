import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VisionSection from "@/components/VisionSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WhoCanUseSection from "@/components/WhoCanUseSection";
import DataServicesSection from "@/components/DataServicesSection";
import Footer from "@/components/Footer";
import bahrainSkyline from "@/assets/bahrain-skyline-outline.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <HeroSection />

      <div className="relative z-10">
        <ServicesSection />
        <AboutSection />
        <VisionSection />
        <WhoCanUseSection />
        <DataServicesSection />
      </div>

      <div className="flex justify-center mb-0">
        <img src={bahrainSkyline} alt="Bahrain Skyline" className="w-auto max-w-4xl h-auto opacity-30" />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
