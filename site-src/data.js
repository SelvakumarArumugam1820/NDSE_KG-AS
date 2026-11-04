// NDSE website content — single source of truth.
// Services, markings and projects come from the approved Excel workbook
// (NDSE_Excel_Content_For_Claude.md). Spelling/grammar corrected for display only.
//
// Adding photos later: put the file in public/images/ and set `image` on the item,
// e.g. image: 'images/projects/kpr-mill.jpg'. Empty `image` renders a placeholder.

const company = {
  name: 'Nathan Digital Survey Engineers (NDSE)',
  short: 'NDSE',
  url: 'https://ndse.in',
  phones: [
    { display: '+91 73977 33223', tel: '+917397733223' },
    { display: '+91 73977 33229', tel: '+917397733229' },
  ],
  email: 'info@ndse.in',
  whatsapp: '917397733223',
  logo: 'images/founder_balasubramani.png',
  footerLogo: 'images/NDSELOGO2.png',
  // Exact addresses supplied by NDSE. `query` drives the Google Maps link and preview.
  offices: [
    { id: 'head-office', name: 'Head Office', short: 'Marungapuri, Tiruchirapalli', lines: ['6/51, Medukattupatti, Thottiapatty Village, Marungapuri', 'Tiruchirapalli - 621 305, Tamilnadu'], street: '6/51, Medukattupatti, Thottiapatty Village, Marungapuri', locality: 'Tiruchirapalli', postalCode: '621305', query: '6/51, Medukattupatti, Thottiapatty Village, Marungapuri, Tiruchirapalli 621305, Tamilnadu' },
    { id: 'pudukkottai-branch', name: 'Pudukkottai Branch', short: 'Viraimalai, Pudukkottai', lines: ['No.542 Lanchamodu Viraimalai (Tk), Pudukkottai (Dt)', 'Tamilnadu - 621 316'], street: 'No.542 Lanchamodu Viraimalai (Tk)', locality: 'Pudukkottai', postalCode: '621316', query: 'No.542 Lanchamodu, Viraimalai, Pudukkottai, Tamilnadu 621316' },
    { id: 'branch-trichy', name: 'Branch - Trichy', short: 'Manapparai, Trichy', lines: ['No.4, Mani Tower, Ramalingam Street,', 'Manapparai, Trichy', 'Tamil Nadu - 621306'], street: 'No.4, Mani Tower, Ramalingam Street', locality: 'Manapparai, Trichy', postalCode: '621306', query: 'No.4, Mani Tower, Ramalingam Street, Manapparai, Trichy 621306' },
    { id: 'branch-coimbatore', name: 'Branch - Coimbatore', short: 'Perur, Coimbatore', lines: ['No.3, Shiruvani Main Road, Nanjamma Layout,', 'Perur, Coimbatore', 'Tamil Nadu - 641010'], street: 'No.3, Shiruvani Main Road, Nanjamma Layout, Perur', locality: 'Coimbatore', postalCode: '641010', query: 'No.3, Shiruvani Main Road, Nanjamma Layout, Perur, Coimbatore 641010' },
  ],
};

