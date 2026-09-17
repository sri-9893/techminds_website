'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, Code2, GraduationCap, Briefcase, MapPin } from 'lucide-react';
import { servicesData } from '@/lib/data/servicesData';
import { jobsData, internshipsData } from '@/lib/data/careersData';

const reveal = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const steps = [
  { title: 'Understand', text: 'We start with your goals, your users, and the challenge you want to solve.' },
  { title: 'Design', text: 'A clear direction, considered user experience, and a plan you can follow.' },
  { title: 'Build', text: 'Thoughtful development, regular feedback, and careful testing.' },
  { title: 'Move forward', text: 'Launch with confidence and keep improving as your business grows.' },
];

export default function HomeContent() {
  const handleServicesClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.pushState(null, '', '#services');
  };

  return (
    <div className="home-page">
      <section className="home-banner" aria-label="Digital solutions for your business">
        <Image src="/images/banner%20image.png" alt="Software professionals collaborating in a modern office" fill priority sizes="100vw" className="home-banner-image home-banner-image-desktop" />
        <Image src="/images/mobileview%20banner.png" alt="" fill sizes="100vw" className="home-banner-image home-banner-image-mobile" />
        <div className="home-banner-shade" aria-hidden="true" />
        <div className="container relative mx-auto px-5 md:px-8">
          <motion.div className="home-banner-copy" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <p className="home-kicker"><span /> Technology with purpose</p>
            <h1>Good ideas deserve<br /><span>great technology.</span></h1>
            <p className="home-banner-description">Websites, apps, and digital solutions that bring your business forward. Built with care, from the first conversation to launch.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="home-banner-button">Let&apos;s talk about your project <ArrowUpRight size={18} /></Link>
              <Link href="#services" onClick={handleServicesClick} className="home-banner-link">Explore our services <ArrowRight size={16} /></Link>
            </div>
          </motion.div>
          <div className="home-banner-foot">
            <span className="inline-flex items-center gap-2"><MapPin size={14} /> Nellore, Andhra Pradesh</span>
            <span className="hidden sm:block">Design. Development. Digital growth.</span>
          </div>
        </div>
      </section>

      <section id="services" className="home-section" aria-label="Our services">
        <div className="container mx-auto px-5 md:px-8">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="home-section-heading">
            <div><span className="section-eyebrow">01 / What we do</span><h2 className="section-title mt-4">Digital solutions.<br />Human impact.</h2></div>
            <p className="max-w-md text-sm leading-7 text-muted-foreground md:text-base">From your first online presence to the systems that run your business, we connect thoughtful design with practical technology.</p>
          </motion.div>
          <div className="home-service-list">
            {servicesData.map((service, index) => (
              <motion.div key={service.id} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                <Link href={'/services/' + service.slug} className="home-service-row group">
                  <span className="home-service-number">0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <div className="home-service-description"><p>{service.description}</p><span>{service.featureTags.slice(0, 3).join(' / ')}</span></div>
                  <span className="home-service-arrow"><ArrowUpRight size={22} /></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-partner-section" aria-label="Our approach">
        <div className="container mx-auto grid items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
          <motion.figure variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="home-partner-photo">
            <Image src="/images/photography/workspace.webp" alt="People sharing ideas and collaborating around laptops" width={800} height={534} sizes="(max-width: 1024px) 100vw, 50vw" />
            <figcaption><span>Built through collaboration</span><ArrowUpRight size={18} aria-hidden="true" /></figcaption>
          </motion.figure>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="section-eyebrow">02 / The way we work</span>
            <h2 className="section-title mt-4">A clear process.<br />A committed partner.</h2>
            <p className="mt-6 text-sm leading-7 text-muted-foreground md:text-base">Tech Minds IT Solutions helps businesses turn ideas into useful digital experiences. We keep the conversation clear and the focus on what your business actually needs.</p>
            <ul className="home-principles">
              {[
                ['Made for your business', 'Solutions shaped around your goals, rather than a one-size-fits-all approach.'],
                ['Direct communication', 'A collaborative process that keeps you involved as the work takes shape.'],
                ['Care in the details', 'Useful interfaces, responsive layouts, and thoughtful implementation.'],
              ].map(([title, description]) => <li key={title}><Check size={16} /><div><h3>{title}</h3><p>{description}</p></div></li>)}
            </ul>
            <Link href="/about" className="home-text-link">Get to know Tech Minds <ArrowRight size={16} /></Link>
          </motion.div>
        </div>
      </section>

      <section className="home-section" aria-label="How projects progress">
        <div className="container mx-auto px-5 md:px-8">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="home-section-heading">
            <div><span className="section-eyebrow">03 / From idea to impact</span><h2 className="section-title mt-4">A thoughtful path forward.</h2></div>
            <p className="max-w-sm text-sm leading-7 text-muted-foreground">Every project is different. A shared understanding and a clear process make the difference.</p>
          </motion.div>
          <div className="home-process-grid">
            {steps.map((step, index) => <motion.article key={step.title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></motion.article>)}
          </div>
        </div>
      </section>

      <section className="home-section home-careers-section" aria-label="Careers and internships">
        <div className="container mx-auto grid items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="section-eyebrow">04 / Grow with us</span>
            <h2 className="section-title mt-4">Your next chapter<br />could start here.</h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground md:text-base">Bring your curiosity, build your skills, and contribute to meaningful digital work. Explore a role or find an internship in the field that interests you.</p>
          </motion.div>
          <div className="home-career-links">
            <Link href="/careers#opportunities"><Briefcase size={24} /><span><strong>Full-time opportunities</strong><small>{jobsData.length} roles across development and marketing</small></span><ArrowUpRight size={20} /></Link>
            <Link href="/careers#internships"><GraduationCap size={25} /><span><strong>Internship programmes</strong><small>{internshipsData.length} paths to put your learning into practice</small></span><ArrowUpRight size={20} /></Link>
            <p className="flex items-center gap-2 text-xs text-muted-foreground"><Code2 size={14} /> Development, design, data, and digital marketing.</p>
          </div>
        </div>
      </section>

      <section className="home-contact-section" aria-label="Start your project">
        <div className="container mx-auto flex flex-col items-start justify-between gap-8 px-5 md:px-8 lg:flex-row lg:items-center">
          <div><span className="home-kicker">Have something in mind?</span><h2>Let&apos;s make it happen.</h2><p>Start with a conversation. We&apos;ll help you find the next step.</p></div>
          <Link href="/contact" className="home-banner-button">Start a conversation <ArrowUpRight size={18} /></Link>
        </div>
      </section>
    </div>
  );
}
