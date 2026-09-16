'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import SubjectPhoto from './SubjectPhoto';

export default function PageHero({ eyebrow, title, description, subject, imageSrc, caption, children }: {
  eyebrow: string; title: ReactNode; description: string;
  subject: string; imageSrc?: string; caption: string; children?: ReactNode;
}) {
  return (
    <section className="page-hero" aria-label={eyebrow}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-ambient" aria-hidden="true" />
      <div className="container relative mx-auto grid items-center gap-12 px-5 py-16 md:py-24 lg:grid-cols-12 lg:gap-20">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="lg:col-span-7">
          <span className="hero-eyebrow"><span />{eyebrow}</span>
          <h1 className="hero-heading mt-7 max-w-3xl">{title}</h1>
          <p className="hero-description mt-7 max-w-xl text-base leading-relaxed md:text-lg">{description}</p>
          {children && <div className="mt-9 flex flex-wrap items-center gap-3">{children}</div>}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-full max-w-lg lg:col-span-5">
          <figure className="hero-visual group">
            {imageSrc ? <Image src={imageSrc} alt="Tech Minds team collaborating in an office" width={1400} height={934} priority className="h-full w-full object-cover" sizes="(max-width: 1024px) 100vw, 42vw" /> : <SubjectPhoto subject={subject} priority />}
            <figcaption className="hero-caption"><span>{caption}</span><span className="hero-caption-mark" aria-hidden="true"><ArrowUpRight size={14} /></span></figcaption>
          </figure>
          <div className="hero-visual-accent" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
