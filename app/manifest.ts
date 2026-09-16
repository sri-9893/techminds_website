import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tech minds IT Solutions — Web, App, CRM & Digital Marketing',
    short_name: 'Tech minds IT Solutions',
    description:
      'Premium web development, mobile app development, CRM products, and digital marketing services in Nellore, Andhra Pradesh.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7fafd',
    theme_color: '#f5fbfc',
    icons: [
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/images/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}


