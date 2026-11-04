// Content restored verbatim from the previous site version (last commit / _legacy/pages),
// arranged for the new page structure. Images are representative unless noted.
const wa = (s) => `images/WhatsApp Image 2026-07-25 at 8.44.${s}.jpeg`;

// Navigation categories for the 30 individual surveys.
const serviceGroups = [
  { id: 'land-property', name: 'Land & Property Surveys', items: [
    { slug: 'land-survey', title: 'Land Survey', short: 'Precise measurement and mapping of land parcels for ownership, planning and legal purposes.', image: 'images/land_survey.png' },
    { slug: 'boundary-survey', title: 'Boundary Survey', short: 'Accurate determination and marking of legal property boundaries for dispute-free ownership.', image: wa('52 PM (4)') },
    { slug: 'property-survey', title: 'Property Survey', short: 'Complete property boundary and area surveys for real estate transactions and legal filings.', image: wa('53 PM') },
    { slug: 'farm-land-survey', title: 'Farm Land Survey', short: 'Measurement and mapping of agricultural land for fragmentation, sale and legal records.', image: wa('52 PM') },
    { slug: 'subdivision-survey', title: 'Subdivision Survey', short: 'Division of land parcels into multiple plots as per local planning and approval norms.', image: wa('51 PM') },
    { slug: 'site-measurement-survey', title: 'Site Measurement Survey', short: 'On-site dimensional measurement for construction, renovation and audit requirements.', image: wa('53 PM (2)') },
    { slug: 'land-demarcation-survey', title: 'Land Demarcation Survey', short: 'Physical demarcation of land boundaries using permanent monuments and GPS coordinates.', image: wa('52 PM (2)') },
  ] },
  { id: 'gps-dgps-total-station', name: 'GPS, DGPS & Total Station Surveys', items: [
    { slug: 'dgps-survey', title: 'DGPS Survey', short: 'Differential GPS surveying delivering centimetre-level accuracy for large-scale projects.', image: 'images/survey_engineers_work.png' },
    { slug: 'gps-survey', title: 'GPS Survey', short: 'High-precision GPS technology for accurate coordinate capture and land measurement.', image: wa('52 PM (1)') },
    { slug: 'total-station-survey', title: 'Total Station Survey', short: 'Electronic distance measurement and angle calculations using Total Station instruments.', image: wa('53 PM (3)') },
    { slug: 'control-survey', title: 'Control Survey', short: 'Establishment of primary geodetic control points as the reference framework for large projects.', image: wa('54 PM') },
  ] },
  { id: 'construction-engineering', name: 'Construction & Engineering Surveys', items: [
    { slug: 'topographical-survey', title: 'Topographical Survey', short: 'Detailed mapping of terrain features, elevations and contours for project planning.', image: wa('51 PM (1)') },
    { slug: 'contour-survey', title: 'Contour Survey', short: 'Mapping of ground elevation contours for cut-fill analysis, drainage and grading plans.', image: 'images/banner-3.jpg' },
    { slug: 'elevation-survey', title: 'Elevation Survey', short: 'Accurate vertical elevation data collection for construction and flood risk assessments.', image: 'images/banner-2.jpg' },
    { slug: 'layout-survey', title: 'Layout Survey', short: 'Marking residential and commercial plot layouts as per approved plans and regulatory norms.', image: wa('53 PM (1)') },
    { slug: 'building-setting-out-survey', title: 'Building Setting Out Survey', short: 'Precise on-site marking of building corners, columns and structural elements.', image: 'images/construction_measurement.png' },
    { slug: 'construction-survey', title: 'Construction Survey', short: 'Complete survey support throughout the construction lifecycle ensuring accurate execution.', image: 'images/construction_survey.png' },
    { slug: 'engineering-survey', title: 'Engineering Survey', short: 'Comprehensive surveys for civil and structural engineering design and project execution.', image: 'images/hd_total_station.png' },
    { slug: 'as-built-survey', title: 'As-Built Survey', short: 'Verification surveys of completed structures ensuring they match approved design drawings.', image: 'images/land_survey.png' },
  ] },
  { id: 'infrastructure-route', name: 'Infrastructure & Route Surveys', items: [
    { slug: 'route-survey', title: 'Route Survey', short: 'Survey of linear routes for road, rail, canal, and pipeline infrastructure projects.', image: 'images/banner-1.jpg' },
    { slug: 'road-alignment-survey', title: 'Road Alignment Survey', short: 'Horizontal and vertical alignment surveys for new and existing road infrastructure.', image: 'images/drone_survey_aerial.png' },
    { slug: 'highway-survey', title: 'Highway Survey', short: 'Detailed surveys for national and state highway planning, design and construction.', image: 'images/drone_survey_aerial.png' },
    { slug: 'railway-survey', title: 'Railway Survey', short: 'Accurate survey services for railway track alignment, corridors and station planning.', image: 'images/survey_engineers_work.png' },
    { slug: 'canal-survey', title: 'Canal Survey', short: 'Survey of irrigation canals, waterways and drainage channels for hydraulic engineering.', image: 'images/drone_survey.png' },
    { slug: 'pipeline-survey', title: 'Pipeline Survey', short: 'Precise route and alignment surveys for oil, gas and water pipeline projects.', image: 'images/banner-1.jpg' },
  ] },
  { id: 'gis-drone', name: 'GIS & Drone Technology', items: [
    { slug: 'gis-mapping', title: 'GIS Mapping', short: 'Geospatial data capture, analysis and digital map creation for planning and administration.', image: 'images/digital_mapping.png' },
    { slug: 'drone-survey', title: 'Drone Survey', short: 'UAV-based aerial photography and photogrammetry for rapid large-area mapping.', image: 'images/drone_survey.png' },
  ] },
  { id: 'industrial-specialised', name: 'Industrial & Specialised Surveys', items: [
    { slug: 'industrial-survey', title: 'Industrial Survey', short: 'Survey support for industrial estates, plant layouts, factory expansions and compliance checks.', image: 'images/construction_survey.png' },
    { slug: 'mining-survey', title: 'Mining Survey', short: 'Specialised surveys for mining areas, quarry volume estimation and land use mapping.', image: wa('52 PM (3)') },
    { slug: 'hydrographic-survey', title: 'Hydrographic Survey', short: 'Underwater depth mapping and water body surveys for ports, dams and marine projects.', image: 'images/drone_survey.png' },
  ] },
];

