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
    <div className="min-h-screen bg-background gis-grid relative">
      {/* Floating glass orbs for premium background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="glass-orb absolute w-[600px] h-[600px] -top-40 -right-40 animate-float" />
        <div className="glass-orb absolute w-[500px] h-[500px] top-[60%] -left-40 animate-float" style={{ animationDelay: '3s' }} />
        <div className="glass-orb absolute w-[400px] h-[400px] top-[30%] right-[10%] animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <Navbar />
      <HeroSection />

      <div className="relative z-10">
        <div className="glass-divider max-w-5xl mx-auto" />
        <VisionSection />
        <div className="glass-divider max-w-5xl mx-auto" />
        <AboutSection />
        <div className="glass-divider max-w-5xl mx-auto" />
        <ServicesSection />
        <div className="glass-divider max-w-5xl mx-auto" />
        <WhoCanUseSection />
        <div className="glass-divider max-w-5xl mx-auto" />
        <DataServicesSection />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
