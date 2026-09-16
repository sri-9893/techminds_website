import { cn } from '@/lib/utils';

// All nine illustrations share one image request. Each card reveals its own panel.
const subjects: Record<string, { position: string; description: string }> = {
  frontend: { position: '0% 0%', description: 'Frontend development workstation with a responsive website interface' },
  backend: { position: '50% 0%', description: 'Backend server infrastructure connected to databases' },
  mobile: { position: '100% 0%', description: 'Mobile application interfaces on two smartphones' },
  'digital-marketing': { position: '0% 50%', description: 'Digital marketing campaign with growth charts and a target' },
  python: { position: '50% 50%', description: 'Python programming workstation with automation and data connections' },
  analytics: { position: '100% 50%', description: 'Data analytics dashboard with charts and visual reports' },
  design: { position: '0% 100%', description: 'UI and UX design wireframes, colour swatches, and drawing tools' },
  fullstack: { position: '50% 100%', description: 'Full stack application connecting a web interface, APIs, and a database' },
  workspace: { position: '100% 100%', description: 'Collaborative technology workspace with laptops and a notebook' },
};
const aliases: Record<string, string> = {
  'java-intern': 'backend',
  'python-intern': 'python',
  'data-analytics-intern': 'analytics',
  'web-dev-intern': 'frontend',
  'mobile-dev-intern': 'mobile',
  'digital-marketing-intern': 'digital-marketing',
  'uiux-intern': 'design',
  'mern-intern': 'fullstack',
  'web-development': 'frontend',
  'app-development': 'mobile',
  'crm-products': 'fullstack',
};

export default function CareerArtwork({ subject, className = '', decorative = false }: {
  subject: string;
  className?: string;
  decorative?: boolean;
}) {
  const artwork = subjects[aliases[subject] || subject] || subjects.workspace;
  return (
    <div
      className={cn('career-artwork', className)}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : artwork.description}
      aria-hidden={decorative || undefined}
      data-artwork={aliases[subject] || subject}
    >
      <div className="career-artwork__scene" style={{ backgroundPosition: artwork.position }} />
    </div>
  );
}