// Other existing service pages; their summaries come from legacy-pages.json.
const otherServices = [
  { slug: 'digital-survey', title: 'Digital Survey', image: 'images/drone_survey_aerial.png' },
  { slug: 'approvals', title: 'Approvals', image: 'images/about_1.jpg' },
  { slug: 'approval-pmc', title: 'Approval PMC', image: 'images/hero_1.jpg' },
  { slug: 'building-plan', title: 'Building Plan', image: 'images/about_1.jpg' },
  { slug: 'construction', title: 'Construction', image: 'images/construction_survey.png' },
  { slug: 'site-marketing', title: 'Site Marketing', image: 'images/drone_survey_aerial.png' },
  { slug: 'labour-contract', title: 'Labour Contract', image: 'images/survey_engineers_work.png' },
  { slug: 'validation', title: 'Validation', image: 'images/construction_measurement.png' },
];

const featuredServiceSlugs = ['land-survey', 'boundary-survey', 'topographical-survey', 'dgps-survey', 'total-station-survey', 'drone-survey', 'gis-mapping', 'route-survey'];

// Project filter categories reuse the service group names; `cat` is the group id.
const projectCats = {
  'tharakampatty-boundary': 'land-property', 'athikinathupatti-solar': 'construction-engineering', 'thoothukudi-solar': 'construction-engineering',
  'coimbatore-water-pipeline': 'infrastructure-route', 'mysuru-industrial': 'industrial-specialised', 'trisara-apartment-villa': 'construction-engineering', 'kpr-mill': 'construction-engineering',
};

