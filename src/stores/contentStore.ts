import { create } from "zustand";
import { persist } from "zustand/middleware";
import bahrainMapView from "@/assets/bahrain-map-view.png";

// ============= Types =============

export interface VisionCard {
  id: string;
  title: string;
  title_ar?: string;
  description: string;
  description_ar?: string;
  image: string;
  link?: string;
}

export interface ServiceCard {
  id: string;
  title: string;
  title_ar?: string;
  description: string;
  description_ar?: string;
  image: string;
  tags: string[];
  tags_ar?: string[];
  link?: string;
}

export interface UserCard {
  id: string;
  title: string;
  title_ar?: string;
  description: string;
  description_ar?: string;
  image: string;
  link?: string;
}

export interface StatCard {
  id: string;
  target: string;
  suffix: string;
  label: string;
  label_ar?: string;
}

export interface DataEntity {
  id: string;
  name: string;
  name_ar?: string;
  logo: string;
  link: string;
}

export interface QuickLink {
  id: string;
  label: string;
  label_ar?: string;
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
  fontFamily?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  title_ar?: string;
  excerpt: string;
  excerpt_ar?: string;
  date: string;
  image: string;
  link?: string;
  priorityPreview?: boolean;
}

export interface NewsContent {
  heading: string;
  heading_ar?: string;
  description: string;
  description_ar?: string;
  items: NewsItem[];
  headingStyle?: HeroTextStyle;
  descriptionStyle?: HeroTextStyle;
  headingStyleAr?: HeroTextStyle;
  descriptionStyleAr?: HeroTextStyle;
}

export interface MapViewContent {
  heading: string;
  heading_ar?: string;
  description: string;
  description_ar?: string;
  ctaLabel: string;
  ctaLabel_ar?: string;
  ctaHref: string;
  previewImage: string;
  headingStyle?: HeroTextStyle;
  descriptionStyle?: HeroTextStyle;
  headingStyleAr?: HeroTextStyle;
  descriptionStyleAr?: HeroTextStyle;
}

export interface HeroContent {
  title1: string;
  title1_ar?: string;
  title2: string;
  title2_ar?: string;
  subtitle: string;
  subtitle_ar?: string;
  overlayOpacity: number;
  backgroundImage?: string;
  heroImages?: string[];
  title1Style?: HeroTextStyle;
  title2Style?: HeroTextStyle;
  subtitleStyle?: HeroTextStyle;
  title1StyleAr?: HeroTextStyle;
  title2StyleAr?: HeroTextStyle;
  subtitleStyleAr?: HeroTextStyle;
}

export interface SectionStyles {
  headingStyle?: HeroTextStyle;
  descriptionStyle?: HeroTextStyle;
  headingStyleAr?: HeroTextStyle;
  descriptionStyleAr?: HeroTextStyle;
}

export interface VisionContent extends SectionStyles {
  heading: string;
  heading_ar?: string;
  description: string;
  description_ar?: string;
  cards: VisionCard[];
}

export interface AboutContent extends SectionStyles {
  heading: string;
  heading_ar?: string;
  description1: string;
  description1_ar?: string;
  description2: string;
  description2_ar?: string;
  stats: StatCard[];
}

export interface ServicesContent extends SectionStyles {
  heading: string;
  heading_ar?: string;
  description: string;
  description_ar?: string;
  cards: ServiceCard[];
}

export interface UsersContent extends SectionStyles {
  heading: string;
  heading_ar?: string;
  description: string;
  description_ar?: string;
  cards: UserCard[];
}

export interface DataServicesContent extends SectionStyles {
  heading: string;
  heading_ar?: string;
  description: string;
  description_ar?: string;
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
  title_ar?: string;
  description: string;
  description_ar?: string;
  image: string;
  link?: string;
  detailedDescription?: string;
  detailedDescription_ar?: string;
  category?: string;
  category_ar?: string;
  lastUpdated?: string;
  source?: string;
  tags?: string[];
  tags_ar?: string[];
  mapLayerId?: string;
}

export interface LayersContent extends SectionStyles {
  heading: string;
  heading_ar?: string;
  description: string;
  description_ar?: string;
  cards: LayerCard[];
}

