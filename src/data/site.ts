export const company = {
  name: 'Techinfra Integrated Solutions Private Limited',
  display: 'Techinfra Integrated Solutions Pvt. Ltd.',
  short: 'Techinfra',
  phone: '+91 92295 00001',
  dial: '+919229500001',
  email: 'Info@techinfraispl.com',
  tagline: 'Integrated solutions for fire safety, security, building technology and renewable energy.',
};
export const whatsapp = (topic = 'my infrastructure requirements') =>
  'https://wa.me/' + company.dial.slice(1) + '?text=' +
  encodeURIComponent('Hello Techinfra, I would like to discuss ' + topic + '.');
export const mailto = (subject = 'Infrastructure enquiry') =>
  'mailto:' + company.email + '?subject=' + encodeURIComponent(subject);

export const nav = [
  ['Home','/'], ['About Us','/about-us/'], ['Services','/services/'],
  ['Sectors','/sectors/'], ['Projects','/projects/'], ['Contact','/contact-us/'],
];

export const services = [
  {
    slug:'fire-life-safety', name:'Fire & Life Safety Systems', label:'Fire & Life Safety', icon:'flame', color:'#d3101f', image:'fire-alarm', heroImage:'svc-fire', detailImage:'fire-manifold',
    hero:'Fire & Life Safety Solutions for Modern Facilities',
    short:'Fire detection, fire alarm and fire fighting systems.',
    intro:'Connect detection, occupant notification and firefighting infrastructure around the way a facility is occupied and operated.',
    context:'A public lobby, a plant room and an occupied office floor present different conditions. The facility layout, occupancy and existing equipment help define the scope for each area.',
    scope:[
      ['Fire Detection','Identify areas that need detection and consider the environment around each device, from office ceilings to utility spaces.','scan'],
      ['Fire Alarm','Bring alarm indications and occupant notifications into a coordinated plan for the building and its operators.','bell'],
      ['Fire Fighting','Consider the pipework, valves and firefighting equipment serving occupied areas and building services spaces.','flame'],
    ],
    discuss:'Share the building use, floor plans, occupied areas and any existing fire systems you want to extend or review.',
    share:['Building use and occupancy','Floor plans of the areas involved','Existing fire systems to extend or review'],
  },{
    slug:'cctv-security', name:'CCTV & Security Systems', label:'CCTV & Security', icon:'cctv', color:'#0a5aa8', image:'surveillance-camera', heroImage:'svc-cctv', detailImage:'control-room',
    hero:'Intelligent Surveillance & Security Solutions',
    short:'Video surveillance and security monitoring solutions.',
    intro:'Plan camera coverage and monitoring around entrances, circulation routes and the people responsible for site security.',
    context:'A loading bay, guest entrance and public concourse call for different camera views. Coverage depends on lighting, sightlines, activity and where operators need to view the footage.',
    scope:[
      ['Video Surveillance','Identify viewpoints for entries, perimeters, shared spaces and movement between operational zones.','cctv'],
      ['Security & Monitoring Solutions','Organize viewing positions and monitoring areas around the day-to-day responsibilities of the security team.','monitor'],
    ],
    discuss:'Tell us which areas require coverage, when they are occupied and where your operators monitor the site.',
    share:['Areas that require coverage','When those areas are occupied','Where operators monitor the site'],
  },{
    slug:'bms-integrated-technology', name:'BMS & Integrated Technology', label:'BMS & Technology', icon:'monitor', color:'#5545a6', image:'control-room', heroImage:'svc-bms', detailImage:'auditorium',
    hero:'Connected Building Technology & Integrated Systems',
    short:'BMS, PA/VA, access control, cabling, data, voice and AV.',
    intro:'Bring building supervision, access, communications and audiovisual systems into a coordinated technology plan.',
    context:'Technology requirements change from the control room to the conference floor. Consider who uses each space, which systems need to exchange information and what cabling is already in place.',
    scope:[
      ['PA Systems','Distribute routine announcements and operational messages to selected areas of a facility.','speaker'],
      ['VA Systems','Plan voice alarm announcements around occupancy zones and the building’s emergency communication requirements.','bell'],
      ['Building Management Systems','Give facilities teams a central view of relevant building services and their operating status.','monitor'],
      ['Access Control','Organize controlled entry at doors and access points around users, zones and operating hours.','access'],
      ['Structured Cabling','Plan physical connections between equipment rooms, work areas and network outlets.','network'],
      ['Data & Voice Communication','Connect workspaces and operational teams through the facility’s data and telephony infrastructure.','phone'],
      ['Video Conferencing','Coordinate room displays, cameras and audio for meetings between on-site and remote participants.','video'],
      ['Seminar Hall AV Solutions','Plan speech reinforcement, presentation displays and control positions around the room layout.','speaker'],
      ['Auditorium AV Solutions','Coordinate stage, presentation, audience audio and operator positions for larger events.','audio'],
    ],
    discuss:'Share the room schedule, communication zones, operator locations and systems that need to work together.',
    share:['Room schedule and communication zones','Operator and control locations','Systems that need to work together'],
  },{
    slug:'solar-renewable-energy', name:'Solar & Renewable Energy', label:'Solar & Renewables', icon:'solar', color:'#1f7a3d', image:'solar-array', heroImage:'svc-solar', detailImage:'commercial-campus',
    hero:'Renewable Energy Solutions for Sustainable Infrastructure',
    short:'Solar power systems and renewable energy solutions.',
    intro:'Explore how solar generation can fit the energy use, available space and electrical infrastructure of your facility.',
    context:'An industrial roof and a commercial campus offer different installation areas and patterns of demand. Reviewing the site and its daytime load helps frame a practical energy discussion.',
    scope:[
      ['Solar Power Systems','Review roof or site space, shading and electrical connections when considering a photovoltaic installation.','solar'],
      ['Renewable Energy Solutions','Consider renewable options alongside facility demand, operating hours and plans for future use.','leaf'],
    ],
    discuss:'Bring available roof dimensions, a recent electricity bill and a summary of operating hours to the conversation.',
    share:['Available roof dimensions','A recent electricity bill','A summary of operating hours'],
  },
];
export type Service = (typeof services)[number];
export const servicePath = (s: Service) => '/services/' + s.slug + '/';
export const allSystems = services.flatMap((s) => s.scope.map(([name, , icon]) => ({ name, icon, color: s.color })));