const caseStudies = [
  { id: 'campus-topographical-mapping', name: 'Campus Topographical Mapping', client: 'Isha Foundation', location: 'Coimbatore', type: 'Topographical Survey', status: 'Completed', cat: 'construction-engineering', image: wa('51 PM (1)'), text: 'Comprehensive high-precision topographical and contour survey of the entire foundation campus for future infrastructure development and master planning.' },
  { id: 'highway-expansion-route-survey', name: 'Highway Expansion Route Survey', client: 'L&T Construction', location: 'Tamil Nadu Highways', type: 'Route Survey', status: 'Ongoing', cat: 'infrastructure-route', image: 'images/drone_survey_aerial.png', text: 'Extensive route alignment and DGPS control establishment for a 150km highway expansion project, ensuring accurate land acquisition data.' },
  { id: 'refinery-pipeline-alignment', name: 'Refinery Pipeline Alignment', client: 'BPCL', location: 'Kochi', type: 'Pipeline Survey', status: 'Completed', cat: 'infrastructure-route', image: 'images/hd_total_station.png', text: 'High-precision Total Station survey for the alignment and setting out of industrial pipelines within the highly regulated refinery premises.' },
  { id: 'commercial-plot-subdivisions', name: 'Commercial Plot Subdivisions', client: 'YOGO Developers', location: 'Chennai', type: 'Layout Survey', status: 'Completed', cat: 'construction-engineering', image: wa('51 PM'), text: 'Detailed subdivision survey and plotting out 500+ commercial and residential plots for a major real estate township development.' },
  { id: 'industrial-as-built-mapping', name: 'Industrial As-Built Mapping', client: 'IRCLASS', location: 'Industrial Estate', type: 'As-Built Survey', status: 'Completed', cat: 'construction-engineering', image: 'images/land_survey.png', text: 'Post-construction as-built measurements of heavy industrial structural layouts to verify design compliance and certify safety standards.' },
  { id: 'solar-farm-contour-mapping', name: 'Solar Farm Contour Mapping', client: 'Viridis Energy', location: 'Tirunelveli', type: 'Drone Survey', status: 'Ongoing', cat: 'gis-drone', image: 'images/drone_survey.png', text: 'Large-scale aerial drone photogrammetry to generate precise digital elevation models (DEM) for an upcoming 50MW solar power installation.' },
  { id: 'factory-layout-setting-out', name: 'Factory Layout Setting Out', client: 'Sathlokhar Synergys', location: 'Sriperumbudur', type: 'Building Setting Out', status: 'Completed', cat: 'construction-engineering', image: 'images/construction_survey.png', text: 'Precision marking and setting out of structural columns, grids, and boundaries for a large-scale manufacturing plant facility.' },
  { id: 'retail-chain-boundary-validation', name: 'Retail Chain Boundary Validation', client: 'The Chennai Mobiles', location: 'Multiple Cities', type: 'Property Survey', status: 'Completed', cat: 'land-property', image: wa('53 PM'), text: 'Boundary verification and accurate property area surveys across multiple commercial retail locations to ensure correct leasing records.' },
];

const featuredOld = [
  { id: 'smart-city-gis-data', tag: 'Urban Mapping', name: 'Smart City GIS Data', cat: 'gis-drone', image: 'images/gis_mapping.png' },
  { id: 'highway-bridge-profile', tag: 'Infrastructure Survey', name: 'Highway Bridge Profile', cat: 'infrastructure-route', image: 'images/construction_measurement.png' },
  { id: '1000-acre-solar-park', tag: 'Topographic Survey', name: '1000 Acre Solar Park', cat: 'construction-engineering', image: 'images/banner-3.jpg' },
];