export interface AuthContent {
  loginBackground: string;
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
  news: NewsContent;
  mapView: MapViewContent;
  auth: AuthContent;
  updateHero: (data: Partial<HeroContent>) => void;
  updateVision: (data: Partial<VisionContent>) => void;
  updateAbout: (data: Partial<AboutContent>) => void;
  updateServices: (data: Partial<ServicesContent>) => void;
  updateUsers: (data: Partial<UsersContent>) => void;
  updateDataServices: (data: Partial<DataServicesContent>) => void;
  updateFooter: (data: Partial<FooterContent>) => void;
  updateLayers: (data: Partial<LayersContent>) => void;
  updateNews: (data: Partial<NewsContent>) => void;
  updateMapView: (data: Partial<MapViewContent>) => void;
  updateAuth: (data: Partial<AuthContent>) => void;
}

// ============= Light, infrastructure-themed imagery (curated to match descriptions) =============
const IMG = {
  // Energy / utilities
  solar: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
  windTurbines: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
  powerLines: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
  pipeline: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80",
  oilGas: "https://images.unsplash.com/photo-1518306727298-4c17e1bf6e67?w=800&q=80",
  waterTreatment: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
  districtCooling: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80",

  // Roads / transport
  highway: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80",
  aerialRoad: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800&q=80",
  bridge: "https://images.unsplash.com/photo-1473073898421-f0fa0fffd5b8?w=800&q=80",
  bus: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80",
  airport: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
  pavement: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=800&q=80",
  underground: "https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&q=80",

  // Buildings / urban
  industrialPlant: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
  factory: "https://images.unsplash.com/photo-1581091012184-5c8c8d04bf2e?w=800&q=80",
  smartCity: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
  blueprint: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
  cityPlan: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
  buildings: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  urbanPlan: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
  zones: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?w=800&q=80",
  addresses: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&q=80",
  cadastral: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&q=80",
  adminBoundary: bahrainMapView,
  heritage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
  university: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",

  // Tech / data
  telecomTower: "https://images.unsplash.com/photo-1532093268420-c391bccc8d6d?w=800&q=80",
  dataCenter: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  serverNetwork: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=800&q=80",
  apiCode: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
  analyticsDashboard: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  geoDashboard: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  decisionSupport: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  governance: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
  consoleAdmin: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  geoCatalog: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&q=80",
  smartMap: "https://images.unsplash.com/photo-1569336415962-a4bd9f69c07a?w=800&q=80",
  geoIntelligence: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  partnership: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
  unifiedPortal: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",

  // Geo / nature
  satellite: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
  satelliteImagery: "https://images.unsplash.com/photo-1564053489984-317bbd824340?w=800&q=80",
  terrain: "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=800&q=80",
  topographic: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
  vegetation: "https://images.unsplash.com/photo-1597177884890-ed40ee93f0c6?w=800&q=80",
  greenspace: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",

  // People / institutions
  govtBuilding: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  hospital: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80",
  research: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&q=80",
  developers: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
  emergency: "https://images.unsplash.com/photo-1599301715049-72366c8a9e3a?w=800&q=80",
  population: "https://images.unsplash.com/photo-1519074069390-98277fc02a5c?w=800&q=80",
  construction: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80",

  bahrainMap: bahrainMapView,
  loginBg: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&q=80",
};

const OLD_BAHRAIN_MAP_URLS = [
  "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Bahrain_location_map.svg/1024px-Bahrain_location_map.svg.png",
];

// ============= Defaults =============

export const defaultHero: HeroContent = {
  title1: "National Spatial",
  title1_ar: "البنية التحتية",
  title2: "Data Infrastructure",
  title2_ar: "للبيانات المكانية الوطنية",
  subtitle: "Unified geospatial platform for secure data and sharing,\nadvanced analytics, & intelligent decision-making",
  subtitle_ar: "منصة جغرافية موحّدة لمشاركة البيانات بشكل آمن،\nوتحليلات متقدمة وصنع قرارات ذكية",
  overlayOpacity: 30,
};

