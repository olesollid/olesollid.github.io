import type { Profile } from './types';

export const profile: Profile = {
  name: 'Ole Christian Sollid',
  email: 'ole@sollid.dev',
  cvUrl: './cv.pdf',
  tagline: 'MSc student and part-time IT-consultant at Sikt',
  about: [
    "Hi! I'm Ole Christian, a developer in the making, currently finishing my master's in Software Engineering at the University of Bergen.",
  ],
  links: [
    { label: 'Email', href: 'mailto:ole@sollid.dev'},
    { label: 'GitHub', href: 'https://github.com/olesollid' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ole-christian-sollid-95a202177/' },
  ],
};
