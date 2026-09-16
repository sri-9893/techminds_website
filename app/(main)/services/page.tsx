import { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Explore Tech minds IT Solutions services: Web Development, App Development, Digital Marketing, and CRM Products. Comprehensive IT solutions tailored for your business in Nellore.',
  keywords: [
    'web development services',
    'app development services',
    'digital marketing services',
    'CRM products',
    'React development',
    'Next.js development',
    'Flutter apps',
    'React Native development',
    'SEO services Nellore',
    'IT services Andhra Pradesh',
  ],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    url: 'https://techmindsit.com/services',
    title: 'Our Services — Tech minds IT Solutions',
    description:
      'Explore our comprehensive IT services: Web Development, App Development, Digital Marketing, and CRM Products.',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tech minds IT Solutions Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services — Tech minds IT Solutions',
    description:
      'Explore our comprehensive IT services: Web Development, App Development, Digital Marketing, and CRM Products.',
    images: ['/og-image.jpg'],
  },
};

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Tech minds IT Solutions Services',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        name: 'Web Development',
        description: 'Custom, responsive websites and web applications built with cutting-edge technologies.',
        provider: { '@id': 'https://techmindsit.com/#organization' },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        name: 'App Development',
        description: 'Native and cross-platform mobile apps that deliver exceptional user experiences.',
        provider: { '@id': 'https://techmindsit.com/#organization' },
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        name: 'Digital Marketing',
        description: 'Strategic digital marketing that drives traffic, engagement, and conversions.',
        provider: { '@id': 'https://techmindsit.com/#organization' },
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Service',
        name: 'CRM Products',
        description: 'Custom CRM solutions that streamline your sales pipeline and customer management.',
        provider: { '@id': 'https://techmindsit.com/#organization' },
      },
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesJsonLd} />
      <ServicesContent />
    </>
  );
}


