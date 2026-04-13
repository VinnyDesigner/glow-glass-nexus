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
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <VisionSection />
      <AboutSection />
      <ServicesSection />
      <WhoCanUseSection />
      <DataServicesSection />
      <Footer />
    </div>
  );
};

export default Index;
