import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface VisionCard {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
}

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

export interface UserCard {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
}

export interface StatCard {
  id: string;
  target: string;
  suffix: string;
  label: string;
}

export interface DataEntity {
  id: string;
  name: string;
  logo: string;
  link: string;
}

export interface QuickLink {
  id: string;
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  href: string;
}

export interface HeroTextStyle {
  fontSize?: number;
  fontWeight?: string;
  italic?: boolean;
  color?: string;
}

export interface HeroContent {
  title1: string;
  title2: string;
  subtitle: string;
  overlayOpacity: number;
  backgroundImage?: string;
  heroImages?: string[];
  title1Style?: HeroTextStyle;
  title2Style?: HeroTextStyle;
  subtitleStyle?: HeroTextStyle;
}

export interface VisionContent {
  heading: string;
  description: string;
  cards: VisionCard[];
}

export interface AboutContent {
  heading: string;
  description1: string;
  description2: string;
  stats: StatCard[];
}

export interface ServicesContent {
  heading: string;
  description: string;
  cards: ServiceCard[];
}

export interface UsersContent {
  heading: string;
  description: string;
  cards: UserCard[];
}

export interface DataServicesContent {
  heading: string;
  description: string;
  entities: DataEntity[];
}

export interface FooterContent {
  quickLinks: QuickLink[];
  externalLinks: QuickLink[];
  socialLinks: SocialLink[];
}

export interface LayerCard {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
}

export interface LayersContent {
  heading: string;
  description: string;
  cards: LayerCard[];
}

interface ContentStore {
  hero: HeroContent;
  vision: VisionContent;
  about: AboutContent;
  services: ServicesContent;
  users: UsersContent;
  dataServices: DataServicesContent;
  footer: FooterContent;
  layers: LayersContent;
  updateHero: (data: Partial<HeroContent>) => void;
  updateVision: (data: Partial<VisionContent>) => void;
  updateAbout: (data: Partial<AboutContent>) => void;
  updateServices: (data: Partial<ServicesContent>) => void;
  updateUsers: (data: Partial<UsersContent>) => void;
  updateDataServices: (data: Partial<DataServicesContent>) => void;
  updateFooter: (data: Partial<FooterContent>) => void;
  updateLayers: (data: Partial<LayersContent>) => void;
}

export const defaultHero: HeroContent = {
  title1: "National Spatial",
  title2: "Data Infrastructure",
  subtitle: "Unified geospatial platform for secure data and sharing,\nadvanced analytics, & intelligent decision-making",
  overlayOpacity: 30,
};

export const defaultVision: VisionContent = {
  heading: "BSDI Vision",
  description: "Empowering Bahrain through a unified geospatial ecosystem. Creating a secure, scalable, and collaborative national geospatial infrastructure.",
  cards: [
    { id: "v1", title: "Digital Transformation", description: "Leveraging cutting-edge technologies to modernize Bahrain's infrastructure and drive innovation across all government sectors.", image: "https://images.unsplash.com/photo-1768224656445-33d078c250b7?w=600&q=80" },
    { id: "v2", title: "Geospatial Intelligence", description: "Advanced GIS and GeoAI capabilities enable data-driven insights for strategic planning and resource management.", image: "https://images.unsplash.com/photo-1744968777188-3e1b2ef23339?w=600&q=80" },
    { id: "v3", title: "Smart Cities", description: "Building sustainable, connected urban environments through intelligent spatial planning and 3D visualization.", image: "https://images.unsplash.com/photo-1760553120312-2821bf54e767?w=600&q=80" },
    { id: "v4", title: "Data Governance & Security", description: "Ensuring data integrity, privacy, and secure access through robust governance frameworks and compliance standards.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&q=80" },
  ],
};

export const defaultAbout: AboutContent = {
  heading: "About BSDI",
  description1: "BSDI (Bahrain Spatial Data Infrastructure) is a unified geospatial platform designed to enable secure data sharing, advanced analytics, and intelligent decision-making across government and enterprise sectors.",
  description2: "It brings together GIS, GeoAI, BIM, and governance standards into a single digital ecosystem — ensuring data accuracy, security, and national-level interoperability.",
  stats: [
     { id: "s1", target: "50", suffix: "+", label: "Government Agencies" },
     { id: "s4", target: "Secure", suffix: "", label: "National Standards" },
  ],
};

