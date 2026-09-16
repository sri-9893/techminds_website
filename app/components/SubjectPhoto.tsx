import Image from 'next/image';
import { cn } from '@/lib/utils';

// Local photographs and their sources are documented in public/images/photography/SOURCES.md.
const subjects: Record<string, { src: string; description: string }> = {
  "web-development": {
    "src": "/services/web_development.png",
    "description": "Responsive web application displayed on a laptop"
  },
  "app-development": {
    "src": "/services/app_development.png",
    "description": "Mobile application interface displayed on a smartphone"
  },
  "digital-marketing": {
    "src": "/services/digital_marketing.png",
    "description": "Digital marketing analytics displayed on a monitor"
  },
  "crm-products": {
    "src": "/services/crm_products.png",
    "description": "Customer relationship management dashboard displayed on a laptop"
  },
  "ecommerce-platform": { "src": "/images/photography/ecommerce-platform.webp", "description": "People browsing an online store on a laptop with a payment card" },
  "school-web-application": { "src": "/images/photography/school-web-application.webp", "description": "School students learning together with a laptop in a classroom" },
  "real-estate-platform": { "src": "/images/photography/real-estate-platform.webp", "description": "A real estate professional holding house keys beside a model home" },
  "billing-website": { "src": "/images/photography/billing-website.webp", "description": "A person reviewing financial documents with a calculator and laptop" },
  "contact": { "src": "/images/photography/contact.webp", "description": "Customer support professional wearing a headset and working at a laptop" },
  "careers": { "src": "/images/photography/careers.webp", "description": "Colleagues developing their skills together at laptops in an office" },
  "frontend": {
    "src": "/images/photography/frontend.webp",
    "description": "Laptop displaying a web development code editor"
  },
  "backend": {
    "src": "/images/photography/backend.webp",
    "description": "Server racks and network cables in a data center"
  },
  "mobile": {
    "src": "/images/photography/mobile.webp",
    "description": "A smartphone displaying a mobile application outdoors"
  },
  "analytics": {
    "src": "/images/photography/analytics.webp",
    "description": "Computer screen displaying analytics charts and performance metrics"
  },
  "design": {
    "src": "/images/photography/design.webp",
    "description": "Laptop displaying website wireframes and page layouts"
  },
  "marketing": {
    "src": "/images/photography/marketing.webp",
    "description": "Desktop monitor displaying audience reach and engagement statistics"
  },
  "workspace": {
    "src": "/images/photography/workspace.webp",
    "description": "Colleagues discussing a project around laptops in a bright office"
  }
};
const aliases: Record<string, string> = {
  "java-intern": "frontend",
  "python-intern": "frontend",
  "data-analytics-intern": "analytics",
  "web-dev-intern": "frontend",
  "mobile-dev-intern": "mobile",
  "digital-marketing-intern": "marketing",
  "uiux-intern": "design",
  "mern-intern": "frontend",
  "web-development": "frontend",
  "app-development": "mobile",
  "crm-products": "analytics",
  "digital-marketing": "marketing",
  "python": "frontend",
  "fullstack": "frontend"
};

export default function SubjectPhoto({ subject, className = '', decorative = false, priority = false }: {
  subject: string;
  className?: string;
  decorative?: boolean;
  priority?: boolean;
}) {
  const photo = subjects[aliases[subject] || subject] || subjects.workspace;
  return (
    <div className={cn('career-artwork', className)}>
      <Image
        src={photo.src}
        alt={decorative ? '' : photo.description}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
        className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.02]"
      />
    </div>
  );
}