export const sectors = [
  {slug:'government-public-sector',name:'Government & Public Sector',image:'public-building',icon:'landmark',text:'Public-facing buildings balance open access with clearly managed staff and service areas. Fire notification, public address and entry monitoring can serve different needs across the same site.', focus:'Public halls, departmental offices and controlled entrances',services:[0,1,2]},
  {slug:'corporate-industrial',name:'Corporate & Industrial',image:'industrial-site',icon:'factory',text:'An industrial facility connects offices, production areas and service yards. Camera coverage, plant supervision and facility communications can be planned around shifts and movement between zones.',focus:'Plant rooms, production buildings and corporate campuses',services:[1,2,3]},
  {slug:'five-star-hospitality',name:'5-Star Hospitality',image:'hotel',icon:'hotel',text:'Guest areas, event spaces and back-of-house operations have different safety and communication needs. Coordinate fire notification, surveillance and meeting-room AV around guest circulation and staff workflows.',focus:'Guest lobbies, banquet halls and back-of-house areas',services:[0,1,2]},
  {slug:'commercial-institutional',name:'Commercial & Institutional',image:'commercial-campus',icon:'building',text:'Multi-use buildings need systems that support tenants, visitors and facilities teams throughout the day. Access control, building management and solar energy can be considered alongside room and campus requirements.',focus:'Shared entrances, teaching spaces and multi-tenant buildings',services:[0,2,3]},
];

