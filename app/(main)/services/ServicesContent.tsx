'use client';

import PageHero from '@/app/components/PageHero';
import SubjectPhoto from '@/app/components/SubjectPhoto';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { servicesData } from '@/lib/data/servicesData';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

export default function ServicesContent() {
  return (
    <div>
      <PageHero
        eyebrow="Our services"
        title={<>Thoughtful design.<br /><span className="hero-accent">Powerful solutions.</span></>}
        description="From your first website to the systems behind your business, we bring design, development, and digital marketing together."
        subject="frontend"
        caption="One team. Every stage of your digital journey."
      >
        <Link href="/contact" className="button-primary">Discuss your project <ArrowRight size={17} /></Link>
      </PageHero>

      <section className="bg-card py-20" aria-label="Service offerings">
        <div className="container mx-auto px-4">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-7 md:grid-cols-2">
            {servicesData.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="opportunity-card group"
              >
                <div className="relative overflow-hidden">
                  <SubjectPhoto subject={service.slug} />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-7 flex items-center gap-3">
                    {service.icon && <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-background/70 text-2xl shadow-lg backdrop-blur-md">{service.icon}</span>}
                    <span className="text-xs font-bold uppercase tracking-wider text-primary-foreground/80">{service.statsLabel}</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h2 className="mb-3 text-2xl font-bold text-foreground transition-colors group-hover:text-primary">{service.title}</h2>
                  <p className="mb-6 leading-relaxed text-muted-foreground">{service.description}</p>
                  <div className="mb-7 flex flex-wrap gap-2">
                    {service.featureTags.map((tag) => (
                      <span key={tag} className="rounded-lg bg-secondary px-3 py-1 text-xs text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3"
                  >
                    Explore Service <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}


