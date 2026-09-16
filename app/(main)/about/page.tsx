import { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Tech minds IT Solutions — a fresh IT company in Nellore, Andhra Pradesh delivering web development, app development, CRM products, and digital marketing with startup energy.',
  keywords: [
    'About Tech minds IT Solutions',
    'IT company Nellore',
    'tech startup Andhra Pradesh',
    'web development team',
    'software company India',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    url: 'https://techmindsit.com/about',
    title: 'About Us — Tech minds IT Solutions',
    description:
      'Learn about Tech minds IT Solutions — a fresh IT company in Nellore delivering modern digital solutions with startup energy.',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About Tech minds IT Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us — Tech minds IT Solutions',
    description:
      'Learn about Tech minds IT Solutions — a fresh IT company in Nellore delivering modern digital solutions with startup energy.',
    images: ['/og-image.jpg'],
  },
};

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Tech minds IT Solutions',
  url: 'https://techmindsit.com/about',
  description:
    'Learn about Tech minds IT Solutions — a fresh IT company in Nellore, Andhra Pradesh delivering web development, app development, CRM products, and digital marketing.',
  mainEntity: {
    '@id': 'https://techmindsit.com/#organization',
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutJsonLd} />
      <AboutContent />
    </>
  );
}