export const defaultServices: ServicesContent = {
  heading: "What BSDI Provides",
  description: "Comprehensive spatial intelligence solutions for modern government operations",
  cards: [
    { id: "sv1", title: "BSDI Admin Console", description: "To ensure secure, transparent, and efficient management of geospatial services across all government entities.", image: "https://images.unsplash.com/photo-1621421770492-272ae6d7882a?w=600&q=80", tags: ["2D & 3D Maps", "Secure Access"] },
    { id: "sv2", title: "National GeoCatalog Bahrain", description: "To provide standardized metadata management aligned with SDI best practices and international standards.", image: "https://images.unsplash.com/photo-1620662892011-f5c2d523fae2?w=600&q=80", tags: ["AI-Powered", "Spatial Analysis"] },
    { id: "sv3", title: "BSDI Smart Map", description: "To provide a user-friendly interface for viewing and analyzing government geospatial datasets.", image: "https://images.unsplash.com/photo-1760801802787-86f7958c439e?w=600&q=80", tags: ["3D Visualization", "Infrastructure"] },
    { id: "sv4", title: "GeoIntelligence Bahrain", description: "To transform geospatial data into actionable intelligence through spatial modelling.", image: "https://images.unsplash.com/photo-1768839720936-87ce3adf2d08?w=600&q=80", tags: ["Role-Based Access", "Audit Logging"] },
    { id: "sv5", title: "Data Analytics", description: "Advanced insights through visual dashboards and data-driven decision making.", image: "https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?w=600&q=80", tags: ["Visual Dashboards", "Data-Driven"] },
    { id: "sv6", title: "Cloud Infrastructure", description: "Scalable platform with high availability and disaster recovery capabilities.", image: "https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?w=600&q=80", tags: ["High Availability", "Disaster Recovery"] },
    { id: "sv7", title: "Spatial Data APIs & Services", description: "To enable seamless access, integration, and sharing of geospatial data through standardized APIs and web services.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", tags: ["APIs", "Data Sharing"] },
    { id: "sv8", title: "Decision Support Systems", description: "To empower government and stakeholders with data-driven insights for planning, monitoring, and strategic decision-making.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", tags: ["Data-Driven", "Strategic Planning"] },
  ],
};

export const defaultUsers: UsersContent = {
  heading: "Who Can Use BSDI?",
  description: "BSDI is designed for organizations that rely on accurate spatial data, secure collaboration, and intelligent insights.",
  cards: [
    { id: "u1", title: "Government Authorities", description: "Empowering national and local government bodies with comprehensive GIS infrastructure for policy making, urban development, and citizen services.", image: "https://images.unsplash.com/photo-1612165469953-69b4bc7eedbf?w=500&q=80" },
    { id: "u2", title: "Urban Planning Departments", description: "Strategic tools for city planners to visualize growth, manage land use, and create sustainable urban environments with data-driven insights.", image: "https://images.unsplash.com/photo-1760553120324-d3d2bf53852b?w=500&q=80" },
    { id: "u3", title: "Infrastructure & Utilities", description: "Manage critical infrastructure networks including water, electricity, telecommunications, and transportation with real-time spatial monitoring.", image: "https://images.unsplash.com/photo-1765028994202-abd7b1649971?w=500&q=80" },
    { id: "u4", title: "Environmental Agencies", description: "Monitor environmental changes, track natural resources, and implement conservation strategies using advanced geospatial analysis tools.", image: "https://images.unsplash.com/photo-1641392945935-194a6251804a?w=500&q=80" },
    { id: "u5", title: "Transportation & Smart Cities", description: "Optimize traffic flow, plan public transit routes, and build intelligent city systems with integrated transportation data and analytics.", image: "https://images.unsplash.com/photo-1699602050604-698045645108?w=500&q=80" },
    { id: "u6", title: "National Security & Emergency", description: "Enhance response times and coordination during emergencies with real-time location intelligence and secure communication channels.", image: "https://images.unsplash.com/photo-1763888709576-71022f7b2658?w=500&q=80" },
    { id: "u7", title: "Developers & Private Enterprises", description: "Build innovative location-based applications and services using our comprehensive APIs and developer-friendly spatial data infrastructure.", image: "https://images.unsplash.com/photo-1514591792873-8862494066d2?w=500&q=80" },
    { id: "u8", title: "Research & Academia", description: "Access high-quality spatial datasets for academic research, geographic studies, and educational programs in GIS and spatial sciences.", image: "https://images.unsplash.com/photo-1623632306901-e509641e7191?w=500&q=80" },
  ],
};

