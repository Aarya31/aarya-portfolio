"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Send, CheckCircle2, AlertCircle } from "lucide-react";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    if (!name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }
    
    if (!email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!subject.trim()) {
      tempErrors.subject = "Subject is required";
      isValid = false;
    }

    if (!message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    } else if (message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters long";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to submit. Please try again.");
      }

      setSubmitSuccess(true);
      
      // Track successful form submission
      const globalWindow = typeof window !== "undefined" 
        ? (window as unknown as { trackAnalyticsEvent?: (name: string, val?: string, type?: string) => void }) 
        : null;
      if (globalWindow?.trackAnalyticsEvent) {
        globalWindow.trackAnalyticsEvent("contact_submit", subject, "form_submit");
      }

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden border-t border-slate-900 bg-black/20">
      <div className="container mx-auto px-6 z-10 w-full max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase font-mono">
              09 // Let&apos;s Connect
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-3 tracking-tight">
              Get In Touch
            </h2>
            <p className="text-slate-400 mt-4 text-base md:text-lg font-light leading-relaxed">
              Have an opening, a project collaboration idea, or just want to chat? Shoot me a message!
            </p>
          </motion.div>
        </div>

        {/* Contact Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto items-stretch">
          
          {/* Left panel: Info & Socials (Col span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-2xl glassmorphism border border-white/5 bg-slate-950/40 relative flex flex-col justify-between h-full shadow-2xl glow-border"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  {/* Email */}
                  <a 
                    href="mailto:aaryaprajapat85@gmail.com" 
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-cyan-950/50 border border-cyan-800/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-mono block">EMAIL ME</span>
                      <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                        aaryaprajapat85@gmail.com
                      </span>
                    </div>
                  </a>

                  {/* Phone */}
                  <a 
                    href="tel:+919518301858" 
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-950/50 border border-indigo-800/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-mono block">CALL ME</span>
                      <span className="text-sm font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                        +91 9518301858
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social Channels grid */}
              <div className="mt-12">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-4">SOCIAL NETWORKS</span>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://github.com/Aarya31" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white hover:border-slate-700 glassmorphism hover:scale-110 transition-all"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  
                  <a 
                    href="https://www.linkedin.com/in/aarya-prajapat/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-400 hover:text-cyan-400 hover:border-slate-700 glassmorphism hover:scale-110 transition-all"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Right panel: Contact Form (Col span 7) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="p-8 rounded-2xl glassmorphism border border-white/5 bg-slate-950/20 shadow-2xl h-full"
            >
              <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-name" className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-mono">Name</label>
                    <input 
                      type="text" 
                      id="form-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      className="px-4 py-2.5 rounded-lg bg-black/40 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                    {errors.name && <span className="text-[10px] text-red-400 font-mono">{errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-email" className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-mono">Email</label>
                    <input 
                      type="email" 
                      id="form-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="px-4 py-2.5 rounded-lg bg-black/40 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                    {errors.email && <span className="text-[10px] text-red-400 font-mono">{errors.email}</span>}
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-subject" className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-mono">Subject</label>
                  <input 
                    type="text" 
                    id="form-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Inquiry Subject"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  {errors.subject && <span className="text-[10px] text-red-400 font-mono">{errors.subject}</span>}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-message" className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-mono">Message</label>
                  <textarea 
                    id="form-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your detailed message..."
                    className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                  {errors.message && <span className="text-[10px] text-red-400 font-mono">{errors.message}</span>}
                </div>

                {/* Response Alert Message */}
                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-900/40 text-emerald-400 flex items-center gap-2.5 text-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Thank you! Your message has been sent successfully. I will get back to you shortly.</span>
                    </motion.div>
                  )}
                  
                  {submitError && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3.5 rounded-lg bg-red-950/40 border border-red-900/40 text-red-400 flex items-center gap-2.5 text-xs"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submitError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg hover:shadow-cyan-500/25 hover:shadow-lg disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
