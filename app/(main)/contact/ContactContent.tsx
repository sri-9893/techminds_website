'use client';

import PageHero from '@/app/components/PageHero';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock, MessageSquare, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ContactContent() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      'Website contact enquiry',
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Subject: ${formData.subject}`,
      `Message: ${formData.message}`,
    ].join('\n');
    window.open(`https://wa.me/918886269665?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    toast.success('WhatsApp is ready. Please send the message to our team.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="pt-[4.5rem]">
      <PageHero
        eyebrow="Contact us"
        title={<>Great work starts<br /><span className="hero-accent">with a conversation.</span></>}
        description="Have an idea, a challenge, or a project in mind? Tell us what you are thinking. We would love to help you take the next step."
        subject="contact"
        caption="Let’s make something that matters."
      >
        <a href="#contact-form" className="button-primary">Tell us about your project <Send size={16} /></a>
        <a href="tel:+918886269665" className="button-secondary"><Phone size={16} /> Call our team</a>
      </PageHero>

      <section className="py-20 bg-card" aria-label="Contact form and information">
        <div className="container mx-auto px-4">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Form */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-3xl border border-border bg-background p-6 shadow-card sm:p-8">
              <span className="section-eyebrow mb-3 block">Your next project</span>
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a message</h2>
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
                {[
                  { name: 'name', label: 'Full Name', type: 'text' },
                  { name: 'email', label: 'Email Address', type: 'email' },
                  { name: 'subject', label: 'Subject', type: 'text' },
                ].map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="text-sm font-medium text-foreground mb-1 block">
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      type={field.type}
                      autoComplete={field.name === 'name' ? 'name' : field.name === 'email' ? 'email' : 'off'}
                      placeholder={field.name === 'name' ? 'Your full name' : field.name === 'email' ? 'you@example.com' : 'What would you like to build?'}
                      required
                      value={formData[field.name as keyof typeof formData]}
                      onChange={(e) => setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="text-sm font-medium text-foreground mb-1 block">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="A little about your goals, timeline, and what you have in mind…"
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 gradient-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <Send size={18} />
                  Open WhatsApp
                </button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="min-w-0 space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              {[
                { icon: <Mail size={20} />, label: 'Email', value: 'info@techmindsit.com', href: 'mailto:info@techmindsit.com' },
                { icon: <Phone size={20} />, label: 'Phone', value: '+91 88862 69665', href: 'tel:+918886269665' },
                { icon: <MapPin size={20} />, label: 'Address', value: 'Srinivasa Agraharam, Nellore, AP 524002', href: null },
              ].map((info, i) => (
                <div key={i} className="flex min-w-0 items-start gap-4 bg-background border border-border rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center flex-shrink-0">{info.icon}</div>
                  <div className="min-w-0">
                    <div className="text-sm text-muted-foreground">{info.label}</div>
                    {info.href ? (
                      <a href={info.href} className="block break-all text-foreground font-medium hover:text-primary transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <div className="break-words text-foreground font-medium">{info.value}</div>
                    )}
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-background border border-border rounded-2xl p-5 text-center">
                  <Clock size={24} className="text-primary mx-auto mb-2" />
                  <div className="font-semibold text-foreground text-sm">Quick Response</div>
                  <div className="text-xs text-muted-foreground">Within 24 hours</div>
                </div>
                <div className="bg-background border border-border rounded-2xl p-5 text-center">
                  <MessageSquare size={24} className="text-primary mx-auto mb-2" />
                  <div className="font-semibold text-foreground text-sm">Free Consultation</div>
                  <div className="text-xs text-muted-foreground">No obligation</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 bg-background" aria-label="Location map">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-foreground">Find Us</h2>
          </motion.div>

          <div className="rounded-2xl overflow-hidden border border-border h-[400px]">
            <iframe
              title="Tech Minds IT Solutions Location"
              src="https://www.google.com/maps?q=Tech+Minds+IT+Solutions,+Nellore,+Andhra+Pradesh&output=embed"
              className="w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Tech+Minds+IT+Solutions+Nellore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              🚗 Get Directions
            </a>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Tech+Minds+IT+Solutions+Nellore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-xl font-semibold text-sm hover:bg-secondary transition-colors"
            >
              🗺️ View on Maps
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}