export const defaultDataServices: DataServicesContent = {
  heading: "Data Services Provided by",
  description: "Find Data Services by their providing entities",
  entities: [
    { id: "d1", name: "Information & eGovernment Authority", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/f605a5e591189376365a30f4b95cd45df42b30e8.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
    { id: "d2", name: "Survey and Land Registration Bureau", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/727daca89e21026342142442add6c9766c555cbb.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
    { id: "d3", name: "Social Insurance Organization", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/f1c6e9c2249bcaeb1e3018078696afc3cfcf52d0.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
    { id: "d4", name: "Tender Board", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/01f965fdea88f9f7d0cced4e43fd8e495d4ffef2.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
    { id: "d5", name: "Ministry of Foreign Affairs", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/f19352d4f262cdb0f5fc7260253177e0bfaae583.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
    { id: "d6", name: "Ministry of Industry and Commerce", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/d0a3949086d392f40ff1edc155daf8aa8b1bcd3b.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
    { id: "d7", name: "Ministry of Transportation and Telecommunications", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/d6aa7287fb342a673e97a0e070843e01698abdc2.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
    { id: "d8", name: "Ministry of Interior", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/8f93324345cc3e00b8122973bbc8251a16de98d9.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
  ],
};

export const defaultFooter: FooterContent = {
  quickLinks: [
    { id: "ql1", label: "Dataset Request", href: "#" },
    { id: "ql2", label: "Open Data Policy", href: "#" },
  ],
  externalLinks: [
    { id: "el1", label: "GCC Statistical Center", href: "https://gccstat.org" },
    { id: "el2", label: "SHAREKNA", href: "https://www.sharekna.bh" },
  ],
  socialLinks: [
    { platform: "Instagram", href: "#" },
    { platform: "Twitter", href: "#" },
    { platform: "Facebook", href: "#" },
    { platform: "LinkedIn", href: "#" },
    { platform: "YouTube", href: "#" },
  ],
};

export const defaultLayers: LayersContent = {
  heading: "Layers",
  description: "Explore the spatial datasets and thematic layers powering Bahrain's geospatial intelligence.",
  cards: [
    { id: "l1", title: "ADDRESSES", description: "Standardized address points across Bahrain.", image: "https://images.unsplash.com/photo-1559060017-445fb9722f2a?w=600&q=80", link: "#" },
    { id: "l2", title: "ADMINBOUNDRY", description: "Administrative boundaries and governorate divisions.", image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=600&q=80", link: "#" },
    { id: "l3", title: "APPROVED_ZONES", description: "Officially approved planning and development zones.", image: "https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?w=600&q=80", link: "#" },
    { id: "l4", title: "BACA", description: "Bahrain Authority for Culture & Antiquities sites.", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&q=80", link: "#" },
    { id: "l5", title: "BBU", description: "Bahrain Bayan University campus and facilities.", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80", link: "#" },
    { id: "l6", title: "BIX", description: "Bahrain Internet Exchange node locations.", image: "https://images.unsplash.com/photo-1573164574511-73c773193279?w=600&q=80", link: "#" },
    { id: "l7", title: "BOTANICAL_ATLAS", description: "Native flora and botanical reference data.", image: "https://images.unsplash.com/photo-1597177884890-ed40ee93f0c6?w=600&q=80", link: "#" },
    { id: "l8", title: "BUILDINGS", description: "Building footprints and structure inventory.", image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=600&q=80", link: "#" },
    { id: "l9", title: "BUS ROUTE", description: "Public bus routes and transit corridors.", image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80", link: "#" },
    { id: "l10", title: "CAA", description: "Civil Aviation Authority airspace data.", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80", link: "#" },
    { id: "l11", title: "CADASTRAL", description: "Land parcels and cadastral survey records.", image: "https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?w=600&q=80", link: "#" },
    { id: "l12", title: "DISTRICT_COOLING", description: "District cooling network infrastructure.", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80", link: "#" },
    { id: "l13", title: "DTM", description: "Digital terrain model elevation data.", image: "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=600&q=80", link: "#" },
    { id: "l14", title: "DUBAISAT2011", description: "Satellite imagery base layer over Bahrain.", image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80", link: "#" },
    { id: "l15", title: "ELECTRICITYANDWATER", description: "Electricity and water utility networks.", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80", link: "#" },
    { id: "l16", title: "EWA_EDD", description: "EWA electricity distribution division assets.", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80", link: "#" },
    { id: "l17", title: "HEALTHSERVICES", description: "Hospitals, clinics and healthcare facilities.", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80", link: "#" },
    { id: "l18", title: "OIL_GAS", description: "Oil and gas fields, pipelines and assets.", image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&q=80", link: "#" },
    { id: "l19", title: "PAVEMENTS", description: "Pavement condition and surface inventory.", image: "https://images.unsplash.com/photo-1597007030739-6d2e7172ee6c?w=600&q=80", link: "#" },
    { id: "l20", title: "POPULATION_DEMOGRAPHY", description: "Population density and demographic layers.", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&q=80", link: "#" },
    { id: "l21", title: "ROAD_DUCTS", description: "Underground road duct network.", image: "https://images.unsplash.com/photo-1518228684816-9135c15ab4ea?w=600&q=80", link: "#" },
    { id: "l22", title: "SEWERAGEANDDRAINAGE", description: "Sewerage and stormwater drainage network.", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80", link: "#" },
    { id: "l23", title: "STREETCENTERLINES", description: "Street centerline reference network.", image: "https://images.unsplash.com/photo-1559060017-445fb9722f2a?w=600&q=80", link: "#" },
    { id: "l24", title: "TELECOM", description: "Telecommunications infrastructure layer.", image: "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=600&q=80", link: "#" },
    { id: "l25", title: "TOPOGRAPHIC", description: "Topographic base map of Bahrain.", image: "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=600&q=80", link: "#" },
    { id: "l26", title: "VEGETATION", description: "Vegetation cover and green space mapping.", image: "https://images.unsplash.com/photo-1597177884890-ed40ee93f0c6?w=600&q=80", link: "#" },
    { id: "l27", title: "ZONES", description: "Land use and planning zone classification.", image: "https://images.unsplash.com/photo-1573164574511-73c773193279?w=600&q=80", link: "#" },
  ],
};

export const useContentStore = create<ContentStore>()(
  persist(
    (set) => ({
      hero: defaultHero,
      vision: defaultVision,
      about: defaultAbout,
      services: defaultServices,
      users: defaultUsers,
      dataServices: defaultDataServices,
      footer: defaultFooter,
      layers: defaultLayers,
      updateHero: (data) => set((s) => ({ hero: { ...s.hero, ...data } })),
      updateVision: (data) => set((s) => ({ vision: { ...s.vision, ...data } })),
      updateAbout: (data) => set((s) => ({ about: { ...s.about, ...data } })),
      updateServices: (data) => set((s) => ({ services: { ...s.services, ...data } })),
      updateUsers: (data) => set((s) => ({ users: { ...s.users, ...data } })),
      updateDataServices: (data) => set((s) => ({ dataServices: { ...s.dataServices, ...data } })),
      updateFooter: (data) => set((s) => ({ footer: { ...s.footer, ...data } })),
      updateLayers: (data) => set((s) => ({ layers: { ...s.layers, ...data } })),
    }),
    {
      name: "bsdi-content",
      merge: (persisted: any, current: any) => {
        const merged = { ...current, ...persisted };
        // Ensure new default vision cards appear
        if (persisted?.vision?.cards) {
          const persistedIds = new Set(persisted.vision.cards.map((c: any) => c.id));
          const newDefaults = defaultVision.cards.filter(c => !persistedIds.has(c.id));
          merged.vision = { ...merged.vision, cards: [...persisted.vision.cards, ...newDefaults] };
        }
        // Ensure layers section exists for users with older persisted state
        if (!persisted?.layers) {
          merged.layers = defaultLayers;
        }
        return merged;
      },
    }
  )
);