// Sheet: "Digital Survey & Map"
const surveys = [
  {
    id: 'boundary-survey', image: 'images/WhatsApp Image 2026-07-25 at 8.44.52 PM (4).jpeg', title: 'Boundary Survey & Map',
    meaning: 'Boundary Survey & Map means measuring and identifying the limits and corner points of a property using land records and field measurements.',
    uses: ['Site Boundary Survey & Map', 'FMB & Subdivision Boundary Survey & Map', 'Plot Boundary Survey & Map', 'Layout Boundary Survey & Map', 'Cadastral Survey & Map'],
  },
  {
    id: 'topographical-survey', image: 'images/WhatsApp Image 2026-07-25 at 8.44.51 PM (1).jpeg', title: 'Topographical Survey & Map',
    meaning: 'Topographical Survey & Map means measuring and mapping the ground levels, slopes, and existing features of a site, such as site boundaries, roads, buildings, trees, drains, EB poles, wells and others.',
    uses: ['Site Topo Survey & Map', 'SIPCOT Area Topo Survey & Map', 'Forest & Hill Area Topo Survey & Map', 'Road & Railway Area Topo Survey & Map', 'Commercial & Industrial Area Topo Survey', 'Educational Area & Campus Topo Survey', 'Power Grid & Station Area Topo Survey', 'Hospital Campus Topo Survey', 'Harbour & Port Area Topo Survey', 'Residential Area Topo Survey'],
  },
  {
    id: 'contour-survey', image: 'images/banner-3.jpg', title: 'Contour Survey & Map',
    meaning: 'Contour Survey & Map means measuring ground elevations and preparing a map with contour lines — lines joining points of equal elevation. It shows the land’s slopes, high areas, and low areas.',
    uses: ['Spot & Site Level Survey & Map', 'Terrain Survey', 'Ground & Surface Level Survey', 'Section & Elevation Survey', 'Levelling Survey'],
  },
  {
    id: 'geographical-survey', image: 'images/gis_mapping.png', title: 'Geographical Survey & Map',
    meaning: 'Geographical Survey & Map means collecting and studying information about an area’s location, landscape, natural features, and human activities.',
    uses: ['Hill & Mountain Survey & Map', 'Mining & Quarry Survey & Map', 'Forest Survey & Map'],
  },
  {
    id: 'hydrographic-survey', image: 'images/drone_survey.png', title: 'Hydrographic Survey & Map',
    meaning: 'Hydrographic Survey & Map means measuring and mapping water bodies, including their depths, bed levels, shorelines, and underwater features.',
    uses: ['Pond & Lake Survey & Map', 'River & Canal Survey & Map', 'Dam & Irrigation Survey & Map'],
  },
  {
    id: 'geological-survey', image: 'images/WhatsApp Image 2026-07-25 at 8.44.52 PM (3).jpeg', title: 'Geological Survey & Map',
    meaning: 'Geological Survey & Map means studying and mapping the rocks, soil deposits, geological structures, and history of an area.',
    uses: ['Soil Survey & Map', 'Rock Survey & Map', 'Underground Survey & Map'],
  },
  {
    id: 'geotechnical-survey', image: 'images/WhatsApp Image 2026-07-25 at 8.44.52 PM (2).jpeg', title: 'Geotechnical Survey & Map',
    meaning: 'Geotechnical Survey means investigating soil, rock, and groundwater conditions to assess the ground’s suitability for construction and foundation design.',
    uses: ['Borehole Drilling & Soil Sampling', 'Standard Penetration Testing (SPT)', 'CPR Test & Plate Load Test', 'Cone Penetration Test (CPT)', 'Trial Pit Investigation', 'Soil & Rock Testing', 'Groundwater Level Measurement', 'Ground Bearing Capacity Assessment', 'Geotechnical Report & Foundation Recommendations'],
  },
  {
    id: 'infrastructure-survey', image: 'images/engineering-survey.png', title: 'Infrastructure Survey & Mapping',
    meaning: 'Infrastructure Survey & Mapping means measuring and mapping land, structures, and utilities for infrastructure planning, design, construction, and maintenance.',
    uses: ['Residential Building Survey & Map', 'Bus Stand & Stop Building Survey & Map', 'Railway & Metro Station Structure Survey & Map', 'Bridge & Culvert Structure Survey & Map', 'Commercial & Industrial Building Survey & Map', 'Power Station & Tower Structure Survey & Map', 'Petrol Bunk & Gas Station Structure Survey & Map', 'School & College Building Survey & Map', 'Harbour & Port Structure Survey & Map', 'Airport & Air Force Structure Survey & Map', 'Solar & Wind Farm Survey & Map'],
  },
  {
    id: 'as-built-survey', image: 'images/hd_total_station.png', title: 'As-Built Survey & Map',
    meaning: 'As-Built Survey & Map is a survey carried out after construction to record the actual position, dimensions, and levels of the completed work.',
    uses: ['Interior & Exterior Building Survey & Map', 'Interior & Exterior Structure Survey & Map', 'Column, Beam & Slab Survey & Map', 'Landscape & Car Park Survey & Map', 'Building Scanner Survey & Map', 'Interior & Exterior Port Survey & Map'],
  },
  {
    id: 'route-survey', image: 'images/survey_engineers_work.png', title: 'Route Survey & Map',
    meaning: 'Route Survey means measuring and mapping the land along a proposed or existing route to plan its alignment, levels, and construction.',
    uses: ['Utility & Alignment Survey & Map', 'Metro Line & Track Survey & Map', 'Roads & Highways Survey & Map', 'Railway Track & Runway Survey', 'Water, Sewer, Oil & Gas Pipelines Survey', 'Transmission Lines & Cable Line Survey', 'Canals & Drainage Survey & Map'],
  },
  {
    id: 'gis-survey', image: 'images/digital_mapping.png', title: 'GIS Survey & Map',
    meaning: 'Geographic Information System (GIS) Survey means collecting the location and descriptive details of land features or assets and linking them to a digital map.',
    uses: ['Topographical Survey & QGIS Map', 'Village & Street GIS Survey & Map', 'Road & Utility GIS Survey & Map', 'Town & City GIS Survey & Map', 'Contour & Terrain GIS Map'],
  },
  {
    id: 'lidar-survey', image: 'images/digital_land_mapping.png', title: 'LiDAR Survey & Map',
    meaning: 'LiDAR stands for Light Detection and Ranging. It uses laser pulses to measure distances and create detailed 3D point clouds.',
    uses: ['DTM, DSM & DEM Survey & Map', 'GIS & QGIS Survey & Map', 'Section & Elevation Survey & Map', '3D Model Survey & Map', 'Topographical Survey & Map'],
  },
  {
    id: 'earthwork-quantity-survey', image: 'images/drone_survey_aerial.png', title: 'Earthwork Quantity Survey & Map',
    meaning: 'Earthwork Quantity Survey means measuring and calculating the volume of soil or rock to be excavated, filled, or moved at a site.',
    uses: ['Land & Road Embankment Survey & Map', 'Soil & Rock Excavation Survey & Map', 'Soil & Rock Backfilling Survey & Map'],
  },
  {
    id: 'approval-survey', image: 'images/about_1.jpg', title: 'Approval Survey',
    meaning: 'Approval Survey means measuring a site and preparing the survey drawings needed for submission to an authority for land development, layout, or building approval.',
    uses: ['Land Approval Survey & Map', 'Building Approval Survey & Map', 'Layout Approval Survey & Map', 'Renewal Approval Survey & Map', 'Infrastructure Approval Survey & Map'],
  },
  {
    id: 'digital-survey', image: 'images/WhatsApp Image 2026-07-25 at 8.44.53 PM (2).jpeg', title: 'Digital Survey',
    meaning: 'Digital Survey means using electronic instruments to measure land positions, distances, angles, and levels.',
    uses: ['Total Station Survey & Map', 'DGPS Survey & Map', 'Drone Survey & Map', 'LiDAR Survey & Map', '3D Scanner Survey & Map'],
  },
];

