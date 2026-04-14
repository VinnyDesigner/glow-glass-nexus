import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VisionSection from "@/components/VisionSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WhoCanUseSection from "@/components/WhoCanUseSection";
import DataServicesSection from "@/components/DataServicesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <HeroSection />

      <div className="relative z-10">
        <VisionSection />
        <AboutSection />
        <ServicesSection />
        <WhoCanUseSection />
        <DataServicesSection />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
