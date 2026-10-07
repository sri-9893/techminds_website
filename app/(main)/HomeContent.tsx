'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, Code2, GraduationCap, Briefcase, MapPin, Laptop2, Users, Workflow, GitBranch, Award, Braces, Layers, PanelsTopLeft, BrainCircuit, Bug, Palette } from 'lucide-react';
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
  return (
    <div className="home-page">
      <section className="home-banner" aria-label="Digital solutions for your business">
        <Image src="/images/banner%20image.png" alt="Software professionals collaborating in a modern office" fill priority sizes="100vw" className="home-banner-image home-banner-image-desktop" />
        <Image src="/images/mobileview.png" alt="Software professionals collaborating in a modern office" fill sizes="100vw" className="home-banner-image home-banner-image-mobile" />
        <div className="home-banner-shade" aria-hidden="true" />
        <div className="container relative mx-auto px-5 md:px-8">
          <motion.div className="home-banner-copy" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <p className="home-kicker"><span /> Tech Minds Internship Program</p>
            <h1>Build Your Career<br /><span>With Tech Minds.</span></h1>
            <p className="home-banner-description">Gain practical industry experience, work on real-world projects, and develop the technical skills you need to start your IT career.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/careers#internships" className="home-banner-button">Explore Internships <ArrowUpRight size={18} /></Link>
              <Link href="/careers#internships" className="home-banner-link">Apply Now <ArrowRight size={16} /></Link>
            </div>
          </motion.div>
          <div className="home-banner-foot">
            <span className="home-banner-location home-banner-location-desktop items-center gap-2"><MapPin size={14} /> Nellore, Andhra Pradesh</span>
            <span className="hidden sm:block">Design. Development. Digital growth.</span>
          </div>
        </div>
      </section>
      <div className="home-banner-location-mobile items-center gap-2"><MapPin size={14} /> Nellore, Andhra Pradesh</div>

      <section className="home-section bg-card" aria-labelledby="internship-program-title">
        <div className="container mx-auto px-5 md:px-8">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="overflow-hidden rounded-[2rem] bg-primary px-6 py-9 text-primary-foreground shadow-lg md:px-12 md:py-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/75">Learn by doing</span>
              <h2 id="internship-program-title" className="mt-3 font-display text-3xl leading-tight md:text-4xl">Industry-Oriented Internship Program</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-primary-foreground/85 md:text-base">Start your journey into the IT industry with hands-on learning, technical mentorship, and practical project experience.</p>
              <div className="mt-6 flex flex-wrap gap-2" aria-label="Internship technologies and learning areas">
                {['Python', 'Django', 'React', 'Full Stack Development', 'AI & Machine Learning', 'Software Testing', 'UI/UX Design'].map((technology) => <span key={technology} className="rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1.5 text-xs font-medium">{technology}</span>)}
              </div>
            </div>
            <Link href="/careers#internships" className="mt-7 inline-flex shrink-0 items-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-background lg:mt-0">Apply for Internship <ArrowUpRight size={17} /></Link>
          </motion.div>
        </div>
      </section>

      <section className="home-section" aria-labelledby="why-intern-title">
        <div className="container mx-auto px-5 md:px-8">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="home-section-heading">
            <div><span className="section-eyebrow">01 / Learn with purpose</span><h2 id="why-intern-title" className="section-title mt-4">Why Choose Tech Minds<br />Internship Program?</h2></div>
            <p className="max-w-md text-sm leading-7 text-muted-foreground md:text-base">Build a practical foundation through guided learning, real development workflows, and collaboration with a team.</p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Laptop2, title: 'Hands-On Learning', text: 'Learn by working on practical development tasks and projects.' },
              { icon: Users, title: 'Industry Mentorship', text: 'Get guidance from experienced professionals and developers.' },
              { icon: Workflow, title: 'Real-World Project Experience', text: 'Understand how software projects are planned, developed, tested, and delivered.' },
              { icon: Code2, title: 'Modern Technologies', text: 'Work with technologies and tools used in modern software development.' },
              { icon: GitBranch, title: 'Team Collaboration', text: 'Learn Git, GitHub, teamwork, communication, and professional development practices.' },
              { icon: Award, title: 'Internship Certificate', text: 'Receive an internship certificate upon successful completion of the program.' },
            ].map(({ icon: Icon, title, text }, index) => <motion.article key={title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon size={21} aria-hidden="true" /></span><span className="mt-5 block text-xs font-semibold text-primary">0{index + 1}</span><h3 className="mt-2 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></motion.article>)}
          </div>
        </div>
      </section>

      <section className="home-section bg-card" aria-labelledby="internship-domains-title">
        <div className="container mx-auto px-5 md:px-8">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="home-section-heading">
            <div><span className="section-eyebrow">02 / Find your field</span><h2 id="internship-domains-title" className="section-title mt-4">Explore Our Internship Domains</h2></div>
            <p className="max-w-md text-sm leading-7 text-muted-foreground md:text-base">Explore a learning path that matches your interests and the skills you want to develop.</p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Braces, title: 'Python & Django Development', text: 'Build backend foundations and learn to create web applications with Python.' },
              { icon: Layers, title: 'Full Stack Web Development', text: 'Explore how frontend interfaces and backend services work together.' },
              { icon: PanelsTopLeft, title: 'Frontend Development', text: 'Create responsive, accessible interfaces for modern websites.' },
              { icon: BrainCircuit, title: 'AI & Machine Learning', text: 'Learn core concepts and explore practical applications of intelligent systems.' },
              { icon: Bug, title: 'Software Testing & QA', text: 'Practice testing workflows that help software work reliably.' },
              { icon: Palette, title: 'UI/UX Design', text: 'Turn user needs into clear flows, wireframes, and polished interface designs.' },
            ].map(({ icon: Icon, title, text }) => <motion.article key={title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="flex flex-col rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon size={21} aria-hidden="true" /></span><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{text}</p><Link href="/careers#internships" className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Learn More <ArrowRight size={16} /></Link></motion.article>)}
          </div>
        </div>
      </section>

      <section className="home-section" aria-labelledby="intern-project-title">
        <div className="container mx-auto grid items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
          <motion.figure variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="overflow-hidden rounded-[2rem]">
            <Image src="/images/photography/workspace.webp" alt="Developers collaborating at laptops in a bright workspace" width={1200} height={800} sizes="(max-width: 1024px) 100vw, 50vw" className="h-full min-h-72 w-full object-cover" />
          </motion.figure>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="section-eyebrow">03 / Practice the process</span>
            <h2 id="intern-project-title" className="section-title mt-4">Learn by Building Real Projects</h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">At Tech Minds, interns get the opportunity to understand the complete software development process - from planning and UI development to backend APIs, databases, testing, Git/GitHub, and deployment.</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {['Practical development experience', 'Project-based learning', 'Git & GitHub workflow', 'API development and integration', 'Database fundamentals', 'Testing and debugging', 'Team collaboration'].map((item) => <li key={item} className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"><Check size={17} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />{item}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="home-section bg-card" aria-labelledby="intern-process-title">
        <div className="container mx-auto px-5 md:px-8">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="home-section-heading"><div><span className="section-eyebrow">04 / Your next steps</span><h2 id="intern-process-title" className="section-title mt-4">Your Internship Journey</h2></div><p className="max-w-sm text-sm leading-7 text-muted-foreground">A straightforward path from your application to completing the program.</p></motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { number: '01', title: 'Apply', text: 'Submit your internship application.' },
              { number: '02', title: 'Learn', text: 'Learn technologies through practical guidance.' },
              { number: '03', title: 'Build', text: 'Work on projects and complete development tasks.' },
              { number: '04', title: 'Complete', text: 'Successfully complete the internship and receive your certificate.' },
            ].map((step) => <motion.article key={step.number} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="rounded-2xl border border-border bg-background p-6"><span className="font-display text-4xl text-primary">{step.number}</span><h3 className="mt-4 text-lg font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p></motion.article>)}
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

      <section className="home-contact-section" aria-labelledby="intern-cta-title">
        <div className="container mx-auto flex flex-col items-start justify-between gap-8 px-5 md:px-8 lg:flex-row lg:items-center">
          <div><span className="home-kicker">Your next step starts here</span><h2 id="intern-cta-title">Ready to Start Your IT Journey?</h2><p>Join Tech Minds and gain practical experience that helps you move confidently toward your software development career.</p></div>
          <div className="flex flex-wrap gap-3"><Link href="/careers#internships" className="home-banner-button">Apply for Internship <ArrowUpRight size={18} /></Link><Link href="/contact" className="home-banner-link">Contact Us <ArrowRight size={16} /></Link></div>
        </div>
      </section>
    </div>
  );
}
