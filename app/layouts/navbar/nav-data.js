import config from '~/config.json';

export const navLinks = [
  {
    label: 'Projects',
    pathname: '/#project-1',
  },
  {
    label: 'Skills',
    pathname: '/#skills',
  },
  {
    label: 'About',
    pathname: '/#details',
  },
  {
    label: 'Contact',
    pathname: '/#contact',
  },
];

export const socialLinks = [
  {
    label: 'GitHub',
    url: `https://github.com/${config.github}`,
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/aniket-adhav-a70182312/',
    icon: 'linkedin',
  },
];
