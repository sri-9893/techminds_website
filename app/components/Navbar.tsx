'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Brand from './Brand';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';
import { servicesData } from '@/lib/data/servicesData';
import GooeyNav from '@/components/ui/GooeyNav';

const links = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];
const primaryLinks = links.filter((link) => link.path !== '/services');

const Navbar = () => {
  const menuButton = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const refreshIfCurrent = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (pathname === path) {
      event.preventDefault();
      window.location.reload();
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener('keydown', dismiss);
    return () => document.removeEventListener('keydown', dismiss);
  }, [menuOpen]);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path.replace(/\/$/, ''));
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 shadow-card backdrop-blur-xl' : 'bg-background/75 backdrop-blur-md'
        }`}
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex h-[4.5rem] w-full items-center justify-between gap-3 px-4">
        <Link href="/" onClick={(event) => refreshIfCurrent(event, '/')} className="nav-action group min-w-0 flex items-center gap-3" aria-label="Tech Minds IT Solutions Home">
          <Brand />
        </Link>

        <div className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <GooeyNav
            items={primaryLinks}
            initialActiveIndex={Math.max(0, primaryLinks.findIndex((link) => isActive(link.path)))}
          />

          <div className="group relative">
            <Link
              href="/services"
              onClick={(event) => refreshIfCurrent(event, '/services')}
              className={`nav-action relative inline-flex items-center gap-1 px-4 py-2 transition-colors after:absolute after:inset-x-4 after:-bottom-1 after:h-0.5 after:origin-left after:bg-primary after:transition-transform group-hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${isActive('/services') ? 'text-primary after:scale-x-100' : 'text-muted-foreground hover:text-primary after:scale-x-0'}`}
              aria-current={isActive('/services') ? 'page' : undefined}
            >
              Services <ChevronDown size={15} className="transition-transform duration-300 group-hover:rotate-180" />
            </Link>
            <div className="pointer-events-none invisible absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100">
              <div className="overflow-hidden rounded-2xl border border-border/80 bg-background/95 p-3 shadow-2xl backdrop-blur-xl">
                <div className="mb-2 flex items-center justify-between px-3 py-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Explore</p>
                  </div>
                  <ArrowUpRight size={18} className="text-primary" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {servicesData.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="nav-action group/item flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-primary/10 focus-visible:bg-primary/10 focus-visible:outline-none"
                    >
                      {service.icon && <span className="text-xl transition-transform duration-300 group-hover/item:scale-110">{service.icon}</span>}
                      <span className="block self-center text-sm font-semibold text-foreground">{service.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={toggleTheme}
            className="nav-action p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="nav-action lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-navigation" className="mobile-navigation absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-4.5rem)] lg:hidden border-t border-border/70 bg-background/95 shadow-card backdrop-blur-xl">
          <div className="px-4 py-4 flex flex-col gap-1" onClick={(event) => { if ((event.target as HTMLElement).closest('a')) setMenuOpen(false); }}>
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={(event) => refreshIfCurrent(event, link.path)}
                className={`nav-action px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive(link.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary'
                  }`}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <div>
              <div className="flex items-center gap-1">
                <Link
                  href="/services"
                  onClick={(event) => refreshIfCurrent(event, '/services')}
                  className={`nav-action flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive('/services') ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'}`}
                >
                  Services
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((open) => !open)}
                  className="nav-action rounded-xl p-3 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  aria-label="Toggle services submenu"
                  aria-expanded={mobileServicesOpen}
                >
                  <ChevronDown size={18} className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {mobileServicesOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l border-primary/30 pl-3">
                  {servicesData.map((service) => (
                    <Link key={service.id} href={`/services/${service.slug}`} onClick={(event) => refreshIfCurrent(event, `/services/${service.slug}`)} className="nav-action flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
                      {service.icon && <span>{service.icon}</span>}{service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