// Sheet: "Digital Setting Out (Marking)"
const markings = [
  {
    id: 'boundary-marking', image: 'images/WhatsApp Image 2026-07-25 at 8.44.53 PM.jpeg', title: 'Boundary Marking',
    meaning: 'Digital Boundary Marking means locating and marking land boundary points on the ground using Total Station or DGPS/GNSS equipment, based on survey records and approved reference points.',
    uses: ['Site Boundary Marking', 'FMB & Subdivision Boundary Marking', 'Layout Boundary Marking', 'Cadastral Boundary Marking', 'Proposed Boundary Marking', 'Building Boundary Marking'],
  },
  {
    id: 'construction-marking', image: 'images/construction_measurement.png', title: 'Construction Marking',
    meaning: 'Construction Marking means transferring positions, dimensions, alignments, and levels from an approved construction drawing onto the ground using survey instruments.',
    uses: ['Proposed Plan Point Marking', 'Outer & Inner Line Marking', 'Grid & Center Line Marking', 'EW, PCC & Footing Point Marking', 'Excavation & Foundation Point Marking', 'Column & Shoe Point Marking', 'Beam & Slab Point Marking', 'Wall & Plinth Point Marking'],
  },
  {
    id: 'level-marking', image: 'images/banner-2.jpg', title: 'Level Marking',
    meaning: 'Level Marking means transferring a required height or elevation from a known benchmark to points on a construction site using an Auto Level, Digital Level, or Total Station.',
    uses: ['Bench Mark Level Marking', 'Road Slope & Level Marking', 'Roof & Floor Level Marking', 'Drainage Slope & Level Marking', 'Pipeline Level Marking', 'Plinth & Beam Level Marking'],
  },
  {
    id: 'route-marking', image: 'images/banner-1.jpg', title: 'Route Marking',
    meaning: 'Route Marking means marking the planned alignment of a road, railway, pipeline, cable, or transmission line on the ground using survey instruments.',
    uses: ['Road Center Line & Alignment Marking', 'Road Junction & Curve Marking', 'Cable & Canal Marking', 'Pipeline & Utility Marking', 'Drainage & Sewage Line Marking', 'Railway Track Center Line, LHS & RHS Marking', 'Electrical Line & Tower Line Marking', 'Runway & Subway Marking', 'Metro Line & Pillar Marking'],
  },
  {
    id: 'infrastructure-marking', image: 'images/land_survey.png', title: 'Infrastructure Marking',
    meaning: 'Infrastructure Marking means transferring the planned positions, alignments, and levels of infrastructure works from approved drawings onto the ground using survey instruments.',
    uses: ['Residential Building Marking', 'Commercial & Industrial Building Marking', 'Bridge & Culvert Marking', 'Tower & EB Station Marking', 'Bus Stand & Stop Marking', 'Railway & Metro Station Marking', 'Airport & Air Force Marking', 'Petrol Bunk & Gas Station Marking'],
  },
  {
    id: 'layout-marking', image: 'images/WhatsApp Image 2026-07-25 at 8.44.51 PM.jpeg', title: 'Layout Marking',
    meaning: 'Layout Marking means transferring an approved or proposed layout plan onto the ground by marking plot corners, boundaries, roads, and other designated areas.',
    uses: ['Plot Marking', 'Layout Road Marking', 'Layout Drainage Marking', 'Gate & Security Room Marking', 'Park & Utility Marking', 'EB & Light Pole Marking'],
  },
  {
    id: 'earthwork-marking', image: 'images/construction_survey.png', title: 'Earth Work Marking',
    meaning: 'Earthwork Marking means marking the limits, required levels, and slopes for excavation, filling, and ground formation according to the design.',
    uses: ['Excavation Boundary & Depth Marking', 'Cutting & Filling Level Marking', 'Site Formation Level Marking', 'Embankment & Side Slope Marking', 'Road Subgrade Level Marking', 'Grading & Drainage Slope Marking'],
  },
];