// Keyed by the client name in data.js.
const clientDetails = {
  'Isha Foundation': ['Non-Profit / Infrastructure', 'Campus Expansion & Infrastructure', 'Topographical & DGPS Survey', 'Coimbatore, Tamil Nadu', 'Completed'],
  YOGO: ['Commercial Development', 'Commercial Building Layout', 'Building Setting Out Survey', 'Chennai, Tamil Nadu', 'Completed'],
  Viridis: ['Renewable Energy', 'Solar Park Development', 'Drone Survey & GIS Mapping', 'Tirunelveli, Tamil Nadu', 'Completed'],
  'L&T': ['Construction & Engineering', 'Highway Infrastructure', 'Highway Survey & Route Survey', 'Pan-India', 'Ongoing'],
  IRCLASS: ['Quality & Certification', 'Industrial Verification', 'As-Built Survey & Control Survey', 'Mumbai, Maharashtra', 'Completed'],
  BPCL: ['Oil & Gas', 'Pipeline Infrastructure', 'Pipeline Survey & Topographical Survey', 'Kochi, Kerala', 'Completed'],
  Sathlokhar: ['Industrial Infrastructure', 'Factory Layout Planning', 'Industrial Survey', 'Hosur, Tamil Nadu', 'Completed'],
  'BEST Engineering Services': ['Public Transport & Utilities', 'Depot Measurement', 'Boundary Survey & Site Measurement', 'Maharashtra', 'Completed'],
  'GR Group': ['Infrastructure Projects', 'Bridge & Road Alignment', 'Road Alignment Survey', 'Tamil Nadu', 'Ongoing'],
  'Chennai Mobiles': ['Retail Expansion', 'Retail Outlet Demarcation', 'Land Demarcation & Property Survey', 'Across Tamil Nadu', 'Completed'],
};

const testimonials = [
  { quote: "NDSE's PMC and approval services saved us months of waiting. Their digital survey accuracy is unmatched in Coimbatore.", name: 'Karthik R.', role: 'Property Developer' },
  { quote: 'From building plans to construction layout, the team handled our industrial project seamlessly. Highly professional.', name: 'Suresh Kumar', role: 'Industrial Contractor' },
  { quote: 'Their site marketing strategies and layout validation gave us complete confidence in our investment. Truly premium service.', name: 'Priya S.', role: 'Real Estate Investor' },
];

const oldFaqs = [
  ['What areas do you serve in Tamil Nadu?', 'We provide our premium digital surveying, building plan approvals, and PMC services across Tamil Nadu, Kerala, Delhi and All India, with core offices in Manapparai, Trichy, and Coimbatore.'],
  ['How long does a digital drone survey take?', 'Digital drone surveys are highly efficient. The on-site data capture is usually completed in a single day, depending on the site size, with highly accurate GIS reporting provided shortly after.'],
];

const galleryPhotos = ['51 PM (1)', '51 PM', '52 PM (1)', '52 PM (2)', '52 PM (3)', '52 PM (4)', '52 PM', '53 PM (1)', '53 PM (2)', '53 PM (3)', '53 PM', '54 PM'].map(wa);

// Wording taken from nathanassociates.in.
const nathan = {
  url: 'https://nathanassociates.in/',
  logo: 'images/nathan-associates-logo.png',
  name: 'Nathan Associates',
  intro: [
    'NATHAN ASSOCIATES was established in Tamil Nadu with a clear vision - to bridge the growing gap in surveying services within the construction industry. What began as a focused initiative has grown into a surveying and project services provider, working across India with a team of qualified professionals.',
    'We pair a technology-driven approach with disciplined field work to deliver accurate, reliable services - from survey and marking to approvals and consultancy.',
  ],
  tagline: 'Survey · Approvals · Consultancy',
  services: ['Digital Survey & Marking', 'Approvals', 'Consultancy'],
};

module.exports = { serviceGroups, otherServices, featuredServiceSlugs, projectCats, caseStudies, featuredOld, clientDetails, testimonials, oldFaqs, galleryPhotos, nathan, wa };
