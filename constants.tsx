import { Github, Linkedin, Code2, FileText, Mail, Terminal, Server, Database, Layers, BookOpen, Cpu, Globe } from 'lucide-react';
import { SocialLink, SocialType, Project, SkillCategory, CaseStudy } from './types';

export const PERSONAL_INFO = {
  name: "Soumya Ranjan Padhi",
  role: "Backend Software Engineer",
  tagline: "Java • Spring Boot • Scalable Systems",
  location: "India",
  email: "soumyarnpadhi1@gmail.com",
  bio: "Backend-focused engineer experienced in designing scalable, secure, and high-performance applications. Strong foundation in DSA, backend architecture, and system design with a focus on clean, maintainable, production-ready code.",
  summary: "Backend Software Engineer with hands-on experience building RESTful APIs, authentication systems, and data-driven backend services using Java and Spring Boot. Skilled in designing modular architectures, optimizing database performance, and solving complex problems using DSA. Focused on writing clean code, making sound engineering decisions, and building systems that scale."
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    type: SocialType.GITHUB,
    url: 'https://github.com/soumya7800',
    label: 'GitHub',
    username: '@soumya7800',
    stats: 'Loading data...',
    icon: Github,
    color: 'hover:text-white',
  },
  {
    type: SocialType.LINKEDIN,
    url: 'https://www.linkedin.com/in/soumya-ranjan-padhi-a8740b296/',
    label: 'LinkedIn',
    username: 'Soumya Ranjan Padhi',
    stats: '500+ Connections',
    icon: Linkedin,
    color: 'hover:text-blue-500',
  },
  {
    type: SocialType.LEETCODE,
    url: 'https://leetcode.com/u/soumyaranjanpadhi/',
    label: 'LeetCode',
    username: 'soumyaranjanpadhi',
    stats: 'Loading data...',
    icon: Code2,
    color: 'hover:text-yellow-500',
  },
  {
    type: SocialType.EMAIL,
    url: `mailto:${PERSONAL_INFO.email}`,
    label: 'Email',
    username: 'Contact Me',
    stats: '',
    icon: Mail,
    color: 'hover:text-red-400',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Java (Advanced)", "SQL (Advanced)", "Python", "C", "C++"],
    icon: Terminal
  },
  {
    title: "Backend & Frameworks",
    skills: ["Spring Boot", "Spring Security (JWT, RBAC)", "Hibernate / JPA", "REST API Design", "Exception Handling & Logging"],
    icon: Server
  },
  {
    title: "Databases & Storage",
    skills: ["MySQL", "Database Indexing", "Schema Design", "Normalization", "Redis (Caching)"],
    icon: Database
  },
  {
    title: "System Design",
    skills: ["Scalable Backend Design", "Stateless Services", "Caching Strategies", "API Versioning", "Pagination & Rate Limiting"],
    icon: Layers
  },
  {
    title: "Tools & Platforms",
    skills: ["Git & GitHub", "Docker", "Postman"],
    icon: Cpu
  },
  {
    title: "Fundamentals",
    skills: ["OOP Concepts", "DBMS", "Operating Systems", "Computer Networking"],
    icon: BookOpen
  }
];