// Project images are representative field photos until site-specific photos are supplied.
// Sheet: "Completed". `work` and `client` are shown only when provided —
// fill them in from the workbook; nothing is displayed for empty fields.
const projects = [
  { id: 'tharakampatty-boundary', image: 'images/WhatsApp Image 2026-07-25 at 8.44.52 PM (4).jpeg', name: 'Boundary Survey', location: 'Tharakampatty, Karur', area: '55 Acres', work: '', client: '' },
  { id: 'athikinathupatti-solar', image: 'images/drone_survey.png', name: 'Proposed Solar Power Plant', location: 'Athikinathupatti, Udumalaipet', area: '85 Acres', work: '', client: '' },
  { id: 'thoothukudi-solar', image: 'images/drone_survey_aerial.png', name: 'Proposed Solar Power Plant', location: 'SIPCOT Site, Thoothukudi', area: '186 Acres', work: '', client: '' },
  { id: 'coimbatore-water-pipeline', image: 'images/banner-1.jpg', name: 'Proposed Corporation Water Pipeline', location: 'Kuppanur & Madamapatty, Coimbatore', area: '53 KM', work: '', client: '' },
  { id: 'mysuru-industrial', image: 'images/construction_survey.png', name: 'Proposed Industrial Project', location: 'Mysuru, Karnataka', area: '76 Acres', work: '', client: '' },
  { id: 'trisara-apartment-villa', image: 'images/WhatsApp Image 2026-07-25 at 8.44.54 PM.jpeg', name: 'Proposed Trisara Apartment & Villa Project', location: 'Ramanathapuram, Coimbatore', area: '26 Acres', work: '', client: '' },
  { id: 'kpr-mill', image: 'images/construction_measurement.png', name: 'Proposed KPR Mill Project', location: 'Sengapalli, Tiruppur', area: '186 Acres', work: 'Construction Marking', client: 'SK Constructions' },
];

