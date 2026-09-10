import { DatabaseState } from './types';

export const initialDatabase: DatabaseState = {
  users: [
    {
      id: 1,
      name: 'EGE Chief Administrator',
      email: 'admin@eliteglobalexcellence.com',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      lastLogin: '2026-09-08 10:15',
    },
    {
      id: 2,
      name: 'Editorial Lead',
      email: 'editor@eliteglobalexcellence.com',
      role: 'EDITOR',
      status: 'ACTIVE',
      lastLogin: '2026-09-07 14:20',
    },
  ],

  ambassadors: [
    {
      id: 1,
      name: 'Dr. Hadi Susanto',
      title: 'Industrial Engineering Lecturer and Researcher',
      country: 'Indonesia',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Dr. Hadi Susanto is a senior lecturer and researcher in Industrial Engineering with extensive experience in operational research, supply chain resilience, and digital manufacturing systems. He has published over 40 peer-reviewed papers.',
      researchInterests: ['Operational Research', 'Supply Chain Systems', 'Smart Manufacturing', 'Systems Engineering'],
      collaborationHighlights: 'Active collaborator on EGE international symposiums and co-convener of manufacturing optimization workshop tracks.',
      displayOrder: 1,
      isActive: true,
    },
    {
      id: 2,
      name: 'Dr. Ekaterina V. Shevchuk (Dr. Kate)',
      title: 'Associate Professor',
      country: 'Russia',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'Dr. Ekaterina V. Shevchuk is an Associate Professor specializing in computational linguistics, natural language processing, and cross-cultural academic discourse. She leads interdisciplinary projects bridging cognitive science and machine intelligence.',
      researchInterests: ['Natural Language Processing', 'Computational Linguistics', 'Machine Translation', 'Academic Discourse'],
      collaborationHighlights: 'Keynote panelist at EGE-MLDL conference and advisor for international author manuscript enrichment programs.',
      displayOrder: 2,
      isActive: true,
    },
    {
      id: 3,
      name: 'Dr. Nelli A. Kozlova (Dr. Nelli)',
      title: 'Associate Professor',
      country: 'Russia',
      photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      bio: 'Dr. Nelli A. Kozlova holds a Ph.D. in Computer Science and serves as Associate Professor with research focused on distributed data architectures, algorithmic game theory, and scientific data mining.',
      researchInterests: ['Big Data Simulation', 'Distributed Computing', 'Algorithm Optimization', 'Scientific Workflows'],
      collaborationHighlights: 'Delivered keynote workshop on Big Data Visualization and mentor for EGE postgraduate thesis candidates.',
      displayOrder: 3,
      isActive: true,
    },
    {
      id: 4,
      name: 'Dr. Norma Binti Alias',
      title: 'Associate Professor',
      country: 'Malaysia',
      photoUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
      bio: 'Dr. Norma Binti Alias is a distinguished Associate Professor in High Performance Computing and Mathematics. Her research pioneers GPU acceleration, partial differential equations, and nano-biotechnology modeling.',
      researchInterests: ['High Performance Computing', 'CUDA Acceleration', 'Numerical Modeling', 'Bioinformatics'],
      collaborationHighlights: 'Spearheaded the landmark EGE workshop series on Parallel Computing Platforms and CUDA Software for Big Data.',
      displayOrder: 4,
      isActive: true,
    },
    {
      id: 5,
      name: 'Dr. Nuno M. Garcia',
      title: 'Professor',
      country: 'Portugal',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'Dr. Nuno M. Garcia is a Full Professor of Computer Science at the University of Lisbon / University of Beira Interior, recognized internationally for his research in ubiquitous computing, wireless sensor networks, and smart healthcare protocols.',
      researchInterests: ['Ubiquitous Computing', 'Internet of Things', 'Digital Health', 'Network Protocols'],
      collaborationHighlights: 'Lead European coordinator for the EGE and University of Lisbon bilateral academic cooperation memorandum.',
      displayOrder: 5,
      isActive: true,
    },
  ],

  events: [
    {
      id: 1,
      title: 'EGE International Conference on Computer Science, Engineering & Information Technology (EGE-ICCSEIT 2026)',
      description: 'The premier international forum for researchers, educators, and industry leaders to present cutting-edge advances in Computer Science, Software Engineering, Cybersecurity, and AI.',
      date: 'October 14-16, 2026',
      locationMode: 'Kuala Lumpur, Malaysia & Virtual Hybrid',
      category: 'International Conference',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      status: 'UPCOMING',
      registrationLink: '#register-iccseit',
      displayOrder: 1,
    },
    {
      id: 2,
      title: 'EGE International Conference on Machine Learning & Deep Learning (EGE-MLDL 2026)',
      description: 'A specialized global conference centered on modern generative models, deep reinforcement learning, computer vision, and trustworthy AI.',
      date: 'November 20-22, 2026',
      locationMode: 'Online Interactive Stream',
      category: 'Specialized Conference',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      status: 'UPCOMING',
      registrationLink: '#register-mldl',
      displayOrder: 2,
    },
    {
      id: 3,
      title: 'EGE First Workshop – Global Marketing Insights',
      description: 'Interactive case study analysis exploring digital globalization, consumer sentiment analytics, and agile go-to-market strategies.',
      date: '15 December 2023',
      locationMode: 'Online · Global',
      category: 'Workshop Highlight',
      imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
      status: 'PAST',
      displayOrder: 3,
    },
    {
      id: 4,
      title: 'Collaboration with Prof. Dr. Nor Haniza Samrin',
      description: 'High-level academic alignment ceremony and collaborative agenda setting for postgraduate research empowerment across ASEAN.',
      date: '29 October 2023',
      locationMode: 'Johor Bahru, Malaysia',
      category: 'Academic Milestone',
      imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
      status: 'PAST',
      displayOrder: 4,
    },
    {
      id: 5,
      title: 'EGE and University of Lisbon Portugal Forge Collaboration',
      description: 'Signing of bilateral cooperation framework to drive joint doctoral mentoring, Scopus-indexed research initiatives, and faculty exchange.',
      date: '01 August 2026',
      locationMode: 'Lisbon, Portugal / Virtual',
      category: 'International MoU',
      imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
      status: 'PAST',
      displayOrder: 5,
    },
    {
      id: 6,
      title: 'The AI Driven Third Millennium Smart World – Workshop Series',
      description: 'Intensive masterclass examining foundational transformers, autonomous agents, and scientific discovery pipelines.',
      date: '19 December 2024',
      locationMode: 'Online Interactive',
      category: 'Workshop Series',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      status: 'PAST',
      displayOrder: 6,
    },
  ],

  newsArticles: [
    {
      id: 1,
      title: 'Elite Global Excellence and Prof. Dr. Nor Haniza Samrin Unite for a Visionary Collaboration',
      excerpt: 'Elite Global Excellence Sdn. Bhd. (EGE) has announced a landmark strategic collaboration with distinguished scholar Prof. Dr. Nor Haniza Samrin to elevate academic training and research publishing.',
      content: `KUALA LUMPUR / JOHOR BAHRU — Elite Global Excellence Sdn. Bhd. (EGE) is proud to announce an impactful strategic collaboration with renowned scholar Prof. Dr. Nor Haniza Samrin. 

This alliance seeks to bridge institutional gaps in postgraduate research coaching, offering specialized research clinics, structured viva preparation, and interdisciplinary workshop tracks to scholars across the Asia-Pacific region.

"Through this collaboration, we are democratizing advanced research methodologies and ensuring that emerging scholars receive world-class mentorship," stated the EGE executive board. The partnership will immediately roll out specialized seminar tracks on high-impact research methodologies, ethics in artificial intelligence, and accelerated manuscript preparation for indexed journals.`,
      category: 'Press release',
      author: 'EGE Strategic Communications',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
      publishDate: '29 October 2023',
      isPublished: true,
      viewsCount: 1420,
    },
    {
      id: 2,
      title: 'EGE and University of Lisbon Portugal Forge Collaboration to Drive Research and Innovation',
      excerpt: 'A comprehensive partnership between Elite Global Excellence and the University of Lisbon establishes joint research programs, faculty development initiatives, and international publication tracks.',
      content: `LISBON, PORTUGAL & KUALA LUMPUR, MALAYSIA — Elite Global Excellence Sdn. Bhd. (EGE) has entered into a bilateral research and innovation partnership with the University of Lisbon, Portugal.

The agreement formalizes cross-continental knowledge exchange, joint organization of upcoming conference tracks (including ICCSEIT and EGE-MLDL), and coordinated student development initiatives. European and Asian scholars will collaborate on high-performance computing, data analytics, and sustainable smart technologies.

Prof. Dr. Nuno M. Garcia of the University of Lisbon expressed enthusiasm: "International synergy is the bedrock of scientific breakthroughs. Partnering with EGE expands our research reach into vibrant Asian academic ecosystems, creating profound opportunities for doctoral candidates and senior researchers alike."`,
      category: 'Press release',
      author: 'EGE Global Relations Office',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
      publishDate: '01 August 2026',
      isPublished: true,
      viewsCount: 2180,
    },
  ],

  partners: [
    {
      id: 1,
      name: 'Universiti Teknologi Malaysia (UTM)',
      category: 'Premier University Partner',
      logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=300&q=80',
      description: 'Malaysia’s premier technological university, collaborating with EGE on advanced computing workshops, research seminars, and doctoral defense simulations.',
      websiteUrl: 'https://www.utm.my',
      country: 'Malaysia',
      displayOrder: 1,
    },
    {
      id: 2,
      name: 'VTT Technical Research Centre',
      category: 'Research Institute',
      logoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80',
      description: 'One of Europe’s leading visionary research and technology organizations, collaborating on applied science and smart systems innovation.',
      websiteUrl: 'https://www.vttresearch.com',
      country: 'Finland',
      displayOrder: 2,
    },
    {
      id: 3,
      name: 'University of Sargodha',
      category: 'Academic Collaborator',
      logoUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=300&q=80',
      description: 'A major public research university partnering on student development symposiums, joint webinars, and research capacity building.',
      websiteUrl: 'https://www.uos.edu.pk',
      country: 'Pakistan',
      displayOrder: 3,
    },
    {
      id: 4,
      name: 'National Science Foundation',
      category: 'Scientific Body Partner',
      logoUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80',
      description: 'Collaborating on science dissemination protocols, STEM literacy outreach, and international academic conference peer-review standards.',
      websiteUrl: 'https://www.nsf.gov',
      country: 'United States',
      displayOrder: 4,
    },
    {
      id: 5,
      name: 'Saudi Electronic University',
      category: 'Higher Education Partner',
      logoUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80',
      description: 'Pioneering flexible, digital higher education in the Middle East, collaborating on virtual learning and AI in educational delivery.',
      websiteUrl: 'https://www.seu.edu.sa',
      country: 'Saudi Arabia',
      displayOrder: 5,
    },
  ],

  workshops: [
    {
      id: 'w29',
      workshopId: 'EGEW29',
      title: 'AI in Education',
      date: 'March 15, 2026',
      dateString: 'March 15, 2026',
      time: '10:00 AM - 1:00 PM',
      mode: 'Online (Zoom)',
      venue: '—',
      fee: 'Free',
      isFree: true,
      status: 'UPCOMING',
      description: 'Elite Global Excellence Sdn. Bhd. (EGE) organizes workshops, seminars, webinars, and professional training programs designed to support researchers, students, educators, universities, and industry professionals. Our programs cover research methodology, academic writing, artificial intelligence, data science, emerging technologies, scholarly publishing, research ethics, professional development, and other trending topics. Upcoming events will be announced here together with registration details, schedules, speakers, and participation information. Stay connected with EGE and join our growing global academic community for valuable learning, networking, and collaboration opportunities.',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      whatsappLink: 'https://chat.whatsapp.com/EGEWorkshopAI2026',
      whatsappQrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://chat.whatsapp.com/EGEWorkshopAI2026',
      objectives: [
        'Enhance research knowledge and practical skills.',
        'Promote academic excellence and lifelong learning.',
        'Support researchers in scholarly publishing and research development.',
        'Provide training on emerging technologies and artificial intelligence.',
        'Strengthen academic writing and research methodology skills.',
        'Encourage collaboration among researchers and institutions worldwide.',
        'Facilitate knowledge sharing through expert-led workshops and seminars.',
        'Support students and professionals in continuous career development.',
        'Build international academic and research networks.',
        'Empower participants with industry-relevant knowledge and best practices.',
      ],
      attendanceOpen: false,
      displayOrder: 1,
    },
  ],

  courses: [
    {
      id: 1,
      title: 'Upcoming Professional Courses – LEARN · GROW · SUCCEED',
      tagline: 'NEW COURSES. NEW SKILLS. NEW POSSIBILITIES. COMING SOON!',
      duration: 'Course duration will be announced soon',
      mode: 'Online (Live)',
      type: 'UPCOMING',
      description: 'Elite Global Excellence Sdn. Bhd. (EGE) is preparing a series of professional courses designed to equip students, researchers, academics, and industry professionals with practical knowledge and relevant skills in emerging technology and professional development areas.',
      objective: 'To provide structured, industry-relevant learning opportunities that help participants enhance their technical skills, improve professional capabilities, and apply knowledge effectively in academic and industry environments.',
      outline: [
        'Module 1: Advanced Research Formulation & Problem Statement Framing',
        'Module 2: Contemporary Machine Learning & Deep Learning Implementation',
        'Module 3: Manuscript Architecture for High-Impact Scopus/WoS Journals',
        'Module 4: Defending Complex Methodologies & Quantitative Rigor',
        'Module 5: Research Grant Writing & Multi-Institutional Project Leadership',
      ],
      benefits: [
        'Gain practical knowledge and industry-relevant skills',
        'Learn directly from experienced international academics and professionals',
        'Access structured learning materials and guided hands-on training',
        'Enhance technical and professional competencies for global markets',
        'Receive early-bird notifications and certification upon completion',
      ],
      price: 0,
      registrationOpen: true,
    },
  ],

  researchMembers: [
    {
      id: 1,
      name: 'Azmain Mahpara Iqbal',
      role: 'Research Assistant',
      affiliation: 'Universiti Teknologi Malaysia (UTM)',
      country: 'Malaysia',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      researchArea: 'Natural Language Processing & Smart Learning Environments',
      displayOrder: 1,
    },
    {
      id: 2,
      name: 'Maria Taskin Aumanee',
      role: 'Research Assistant',
      affiliation: 'Universiti Teknologi Malaysia (UTM)',
      country: 'Malaysia',
      photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      researchArea: 'Bio-computational modeling & Biomedical Informatics',
      displayOrder: 2,
    },
    {
      id: 3,
      name: 'Mian Muhammad Usman Faisal',
      role: 'Research Assistant',
      affiliation: 'Riphah International University',
      country: 'Pakistan',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      researchArea: 'Deep Learning for Medical Image Segmentation',
      displayOrder: 3,
    },
    {
      id: 4,
      name: 'Mr. Muhammad Hashir Sakimdad',
      role: 'Research Assistant',
      affiliation: 'Pak Austria Fachhochschule',
      country: 'Pakistan',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      researchArea: 'Autonomous Robotics & Embedded IoT Systems',
      displayOrder: 4,
    },
    {
      id: 5,
      name: 'Mr. Abubakar Sadiq Nuhu',
      role: 'Research Assistant',
      affiliation: 'Ahmadu Bello University, Zaria',
      country: 'Nigeria',
      photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
      researchArea: 'Cybersecurity, Cryptographic Protocols & Network Defense',
      displayOrder: 5,
    },
    {
      id: 6,
      name: 'Mr. Abubakar Mohammed Bichi',
      role: 'Research Assistant',
      affiliation: 'Modibbo Adama University, Yola',
      country: 'Nigeria',
      photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
      researchArea: 'Data Mining, Environmental Informatics & Predictive Analytics',
      displayOrder: 6,
    },
  ],

  careers: [
    {
      id: 1,
      title: 'Academic Journal Managing Editor',
      department: 'Publications Division',
      location: 'Remote / Kuala Lumpur',
      type: 'Full-time',
      description: 'Lead the editorial oversight, peer review coordination, and Scopus/WoS compliance pathways for EGE emerging peer-reviewed journals.',
      requirements: [
        'PhD or Master’s in Computer Science, Engineering, or related technical discipline',
        'Proven track record in peer-reviewed journal publishing or editorial workflows',
        'Exceptional written English and technical editing proficiency',
        'Familiarity with COPE ethical guidelines and double-blind review protocols',
      ],
      status: 'OPEN',
    },
    {
      id: 2,
      title: 'International Conference Coordinator',
      department: 'Conferences Division',
      location: 'Kuala Lumpur / Hybrid',
      type: 'Full-time',
      description: 'Orchestrate logistics, author correspondence, keynote speaker liaison, and technical proceedings for ICCSEIT and EGE-MLDL annual congresses.',
      requirements: [
        'Bachelor’s degree in Event Management, Communications, or Information Technology',
        '2+ years experience coordinating academic or professional international conferences',
        'Strong project management skills and comfort with virtual conferencing software',
      ],
      status: 'OPEN',
    },
  ],

  siteContent: {
    tagline: 'Aspire, Achieve, Advance with EGE',
    secondaryTagline: 'Where Research Meets Excellence',
    heroHeadline: 'Elite Global Excellence (EGE)',
    heroSubheadline: 'WHERE RESEARCH MEETS EXCELLENCE',
    heroPill: 'SUPPORTING EXCELLENCE AT EVERY RESEARCH STAGE',
    heroBadges: [
      'WHERE RESEARCH MEETS EXCELLENCE',
      'SUPPORTING EXCELLENCE AT EVERY RESEARCH STAGE',
      'ADVANCING ACADEMIC PUBLISHING & INNOVATION',
      'BRIDGING RESEARCHERS, UNIVERSITIES & INDUSTRY WORLDWIDE',
    ],
    heroTitle: 'Elite Global Excellence (EGE)',
    heroStatement: 'Aspire, Achieve, Advance with EGE. Bridging borders, empowering researchers, and advancing scientific knowledge across 33+ nations worldwide.',
    heroPrimaryCtaText: 'Check Upcoming Events',
    heroSecondaryCtaText: 'View All Services',
    heroCtaButtons: [
      { id: 'cta-1', label: 'Check Upcoming Events', targetTab: 'workshops', variant: 'primary' },
      { id: 'cta-2', label: 'View All Services', targetTab: 'services', variant: 'secondary' },
    ],
    sinceYear: 'SINCE 2020',
    connectingMindsHeading: 'Connecting Minds',
    connectingMindsBody: 'Elite Global Excellence Sdn. Bhd. (EGE) is a Malaysia-based academic and research services company dedicated to supporting researchers, students, educators, universities, and research institutions worldwide. Our mission is to make research, academic publishing, and professional development more accessible by providing high-quality services that help individuals and institutions succeed.',
    connectingMindsPrimaryBtnText: 'Explore more',
    connectingMindsPrimaryBtnTarget: 'about',
    connectingMindsSecondaryBtnText: 'Our Research Network',
    connectingMindsSecondaryBtnTarget: 'research-network',
    connectingMindsVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    upcomingEventsBadge: 'WHAT’S NEXT',
    upcomingEventsTitle: 'Upcoming Events',
    upcomingEventsSubtitle: 'Discover our latest workshops, webinars, and education fairs designed to help you on your academic journey.',
    upcomingEventsCtaText: 'View All Conferences & Events',
    upcomingEventsCtaLink: 'conferences',
    servicesSectionBadge: 'WHAT WE OFFER',
    servicesSectionTitle: 'Our Services',
    servicesSectionSubtitle: 'Comprehensive academic and research services — from international conferences and journal publishing to publication support, professional training, mock viva preparation, and institutional collaboration.',
    eventsGalleryBadge: 'MOMENTS THAT MATTER',
    eventsGalleryTitle: 'Events Gallery',
    eventsGalleryCtaText: 'View All Past Events',
    eventsGalleryCtaLink: 'workshops',
    collaboratorsBadge: 'TRUSTED COLLABORATORS',
    collaboratorsSubtitle: 'Partnering with leading institutions and academic collaborators worldwide',
    collaboratorsCtaText: 'Explore All Academic Partners & Collaborations',
    collaboratorsCtaLink: 'partners',
    latestNewsBadge: 'FRESH FROM EGE',
    latestNewsTitle: 'Latest News',
    latestNewsCtaText: 'View all news',
    latestNewsCtaLink: 'news',
    testimonialsBadge: 'WHAT PEOPLE SAY ABOUT US',
    testimonialsTitle: 'Delivering Excellence Through Every Experience',
    globalReachBadge: 'GLOBAL REACH',
    globalReachTitle: 'Where We Work',
    globalReachDescription: 'We connect researchers, students, educators, universities, and research institutions worldwide through international conferences, scholarly publishing, professional training, research support, and academic collaboration.',
    globalReachTagline: 'Expanding Worldwide · Connecting Emerging & Established Scholars',
    globalRegions: [
      {
        id: 'reg-1',
        regionName: 'Asia',
        countriesList: 'Malaysia, Singapore, India, Pakistan, Bangladesh, Nepal, Sri Lanka, Vietnam, Philippines.',
        hubFocus: 'Regional Hub: Kuala Lumpur & Johor Bahru',
      },
      {
        id: 'reg-2',
        regionName: 'Europe',
        countriesList: 'United Kingdom, Germany, Poland, France, Italy, Netherlands, Spain, Portugal.',
        hubFocus: 'Bilateral Chapter: Lisbon & European Collaborators',
      },
      {
        id: 'reg-3',
        regionName: 'North America',
        countriesList: 'United States and Canada (Scientific dissemination and conference committees).',
        hubFocus: 'Strategic Outreach & Peer-Review Panels',
      },
    ],
    stats: {
      collaborators: '50+',
      database: '8,000+',
      countries: '33+',
      events: '30+',
    },
    metrics: [
      {
        count: '50+',
        label: 'Academic Collaborators',
        subtext: 'Global university network',
      },
      {
        count: '8,000+',
        label: 'Researchers Database',
        subtext: 'Active scholars & authors',
      },
      {
        count: '33+',
        label: 'Countries Worldwide',
        subtext: 'Asia, Europe & Americas',
      },
      {
        count: '30+',
        label: 'Successful Events Delivered',
        subtext: 'Conferences & workshops',
      },
    ],
    mission: 'To empower students, researchers, and academic institutions worldwide by providing expert research consultancy, peer-reviewed publishing assistance, high-impact conferences, and structured thesis defense coaching that transforms academic ambition into global excellence.',
    vision: 'To be the world’s most trusted catalyst for academic and research advancement—a global nexus where every researcher and institution, regardless of geography, has the guidance, network, and opportunity to publish, innovate, and lead.',
    goals: [
      'Advance interdisciplinary research through high-impact international conferences.',
      'Support scholars in publishing their work in reputable, indexed journals.',
      'Deliver free, accessible academic training to under-resourced researchers.',
      'Build enduring partnerships between universities, industry, and research bodies.',
      'Prepare candidates for successful viva examinations and dissertation defence.',
      'Cultivate a global network of scholars committed to excellence and integrity.',
      'Champion inclusive, ethical research practices across every discipline.',
    ],
    objectives: [
      'Organize world-class annual conferences (IMRC, ICCSEIT) with rigorous peer review.',
      'Publish high-quality academic journals and support Scopus/WoS indexing pathways.',
      'Provide end-to-end publication assistance from manuscript polish to submission.',
      'Run continuous free workshops and seminars in emerging research methodologies.',
      'Offer structured mock viva sessions with senior examiners across disciplines.',
      'Facilitate MoUs, joint research, and student exchange programs.',
      'Expand EGE’s global footprint through new regional chapters and partners.',
    ],
    testimonials: [],
    aboutPage: {
      heroBadge: 'ABOUT ELITE GLOBAL EXCELLENCE',
      heroTitle: 'Bridging borders, building knowledge.',
      heroSubheadline: 'Empowering research. Transforming knowledge. Creating global impact.',
      establishedBadge: 'ESTABLISHED 2020 · MALAYSIA',
      overviewTitle: 'About Elite Global Excellence Sdn. Bhd.',
      overviewParagraphs: [
        'Elite Global Excellence Sdn. Bhd. (EGE) is a Malaysia-based academic and research services company dedicated to supporting researchers, students, educators, universities, and research institutions worldwide.',
        'Our mission is to make research, academic publishing, and professional development more accessible by providing high-quality services that help individuals and institutions succeed. Headquartered in Malaysia with operational presence spanning Asia, Europe, and North America, EGE brings together an international network of distinguished academics, senior journal editors, and university leaders.',
        'Through annual flagship conferences (ICCSEIT, EGE-MLDL), indexed journal publication pathways, continuous free academic workshops, and our specialized Mock Viva defense clinic, we guide emerging and established scholars through every phase of the research lifecycle.'
      ],
      overviewBadges: [
        'Incorporated under Companies Commission of Malaysia (SSM)',
        'Global Scholarly & Peer-Review Standards'
      ],
      pillars: [
        {
          id: 'pil-1',
          title: 'Global Academic Outreach',
          description: 'Connecting scholars across 33+ nations with collaborative research pipelines.'
        },
        {
          id: 'pil-2',
          title: 'Scholarly Publishing Integrity',
          description: 'Rigorous double-blind peer-review upholding international COPE ethics.'
        },
        {
          id: 'pil-3',
          title: 'Postgraduate Defense Excellence',
          description: 'Structured mock viva defense panels led by international examiners.'
        }
      ],
      missionTitle: 'Our Mission',
      missionText: 'To empower students, researchers, and academic institutions worldwide by providing expert research consultancy, peer-reviewed publishing assistance, high-impact conferences, and structured thesis defense coaching that transforms academic ambition into global excellence.',
      visionTitle: 'Our Vision',
      visionText: 'To be the world’s most trusted catalyst for academic and research advancement—a global nexus where every researcher and institution, regardless of geography, has the guidance, network, and opportunity to publish, innovate, and lead.',
      goalsBadge: 'OUR COMMITMENTS',
      goalsTitle: 'Goals',
      goalsSubtitle: 'The enduring principles guiding our research initiatives and academic partnerships.',
      goalsList: [
        'Advance interdisciplinary research through high-impact international conferences.',
        'Support scholars in publishing their work in reputable, indexed journals.',
        'Deliver free, accessible academic training to under-resourced researchers.',
        'Build enduring partnerships between universities, industry, and research bodies.',
        'Prepare candidates for successful viva examinations and dissertation defence.',
        'Cultivate a global network of scholars committed to excellence and integrity.',
        'Champion inclusive, ethical research practices across every discipline.'
      ],
      objectivesBadge: 'HOW WE DELIVER',
      objectivesTitle: 'Objectives',
      objectivesSubtitle: 'Concrete programmatic actions executed across our academic divisions.',
      objectivesList: [
        'Organize world-class annual conferences (IMRC, ICCSEIT) with rigorous peer review.',
        'Publish high-quality academic journals and support Scopus/WoS indexing pathways.',
        'Provide end-to-end publication assistance from manuscript polish to submission.',
        'Run continuous free workshops and seminars in emerging research methodologies.',
        'Offer structured mock viva sessions with senior examiners across disciplines.',
        'Facilitate MoUs, joint research, and student exchange programs.',
        'Expand EGE’s global footprint through new regional chapters and partners.'
      ],
      governanceBadge: 'GOVERNANCE & STRUCTURE',
      governanceTitle: 'Organization Chart / Leadership',
      governanceSubtitle: 'Clear administrative hierarchy ensuring academic rigor, ethical publishing, and international compliance.',
      topGovernanceHeader: 'TOP-LEVEL GOVERNANCE',
      topGovernanceTitle: 'Executive Leadership',
      topGovernanceBody: 'BOARD OF DIRECTORS & CHIEF EXECUTIVE OFFICER',
      topGovernanceSubtext: 'Strategic Guidance · Academic Ethics Council · Global Direction',
      divisions: [
        {
          id: 'div-1',
          code: 'Division 01',
          scope: 'IMRC · ICCSEIT · EGE-MLDL · IURC',
          name: 'Conferences Division',
          description: 'Oversees global call for papers, double-blind peer review, keynote speaker coordination, and conference proceedings publication.',
          lead: 'Prof. Steering Committee'
        },
        {
          id: 'div-2',
          code: 'Division 02',
          scope: 'Journals · Peer Review · Indexing',
          name: 'Publications & Journals',
          description: 'Manages EGE peer-reviewed scientific journals, Scopus/WoS compliance, ethical standards, and author manuscript enhancement services.',
          lead: 'Editorial Board & Managing Editors'
        },
        {
          id: 'div-3',
          code: 'Division 03',
          scope: 'Free Webinars & Bespoke Institutional Tracks',
          name: 'Training & Academic Workshops',
          description: 'Designs and executes virtual masterclasses in AI, data science, research methods, and hands-on scientific tools.',
          lead: 'Director of Academic Development'
        },
        {
          id: 'div-4',
          code: 'Division 04',
          scope: 'Mock Viva · Thesis Defense · Proposal Reviews',
          name: 'Student Support & Defense Clinic',
          description: 'Provides structured four-phase mock viva simulations, examiner question bank preparation, and defense presentation coaching.',
          lead: 'Postgraduate Advisory Panel'
        },
        {
          id: 'div-5',
          code: 'Division 05',
          scope: 'Universities · Research Institutes · Sponsors',
          name: 'Global Partnerships & MoUs',
          description: 'Facilitates institutional MoUs, international symposium co-hosting, academic exchange agreements, and research consortia.',
          lead: 'External Relations Office'
        },
        {
          id: 'div-6',
          code: 'Division 06',
          scope: 'Finance · Marketing · IT Systems & Registry',
          name: 'Operations & Academic Administration',
          description: 'Ensures seamless digital infrastructure, certificate verification databases, and global participant operations.',
          lead: 'Chief Operating Office'
        }
      ],
      governanceMembers: [
        {
          id: 'gov-mem-1',
          name: 'Matthew S. Kissner',
          title: 'President and Chief Executive Officer',
          category: 'CEO',
          photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
          summary: 'Matthew Kissner is the President and Chief Executive Officer at Wiley',
          fullBio: 'Matthew S. Kissner serves as President and Chief Executive Officer. He brings decades of executive leadership, strategic corporate governance, and commitment to global academic excellence, digital publishing innovation, and global research advancement.',
          organization: 'Wiley / Elite Global Excellence',
          displayOrder: 1
        },
        {
          id: 'gov-mem-2',
          name: 'Craig Albright',
          title: 'Executive Vice President and Chief Financial Officer',
          category: 'CO_FOUNDER',
          photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
          summary: 'Craig Albright is the Executive Vice President and Chief Financial Officer at Wiley',
          fullBio: 'Craig Albright is Executive Vice President and Chief Financial Officer. He oversees global financial strategy, capital allocation, corporate growth initiatives, and international partnership frameworks across research and educational technology divisions.',
          organization: 'Wiley / Elite Global Excellence',
          displayOrder: 2
        },
        {
          id: 'gov-mem-3',
          name: 'Dr. Syarifah Noor',
          title: 'Chairperson, Academic Ethics Board & Director',
          category: 'BOARD_MEMBER',
          photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
          summary: 'Senior Academic Director overseeing institutional ethics, peer-review standards, and international research alliances.',
          fullBio: 'Dr. Syarifah Noor leads the Global Academic Ethics Directorate, ensuring world-class peer-review integrity, Scopus indexing compliance, and cross-border university MoUs.',
          organization: 'Elite Global Excellence',
          displayOrder: 3
        },
        {
          id: 'gov-mem-4',
          name: 'Prof. David R. Miller',
          title: 'Independent Board Director & Research Advisor',
          category: 'BOARD_MEMBER',
          photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
          summary: 'Emeritus Professor of Computer Science guiding international conference steering committees and technological agendas.',
          fullBio: 'Prof. David R. Miller brings over 25 years of experience in computer science education, international conference hosting (ICCSEIT & EGE-MLDL), and high-impact proceedings publishing.',
          organization: 'Elite Global Excellence',
          displayOrder: 4
        },
        {
          id: 'gov-mem-5',
          name: 'Assoc. Prof. Elena Vasquez',
          title: 'Board Director, Global Partnerships',
          category: 'BOARD_MEMBER',
          photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
          summary: 'Director of University Relations and Postgraduate Development across ASEAN and European partner institutions.',
          fullBio: 'Assoc. Prof. Elena Vasquez specializes in international MoU frameworks, joint doctoral mentoring clinics, and postgraduate viva defense preparation.',
          organization: 'Elite Global Excellence',
          displayOrder: 5
        }
      ],
      ctaText: 'Connect with EGE Leadership & Directorate'
    },
    servicesPage: {
      heroBadge: 'WHAT WE DO',
      heroTitle: 'Our Services',
      heroDescription: 'Comprehensive academic and research services — from international conferences and journal publishing to publication support, professional training, mock viva preparation, and institutional collaboration.',
      services: [
        {
          id: 'conferences',
          badge: 'Core Service 01',
          title: 'International Research Conferences',
          overviewDescription: 'Global forums for peer-reviewed paper presentations, networking, and academic exchange.',
          detailDescription: 'Elite Global Excellence Sdn. Bhd. (EGE) organizes a series of prestigious international research conferences each year, providing researchers, students, academics, and industry professionals with opportunities to present their research, exchange knowledge, and establish collaborations with experts from around the world.',
          icon: 'Users',
          anchorId: 'conferences-detail',
          subTracks: [
            {
              id: 'st-1',
              badge: 'Flagship Conference',
              title: 'International Conference on Computer Science, Engineering & Information Technology (ICCSEIT)',
              description: 'An international conference covering Computer Science, Engineering, Information Technology, Artificial Intelligence, Data Science, Cybersecurity, Software Engineering, and related technologies.',
            },
            {
              id: 'st-2',
              badge: 'Specialized AI Track',
              title: 'EGE International Conference on Machine Learning & Deep Learning (EGE-MLDL)',
              description: 'A specialized international conference focused on Machine Learning, Deep Learning, Artificial Intelligence, Computer Vision, Natural Language Processing, Generative AI, and intelligent technologies.',
            },
            {
              id: 'st-3',
              badge: 'Undergraduate Forum',
              title: 'International Undergraduate Research Conference (IURC)',
              description: 'An international conference dedicated to undergraduate students, providing a platform to present research, innovation projects, and capstone work across all academic disciplines.',
            },
          ],
          footerText: 'All EGE conferences are international in scope and welcome participants from universities, research institutions, industry, and government organizations across the globe. Accepted papers are presented to an international audience, and selected papers may be invited for publication in affiliated journals or conference proceedings, subject to the conference’s peer-review process and publication policies.',
          ctaText: 'Visit now',
          ctaActionType: 'tab',
          ctaTarget: 'conferences',
          displayOrder: 1,
        },
        {
          id: 'publishing',
          badge: 'Core Service 02',
          title: 'Academic Journal Publishing',
          overviewDescription: 'Peer-reviewed international journals in Computer Science, Engineering, AI, and cybersecurity.',
          detailDescription: 'Elite Global Excellence Sdn. Bhd. (EGE) is preparing to launch its own peer-reviewed international academic journal dedicated to publishing high-quality research in Computer Science, Engineering, Information Technology, Artificial Intelligence, Data Science, Cybersecurity, Software Engineering, and related technological disciplines.',
          icon: 'BookOpen',
          anchorId: 'publishing-detail',
          infoBoxHeader: 'Editorial Standards & Scopus Indexing Pathways',
          infoBoxText: 'The journal will uphold rigorous editorial standards, a transparent peer-review process, and ethical publishing practices to ensure the dissemination of original, impactful, and high-quality research. In addition, selected papers presented at EGE conferences may be invited for journal publication, subject to the journal’s review process and publication policies.',
          infoBoxTags: ['COPE Ethical Guidelines', 'Double-Blind Peer Review', 'Crossref DOIs & Plagiarism Screening'],
          ctaText: 'Join Editorial Board / Submit Expression of Interest',
          ctaActionType: 'contact',
          ctaTarget: 'contact',
          displayOrder: 2,
        },
        {
          id: 'assistance',
          badge: 'Core Service 03',
          title: 'Research Publication Assistance',
          overviewDescription: 'Manuscript review, technical formatting, journal selection, and reviewer response support.',
          detailDescription: 'Publishing research can be challenging, especially for first-time authors. Our Publication Assistance Service is designed to support researchers throughout every stage of the publication process.',
          icon: 'Award',
          anchorId: 'assistance-detail',
          features: [
            'Manuscript review and evaluation',
            'Technical formatting according to journal requirements',
            'Journal selection based on research scope',
            'Reviewer comment response guidance',
            'End-to-end publication consultation until successful publication',
            'Language editing and proofreading',
            'Research paper enhancement and quality improvement',
            'Submission support',
            'Revision assistance',
          ],
          featureStyle: 'checks',
          footerText: 'Experienced academic consultants work closely with researchers from all disciplines to improve the quality of their manuscripts and increase their chances of publication in reputable journals.',
          ctaText: 'Get a Quotation',
          ctaActionType: 'quote',
          ctaTarget: 'Research Publication Assistance',
          displayOrder: 3,
        },
        {
          id: 'workshops',
          badge: 'Core Service 04',
          title: 'Free Workshops, Seminars & Professional Training',
          overviewDescription: 'High-quality webinars, SPSS, Python, and AI workshops with certificate verification.',
          detailDescription: 'Elite Global Excellence Sdn. Bhd. (EGE) organizes high-quality workshops, seminars, webinars, and professional training programs designed to support researchers, students, educators, and industry professionals in enhancing their knowledge and skills.',
          icon: 'Calendar',
          anchorId: 'workshops-detail',
          footerText: 'Programs cover a wide range of areas, including research methodology, academic publishing, emerging technologies, artificial intelligence, data science, and professional development. Customized workshops, seminars, and corporate training programs tailored to the specific needs of universities, research institutions, government agencies, and private organizations are also available.',
          infoBoxText: 'As part of the commitment to knowledge sharing and community development, EGE conducts selected free high-quality workshops and training sessions every year to provide accessible learning opportunities for the academic and professional community.',
          ctaText: 'Register Now',
          ctaActionType: 'workshop',
          ctaTarget: 'Upcoming Workshops, Seminars & Professional Training Programs',
          displayOrder: 4,
        },
        {
          id: 'mock-viva',
          badge: 'Core Service 05',
          title: 'Mock Viva Preparation for Master’s & PhD Students',
          overviewDescription: 'Simulated oral defense examination with expert academics for Master’s and PhD scholars.',
          detailDescription: 'Preparing for a Master’s or PhD viva examination can be one of the most challenging stages of postgraduate research. The Mock Viva Preparation Service helps students build confidence through realistic viva simulations conducted by experienced academics and researchers.',
          icon: 'GraduationCap',
          anchorId: 'mock-viva-detail',
          features: [
            'Simulated Viva Examination',
            'Constructive Feedback',
            'Thesis Defense Strategies',
            'Recommendations for Final Preparation',
            'Expert Panel Questioning',
            'Presentation Improvement',
            'Identification of Strengths & Weaknesses',
            'Examiner Question Anticipation',
          ],
          featureStyle: 'cards',
          footerText: 'The service is designed to help Master’s and PhD candidates strengthen their thesis defense preparation, anticipate possible examiner questions, and approach their viva examination with greater confidence. Flexible packages tailored to the needs of postgraduate researchers across different disciplines are available.',
          ctaText: 'Get a Quote / Book Viva',
          ctaActionType: 'viva',
          ctaTarget: 'viva',
          secondaryCtaText: 'View Full Mock Viva Syllabus & Packages',
          secondaryCtaActionType: 'tab',
          secondaryCtaTarget: 'mock-viva',
          displayOrder: 5,
        },
        {
          id: 'collaboration',
          badge: 'Core Service 06',
          title: 'Academic & Institutional Collaboration',
          overviewDescription: 'MoUs, joint conferences, symposiums, and faculty development partnerships worldwide.',
          detailDescription: 'Elite Global Excellence believes that strong partnerships drive academic excellence and research innovation. Active collaboration occurs with universities, colleges, research institutes, professional societies, government agencies, publishers, and industry partners to develop meaningful academic initiatives.',
          icon: 'Building2',
          anchorId: 'collaboration-detail',
          features: [
            'Joint organization of international conferences',
            'Research seminars and symposiums',
            'Journal publishing partnerships',
            'Guest lectures and keynote speaker engagements',
            'Academic workshops and training programs',
            'Research and innovation projects',
            'Student development initiatives',
            'Memorandum of Collaboration (MoC) partnerships',
          ],
          featureStyle: 'grid',
          footerText: 'These collaborations aim to strengthen research capacity, encourage knowledge exchange, and create valuable opportunities for researchers and students worldwide. Institutions and organizations interested in building long-term academic partnerships with Elite Global Excellence are welcome.',
          ctaText: 'Contact Us for Collaboration',
          ctaActionType: 'contact',
          ctaTarget: 'contact',
          displayOrder: 6,
        },
      ],
      closingTitle: 'Let’s build something excellent, together.',
      closingDescription: 'Reach out to discuss conferences, publishing, training, or long-term academic partnerships.',
      closingButtonText: 'Contact EGE',
      closingButtonTarget: 'contact',
    },
    workshopManagement: {
      heroBadge: 'CONTINUOUS LEARNING',
      heroTitle: 'Free Workshops, Seminars & Professional Training',
      heroDescription: 'Accessible world-class academic masterclasses, research methodology workshops, and custom institutional training designed to upskill researchers across all career stages.',
      philosophyBadge: 'OUR COMMITMENT TO DEMOCRATIZING RESEARCH',
      philosophyTitle: 'EGE Free Academic Learning Philosophy',
      philosophyDescription: 'High fees should never stand between a dedicated scholar and mastery of empirical research tools. That is why Elite Global Excellence conducts selected zero-cost, high-impact virtual workshops every year. From early-career researchers in developing nations to faculty pursuing top-tier publications, our sessions equip participants with practical tools, live Q&A, and verified digital certificates.',
      topicsBadge: 'CURRICULUM HIGHLIGHTS',
      topicsTitle: 'Popular Workshop Topics',
      topicsSubtitle: 'Field-tested curriculum delivered by active journal reviewers and university educators.',
      topicsList: [
        {
          id: 1,
          category: 'Research Methodology',
          title: 'Systematic Literature Review (SLR) with PRISMA & Bibliometrics',
          description: 'Conducting structured bibliometric mapping using VOSviewer, Biblioshiny, and PRISMA 2020 protocol.',
        },
        {
          id: 2,
          category: 'Statistical Analysis',
          title: 'Quantitative Data Analysis using SmartPLS 4 & SEM',
          description: 'Structural equation modeling, bootstrapping, mediating-moderating effect hypotheses testing.',
        },
        {
          id: 3,
          category: 'Artificial Intelligence',
          title: 'Hands-on Deep Learning with PyTorch & Transformers',
          description: 'Fine-tuning modern foundation models, attention layers, and GPU accelerated workflows.',
        },
        {
          id: 4,
          category: 'Publishing Tools',
          title: 'LaTeX for Academic Publishing & Elsevier/IEEE Templates',
          description: 'Overleaf workflows, BibTeX reference databases, mathematical equation typesetting and vector figures.',
        },
        {
          id: 5,
          category: 'Scholarly Writing',
          title: 'Mastering the Peer-Review Process & Rebuttal Strategies',
          description: 'Navigating Revise & Resubmit (R&R), point-by-point author rebuttal letters, and ethical disclosures.',
        },
        {
          id: 6,
          category: 'Interdisciplinary AI',
          title: 'Applied Machine Learning for Non-CS Researchers',
          description: 'Demystifying regression, classification, random forests, and scikit-learn for healthcare and social sciences.',
        },
      ],
      bespokeTitle: 'Customized Training for Universities & Organizations',
      bespokeDescription: 'We design and deliver bespoke training tracks for faculties, research centers, and government bodies. Syllabus, schedule, hands-on dataset exercises, and assessment rubrics are matched exactly to your department’s KPIs.',
      bespokeButtonText: 'Inquire Bespoke Program',
      credentialingTitle: 'Verified Digital Credentialing',
      credentialingDescription: 'Every EGE workshop participant receives a uniquely serialized, QR-coded digital Certificate of Completion. Academic institutions and hiring committees can independently authenticate credentials in real-time through our public verification portal.',
      credentialingButtonText: 'Launch Verification Portal',
    },
    coursesPage: {
      heroBadge: 'SPECIALIZED LEARNING',
      heroTitle: 'Academic & Professional Courses',
      heroDescription: 'In-depth modular courses engineered to build robust competencies in scientific publishing, structural equation modeling, advanced Python data science, and doctoral research execution.',
      frameworkBadge: 'PEDAGOGICAL DESIGN',
      frameworkTitle: 'The EGE Course Delivery Framework',
      frameworkSubtitle: 'Rigorous, hands-on, and outcome-oriented course structure ensuring tangible academic deliverables.',
      frameworkSteps: [
        {
          number: '01',
          title: 'Synchronous Masterclasses',
          description: 'Live, interactive theoretical foundations and demonstration by senior research fellows.'
        },
        {
          number: '02',
          title: 'Hands-On Dataset Labs',
          description: 'Real-world data modeling in Python, R, SPSS, SmartPLS, and Overleaf LaTeX workspaces.'
        },
        {
          number: '03',
          title: 'Capstone Manuscript / Analysis',
          description: 'Complete a peer-review-ready empirical paper or thesis chapter under guided rubric.'
        },
        {
          number: '04',
          title: 'Serialized Certification',
          description: 'QR-coded verified credentials issued upon defense and project evaluation completion.'
        }
      ],
      licensingBadge: 'UNIVERSITY & FACULTY LICENSING',
      licensingTitle: 'Sponsor a Cohort for Your Postgraduate Faculty',
      licensingDescription: 'Universities and research centers can license EGE courses for cohorts of 10 to 100+ postgraduate students and early-career faculty, customized to university KPIs.',
      licensingButtonText: 'Request Cohort Quotation',
      licensingButtonLink: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20request%20a%20cohort%20quotation'
    },
    mockVivaPage: {
      // 1. Hero
      heroBadge: 'POSTGRADUATE DEFENSE CLINIC',
      heroTitle: 'Master’s & PhD Mock Viva Defense Preparation',
      heroDescription: 'Eliminate defense anxiety, anticipate rigorous examiner questioning, and defend your doctoral or master’s dissertation with supreme confidence.',
      heroButton1Text: 'Book Mock Viva Defense',
      heroButton1Whatsapp: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20book%20a%20Mock%20Viva%20Defense',
      heroButton2Text: 'Download Defense Brochure (PDF)',
      heroButton2PdfUrl: '/uploads/EGE_Mock_Viva_Defense_Brochure.pdf',

      // 2. Realities
      realitiesBadge: 'THE REALITIES OF POSTGRADUATE DEFENSE',
      realitiesTitle: 'Why Mock Viva Preparation Matters',
      realitiesDescription: 'A brilliant thesis can still face difficult outcomes if the candidate is unprepared for hostile or probing oral cross-examination.',
      realitiesItems: [
        {
          id: 'r1',
          title: 'Examiner Questioning Shock',
          description: 'Unrehearsed candidates often freeze when external examiners aggressively interrogate underlying assumptions or edge cases.'
        },
        {
          id: 'r2',
          title: 'Methodology Defense Gaps',
          description: 'Failure to justify why chosen algorithms, sample sizes, or baseline models were selected over established alternatives.'
        },
        {
          id: 'r3',
          title: 'Ambiguous Novelty Claims',
          description: 'Inability to clearly state the exact novel contribution to knowledge in 2 concise sentences without rambling.'
        },
        {
          id: 'r4',
          title: 'Presentation Overrun',
          description: 'Spending 80% of slide time on background literature instead of results, exhausting the panel before reaching contributions.'
        }
      ],

      // 3. Methodology
      methodologyBadge: 'STRUCTURED METHODOLOGY',
      methodologyTitle: 'The 4-Phase EGE Defense Preparation Protocol',
      methodologyDescription: 'A scientific, step-by-step roadmap designed to transform anxious candidates into commanding authorities.',
      methodologyPhases: [
        {
          id: 'm1',
          phaseNumber: 'Phase 01',
          title: 'Thesis Document Review',
          description: 'The panel reads your complete draft, mapping conceptual weaknesses, statistical ambiguities, and likely points of examiner friction.'
        },
        {
          id: 'm2',
          phaseNumber: 'Phase 02',
          title: 'Slide Deck & Strategy Coaching',
          description: 'We restructure your 20-minute presentation: tightening narrative arc, emphasizing findings, and cutting redundant background slides.'
        },
        {
          id: 'm3',
          phaseNumber: 'Phase 03',
          title: 'Live Simulated Viva Voce',
          description: 'Realistic 90-120 minute oral examination. The panel cross-examines you under authentic academic committee conditions.'
        },
        {
          id: 'm4',
          phaseNumber: 'Phase 04',
          title: 'Diagnostic Report & Action Plan',
          description: 'Receive the recorded video, written panel evaluation scores, examiner question bank, and specific revisions needed before defense day.'
        }
      ],
      phases: [
        {
          phase: 'Phase 01',
          phaseNumber: 'Phase 01',
          title: 'Thesis Document Review',
          description: 'The panel reads your complete draft, mapping conceptual weaknesses, statistical ambiguities, and likely points of examiner friction.'
        },
        {
          phase: 'Phase 02',
          phaseNumber: 'Phase 02',
          title: 'Slide Deck & Strategy Coaching',
          description: 'We restructure your 20-minute presentation: tightening narrative arc, emphasizing findings, and cutting redundant background slides.'
        },
        {
          phase: 'Phase 03',
          phaseNumber: 'Phase 03',
          title: 'Live Simulated Viva Voce',
          description: 'Realistic 90-120 minute oral examination. The panel cross-examines you under authentic academic committee conditions.'
        },
        {
          phase: 'Phase 04',
          phaseNumber: 'Phase 04',
          title: 'Diagnostic Report & Action Plan',
          description: 'Receive the recorded video, written panel evaluation scores, examiner question bank, and specific revisions needed before defense day.'
        }
      ],

      // 4. Main Packages
      packagesBadge: 'DEFENSE CLINIC PACKAGES',
      packagesTitle: 'Comprehensive Mock Viva Packages',
      packagesSubtitle: 'Tailored to your defense timeline and degree requirements. All packages include verified EGE credentialing.',
      mainPackages: [
        {
          id: 'pkg-essential',
          duration: '4 Weeks · 1 Month',
          title: 'Essential Preparation Package',
          tagline: 'Rapid readiness audit for candidates with an imminent defense date.',
          isPopular: false,
          features: [
            'Complete thesis draft review (Up to 250 pages)',
            '1 Comprehensive 90-minute Mock Viva Simulation',
            '2-Member Expert Academic Examiner Panel',
            'Presentation slide deck optimization (Up to 30 slides)',
            'Full Written Examiner Critique & Question Bank',
            'High-probability defense question guide',
            'Full HD video recording of simulated defense',
            'EGE Certificate of Mock Viva Completion'
          ],
          whatsappLink: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20book%20the%20Essential%20Preparation%20Package%20(4%20Weeks)',
          buttonText: 'Book This Package',
          secondaryText: 'Need a custom installment or institutional invoice?'
        },
        {
          id: 'pkg-professional',
          duration: '8 Weeks · 2 Months',
          title: 'Professional Preparation Package',
          tagline: 'Our most popular comprehensive preparation protocol for PhD candidates.',
          isPopular: true,
          features: [
            'In-depth thesis & methodology stress test (Up to 350 pages)',
            '2 Full Mock Viva Defense Simulations (Midpoint & Final)',
            '3-Member International Academic Examiner Panel',
            'Slide deck design, structure & speech timing coaching',
            'Novelty gap analysis & theoretical framework audit',
            'Examiner psychological strategy & counter-question clinic',
            'Two Comprehensive Written Panel Evaluation Reports',
            '2 One-on-one follow-up mentoring sessions (60 mins each)',
            'Detailed examiner question bank with suggested response outlines',
            'Full HD video recordings of both simulations',
            'EGE Certificate of Defense Readiness'
          ],
          whatsappLink: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20book%20the%20Professional%20Preparation%20Package%20(8%20Weeks)',
          buttonText: 'Book This Package',
          secondaryText: 'Need a custom installment or institutional invoice?'
        },
        {
          id: 'pkg-premium',
          duration: '12 Weeks · 3 Months',
          title: 'Premium Research Defense Package',
          tagline: 'Total mastery for high-stakes doctoral defenses and complex interdisciplinary theses.',
          isPopular: false,
          features: [
            'End-to-end dissertation critique (Unlimited page length)',
            '3 Milestone Defense Simulations (Preliminary, Panel Stress Test, Final)',
            '4-Member Elite International Panel (inc. Subject Specialist & Statistician)',
            'Complete presentation redesign with professional scientific formatting',
            'Methodological defense rebuttals & statistical verification',
            'Unlimited one-on-one coaching checkpoints during 12 weeks',
            'Three Comprehensive Diagnostic Evaluation Reports',
            'Rebuttal letter strategy for post-viva corrections guidance',
            'Full HD recordings with examiner commentary timestamps',
            'Priority 24/7 WhatsApp coordinator channel',
            'EGE Distinguished Scholar Defense Honors Certificate'
          ],
          whatsappLink: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20book%20the%20Premium%20Research%20Defense%20Package%20(12%20Weeks)',
          buttonText: 'Book This Package',
          secondaryText: 'Need a custom installment or institutional invoice?'
        }
      ],
      mainPackagesList: [
        {
          id: 'pkg-essential',
          duration: '4 Weeks · 1 Month',
          name: 'Essential Preparation Package',
          title: 'Essential Preparation Package',
          description: 'Rapid readiness audit for candidates with an imminent defense date.',
          badge: '',
          features: [
            'Complete thesis draft review (Up to 250 pages)',
            '1 Comprehensive 90-minute Mock Viva Simulation',
            '2-Member Expert Academic Examiner Panel',
            'Presentation slide deck optimization (Up to 30 slides)',
            'Full Written Examiner Critique & Question Bank',
            'High-probability defense question guide',
            'Full HD video recording of simulated defense',
            'EGE Certificate of Mock Viva Completion'
          ],
          buttonText: 'Book This Package',
          whatsappUrl: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20book%20the%20Essential%20Preparation%20Package%20(4%20Weeks)',
          invoiceText: 'Need a custom installment or institutional invoice?'
        },
        {
          id: 'pkg-professional',
          duration: '8 Weeks · 2 Months',
          name: 'Professional Preparation Package',
          title: 'Professional Preparation Package',
          description: 'Our most popular comprehensive preparation protocol for PhD candidates.',
          badge: 'MOST POPULAR PACKAGE',
          features: [
            'In-depth thesis & methodology stress test (Up to 350 pages)',
            '2 Full Mock Viva Defense Simulations (Midpoint & Final)',
            '3-Member International Academic Examiner Panel',
            'Slide deck design, structure & speech timing coaching',
            'Novelty gap analysis & theoretical framework audit',
            'Examiner psychological strategy & counter-question clinic',
            'Two Comprehensive Written Panel Evaluation Reports',
            '2 One-on-one follow-up mentoring sessions (60 mins each)',
            'Detailed examiner question bank with suggested response outlines',
            'Full HD video recordings of both simulations',
            'EGE Certificate of Defense Readiness'
          ],
          buttonText: 'Book This Package',
          whatsappUrl: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20book%20the%20Professional%20Preparation%20Package%20(8%20Weeks)',
          invoiceText: 'Need a custom installment or institutional invoice?'
        },
        {
          id: 'pkg-premium',
          duration: '12 Weeks · 3 Months',
          name: 'Premium Research Defense Package',
          title: 'Premium Research Defense Package',
          description: 'Total mastery for high-stakes doctoral defenses and complex interdisciplinary theses.',
          badge: '',
          features: [
            'End-to-end dissertation critique (Unlimited page length)',
            '3 Milestone Defense Simulations (Preliminary, Panel Stress Test, Final)',
            '4-Member Elite International Panel (inc. Subject Specialist & Statistician)',
            'Complete presentation redesign with professional scientific formatting',
            'Methodological defense rebuttals & statistical verification',
            'Unlimited one-on-one coaching checkpoints during 12 weeks',
            'Three Comprehensive Diagnostic Evaluation Reports',
            'Rebuttal letter strategy for post-viva corrections guidance',
            'Full HD recordings with examiner commentary timestamps',
            'Priority 24/7 WhatsApp coordinator channel',
            'EGE Distinguished Scholar Defense Honors Certificate'
          ],
          buttonText: 'Book This Package',
          whatsappUrl: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20book%20the%20Premium%20Research%20Defense%20Package%20(12%20Weeks)',
          invoiceText: 'Need a custom installment or institutional invoice?'
        }
      ],

      // 5. Proposal Packages
      proposalBadge: 'EARLY-STAGE POSTGRADUATE DEFENSE',
      proposalTitle: 'Proposal Defense Preparation Packages (Defense of Proposal)',
      proposalDescription: 'Securing approval for your PhD or Master’s research proposal is crucial. We prepare candidates to defend their research problem, research questions, theoretical frameworks, and research design before faculty confirmation committees.',
      proposalMainButtonText: 'Book Proposal Defense',
      proposalMainWhatsapp: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20book%20a%20Proposal%20Defense',
      proposalPackages: [
        {
          id: 'prop-1',
          duration: '4 Weeks',
          name: '1-Month Proposal Preparation',
          focus: 'Problem statement alignment, scope refinement, and 1 simulated proposal defense.',
          whatsappLink: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20enrol%20in%20the%201-Month%20Proposal%20Preparation',
          buttonText: 'Enrol Candidate'
        },
        {
          id: 'prop-2',
          duration: '8 Weeks',
          name: '2-Month Proposal Preparation',
          focus: 'Methodological framework validation, literature gap audit, and 2 simulated defenses.',
          whatsappLink: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20enrol%20in%20the%202-Month%20Proposal%20Preparation',
          buttonText: 'Enrol Candidate'
        },
        {
          id: 'prop-3',
          duration: '12 Weeks',
          name: '3-Month Premium Proposal Track',
          focus: 'Full proposal manuscript review, ethical clearance preparation, and panel question mastery.',
          whatsappLink: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20enrol%20in%20the%203-Month%20Premium%20Proposal%20Track',
          buttonText: 'Enrol Candidate'
        }
      ],
      proposalPackagesList: [
        {
          id: 'prop-1',
          duration: '4 Weeks',
          title: '1-Month Proposal Preparation',
          description: 'Problem statement alignment, scope refinement, and 1 simulated proposal defense.',
          whatsappUrl: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20enrol%20in%20the%201-Month%20Proposal%20Preparation',
          buttonText: 'Enrol Candidate'
        },
        {
          id: 'prop-2',
          duration: '8 Weeks',
          title: '2-Month Proposal Preparation',
          description: 'Methodological framework validation, literature gap audit, and 2 simulated defenses.',
          whatsappUrl: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20enrol%20in%20the%202-Month%20Proposal%20Preparation',
          buttonText: 'Enrol Candidate'
        },
        {
          id: 'prop-3',
          duration: '12 Weeks',
          title: '3-Month Premium Proposal Track',
          description: 'Full proposal manuscript review, ethical clearance preparation, and panel question mastery.',
          whatsappUrl: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20enrol%20in%20the%203-Month%20Premium%20Proposal%20Track',
          buttonText: 'Enrol Candidate'
        }
      ],

      // 6. FAQs
      faqBadge: 'GOT QUESTIONS?',
      faqTitle: 'Frequently Asked Questions',
      faqSubtitle: 'Everything you need to know about the EGE mock viva defense preparation service.',
      faqItems: [
        {
          id: 'f1',
          q: 'Who serves on the EGE Mock Viva defense examination panel?',
          a: 'Our mock viva panels are composed of senior university professors, active international external examiners, and subject-matter experts who have supervised and examined dozens of Master’s and PhD viva voces across leading institutions in Malaysia, the UK, Europe, and Australia.'
        },
        {
          id: 'f2',
          q: 'How far in advance of my real university defense should I start?',
          a: 'We strongly recommend candidates begin between 4 to 12 weeks before their scheduled university defense date. This provides sufficient lead time to identify critical thesis gaps, refine presentation slide decks, practice stressful counter-arguments, and implement panel recommendations without last-minute panic.'
        },
        {
          id: 'f3',
          q: 'Is the mock viva conducted virtually or in person?',
          a: 'Sessions are conducted via secure, high-definition virtual meeting platforms (Zoom / Google Meet / Microsoft Teams). The session is recorded and delivered to you alongside a timestamped critique report, allowing you to replay examiner feedback at your own pace.'
        },
        {
          id: 'f4',
          q: 'What degree types and defense stages does EGE support?',
          a: 'We support PhD candidates (final thesis viva & qualifying examinations), Master by Research students, FYP capstones, as well as Research Proposal Defenses (Defense of Proposal) for candidates transitioning from proposal to full candidacy.'
        },
        {
          id: 'f5',
          q: 'What happens if the panel identifies major methodological errors in my draft?',
          a: 'Identifying vulnerabilities before your university examiners do is the primary purpose of mock viva preparation. Our panel will provide explicit, actionable scientific guidance on how to defend or constructively caveat your methodology, address limitations, and present your findings authoritatively.'
        },
        {
          id: 'f6',
          q: 'Can my university supervisor participate or observe?',
          a: 'Yes, candidates are welcome to invite their university supervisors to observe the simulated defense session. Many supervisors actively appreciate our external review as an objective benchmark of student readiness.'
        },
        {
          id: 'f7',
          q: 'What is included in the Written Evaluation Report?',
          a: 'The report includes a 30-to-45-point diagnostic rubric grading your presentation flow, conceptual clarity, novelty articulation, methodology defense, answer poise under pressure, and a list of high-probability questions anticipated from your university examiners.'
        },
        {
          id: 'f8',
          q: 'How do I submit my thesis chapters and book my package?',
          a: 'Click any "Book Package" button, fill in your degree level, thesis title, and expected defense date. An Academic Defense Coordinator will contact you within 24 hours to coordinate non-disclosure agreements (NDA), document transfer, and panel scheduling.'
        }
      ],

      // 7. Brochure Download
      brochureBadge: 'OFFICIAL SYLLABUS & PREPARATION GUIDE',
      brochureTitle: 'Download the Complete Mock Viva Service Brochure',
      brochureDescription: 'Explore the detailed 12-week preparation breakdown, examiner rubric scoring sheets, and sample committee questioning categories in PDF format.',
      brochurePdfUrl: '/uploads/EGE_Mock_Viva_Defense_Brochure.pdf',
      brochureButtonText: 'Download Complete Service Brochure (PDF)'
    },
    ambassadorsPage: {
      heroBadge: 'GLOBAL REPRESENTATION',
      heroTitle: 'Global Advisory Board',
      heroDescription: 'Meet our distinguished Global Advisory Board members representing prestigious universities worldwide, advancing collaborative research and scholarly excellence across international borders',
      responsibilitiesBadge: 'LEADERSHIP IN ACTION',
      responsibilitiesTitle: 'Role & Responsibilities of EGE Global Advisory Board',
      responsibilitiesSubtitle: 'Board members are vital leaders expanding high-integrity scholarly communities worldwide.',
      responsibilitiesList: [
        {
          number: '01',
          title: 'Global Conference Promotion',
          description: 'Representing EGE academic conferences and calling for papers within regional university faculties.'
        },
        {
          number: '02',
          title: 'Peer Review & Technical Program Committee',
          description: 'Participating on double-blind review committees and evaluating cutting-edge scientific manuscripts.'
        },
        {
          number: '03',
          title: 'Institutional Linkages & MoUs',
          description: 'Connecting university leadership and research institutes with bilateral EGE academic partnership agreements.'
        },
        {
          number: '04',
          title: 'Doctoral Mentorship & Defense Panels',
          description: 'Serving as external examiners and guest speakers for mock viva defense simulations and workshops.'
        }
      ],
      callBadge: 'CALL FOR DISTINGUISHED SCHOLARS',
      callTitle: 'Join EGE Global Advisory Board',
      callDescription: 'Are you a faculty member, senior researcher, or academic leader passionate about international collaboration? Join our Global Advisory Board to expand research networks and co-host international events in your region.',
      applyFormLink: 'https://forms.gle/ambassador-council-apply',
      applyButtonText: 'Apply for Global Advisory Board'
    },
    researchNetworkPage: {
      philosophyBadge: 'OUR RESEARCH PHILOSOPHY',
      philosophyTitle: 'Collaborate. Innovate. Impact.',
      philosophyDescription: 'EGE follows a collaborative research model where researchers from different backgrounds work together to exchange knowledge, develop innovative methodologies, and create impactful solutions.',
      heroBadge: 'OUR RESEARCH PHILOSOPHY',
      heroTitle: 'Collaborate. Innovate. Impact.',
      heroDescription: 'EGE follows a collaborative research model where researchers from different backgrounds work together to exchange knowledge, develop innovative methodologies, and create impactful solutions.',
      pillars: [
        {
          id: 'p1',
          title: 'Global Collaboration',
          description: 'Connecting researchers, professors, and scholars across institutions and countries to promote international knowledge exchange and collaborative research.'
        },
        {
          id: 'p2',
          title: 'Interdisciplinary Innovation',
          description: 'Bringing together expertise from multiple fields to develop comprehensive solutions for complex academic, technological, and societal challenges.'
        },
        {
          id: 'p3',
          title: 'Research Excellence',
          description: 'Supporting high-quality research through scientific methodologies, rigorous experimentation, and continuous improvement.'
        },
        {
          id: 'p4',
          title: 'Knowledge Translation',
          description: 'Transforming research findings into practical applications, technologies, publications, and solutions that benefit academia, communities and industries.'
        }
      ],
      activitiesBadge: 'OUR RESEARCH ACTIVITIES',
      activitiesTitle: 'The EGE Global Research & Innovation Network actively contributes to:',
      activitiesList: [
        'Research and development projects',
        'International academic collaborations',
        'Scientific publications',
        'Conference presentations',
        'Technology innovation initiatives',
        'Research mentorship programs',
        'Student and scholar development activities'
      ],
      membersTitle: 'Our Research Members',
      membersSubtitle: 'Professors, researchers, and research assistants collaborating across disciplines and borders.',
      bannerTitle: 'EGE Global Research & Innovation Network',
      bannerSubtitle: 'Connecting Global Expertise, Advancing Research, Creating Impact.',
      bannerText: 'EGE Global Research & Innovation Network',
      bannerSubtext: 'Connecting Global Expertise, Advancing Research, Creating Impact.'
    },
    partnersPage: {
      heroBadge: 'STRATEGIC ALLIANCES',
      heroTitle: 'Academic & Institutional Partners',
      heroDescription: 'Collaborating with leading universities, research institutes, scientific societies, and publishers across Asia, Europe, and North America.',
      frameworksBadge: 'ENGAGEMENT FRAMEWORKS',
      frameworksTitle: 'Institutional Partnership Models',
      frameworksSubtitle: 'Flexible, mutually advantageous agreements crafted for universities and research agencies.',
      frameworksList: [
        {
          title: 'Institutional Memorandum of Understanding (MoU / MoC)',
          description: 'Formal bilateral agreements governing joint scientific projects, researcher exchange visits, and credit-bearing co-curricular training.'
        },
        {
          title: 'International Conference Co-Hosting',
          description: 'Partnering universities co-organize ICCSEIT, EGE-MLDL, or localized symposia with shared technical program committees and indexed proceedings.'
        },
        {
          title: 'Affiliated Journal Publishing Tracks',
          description: 'Academic faculties create dedicated Special Issues or affiliated journal publishing pathways with rigorous peer-review management.'
        },
        {
          title: 'Faculty Development & Research Training',
          description: 'Customized hands-on research methodology workshops and mock viva defense coaching tailored to institutional faculty KPIs.'
        }
      ],
      callBadge: 'ESTABLISH ACADEMIC LINKAGES',
      callTitle: 'Partner With Elite Global Excellence',
      callDescription: 'We welcome universities, faculties, and scientific publishers to establish bilateral MoUs and co-organize high-impact conferences and research development initiatives.',
      callCtaText: 'Inquire Institutional Partnership'
    },
    careersPage: {
      heroBadge: 'JOIN OUR TEAM',
      heroTitle: 'Careers at Elite Global Excellence',
      heroDescription: 'Build the future of global academic collaboration. We are seeking passionate researchers, editorial coordinators, conference managers, and educators to expand our international impact.',
      pillarsBadge: 'OUR CORE VALUES',
      pillarsTitle: 'Why Work With Elite Global Excellence',
      pillarsList: [
        {
          number: '01',
          title: 'Academic Rigor',
          description: 'We hold all conferences, journals, and workshops to the highest standards of scientific ethics and peer review.'
        },
        {
          number: '02',
          title: 'Global Inclusion',
          description: 'Democratizing access for emerging scholars in developing regions while working alongside world-leading professors.'
        },
        {
          number: '03',
          title: 'Continuous Upskilling',
          description: 'Every team member receives sponsored access to our courses, statistical certifications, and global conference tickets.'
        },
        {
          number: '04',
          title: 'Remote-First Flexibility',
          description: 'Modern digital infrastructure supporting asynchronous teamwork across multiple timezones.'
        }
      ],
      spontaneousTitle: 'Don’t see your exact academic role?',
      spontaneousDescription: 'We are always interested in meeting talented academic editors, workshop facilitators, and conference organizers.',
      spontaneousFormLink: 'https://forms.gle/',
      positionsTitle: 'Open Academic Positions',
      noPositionsText: 'No open positions currently available. Please check back later or submit a spontaneous application.'
    },
    newsPage: {
      heroBadge: 'MEDIA & PRESS',
      heroTitle: 'News & Announcements',
      heroDescription: 'Latest press releases, conference announcements, university partnership milestones, and academic initiatives from Elite Global Excellence.',
      mediaBoxTitle: 'Media Relations & Press Inquiries',
      mediaBoxDescription: 'For press inquiries, official media interviews, or brand asset requests, contact our corporate communications office.',
      mediaBoxCtaText: 'Contact Media Office'
    },
    contactPage: {
      heroBadge: 'GET IN TOUCH',
      heroTitle: 'Send Us a Message',
      heroDescription: 'Have a question, need assistance, or want to work with EGE? Send us a message and our team will get back to you.',
      correspondenceBadge: 'OFFICIAL CORRESPONDENCE',
      generalEmail: 'info@eliteglobalexcellence.com',
      editorialEmail: 'editorial@eliteglobalexcellence.com',
      conferencesEmail: 'conferences@eliteglobalexcellence.com',
      headquartersAddress: 'Elite Global Excellence Sdn. Bhd.\nKuala Lumpur & Johor Bahru, Malaysia',
      supportHours: 'Monday – Friday: 9:00 AM – 6:00 PM (MYT / UTC+8)',
      inboundPortalTitle: 'Direct Inbound Portal',
      inboundPortalDescription: 'All submissions are monitored and assigned directly within the EGE Central Inbox.',
      nameLabel: 'Full Name *',
      namePlaceholder: 'e.g. Dr. Aiman Azman',
      emailLabel: 'Email Address *',
      emailPlaceholder: 'e.g. aiman@utm.my',
      phoneLabel: 'Phone / WhatsApp',
      phonePlaceholder: 'e.g. +60 12-345 6789',
      categoryLabel: 'Inquiry Category',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'e.g. Inquiry regarding ICCSEIT 2026 Paper Submission',
      messageLabel: 'Message Details *',
      messagePlaceholder: 'Please describe your academic objectives, institutional background, or specific assistance required...',
      socialLinks: [
        { id: 'soc-1', platform: 'Facebook', url: 'https://facebook.com/eliteglobalexcellence' },
        { id: 'soc-2', platform: 'Instagram', url: 'https://instagram.com/eliteglobalexcellence' },
        { id: 'soc-3', platform: 'YouTube', url: 'https://youtube.com/@eliteglobalexcellence' },
        { id: 'soc-4', platform: 'Telegram', url: 'https://t.me/eliteglobalexcellence' },
      ]
    },
    conferencesPage: {
      heroBadge: 'ACADEMIC GATHERINGS',
      heroTitle: 'International Research Conferences',
      heroDescription: 'Flagship annual academic gatherings uniting scholars, doctoral candidates, keynote speakers, and technological innovators across the globe.',
      activeConferences: [
        {
          id: 'conf-act-1',
          badge: 'Flagship EGE Annual Conference',
          name: 'ICCSEIT 2026: 4th International Conference on Computer Science, Engineering & Information Technology',
          format: 'Hybrid Format · In-Person',
          location: '(Kuala Lumpur, Malaysia) & Virtual Live Stream Worldwide',
          submitPaperUrl: 'https://www.eliteglobalexcellence.com/submit',
          dates: 'October 24–25, 2026',
          datesSubtitle: '2 Full Conference Days',
          submissionDeadline: 'August 15, 2026',
          deadlineSubtitle: 'Double-Blind Peer Review',
          notificationDate: 'September 10, 2026',
          notificationSubtitle: 'With Reviewer Comments',
          proceedings: 'Scopus / WoS Indexed',
          proceedingsSubtitle: 'Crossref DOI Assigned',
          themeText: 'Artificial Intelligence, Generative Models & LLMs, Cybersecurity, Computer Vision, IoT, Cloud Computing, Autonomous Systems',
          coOrganizedText: 'Co-Organized with University Partners across Malaysia, Portugal, and the UK.',
          visitNowUrl: 'https://www.eliteglobalexcellence.com'
        }
      ],
      futureConferences: [
        {
          id: 'conf-fut-1',
          title: 'EGE-MLDL: International Conference on Machine Learning & Deep Learning',
          description: 'Focused specifically on theoretical advancements and practical implementations in deep neural networks, transformer architectures, reinforcement learning, computer vision, natural language understanding, and ethical AI.',
          highlights: [
            'Keynotes from leading global AI researchers',
            'Hands-on algorithmic workshops & code tutorials',
            'Best Paper & Best Presentation Awards'
          ],
          date: 'Dec 12–13, 2026',
          inquireActionUrl: 'contact'
        }
      ],
      timelineBadge: 'ANNUAL TIMELINE',
      timelineTitle: 'Calendar of Academic Deadlines',
      timelineRows: [
        {
          id: 'row-1',
          title: 'ICCSEIT 2026 (4th Edition)',
          subtitle: 'Computer Science & IT',
          eventDate: 'Oct 24–25, 2026',
          paperDeadline: 'Aug 15, 2026',
          actionText: 'Submit Paper',
          actionUrl: 'contact'
        },
        {
          id: 'row-2',
          title: 'IURC 2026',
          subtitle: 'Undergraduate Research',
          eventDate: 'Nov 05, 2026',
          paperDeadline: 'Sep 20, 2026',
          actionText: 'Submit Abstract',
          actionUrl: 'contact'
        },
        {
          id: 'row-3',
          title: 'EGE-MLDL 2026',
          subtitle: 'Machine Learning & Deep Learning',
          eventDate: 'Dec 12–13, 2026',
          paperDeadline: 'Oct 10, 2026',
          actionText: 'Submit Paper',
          actionUrl: 'contact'
        }
      ]
    },
    footerContent: {
      logoUrl: '/ege_logo.png',
      tagline: 'Join us in shaping the future of research and education. Supporting researchers, students, educators, universities, and research institutions worldwide.',
      connectTitle: 'Connect With EGE',
      socialLinks: [
        { id: 'soc-in', platform: 'LinkedIn', url: 'https://linkedin.com/' },
        { id: 'soc-fb', platform: 'Facebook', url: 'https://facebook.com/' },
        { id: 'soc-x', platform: 'X (Twitter)', url: 'https://twitter.com/' },
        { id: 'soc-yt', platform: 'YouTube', url: 'https://youtube.com/' },
        { id: 'soc-ig', platform: 'Instagram', url: 'https://instagram.com/' },
      ],
      exploreTitle: 'Explore',
      exploreLinks: [
        { id: 'exp-1', label: 'Home', targetTab: 'home' },
        { id: 'exp-2', label: 'About Us', targetTab: 'about' },
        { id: 'exp-3', label: 'Our Services', targetTab: 'services' },
        { id: 'exp-4', label: 'EGE Conferences', targetTab: 'conferences' },
        { id: 'exp-5', label: 'Workshops', targetTab: 'workshops' },
        { id: 'exp-6', label: 'Courses', targetTab: 'courses' },
        { id: 'exp-7', label: 'Mock Viva', targetTab: 'mock-viva' },
        { id: 'exp-8', label: 'Global Advisory Board', targetTab: 'ambassadors' },
        { id: 'exp-[#045494]', label: 'Research Network', targetTab: 'research-network' },
        { id: 'exp-10', label: 'Partners', targetTab: 'partners' },
        { id: 'exp-11', label: 'Careers', targetTab: 'careers' },
        { id: 'exp-12', label: 'News', targetTab: 'news' },
        { id: 'exp-13', label: 'Contact', targetTab: 'contact' },
      ],
      conferencesTitle: 'Conferences',
      conferencesLinks: [
        { id: 'conf-1', label: 'Conferences Overview Series', targetTab: 'conferences', targetSubTab: 'overview' },
        { id: 'conf-2', label: 'EGE-ICCSEIT (Computer Science & IT)', targetTab: 'conferences', targetSubTab: 'iccseit' },
        { id: 'conf-3', label: 'EGE-MLDL (Machine & Deep Learning)', targetTab: 'conferences', targetSubTab: 'mldl' },
        { id: 'conf-4', label: 'IMRC & Academic Journal Publishing', targetTab: 'services' },
        { id: 'conf-5', label: 'Host with EGE / Partnership', targetTab: 'partners' },
      ],
      contactTitle: 'Contact & Locations',
      companyName: 'Elite Global Excellence Sdn. Bhd.',
      primaryAddress: 'Elite Global Excellence Sdn Bhd, Level 18, Pavilion Tower, Kuala Lumpur, 50250, Malaysia',
      secondaryAddress: 'Regional Office: EGE Regional Liaison Office, Medini Iskandar, 79250 Johor Bahru, Johor, Malaysia',
      primaryEmail: 'info@eliteglobalexcellence.com',
      secondaryEmail: 'eliteglobalexcellence@gmail.com',
      websiteUrl: 'www.eliteglobalexcellence.com',
      directInquiryButtonText: 'Send Direct Inquiry',
      copyrightText: '© 2026 Elite Global Excellence Sdn. Bhd. All rights reserved.',
      sloganText: 'Aspire, Achieve, Advance with EGE',
      adminAccessButtonText: 'Admin Access',
    }
  },


  workshopRegistrations: [
    {
      id: 'reg-001',
      workshopId: 'EGEW15',
      registrationId: 'EGEW15-001',
      fullName: 'Sajid Shah',
      email: 'sajidshah232@gmail.com',
      phone: '+60123456789',
      role: 'Student',
      institute: 'Universiti Teknologi Malaysia',
      department: 'Computer Science',
      levelOfStudy: 'Master',
      country: 'Malaysia',
      isKeynoteSpeaker: 'No',
      attended: false,
      registeredAt: '2026-09-08 11:20',
    },
  ],

  contactSettings: {
    primaryAddress: 'Elite Global Excellence Sdn Bhd, Level 18, Pavilion Tower, Kuala Lumpur, 50250, Malaysia',
    secondaryAddress: 'EGE Regional Liaison Office, Medini Iskandar, 79250 Johor Bahru, Johor, Malaysia',
    primaryEmail: 'info@eliteglobalexcellence.com',
    secondaryEmail: 'eliteglobalexcellence@gmail.com',
    phoneNumber: '+60 3-8947 1000',
    websiteUrl: 'www.eliteglobalexcellence.com',
    collaborationNote: 'Universities, research bodies, and industry partners — reach out for MoUs, joint conferences, research grants, and co-authored publication programs.',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15935.263889025345!2d101.705147!3d3.149265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc362c47c7c7f3%3A0xb35a39626359560!2sPavilion%20Tower%2C%20Kuala%20Lumpur!5e0!3m2!1sen!2smy!4v1700000000000!5m2!1sen!2smy',
  },

  inboxMessages: [
    {
      id: 1,
      type: 'MOCK_VIVA_BOOKING',
      name: 'Tan Wei Jin',
      email: 'weijin.tan@utm.my',
      phone: '+60 12-345 6789',
      subject: 'PhD Mock Viva Booking - Professional Package',
      packageSelected: 'Professional Preparation Package (8 Weeks · 2 Months)',
      message: 'I am preparing for my PhD defense in Computer Vision scheduled for next semester. I would like to initiate the 8-week structured review and presentation coaching.',
      status: 'UNREAD',
      adminNotes: 'Assigned to Dr. Hadi Susanto panel for methodology evaluation.',
      createdAt: '2026-09-07 09:30',
    },
    {
      id: 2,
      type: 'QUOTATION',
      name: 'Dr. Aris Thorne',
      email: 'athorne@sydney.edu.au',
      phone: '+61 2 9351 2222',
      subject: 'Publication Assistance for IEEE Transactions Manuscript',
      message: 'We have completed a 14-page manuscript on Distributed Consensus Algorithms and require high-level language polishing and journal formatting compliance prior to submission.',
      status: 'READ',
      adminNotes: 'Quotation sent on Sept 7 for Tier-1 engineering paper polishing.',
      createdAt: '2026-09-06 14:15',
    },
    {
      id: 3,
      type: 'COLLABORATION',
      name: 'Prof. Zahir Shah',
      email: 'dean.research@paf-iast.edu.pk',
      phone: '+92 995 645112',
      subject: 'Institutional MoU Proposal for EGE-ICCSEIT 2026',
      message: 'Our faculty of computing wishes to join as a co-organizer and host an affiliated workshop track at the upcoming ICCSEIT conference.',
      status: 'UNREAD',
      adminNotes: 'Priority academic collaboration. Forwarded to Executive Leadership.',
      createdAt: '2026-09-05 11:45',
    },
  ],

  certificates: [
    {
      id: 'EGE-WS-2024-8841',
      participantName: 'Muhammad Aiman Hassan',
      workshopTitle: 'Big Data Visualization Challenges and Tools',
      issueDate: '27 February 2024',
      status: 'VALID',
      institution: 'Elite Global Excellence Academic Council',
    },
    {
      id: 'EGE-WS-2024-9102',
      participantName: 'Dr. Fatima Zahra',
      workshopTitle: 'Harnessing Data Science and AI for Climate Adaptation',
      issueDate: '16 February 2024',
      status: 'VALID',
      institution: 'Elite Global Excellence Academic Council',
    },
    {
      id: 'EGE-WS-2025-1029',
      participantName: 'Farah Nadia Binti Kamaruddin',
      workshopTitle: 'How to Develop an AI Agent: Hands-On AI Agent Creation',
      issueDate: '22 February 2025',
      status: 'VALID',
      institution: 'Elite Global Excellence Academic Council',
    },
    {
      id: 'EGE-CONF-2025-4412',
      participantName: 'Mohammad Danish Ali',
      workshopTitle: 'The AI Driven Third Millennium Smart World Masterclass',
      issueDate: '19 December 2024',
      status: 'VALID',
      institution: 'Elite Global Excellence Academic Council',
    },
  ],
};

export const initialDatabaseState = initialDatabase;
initialDatabase.inbox = initialDatabase.inboxMessages;
initialDatabase.careerRoles = initialDatabase.careers;

