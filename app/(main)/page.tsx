import { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import HomeContent from './HomeContent';

export const metadata: Metadata = {
  title: 'Tech minds IT Solutions — Web, App, CRM & Digital Marketing',
  description:
    'Tech minds IT Solutions is a passionate IT company in Nellore, building modern web apps, mobile solutions, CRM products, and digital marketing campaigns. Your vision, our technology.',
  keywords: [
    'Tech minds IT Solutions',
    'web development Nellore',
    'app development',
    'CRM products',
    'digital marketing',
    'IT company Andhra Pradesh',
    'React development',
    'Next.js',
    'Flutter',
    'internships',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: 'https://techmindsit.com',
    title: 'Tech minds IT Solutions — Web, App, CRM & Digital Marketing',
    description:
      'Premium web development, mobile app development, CRM products, and digital marketing services in Nellore, Andhra Pradesh.',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tech minds IT Solutions — Your Trusted IT Partner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech minds IT Solutions — Web, App, CRM & Digital Marketing',
    description:
      'Premium web development, mobile app development, CRM products, and digital marketing services in Nellore, Andhra Pradesh.',
    images: ['/og-image.jpg'],
  },
};

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Tech minds IT Solutions — Home',
  url: 'https://techmindsit.com',
  description:
    'Premium web development, mobile app development, CRM products, and digital marketing services in Nellore, Andhra Pradesh.',
  mainEntity: {
    '@type': 'Organization',
    name: 'Tech minds IT Solutions',
    url: 'https://techmindsit.com',
    logo: 'https://techmindsit.com/images/logo.png',
    sameAs: [
      'https://twitter.com/TechSparkIgnite',
      'https://www.linkedin.com/company/techsparkignite',
      'https://www.instagram.com/techsparkignite',
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <HomeContent />
    </>
  );
}