export const defaultVision: VisionContent = {
  heading: "BSDI Vision",
  heading_ar: "رؤية BSDI",
  description: "Empowering Bahrain through a unified geospatial ecosystem. Creating a secure, scalable, and collaborative national geospatial infrastructure.",
  description_ar: "تمكين البحرين من خلال منظومة جغرافية موحّدة، وبناء بنية تحتية وطنية آمنة وقابلة للتوسع وتعاونية.",
  cards: [
    { id: "v1", title: "Digital Transformation", title_ar: "التحول الرقمي", description: "Leveraging cutting-edge technologies to modernize Bahrain's infrastructure and drive innovation across all government sectors.", description_ar: "الاستفادة من أحدث التقنيات لتحديث البنية التحتية للبحرين ودفع الابتكار في جميع القطاعات الحكومية.", image: IMG.smartCity },
    { id: "v2", title: "Geospatial Intelligence", title_ar: "الذكاء الجغرافي", description: "Advanced GIS and GeoAI capabilities enable data-driven insights for strategic planning and resource management.", description_ar: "قدرات متقدمة في نظم المعلومات الجغرافية والذكاء الاصطناعي الجغرافي لتمكين رؤى مبنية على البيانات.", image: IMG.dataCenter },
    { id: "v3", title: "Smart Cities", title_ar: "المدن الذكية", description: "Building sustainable, connected urban environments through intelligent spatial planning and 3D visualization.", description_ar: "بناء بيئات حضرية مستدامة ومتصلة من خلال التخطيط المكاني الذكي والتصور ثلاثي الأبعاد.", image: IMG.cityPlan },
    { id: "v4", title: "Data Governance & Security", title_ar: "حوكمة البيانات والأمان", description: "Ensuring data integrity, privacy, and secure access through robust governance frameworks and compliance standards.", description_ar: "ضمان تكامل البيانات والخصوصية والوصول الآمن من خلال أطر حوكمة قوية ومعايير الامتثال.", image: IMG.blueprint },
  ],
};

export const defaultAbout: AboutContent = {
  heading: "About BSDI",
  heading_ar: "حول BSDI",
  description1: "BSDI (Bahrain Spatial Data Infrastructure) is a unified geospatial platform designed to enable secure data sharing, advanced analytics, and intelligent decision-making across government and enterprise sectors.",
  description1_ar: "BSDI (البنية التحتية للبيانات المكانية في البحرين) هي منصة جغرافية موحّدة مصمّمة لتمكين مشاركة البيانات بشكل آمن، والتحليلات المتقدمة، وصنع القرارات الذكية في القطاعات الحكومية والمؤسسية.",
  description2: "It brings together GIS, GeoAI, BIM, and governance standards into a single digital ecosystem — ensuring data accuracy, security, and national-level interoperability.",
  description2_ar: "تجمع بين نظم المعلومات الجغرافية والذكاء الاصطناعي الجغرافي ونمذجة معلومات البناء ومعايير الحوكمة في منظومة رقمية واحدة، تضمن دقة البيانات والأمان والتشغيل البيني على المستوى الوطني.",
  stats: [
    { id: "s1", target: "50", suffix: "+", label: "Government Agencies", label_ar: "جهة حكومية" },
    { id: "s4", target: "Secure", suffix: "", label: "National Standards", label_ar: "المعايير الوطنية" },
  ],
};