// Existing client list (from the current clients page).
const clients = [
  { name: 'Isha Foundation', logo: 'images/isha.png' },
  { name: 'YOGO', logo: 'images/clients/yogo.svg' },
  { name: 'Viridis', logo: 'images/clients/viridis.svg' },
  { name: 'L&T', logo: 'images/L&T.png' },
  { name: 'IRCLASS', logo: 'images/irclasses.png' },
  { name: 'BPCL', logo: 'images/clients/bpcl.svg' },
  { name: 'Sathlokhar', logo: 'images/sathlokhar.png' },
  { name: 'BEST Engineering Services', logo: 'images/clients/best_engineering.svg' },
  { name: 'GR Group', logo: 'images/clients/gr_group.svg' },
  { name: 'Chennai Mobiles', logo: 'images/chennai_mobiles.jpg' },
];

// Instruments named in the workbook.
const equipment = [
  { id: 'total-station', image: 'images/WhatsApp Image 2026-07-25 at 8.44.53 PM (3).jpeg', title: 'Total Station', text: 'Electronic measurement of angles and distances for boundary, topographical and construction work.' },
  { id: 'dgps', image: 'images/WhatsApp Image 2026-07-25 at 8.44.52 PM (1).jpeg', title: 'DGPS / GNSS', text: 'Satellite positioning for control points, boundary marking and large-area surveys.' },
  { id: 'drone', image: 'images/drone_survey.png', title: 'Drone', text: 'Aerial data capture for mapping large or difficult-to-access sites.' },
  { id: 'lidar', image: 'images/digital_land_mapping.png', title: 'LiDAR', text: 'Laser pulses that create detailed 3D point clouds, DTM, DSM and DEM outputs.' },
  { id: '3d-scanner', image: 'images/hd_total_station.png', title: '3D Scanner', text: 'Detailed capture of buildings and structures for as-built records.' },
  { id: 'levels', image: 'images/banner-2.jpg', title: 'Auto Level & Digital Level', text: 'Transferring heights from a known benchmark for level marking.' },
];

// Sectors drawn from the "Used For" applications in the workbook.
const industries = [
  'Residential layouts & buildings', 'Commercial & industrial sites', 'SIPCOT & industrial estates',
  'Roads & highways', 'Railway & metro', 'Solar & wind farms', 'Power grids, stations & towers',
  'Water, sewer, oil & gas pipelines', 'Rivers, canals, dams & irrigation', 'Mining & quarries',
  'Harbours & ports', 'Airports', 'Educational & hospital campuses', 'Forest & hill areas',
];

module.exports = { company, surveys, markings, projects, clients, equipment, industries };