export const gallery = [
  {image:'fire-manifold', title:'Fire fighting pipework', category:'Fire safety',text:'Valves and distribution pipework in a building services room.'},
  {image:'surveillance-camera', title:'Perimeter surveillance',category:'Security',text:'A wall-mounted camera positioned to observe an exterior approach.'},
  {image:'control-room',title:'Building control room',category:'Building technology',text:'A central viewing position for facilities and monitoring teams.'},
  {image:'solar-array',title:'Commercial solar array',category:'Energy',text:'Rows of photovoltaic modules arranged for site-based solar generation.'},
  {image:'auditorium',title:'Auditorium AV',category:'Building technology',text:'A performance and presentation space with stage and audience zones.'},
  {image:'fire-alarm',title:'Alarm notification',category:'Fire safety',text:'An alarm bell and manual call point for occupant notification.'},
];

export const approach = [
  ['Understand the facility','Start with its users, operating hours, critical spaces and existing infrastructure.'],
  ['Identify relevant solutions','Match the requirements of each space to safety, security, technology and energy systems.'],
  ['Integrate technologies','Consider the connections between equipment, controls, cabling and the people using them.'],
  ['Support connected operations','Plan how facilities teams will view information, communicate and manage everyday building needs.'],
];

export const strengths = [
  ['layers','End-to-End Solutions','From the first requirement discussion to connected, working systems.'],
  ['gear','Integrated Technology','Safety, security, communications and energy considered together.'],
  ['nodes','Connected Infrastructure','Cabling, controls and equipment planned to work as one.'],
  ['shield','Safety-Focused Systems','Protection for people and assets at the centre of every plan.'],
  ['leaf','Sustainable Solutions','Renewable energy considered alongside everyday facility demand.'],
];

// Figures derived from the content above — not marketing claims.
export const facts = [
  [String(services.length), 'Service areas'],
  [String(allSystems.length), 'Specialist systems'],
  [String(sectors.length), 'Industry sectors'],
  ['1', 'Coordinated approach'],
];

type Media = { alt: string; kind: 'legacy' | 'landscape' | 'portrait' };
export const media: Record<string, Media> = {
  'fire-alarm': { kind: 'legacy', alt: 'Red fire alarm bell and manual call point on a wall' },
  'surveillance-camera': { kind: 'legacy', alt: 'Commercial surveillance camera on an exterior wall' },
  'control-room': { kind: 'legacy', alt: 'Building control room with operator desks and monitoring screens' },
  'solar-array': { kind: 'legacy', alt: 'Rows of photovoltaic panels in the evening sun' },
  'public-building': { kind: 'legacy', alt: 'Domed public administration building beyond a landscaped lawn' },
  'industrial-site': { kind: 'legacy', alt: 'Industrial plant with illuminated production buildings' },
  'hotel': { kind: 'legacy', alt: 'Hotel facade and guest entrance illuminated at dusk' },
  'commercial-campus': { kind: 'legacy', alt: 'Glass-fronted campus buildings around a landscaped courtyard' },
  'building-model': { kind: 'legacy', alt: 'Architectural model of a modern glazed office building' },
  'engineer': { kind: 'legacy', alt: 'Engineer reviewing a tablet in a mechanical services room' },
  'fire-manifold': { kind: 'legacy', alt: 'Red fire distribution pipework and control valves' },
  'auditorium': { kind: 'legacy', alt: 'Auditorium with rows of red seats facing a presentation stage' },
  'hero-dusk': { kind: 'landscape', alt: 'Modern glass-fronted commercial building with warmly lit floors at blue hour' },
  'svc-fire': { kind: 'landscape', alt: 'Smoke detector, sprinkler head and red fire hose cabinet in a modern commercial corridor' },
  'svc-cctv': { kind: 'landscape', alt: 'Dome and box-style security cameras mounted on a modern building entrance at dusk' },
  'svc-bms': { kind: 'landscape', alt: 'Facility operators monitoring building systems on a large video wall in a control room' },
  'svc-solar': { kind: 'landscape', alt: 'Rooftop solar power installation on a commercial building at sunrise' },
  'team-site': { kind: 'portrait', alt: 'Two engineers in safety helmets reviewing building system drawings on a tablet in a plant room' },
  'cta-city': { kind: 'landscape', alt: '' },
  'contact-lobby': { kind: 'landscape', alt: 'Bright modern corporate reception lobby with access-controlled entry gates' },
};