export const defaultServices: ServicesContent = {
  heading: "What BSDI Provides",
  heading_ar: "ما توفّره BSDI",
  description: "Comprehensive spatial intelligence solutions for modern government operations",
  description_ar: "حلول شاملة للذكاء المكاني للعمليات الحكومية الحديثة",
  cards: [
    { id: "sv1", title: "BSDI Admin Console", title_ar: "وحدة تحكم BSDI", description: "To ensure secure, transparent, and efficient management of geospatial services across all government entities.", description_ar: "لضمان إدارة آمنة وشفافة وفعّالة للخدمات الجغرافية عبر جميع الجهات الحكومية.", image: IMG.consoleAdmin, tags: ["2D & 3D Maps", "Secure Access"], tags_ar: ["خرائط ثنائية وثلاثية", "وصول آمن"] },
    { id: "sv2", title: "National GeoCatalog Bahrain", title_ar: "الكتالوج الجغرافي الوطني", description: "To provide standardized metadata management aligned with SDI best practices and international standards.", description_ar: "لتوفير إدارة بيانات وصفية موحّدة وفق أفضل الممارسات والمعايير الدولية.", image: IMG.geoCatalog, tags: ["AI-Powered", "Spatial Analysis"], tags_ar: ["مدعوم بالذكاء الاصطناعي", "تحليل مكاني"] },
    { id: "sv3", title: "BSDI Smart Map", title_ar: "خريطة BSDI الذكية", description: "To provide a user-friendly interface for viewing and analyzing government geospatial datasets.", description_ar: "لتوفير واجهة سهلة الاستخدام لعرض وتحليل مجموعات البيانات الجغرافية الحكومية.", image: IMG.smartMap, tags: ["3D Visualization", "Infrastructure"], tags_ar: ["تصور ثلاثي الأبعاد", "البنية التحتية"] },
    { id: "sv4", title: "GeoIntelligence Bahrain", title_ar: "الذكاء الجغرافي للبحرين", description: "To transform geospatial data into actionable intelligence through spatial modelling.", description_ar: "لتحويل البيانات الجغرافية إلى ذكاء قابل للتنفيذ عبر النمذجة المكانية.", image: IMG.geoIntelligence, tags: ["Role-Based Access", "Audit Logging"], tags_ar: ["وصول حسب الدور", "سجل التدقيق"] },
    { id: "sv5", title: "Data Analytics", title_ar: "تحليل البيانات", description: "Advanced insights through visual dashboards and data-driven decision making.", description_ar: "رؤى متقدمة عبر لوحات تحكم مرئية واتخاذ قرارات مبنية على البيانات.", image: IMG.analyticsDashboard, tags: ["Visual Dashboards", "Data-Driven"], tags_ar: ["لوحات مرئية", "مبني على البيانات"] },
    { id: "sv6", title: "Cloud Infrastructure", title_ar: "البنية التحتية السحابية", description: "Scalable platform with high availability and disaster recovery capabilities.", description_ar: "منصة قابلة للتوسع بإتاحة عالية وقدرات استعادة من الكوارث.", image: IMG.serverNetwork, tags: ["High Availability", "Disaster Recovery"], tags_ar: ["إتاحة عالية", "استعادة الكوارث"] },
    { id: "sv7", title: "Spatial Data APIs & Services", title_ar: "واجهات وخدمات البيانات المكانية", description: "To enable seamless access, integration, and sharing of geospatial data through standardized APIs and web services.", description_ar: "لتمكين الوصول والتكامل ومشاركة البيانات الجغرافية عبر واجهات برمجة موحّدة وخدمات ويب.", image: IMG.apiCode, tags: ["APIs", "Data Sharing"], tags_ar: ["واجهات برمجة", "مشاركة البيانات"] },
    { id: "sv8", title: "Decision Support Systems", title_ar: "أنظمة دعم القرار", description: "To empower government and stakeholders with data-driven insights for planning, monitoring, and strategic decision-making.", description_ar: "لتمكين الحكومة وأصحاب المصلحة برؤى مبنية على البيانات للتخطيط والرصد وصنع القرار الاستراتيجي.", image: IMG.decisionSupport, tags: ["Data-Driven", "Strategic Planning"], tags_ar: ["مبني على البيانات", "تخطيط استراتيجي"] },
  ],
};

export const defaultUsers: UsersContent = {
  heading: "Who Can Use BSDI?",
  heading_ar: "من يمكنه استخدام BSDI؟",
  description: "BSDI is designed for organizations that rely on accurate spatial data, secure collaboration, and intelligent insights.",
  description_ar: "صُمّمت BSDI للمؤسسات التي تعتمد على بيانات مكانية دقيقة وتعاون آمن ورؤى ذكية.",
  cards: [
    { id: "u1", title: "Government Authorities", title_ar: "الجهات الحكومية", description: "Empowering national and local government bodies with comprehensive GIS infrastructure for policy making, urban development, and citizen services.", description_ar: "تمكين الهيئات الحكومية الوطنية والمحلية ببنية تحتية شاملة لنظم المعلومات الجغرافية لصنع السياسات والتنمية الحضرية وخدمات المواطنين.", image: IMG.govtBuilding },
    { id: "u2", title: "Urban Planning Departments", title_ar: "إدارات التخطيط العمراني", description: "Strategic tools for city planners to visualize growth, manage land use, and create sustainable urban environments with data-driven insights.", description_ar: "أدوات استراتيجية لمخططي المدن لتصور النمو وإدارة استخدام الأراضي وإنشاء بيئات حضرية مستدامة.", image: IMG.urbanPlan },
    { id: "u3", title: "Infrastructure & Utilities", title_ar: "البنية التحتية والمرافق", description: "Manage critical infrastructure networks including water, electricity, telecommunications, and transportation with real-time spatial monitoring.", description_ar: "إدارة شبكات البنية التحتية الحيوية تشمل الماء والكهرباء والاتصالات والنقل بمراقبة مكانية فورية.", image: IMG.powerLines },
    { id: "u4", title: "Environmental Agencies", title_ar: "الهيئات البيئية", description: "Monitor environmental changes, track natural resources, and implement conservation strategies using advanced geospatial analysis tools.", description_ar: "رصد التغيرات البيئية وتتبع الموارد الطبيعية وتنفيذ استراتيجيات الحفاظ باستخدام أدوات تحليل جغرافي متقدمة.", image: IMG.solar },
    { id: "u5", title: "Transportation & Smart Cities", title_ar: "النقل والمدن الذكية", description: "Optimize traffic flow, plan public transit routes, and build intelligent city systems with integrated transportation data and analytics.", description_ar: "تحسين تدفق المرور وتخطيط مسارات النقل العام وبناء أنظمة مدن ذكية ببيانات نقل متكاملة.", image: IMG.aerialRoad },
    { id: "u6", title: "National Security & Emergency", title_ar: "الأمن الوطني والطوارئ", description: "Enhance response times and coordination during emergencies with real-time location intelligence and secure communication channels.", description_ar: "تحسين أوقات الاستجابة والتنسيق خلال الطوارئ بذكاء موقعي فوري وقنوات اتصال آمنة.", image: IMG.emergency },
    { id: "u7", title: "Developers & Private Enterprises", title_ar: "المطورون والشركات الخاصة", description: "Build innovative location-based applications and services using our comprehensive APIs and developer-friendly spatial data infrastructure.", description_ar: "بناء تطبيقات وخدمات مبتكرة مبنية على الموقع باستخدام واجهات برمجتنا الشاملة وبنية تحتية ودودة للمطورين.", image: IMG.developers },
    { id: "u8", title: "Research & Academia", title_ar: "البحث والأكاديميا", description: "Access high-quality spatial datasets for academic research, geographic studies, and educational programs in GIS and spatial sciences.", description_ar: "الوصول إلى مجموعات بيانات مكانية عالية الجودة للبحث الأكاديمي والدراسات الجغرافية والبرامج التعليمية.", image: IMG.research },
  ],
};

