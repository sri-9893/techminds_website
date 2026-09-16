import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/app/components/JsonLd';
import { servicesData } from '@/lib/data/servicesData';
import ServiceDetailsContent from './ServiceDetailsContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'Service Not Found',
      robots: { index: false },
    };
  }

  return {
    title: `${service.title}`,
    description: service.description,
    keywords: [
      service.title,
      'Tech Spark Ignite',
      ...service.featureTags,
      'IT services Nellore',
      'tech solutions India',
    ],
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      url: `https://techmindsit.com/services/${slug}`,
      title: `${service.title} — Tech Spark Ignite`,
      description: service.description,
      type: 'article',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${service.title} — Tech Spark Ignite`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} — Tech Spark Ignite`,
      description: service.description,
      images: ['/og-image.jpg'],
    },
  };
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailsPage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: { '@id': 'https://techmindsit.com/#organization' },
    areaServed: {
      '@type': 'Place',
      name: 'Nellore, Andhra Pradesh, India',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} Features`,
      itemListElement: service.features.map((feature, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: feature,
        },
        position: index + 1,
      })),
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ServiceDetailsContent service={service} />
    </>
  );
}