export const PROJECTS: Project[] = [



  {
    id: '4',
    title: 'E-Commerce Learning Platform',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    overview: 'with use of html css java script we build a complete online learning platform where anyone could able to access out cources and buy these cources with a suitable prize point',
    features: [
      'Course browsing and filtering',
      'Responsive and interactive UI',
      'Cart and purchase simulation'
    ],
    links: {
      github: 'https://github.com/soumya7800/E-commerce-website#'
    },
    featured: true,
  },
  {
    id: '5',
    title: 'Agrivision AI',
    techStack: ['TypeScript', 'Node.js', 'Gemini API'],
    overview: 'This Node.js-based AI application provides a clean, modular, and extensible foundation for generative AI. With npm-driven dependency management and secure .env.local configuration, it enables reliable Gemini API integration. The lightweight, scalable architecture supports rapid development, clear maintainability, and with flexible expansion,',
    features: [
      'Seamless Gemini API integration',
      'Secure environment configuration',
      'Modular and scalable architecture'
    ],
    links: {
      github: 'https://github.com/soumya7800/Agrivision-Ai'
    },
    featured: true,
  },
  {
    id: '6',
    title: 'TradeSim',
    techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'TypeScript'],
    overview: 'TradeSim is a MERN-based trading simulator offering real-time market interactions, portfolio tracking, and analytics. Built with a scalable, modular architecture, it provides a secure environment for practicing trading strategies and extending features for production-ready use.',
    features: [
      'Real-time market interactions',
      'Portfolio tracking and analytics',
      'Secure and scalable architecture'
    ],
    links: {
      github: 'https://github.com/soumya7800/Tradesim'
    },
    featured: true,
  },
  {
    id: '7',
    title: 'Apple Vision Website',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    overview: 'A sleek and fully responsive Apple Vision Website built with HTML, CSS, and JavaScript. Inspired by Apple’s iconic design, featuring smooth transitions, adaptive layouts, and a clean modern UI.',
    features: [
      'Pixel-perfect Apple-inspired design',
      'Smooth scroll animations',
      'Fully responsive layout'
    ],
    links: {
      github: 'https://github.com/soumya7800/Apple-Vision-Website'
    },
    featured: true,
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: "URL Shortener Design",
    topics: ["Hashing Strategies", "NoSQL vs SQL", "Caching (Redis)", "Bloom Filters"],
    description: "Deep dive into designing a scalable bit.ly clone handling millions of clicks.",
    link: "#",
    details: `
### Architecture Overview
The system is designed to handle **100M+ new URLs per month** and **10B+ redirects**. It uses a read-heavy architecture (100:1 read/write ratio) focusing on low latency and high availability.

### Key Components
1. **API Gateway**: Rate limiting and request routing.
2. **KGS (Key Generation Service)**: Pre-generates unique 6-character Base62 tokens to ensure zero collision and low latency.
3. **Database**: MongoDB (NoSQL) for storing URL mappings due to its flexibility and write speed.
4. **Cache**: Redis Cluster to cache hot URLs, reducing DB load by 90%.

### Data Flow
- **Write**: User inputs URL -> API -> KGS assigns token -> Save to DB -> Return Short URL.
- **Read**: User hits Short URL -> Cache Check (Hit? Return) -> DB Lookup (Miss?) -> Cache Write -> Redirect.
    `,
    challenges: [
      "Preventing Token Collision: Solved using a pre-generated key service (KGS).",
      "Handling Hot URLs: Implemented specific caching policies (LRU) for viral links.",
      "Database Scaling: Sharding based on URL hash to distribute load evenly."
    ],
    technologies: ["Node.js", "Redis", "MongoDB", "Nginx", "Docker"]
  },
  {
    title: "Payment System Architecture",
    topics: ["Idempotency", "ACID Transactions", "Event Sourcing", "PCI DSS"],
    description: "Designing a robust payment gateway integration ensuring zero data loss.",
    link: "#",
    details: `
### Architecture Overview
A mission-critical financial system handling distributed transactions with a focus on **consistency** and **idempotency**.

### Key Components
1. **Idempotency Key Service**: Ensures that network retries don't double-charge customers.
2. **Payment Executor**: Orchestrates calls to external PSPs (Stripe, PayPal) with exponential backoff.
3. **Reconciliation Service**: A nightly batch job that compares internal ledgers with PSP reports to catch discrepancies.
4. **Ledger Service**: Double-entry bookkeeping system for auditability.

### Data Flow
1. Client sends payment request with specialized unique idempotency key.
2. Server checks key in Redis. If exists -> return cached status.
3. If new, create 'PENDING' record in SQL DB (ACID compliant).
4. Call External PSP. Update DB to 'SUCCESS/FAILED'.
    `,
    challenges: [
      "Double Spending: Enforced strict idempotency keys at the API level.",
      "Network Partitions: Implemented a robust state machine to handle timeout/unknown states.",
      "Security: Tokenization of sensitive data to comply with PCI DSS standards."
    ],
    technologies: ["Java Spring Boot", "PostgreSQL", "Kafka", "Redis"]
  },
  {
    title: "Real-time Chat App",
    topics: ["WebSockets", "Pub/Sub", "Cassandra", "Long Polling"],
    description: "Architecture for a low-latency chat application like WhatsApp.",
    link: "#",
    details: `
### Architecture Overview
A real-time messaging platform supporting 1-on-1 and group chats, focusing on **low latency delivery (<100ms)** and **offline synchronization**.

### Key Components
1. **WebSocket Handler**: Maintains persistent connections with online users.
2. **Pub/Sub System**: Redis Pub/Sub to route messages between different websocket servers.
3. **Message Store**: Cassandra for its high write throughput and ability to handle massive chat history logs.
4. **Push Notification Service**: Falls back to FCM/APNS when user is offline.

### Data Flow
- **Online**: User A -> WS Load Balancer -> Gateway -> Redis Pub/Sub -> Gateway (User B) -> User B.
- **Offline**: User A -> Gateway -> Store in DB -> Trigger Push Notification -> User B connects later -> Pulls missed messages.
    `,
    challenges: [
      "Connection Limits: Optimized kernel settings to handle 100k+ concurrent websocket connections per node.",
      "Message Ordering: Used sequence IDs generator (Snowflake) to guarantee order.",
      "Group Chat Fan-out: Optimized payload delivery using specialized queues for large groups."
    ],
    technologies: ["Go (Golang)", "WebSockets", "Cassandra", "Redis Pub/Sub", "Nginx"]
  }
];

export const RESUME_CONTEXT = `
  I am ${PERSONAL_INFO.name}, a ${PERSONAL_INFO.role}.
  ${PERSONAL_INFO.summary}
  
  Skills: ${SKILL_CATEGORIES.map(c => c.skills.join(', ')).join(', ')}.
  
  Projects:
  ${PROJECTS.map(p => `- ${p.title}: ${p.overview} (Tech: ${p.techStack.join(', ')})`).join('\n')}
  
  System Design: ${CASE_STUDIES.map(c => c.title).join(', ')}.
  
  DSA: Solved 500+ problems on LeetCode.
`;