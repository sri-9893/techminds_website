import { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Tech Minds IT Solutions for web development, app development, CRM products, and digital marketing services. Located in Nellore, Andhra Pradesh.',
  keywords: [
    'Contact Tech Minds IT Solutions',
    'IT company Nellore contact',
    'web development quote',
    'app development inquiry',
    'digital marketing consultation',
    'CRM software consultation',
    'tech services Andhra Pradesh',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    url: 'https://techmindsit.com/contact',
    title: 'Contact Us — Tech Minds IT Solutions',
    description:
      'Get in touch with Tech Minds IT Solutions for premium IT services in Nellore, Andhra Pradesh.',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Tech Minds IT Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us — Tech Minds IT Solutions',
    description:
      'Get in touch with Tech Minds IT Solutions for premium IT services in Nellore, Andhra Pradesh.',
    images: ['/og-image.jpg'],
  },
};

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Tech Minds IT Solutions',
  url: 'https://techmindsit.com/contact',
  description:
    'Get in touch with Tech Minds IT Solutions for web development, app development, CRM products, and digital marketing services.',
  mainEntity: {
    '@id': 'https://techmindsit.com/#localbusiness',
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactJsonLd} />
      <ContactContent />
    </>
  );
}


