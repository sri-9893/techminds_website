import type { Metadata, Viewport } from 'next';
import { Manrope, Instrument_Serif } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Providers from './components/Providers';

const manrope = Manrope({ subsets: ['latin'], display: 'swap', variable: '--font-body' });
const instrumentSerif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], display: 'swap', variable: '--font-display' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f7f1' },
    { media: '(prefers-color-scheme: dark)', color: '#102b23' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://techmindsit.com'),
  title: {
    default: 'Tech minds IT Solutions — Web, App, CRM & Digital Marketing',
    template: '%s — Tech minds IT Solutions',
  },
  description:
    'Tech minds IT Solutions delivers premium web development, mobile app development, CRM products, and digital marketing services in Nellore, Andhra Pradesh. Transform your ideas into powerful digital solutions.',
  keywords: [
    'Tech minds IT Solutions',
    'web development',
    'app development',
    'mobile apps',
    'CRM products',
    'digital marketing',
    'SEO services',
    'React development',
    'Next.js development',
    'Flutter apps',
    'React Native',
    'Nellore IT company',
    'Andhra Pradesh tech company',
    'software development',
    'UI UX design',
    'internships Nellore',
    'IT services India',
  ],
  authors: [{ name: 'Tech minds IT Solutions', url: 'https://techmindsit.com' }],
  creator: 'Tech minds IT Solutions',
  publisher: 'Tech minds IT Solutions',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://techmindsit.com',
    siteName: 'Tech minds IT Solutions',
    title: 'Tech minds IT Solutions — Web, App, CRM & Digital Marketing',
    description:
      'Premium web development, mobile app development, CRM products, and digital marketing services in Nellore, Andhra Pradesh.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tech minds IT Solutions — Your Trusted IT Partner in Nellore',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@TechSparkIgnite',
    creator: '@TechSparkIgnite',
    title: 'Tech minds IT Solutions — Web, App, CRM & Digital Marketing',
    description:
      'Premium web development, mobile app development, CRM products, and digital marketing services in Nellore, Andhra Pradesh.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'gzMpXhswPnfVKz5Kwnyl95OSu3AAFEpozdmyeA3K9tE',
  },
  category: 'technology',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://techmindsit.com/#organization',
      name: 'Tech minds IT Solutions',
      alternateName: 'Tech minds IT Solutions',
      url: 'https://techmindsit.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://techmindsit.com/images/logo.png',
        width: 512,
        height: 512,
      },
      sameAs: [
        'https://twitter.com/TechSparkIgnite',
        'https://www.linkedin.com/company/techsparkignite',
        'https://www.instagram.com/techsparkignite',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-88862-69665',
        contactType: 'sales',
        email: 'info@techmindsit.com',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Telugu'],
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://techmindsit.com/#localbusiness',
      name: 'Tech minds IT Solutions',
      image: 'https://techmindsit.com/images/logo.png',
      url: 'https://techmindsit.com',
      telephone: '+91-88862-69665',
      email: 'info@techmindsit.com',
      priceRange: '₹₹',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Srinivasa Agraharam',
        addressLocality: 'Nellore',
        addressRegion: 'Andhra Pradesh',
        postalCode: '524002',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 14.4508553,
        longitude: 79.9880129,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      areaServed: {
        '@type': 'Place',
        name: 'Nellore, Andhra Pradesh, India',
      },
      serviceType: [
        'Web Development',
        'Mobile App Development',
        'CRM Software Development',
        'Digital Marketing',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://techmindsit.com/#website',
      url: 'https://techmindsit.com',
      name: 'Tech minds IT Solutions',
      publisher: {
        '@id': 'https://techmindsit.com/#organization',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://techmindsit.com/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable} ${instrumentSerif.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased font-sans">
        <Providers>{children}</Providers>
        {/* Google Analytics & Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RXLVRTJHP1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RXLVRTJHP1');
            gtag('config', 'AW-14581145887');
          `}
        </Script>
        {/* Additional Google Tag (gtag.js) requested */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7B9RSF90JM"
          strategy="afterInteractive"
        />
        <Script id="google-gtag-G-7B9RSF90JM" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());

            gtag('config', 'G-7B9RSF90JM');
          `}
        </Script>
        {/* Cookiehub cookie manager (loads site-wide) */}
        <Script
          src="https://cdn.cookiehub.eu/c2/9dfbbc9d.js"
          strategy="afterInteractive"
        />
        <Script id="cookiehub-init" strategy="afterInteractive">
          {`
            document.addEventListener("DOMContentLoaded", function(event) {
              var cpm = {};
              window.cookiehub.load(cpm);
            });
          `}
        </Script>
      </body>
    </html>
  );
}


