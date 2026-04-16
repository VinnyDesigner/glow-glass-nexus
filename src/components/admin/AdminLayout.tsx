import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Eye, Globe, Info, Grid3X3, Users, Building2, FileText,
  ChevronLeft, Save, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroEditor from "./editors/HeroEditor";
import VisionEditor from "./editors/VisionEditor";
import AboutEditor from "./editors/AboutEditor";
import ServicesEditor from "./editors/ServicesEditor";
import UsersEditor from "./editors/UsersEditor";
import DataServicesEditor from "./editors/DataServicesEditor";
import FooterEditor from "./editors/FooterEditor";

const tabs = [
  { id: "hero", label: "Hero Section", icon: LayoutDashboard },
  { id: "vision", label: "BSDI Vision", icon: Eye },
  { id: "about", label: "About BSDI", icon: Info },
  { id: "services", label: "What BSDI Provides", icon: Grid3X3 },
  { id: "users", label: "Who Can Use BSDI", icon: Users },
  { id: "data", label: "Data Services", icon: Building2 },
  { id: "footer", label: "Footer", icon: FileText },
];

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState("hero");
  const navigate = useNavigate();

  const renderEditor = () => {
    switch (activeTab) {
      case "hero": return <HeroEditor />;
      case "vision": return <VisionEditor />;
      case "about": return <AboutEditor />;
      case "services": return <ServicesEditor />;
      case "users": return <UsersEditor />;
      case "data": return <DataServicesEditor />;
      case "footer": return <FooterEditor />;
      default: return null;
    }
  };

  const currentTab = tabs.find((t) => t.id === activeTab);

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col shrink-0">
        <div className="p-5 border-b border-border">
          <h2 className="font-display text-lg font-bold text-foreground">BSDI Admin</h2>
          <p className="text-xs text-muted-foreground mt-1">Content Management</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => navigate("/")}
          >
            <ChevronLeft size={16} />
            Back to Site
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            {currentTab && <currentTab.icon size={20} className="text-primary" />}
            <h1 className="font-display text-lg font-semibold text-foreground">
              {currentTab?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate("/")}>
              <ExternalLink size={14} />
              Portal Page
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderEditor()}
        </main>
      </div>
    </div>
  );
}
