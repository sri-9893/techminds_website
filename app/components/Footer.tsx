
'use client';


import Link from 'next/link';
import Brand from './Brand';
import { ArrowUpRight, Facebook, Instagram, Twitter } from 'lucide-react';
import { servicesData } from '@/lib/data/servicesData';

const Footer = () => {
  return (
    <footer className="relative bg-card border-t border-border before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/40 before:to-transparent" role="contentinfo">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Brand />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Transforming ideas into powerful digital solutions. Your trusted IT partner in Nellore, Andhra Pradesh.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">Let&apos;s talk <ArrowUpRight size={16} /></Link>
            <div className="mt-5 flex items-center gap-2" aria-label="Social media links">
              <a href="https://www.instagram.com/techminds_itsolutions?igsh=a2J1OG5wdm9vYTRi" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary">
                <Instagram size={18} />
              </a>
              <a href="https://x.com/techmindsit" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary">
                <Twitter size={18} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61588237742054&rdid=Fqpg1yJzJY1pDVOY&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1NWVNNbsFN%2F#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary">
                <Facebook size={18} />
              </a>
            </div>

          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Services', path: '/services' },
                { label: 'Careers & Internships', path: '/careers' },
                { label: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors inline-block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Footer services">
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2">
              {servicesData.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors inline-block py-1"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Info</h4>
            <address className="not-italic space-y-3 text-sm text-muted-foreground">
              <p>
                <a href="mailto:info@techmindsit.com" className="hover:text-primary transition-colors">
                  info@techmindsit.com
                </a>
              </p>
              <p>
                <a href="tel:+918886269665" className="hover:text-primary transition-colors">
                  +91 88862 69665
                </a>
              </p>
              <p>Srinivasa Agraharam, Nellore, AP 524002</p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Tech Minds IT Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

