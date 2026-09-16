'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Briefcase, GraduationCap, MapPin, Clock, IndianRupee, Code2, Users, Rocket, Check } from 'lucide-react';
import { jobsData, internshipsData } from '@/lib/data/careersData';
import SubjectPhoto from '@/app/components/SubjectPhoto';
import PageHero from '@/app/components/PageHero';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

export default function CareersContent() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const applyTrigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const syncTab = () => {
      if (window.location.hash === '#internships') setActiveTab('internships');
    };
    syncTab();
    window.addEventListener('hashchange', syncTab);
    return () => window.removeEventListener('hashchange', syncTab);
  }, []);

  const apply = (position: string) => {
    applyTrigger.current = document.activeElement as HTMLElement;
    setSelectedPosition(position);
  };

  return (
    <div className="pt-[4.5rem]">
      <PageHero
        eyebrow="Careers & internships"
        title={<>Build your skills.<br /><span className="hero-accent">Shape what&apos;s next.</span></>}
        description="For curious minds who love to create. Explore opportunities in development, design, and marketing with our team in Nellore."
        subject="careers"
        caption="Good ideas grow when we build together."
      >
        <a href="#opportunities" className="button-primary">Explore opportunities <ArrowDown size={17} /></a>
        <span className="hero-description inline-flex items-center gap-2 px-2 text-sm"><MapPin size={15} className="hero-accent" /> Nellore, Andhra Pradesh</span>
      </PageHero>

      <section className="border-b border-border bg-background" aria-label="Life at Tech Minds">
        <div className="container mx-auto grid gap-6 px-5 py-9 md:grid-cols-3 md:gap-10">
          {[
            { icon: Code2, title: 'Work that makes a difference', text: 'Bring real websites, apps, and campaigns to life.' },
            { icon: Users, title: 'Learn alongside the team', text: 'Share ideas and grow through collaboration.' },
            { icon: Rocket, title: 'Find your next step', text: 'Opportunities for early talent and experienced minds.' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon size={21} /></span>
              <div><h2 className="text-sm font-semibold">{title}</h2><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="opportunities" className="section-space bg-card" aria-label="Open positions">
        <div className="container mx-auto px-5">
          <div className="mb-10 max-w-2xl">
            <span className="section-eyebrow">Find your place</span>
            <h2 className="section-title mt-3">Your next chapter starts here.</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">Choose your field, explore the role, and take the next step in your career.</p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList id="internships" className="mb-8 grid h-auto w-full max-w-md grid-cols-2 gap-1 rounded-2xl border border-border bg-background p-1.5">
              <TabsTrigger value="jobs" className="gap-2 rounded-xl px-3 py-3 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:text-sm">
                <Briefcase size={16} /> Full-time <span className="tab-count">{jobsData.length}</span>
              </TabsTrigger>
              <TabsTrigger value="internships" className="gap-2 rounded-xl px-3 py-3 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:text-sm">
                <GraduationCap size={16} /> Internships <span className="tab-count">{internshipsData.length}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="jobs">
              <motion.div variants={stagger} initial="hidden" animate="visible" className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {jobsData.map((job) => (
                  <motion.article key={job.id} variants={fadeUp} className="opportunity-card group">
                    <div className="relative overflow-hidden">
                      <SubjectPhoto subject={job.id} />
                      <span className="artwork-badge"><Briefcase size={12} /> Full-time</span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-xl font-semibold tracking-tight">{job.title}</h3>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5"><Clock size={13} />{job.experience}</span>
                        <span className="inline-flex items-center gap-1.5"><MapPin size={13} />{job.location}</span>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{job.description}</p>
                      <div className="my-5 flex flex-wrap gap-2">{job.skills.map((skill) => <span key={skill} className="skill-tag">{skill}</span>)}</div>
                      <details className="role-details mb-6 text-sm">
                        <summary className="cursor-pointer font-medium">Role details</summary>
                        <div className="mt-4 space-y-4 text-muted-foreground">
                          <div><h4 className="mb-2 font-semibold text-foreground">Responsibilities</h4><ul className="list-disc space-y-2 pl-4">{job.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></div>
                          <div><h4 className="mb-2 font-semibold text-foreground">Benefits</h4><ul className="list-disc space-y-2 pl-4">{job.benefits.map((item) => <li key={item}>{item}</li>)}</ul></div>
                        </div>
                      </details>
                      <button onClick={() => apply(job.title)} className="button-apply mt-auto" aria-label={`Apply for ${job.title}`}>Apply for this role <ArrowUpRight size={18} /></button>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="internships">
              <motion.div variants={stagger} initial="hidden" animate="visible" className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {internshipsData.map((intern) => (
                  <motion.article key={intern.id} variants={fadeUp} className="opportunity-card group">
                    <div className="relative overflow-hidden">
                      <SubjectPhoto subject={intern.id} />
                      <span className="artwork-badge"><GraduationCap size={13} /> Internship</span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-xl font-semibold tracking-tight">{intern.role}</h3>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5"><Clock size={13} />{intern.duration}</span>
                        <span className="inline-flex items-center gap-1.5"><IndianRupee size={13} />{intern.stipend}</span>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{intern.description}</p>
                      <div className="my-5 flex flex-wrap gap-2">{intern.skills.map((skill) => <span key={skill} className="skill-tag">{skill}</span>)}</div>
                      <button onClick={() => apply(intern.role)} className="button-apply mt-auto" aria-label={`Apply for ${intern.role}`}>Apply for internship <ArrowUpRight size={18} /></button>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="section-space bg-background" aria-label="Application process">
        <div className="container mx-auto px-5">
          <div className="mb-10"><span className="section-eyebrow">A simple next step</span><h2 className="section-title mt-3">From interested to introduced.</h2></div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: 'Find your role', text: 'Explore the skills and responsibilities to find the right fit.' },
              { title: 'Introduce yourself', text: 'Share your experience, interests, and resume with our team.' },
              { title: 'Start a conversation', text: 'Our team reviews applications and connects with suitable candidates.' },
            ].map((step, index) => (
              <motion.div key={step.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="process-card">
                <span className="text-sm font-semibold text-primary">0{index + 1}</span>
                <h3 className="mb-3 mt-5 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedPosition && <ApplyModal position={selectedPosition} onClose={() => setSelectedPosition(null)} returnFocus={() => applyTrigger.current?.focus()} />}
    </div>
  );
}

function ApplyModal({ position, onClose, returnFocus }: { position: string; onClose: () => void; returnFocus: () => void }) {
  const [formData, setFormData] = useState({ full_name: '', email: '', phone: '', experience: '', resume_link: '' });
  const [error, setError] = useState('');
  const [whatsappOpened, setWhatsappOpened] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const resumeLink = formData.resume_link.trim();
    setError('');
    const message = [
      `Application for: ${position}`,
      `Full name: ${formData.full_name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Experience: ${formData.experience}`,
      ...(resumeLink ? [`Resume link: ${resumeLink}`] : []),
    ].join('\n');
    window.open(`https://wa.me/918886269665?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setWhatsappOpened(true);
  };

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-2xl sm:rounded-2xl" onCloseAutoFocus={(event) => { event.preventDefault(); returnFocus(); }}>
        <DialogHeader className="pr-6 text-left">
          <span className="section-eyebrow">Make your next move</span>
          <DialogTitle className="pt-2 font-display text-3xl font-normal leading-tight">{whatsappOpened ? 'Continue in WhatsApp' : `Apply for ${position}`}</DialogTitle>
          <DialogDescription>{whatsappOpened ? 'Your application details are ready to send.' : 'Tell us a little about yourself and optionally share a link to your resume.'}</DialogDescription>
        </DialogHeader>
        {whatsappOpened ? (
          <div className="application-success" role="status">
            <div className="application-success-icon"><Check size={28} /></div>
            <h3 className="font-display text-3xl">WhatsApp is ready.</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Your application details for <strong className="font-semibold text-foreground">{position}</strong> are ready to send.</p>
            <button type="button" onClick={onClose} className="button-primary mt-6 w-full">Back to opportunities</button>
          </div>
        ) : <form onSubmit={handleSubmit} className="relative space-y-4">
          <fieldset className="space-y-4">
            {[
              { name: 'full_name', label: 'Full name', type: 'text', autoComplete: 'name', placeholder: 'Your full name' },
              { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email', placeholder: 'you@example.com' },
              { name: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel', placeholder: 'Your phone number' },
              { name: 'experience', label: 'Experience', type: 'text', autoComplete: 'off', placeholder: 'e.g. Fresher / 1 year' },
            ].map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="mb-1.5 block text-sm font-medium">{field.label}</label>
                <input id={field.name} name={field.name} maxLength={field.name === 'email' ? 254 : field.name === 'full_name' ? 120 : field.name === 'phone' ? 10 : 200} type={field.type} autoComplete={field.autoComplete} inputMode={field.name === 'phone' ? 'numeric' : undefined} pattern={field.name === 'phone' ? '[0-9]{10}' : undefined} title={field.name === 'phone' ? 'Enter exactly 10 digits.' : undefined} required placeholder={field.placeholder} value={formData[field.name as keyof typeof formData]} onChange={(event) => { const value = field.name === 'phone' ? event.target.value.replace(/\D/g, '').slice(0, 10) : event.target.value; setFormData((prev) => ({ ...prev, [field.name]: value })); }} className="form-input" />
              </div>
            ))}
            <div>
              <label htmlFor="resume_link" className="mb-1.5 block text-sm font-medium">Resume link <span className="font-normal text-muted-foreground">(optional)</span></label>
              <input id="resume_link" name="resume_link" type="url" autoComplete="url" placeholder="https://drive.google.com/..." value={formData.resume_link} onChange={(event) => { setFormData((prev) => ({ ...prev, resume_link: event.target.value })); setError(''); }} className="form-input" />
              <p className="mt-1.5 text-xs text-muted-foreground">Share a public Google Drive, Dropbox, LinkedIn, or portfolio resume link.</p>
            </div>
            {error && <p role="alert" className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm leading-relaxed">{error}</p>}
            <button type="submit" className="button-primary w-full"><ArrowUpRight size={17} /> Continue on WhatsApp</button>
          </fieldset>
        </form>}
      </DialogContent>
    </Dialog>
  );
}