export const defaultDataServices: DataServicesContent = {
  heading: "Data Services Provided by",
  heading_ar: "خدمات البيانات المقدّمة من",
  description: "Find Data Services by their providing entities",
  description_ar: "ابحث عن خدمات البيانات حسب الجهات المقدّمة",
  entities: [
    { id: "d1", name: "Information & eGovernment Authority", name_ar: "هيئة المعلومات والحكومة الإلكترونية", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/f605a5e591189376365a30f4b95cd45df42b30e8.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
    { id: "d2", name: "Survey and Land Registration Bureau", name_ar: "جهاز المساحة والتسجيل العقاري", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/727daca89e21026342142442add6c9766c555cbb.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
    { id: "d3", name: "Social Insurance Organization", name_ar: "هيئة التأمين الاجتماعي", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/f1c6e9c2249bcaeb1e3018078696afc3cfcf52d0.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
    { id: "d4", name: "Tender Board", name_ar: "مجلس المناقصات", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/01f965fdea88f9f7d0cced4e43fd8e495d4ffef2.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
    { id: "d5", name: "Ministry of Foreign Affairs", name_ar: "وزارة الخارجية", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/f19352d4f262cdb0f5fc7260253177e0bfaae583.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
    { id: "d6", name: "Ministry of Industry and Commerce", name_ar: "وزارة الصناعة والتجارة", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/d0a3949086d392f40ff1edc155daf8aa8b1bcd3b.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
    { id: "d7", name: "Ministry of Transportation and Telecommunications", name_ar: "وزارة المواصلات والاتصالات", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/d6aa7287fb342a673e97a0e070843e01698abdc2.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
    { id: "d8", name: "Ministry of Interior", name_ar: "وزارة الداخلية", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/8f93324345cc3e00b8122973bbc8251a16de98d9.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
  ],
};

export const defaultFooter: FooterContent = {
  quickLinks: [
    { id: "ql1", label: "Dataset Request", label_ar: "طلب مجموعة بيانات", href: "#" },
    { id: "ql2", label: "Open Data Policy", label_ar: "سياسة البيانات المفتوحة", href: "#" },
  ],
  externalLinks: [
    { id: "el1", label: "GCC Statistical Center", label_ar: "المركز الإحصائي الخليجي", href: "https://gccstat.org" },
    { id: "el2", label: "SHAREKNA", label_ar: "شاركنا", href: "https://www.sharekna.bh" },
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
  heading_ar: "الطبقات",
  description: "Explore the spatial datasets and thematic layers powering Bahrain's geospatial intelligence.",
  description_ar: "استكشف مجموعات البيانات المكانية والطبقات الموضوعية التي تشغّل الذكاء الجغرافي للبحرين.",
  cards: [
    { id: "l1", title: "ADDRESSES", title_ar: "العناوين", description: "Standardized address points across Bahrain.", description_ar: "نقاط عناوين موحّدة في جميع أنحاء البحرين.", image: IMG.addresses, link: "#" },
    { id: "l2", title: "ADMINBOUNDRY", title_ar: "الحدود الإدارية", description: "Administrative boundaries and governorate divisions.", description_ar: "الحدود الإدارية وتقسيمات المحافظات.", image: IMG.adminBoundary, link: "#" },
    { id: "l3", title: "APPROVED_ZONES", title_ar: "المناطق المعتمدة", description: "Officially approved planning and development zones.", description_ar: "مناطق التخطيط والتطوير المعتمدة رسمياً.", image: IMG.zones, link: "#" },
    { id: "l4", title: "BACA", title_ar: "هيئة الثقافة والآثار", description: "Bahrain Authority for Culture & Antiquities sites.", description_ar: "مواقع هيئة البحرين للثقافة والآثار.", image: IMG.heritage, link: "#" },
    { id: "l5", title: "BBU", title_ar: "جامعة بيان البحرين", description: "Bahrain Bayan University campus and facilities.", description_ar: "حرم ومرافق جامعة بيان البحرين.", image: IMG.university, link: "#" },
    { id: "l6", title: "BIX", title_ar: "نقطة تبادل الإنترنت", description: "Bahrain Internet Exchange node locations.", description_ar: "مواقع عقد تبادل الإنترنت في البحرين.", image: IMG.serverNetwork, link: "#" },
    { id: "l7", title: "BOTANICAL_ATLAS", title_ar: "الأطلس النباتي", description: "Native flora and botanical reference data.", description_ar: "بيانات الغطاء النباتي المحلي والمرجعية النباتية.", image: IMG.vegetation, link: "#" },
    { id: "l8", title: "BUILDINGS", title_ar: "المباني", description: "Building footprints and structure inventory.", description_ar: "مساحات المباني وحصر المنشآت.", image: IMG.buildings, link: "#" },
    { id: "l9", title: "BUS ROUTE", title_ar: "مسارات الحافلات", description: "Public bus routes and transit corridors.", description_ar: "مسارات الحافلات العامة وممرات النقل.", image: IMG.bus, link: "#" },
    { id: "l10", title: "CAA", title_ar: "هيئة الطيران المدني", description: "Civil Aviation Authority airspace data.", description_ar: "بيانات المجال الجوي لهيئة الطيران المدني.", image: IMG.airport, link: "#" },
    { id: "l11", title: "CADASTRAL", title_ar: "المساحة العقارية", description: "Land parcels and cadastral survey records.", description_ar: "قطع الأراضي وسجلات المساحة العقارية.", image: IMG.cadastral, link: "#" },
    { id: "l12", title: "DISTRICT_COOLING", title_ar: "التبريد المركزي", description: "District cooling network infrastructure.", description_ar: "البنية التحتية لشبكة التبريد المركزي.", image: IMG.districtCooling, link: "#" },
    { id: "l13", title: "DTM", title_ar: "نموذج التضاريس الرقمي", description: "Digital terrain model elevation data.", description_ar: "بيانات ارتفاع نموذج التضاريس الرقمي.", image: IMG.terrain, link: "#" },
    { id: "l14", title: "DUBAISAT2011", title_ar: "صور الأقمار الصناعية", description: "Satellite imagery base layer over Bahrain.", description_ar: "طبقة صور الأقمار الصناعية على البحرين.", image: IMG.satelliteImagery, link: "#" },
    { id: "l15", title: "ELECTRICITYANDWATER", title_ar: "الكهرباء والماء", description: "Electricity and water utility networks.", description_ar: "شبكات مرافق الكهرباء والماء.", image: IMG.powerLines, link: "#" },
    { id: "l16", title: "EWA_EDD", title_ar: "توزيع الكهرباء", description: "EWA electricity distribution division assets.", description_ar: "أصول قسم توزيع الكهرباء.", image: IMG.powerLines, link: "#" },
    { id: "l17", title: "HEALTHSERVICES", title_ar: "الخدمات الصحية", description: "Hospitals, clinics and healthcare facilities.", description_ar: "المستشفيات والعيادات والمرافق الصحية.", image: IMG.hospital, link: "#" },
    { id: "l18", title: "OIL_GAS", title_ar: "النفط والغاز", description: "Oil and gas fields, pipelines and assets.", description_ar: "حقول النفط والغاز والأنابيب والأصول.", image: IMG.oilGas, link: "#" },
    { id: "l19", title: "PAVEMENTS", title_ar: "الأرصفة", description: "Pavement condition and surface inventory.", description_ar: "حالة الأرصفة وحصر الأسطح.", image: IMG.pavement, link: "#" },
    { id: "l20", title: "POPULATION_DEMOGRAPHY", title_ar: "السكان والديموغرافيا", description: "Population density and demographic layers.", description_ar: "كثافة السكان والطبقات الديموغرافية.", image: IMG.population, link: "#" },
    { id: "l21", title: "ROAD_DUCTS", title_ar: "قنوات الطرق", description: "Underground road duct network.", description_ar: "شبكة قنوات الطرق تحت الأرض.", image: IMG.underground, link: "#" },
    { id: "l22", title: "SEWERAGEANDDRAINAGE", title_ar: "الصرف الصحي", description: "Sewerage and stormwater drainage network.", description_ar: "شبكة الصرف الصحي ومياه الأمطار.", image: IMG.waterTreatment, link: "#" },
    { id: "l23", title: "STREETCENTERLINES", title_ar: "محاور الشوارع", description: "Street centerline reference network.", description_ar: "شبكة مرجعية لمحاور الشوارع.", image: IMG.aerialRoad, link: "#" },
    { id: "l24", title: "TELECOM", title_ar: "الاتصالات", description: "Telecommunications infrastructure layer.", description_ar: "طبقة البنية التحتية للاتصالات.", image: IMG.telecomTower, link: "#" },
    { id: "l25", title: "TOPOGRAPHIC", title_ar: "الطبوغرافيا", description: "Topographic base map of Bahrain.", description_ar: "خريطة الأساس الطبوغرافية للبحرين.", image: IMG.topographic, link: "#" },
    { id: "l26", title: "VEGETATION", title_ar: "الغطاء النباتي", description: "Vegetation cover and green space mapping.", description_ar: "تخطيط الغطاء النباتي والمساحات الخضراء.", image: IMG.greenspace, link: "#" },
    { id: "l27", title: "ZONES", title_ar: "المناطق", description: "Land use and planning zone classification.", description_ar: "تصنيف استخدام الأراضي ومناطق التخطيط.", image: IMG.zones, link: "#" },
  ],
};

export const defaultNews: NewsContent = {
  heading: "Latest News",
  heading_ar: "آخر الأخبار",
  description: "Stay informed with the latest updates, announcements and milestones from BSDI and the Information & eGovernment Authority.",
  description_ar: "ابقَ على اطلاع بآخر التحديثات والإعلانات والإنجازات من BSDI وهيئة المعلومات والحكومة الإلكترونية.",
  items: [
    { id: "n1", title: "BSDI launches unified geospatial portal", title_ar: "BSDI تطلق البوابة الجغرافية الموحّدة", excerpt: "A new unified portal centralises spatial datasets across all government entities for streamlined access and analytics.", excerpt_ar: "بوابة موحّدة جديدة تجمع مجموعات البيانات المكانية عبر جميع الجهات الحكومية لتسهيل الوصول والتحليلات.", date: "Apr 22, 2026", image: IMG.unifiedPortal, link: "#" },
    { id: "n2", title: "Bahrain advances Smart City initiative", title_ar: "البحرين تقدّم مبادرة المدينة الذكية", excerpt: "Smart city programmes accelerate as new 3D mapping and IoT integration come online across key urban districts.", excerpt_ar: "تتسارع برامج المدن الذكية مع إطلاق خرائط ثلاثية الأبعاد جديدة وتكامل إنترنت الأشياء في الأحياء الرئيسية.", date: "Apr 10, 2026", image: IMG.smartCity, link: "#" },
    { id: "n3", title: "New partnership for open spatial data", title_ar: "شراكة جديدة للبيانات المكانية المفتوحة", excerpt: "BSDI partners with national agencies to expand the open data catalogue and improve cross-sector collaboration.", excerpt_ar: "BSDI تتشارك مع الجهات الوطنية لتوسيع كتالوج البيانات المفتوحة وتحسين التعاون بين القطاعات.", date: "Mar 28, 2026", image: IMG.partnership, link: "#" },
    { id: "n4", title: "Solar & energy infrastructure mapped nationwide", title_ar: "تخطيط البنية التحتية للطاقة الشمسية على المستوى الوطني", excerpt: "New layers visualise renewable energy assets and grid infrastructure to support sustainability planning.", excerpt_ar: "طبقات جديدة تصوّر أصول الطاقة المتجددة والبنية التحتية للشبكة لدعم تخطيط الاستدامة.", date: "Mar 14, 2026", image: IMG.solar, link: "#" },
  ],
};

export const defaultMapView: MapViewContent = {
  heading: "Bahrain Map View",
  heading_ar: "خريطة البحرين",
  description: "Visualise spatial datasets, infrastructure and zones interactively across the Kingdom of Bahrain.",
  description_ar: "تصوّر مجموعات البيانات المكانية والبنية التحتية والمناطق بشكل تفاعلي في مملكة البحرين.",
  ctaLabel: "Open Map View",
  ctaLabel_ar: "افتح الخريطة",
  ctaHref: "/map",
  previewImage: IMG.bahrainMap,
};

export const defaultAuth: AuthContent = {
  loginBackground: IMG.loginBg,
};

const OLD_MAP_HEADINGS = ["Explore Bahrain on the Map"];

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
      news: defaultNews,
      mapView: defaultMapView,
      auth: defaultAuth,
      updateHero: (data) => set((s) => ({ hero: { ...s.hero, ...data } })),
      updateVision: (data) => set((s) => ({ vision: { ...s.vision, ...data } })),
      updateAbout: (data) => set((s) => ({ about: { ...s.about, ...data } })),
      updateServices: (data) => set((s) => ({ services: { ...s.services, ...data } })),
      updateUsers: (data) => set((s) => ({ users: { ...s.users, ...data } })),
      updateDataServices: (data) => set((s) => ({ dataServices: { ...s.dataServices, ...data } })),
      updateFooter: (data) => set((s) => ({ footer: { ...s.footer, ...data } })),
      updateLayers: (data) => set((s) => ({ layers: { ...s.layers, ...data } })),
      updateNews: (data) => set((s) => ({ news: { ...s.news, ...data } })),
      updateMapView: (data) => set((s) => ({ mapView: { ...s.mapView, ...data } })),
      updateAuth: (data) => set((s) => ({ auth: { ...s.auth, ...data } })),
    }),
    {
      name: "bsdi-content",
      version: 7,
      migrate: (persisted: any, version: number) => {
        if (persisted?.hero && version < 5) {
          persisted.hero.heroImages = [];
        }
        if (version < 6) {
          if (persisted?.services) delete persisted.services.cards;
          if (persisted?.layers) delete persisted.layers.cards;
          if (persisted?.news) delete persisted.news.items;
          if (persisted?.users) delete persisted.users.cards;
          if (persisted?.vision) delete persisted.vision.cards;
        }
        if (version < 7) {
          // Refresh layers cards so ADMINBOUNDRY uses Bahrain map image
          if (persisted?.layers) delete persisted.layers.cards;
        }
        return persisted;
      },
      merge: (persisted: any, current: any) => {
        const merged = { ...current, ...(persisted || {}) };
        if (persisted?.vision?.cards) {
          const persistedIds = new Set(persisted.vision.cards.map((c: any) => c.id));
          const newDefaults = defaultVision.cards.filter((c) => !persistedIds.has(c.id));
          merged.vision = { ...defaultVision, ...persisted.vision, cards: [...persisted.vision.cards, ...newDefaults] };
        } else {
          merged.vision = { ...defaultVision, ...(persisted?.vision || {}), cards: defaultVision.cards };
        }
        if (!persisted?.services?.cards) merged.services = { ...defaultServices, ...(persisted?.services || {}), cards: defaultServices.cards };
        if (!persisted?.users?.cards) merged.users = { ...defaultUsers, ...(persisted?.users || {}), cards: defaultUsers.cards };
        if (!persisted?.layers?.cards) merged.layers = { ...defaultLayers, ...(persisted?.layers || {}), cards: defaultLayers.cards };
        if (!persisted?.news?.items) {
          merged.news = { ...defaultNews, ...(persisted?.news || {}), items: defaultNews.items };
        } else {
          const persistedIds = new Set(persisted.news.items.map((i: any) => i.id));
          const newItems = defaultNews.items.filter((i) => !persistedIds.has(i.id));
          merged.news = { ...defaultNews, ...persisted.news, items: [...persisted.news.items, ...newItems] };
        }
        if (!persisted?.dataServices?.entities) {
          merged.dataServices = { ...defaultDataServices, ...(persisted?.dataServices || {}), entities: defaultDataServices.entities };
        }
        if (!persisted?.mapView) merged.mapView = defaultMapView;
        if (persisted?.mapView && OLD_MAP_HEADINGS.includes(persisted.mapView.heading)) {
          merged.mapView = { ...merged.mapView, heading: defaultMapView.heading, heading_ar: defaultMapView.heading_ar, description: defaultMapView.description, description_ar: defaultMapView.description_ar };
        }
        if (persisted?.mapView && OLD_BAHRAIN_MAP_URLS.includes(persisted.mapView.previewImage)) {
          merged.mapView = { ...merged.mapView, previewImage: defaultMapView.previewImage };
        }
        if (!persisted?.auth) merged.auth = defaultAuth;
        return merged;
      },
    }
  )
);
