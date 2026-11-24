import type { Project } from './types';

export const projects: Project[] = [
  {
    title: 'DisplayArranger',
    description: "A minimal macOS menu bar app that lets you quickly change your screen arrangement with a single click. It's designed to make switching display layouts fast and effortless, without opening System Settings.",
    tags: ['Swift', 'AppKit'],
    sourceUrl: 'https://github.com/olesollid/DisplayArranger',
    icon: './images/dp-icon.webp',
    images: [
      { src: './images/displayarranger-1.webp', alt: 'DisplayArranger menu overview' },
      { src: './images/displayarranger-2.webp', alt: 'DisplayArranger menu overview' },
      { src: './images/displayarranger-3.webp', alt: 'DisplayArranger menu overview' },
    ],
  },
  {
    title: 'soundcloud-dl',
    description: 'A desktop GUI application for downloading SoundCloud tracks and playlists as high-quality AIFF files with embedded metadata and cover art.',
    tags: ['Python', 'PyQt6'],
    sourceUrl: 'https://github.com/olesollid/soundcloud-dl',
    images: [
      { src: './images/scdl-1.webp', alt: 'Overview of soundcloud-dl downloader GUI' },
      { src: './images/scdl-2.webp', alt: 'Overview of settings' },
    ],
  },
  {
    title: 'simple-lms',
    description: "simple-lms is a learning management system where teachers create courses with modules, quizzes and assignments, and students complete them and track their grades. It's built with multiple collaborators in Spring Boot and React/TypeScript, and includes GitHub/Google sign-in and an AI study tutor powered by Gemini.",
    tags: ['Java', 'Spring', 'React', 'OAuth', 'AI'],
    sourceUrl: 'https://github.com/olesollid/simple-lms',
    images: [
      { src: '', alt: '' },
    ],
  },
];
