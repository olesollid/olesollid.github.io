import type { EntryType, Job } from './types';

// Labels shown on filter buttons
export const entryTypes: { type: EntryType; label: string }[] = [
  { type: 'work', label: 'Work' },
  { type: 'education', label: 'Education' },
  { type: 'volunteering', label: 'Volunteering' },
];

// Sorted by src/lib/dates.ts
export const experience: Job[] = [
  
  // Work experience 
  {
    type: 'work',
    role: 'Senior Consultant',
    company: 'Sikt - Norwegian Agency for Shared Services in Education and Research',
    companyUrl: 'https://www.sikt.no/en',
    start: '2025-06',
    end: 'Present',
    summary: "Internship in the summers of 2025 and 2026, now part-time alongside my studies. I handle internal IT support and troubleshooting, PowerShell scripting, and managing endpoints and users with Intune and Azure.",
    highlights: ["Built a RAG agent that lets employees search internal documentation in natural language.",
    "When it couldn't solve a problem, it summarized the conversation and prefilled an inquiry to the helpdesk, so no one has to explain their issue twice.",],
    tags: ['Microsoft 365', 'Azure', 'PowerShell', 'Hardware'],
  },
  {
    type: 'work',
    role: 'Course Consultant',
    company: 'Department of Informatics, University of Bergen',
    //companyUrl: 'https://www.uib.no/en/faculty-of-science-and-technology/the-department-of-informatics',
    start: '2026-01',
    end: 'Present',
    summary: 'Group leader for students, which involves planning and conducting group sessions, providing academic guidance to students, and grading and evaluating assignments.',
    highlights: ['Spring 2026: INF142 Computer Networks', 'Autumn 2026: INF105 Independent Computer Technology'],
    tags: ['JavaScript', 'CSS', 'HTML', 'Python', 'Virtual Machines', 'Networking'],
  },

  // Volunteer experience
  {
    type: 'volunteering',
    role: 'Volunteer and board member',
    company: 'Integrerbar',
    start: '2022-08',
    end: '2024-06',
    summary: 'Volunteer with a term as board member for the student bar at the Science and Technology Faculty at University of Bergen.',
  },
    {
    type: 'volunteering',
    role: 'Sponsorship Coordinator',
    company: 'Faculty of Science and Technology, University of Bergen',
    start: '2024-12',
    end: '2025-09',
    summary: 'Managed acquisition and relations between the welcome week committee and sponsors.',
  },
    {
    type: 'volunteering',
    role: 'Innovation Lead',
    company: 'Valens - student committee for chemistry students at University of Bergen',
    start: '2022-09',
    end: '2023-09',
    summary: 'Took part in a project with the goal of recirculating plastic waste into 3D-printer filament.',
  },

  // Education
  {
    type: 'education',
    role: 'MSc Software Engineering',
    company: 'University of Bergen / Western Norway University of Applied Sciences',
    start: '2026-01',
    end: 'Present',
    summary: "Pursuing a master's in Software Engineering with a focus on software security. Currently writing my thesis about capability-based security in Rust.",
    tags: ['Rust', 'Cybersecurity', 'Containerization', 'Development methodologies']
  },
    {
    type: 'education',
    role: 'BSc Informatics: Computer Technology',
    company: 'University of Bergen',
    start: '2023-08',
    end: '2025-12',
    summary: 'Focused on software development, algorithms, databases, networks and software security, with hands-on team projects in system development.',
    tags: ['Java', 'Python', 'Algorithms', 'Spring', 'Systems development', 'Cryptography']
  },
      {
    type: 'education',
    role: 'One-year study in Chemistry',
    company: 'University of Bergen',
    start: '2022-08',
    end: '2023-06',
    summary: 'Short stint in chemistry before switching to informatics.',
  },
];
