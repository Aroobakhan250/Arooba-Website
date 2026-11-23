"use client";

import React, { useState } from "react";
import {
  Mail,
  Send,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Zap,
  ArrowUpRight,
  PhoneCall,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";
import { LinkedinIcon } from "@/components/BrandIcons";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface FormState {
  name: string;
  email: string;
  serviceType: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const INITIAL: FormState = {
  name: "",
  email: "",
  serviceType: "Full Web Platform",
  budget: "$500 - $1,500",
  message: "",
};

const CHANNELS = [
  {
    key: "email",
    label: "Email",
    title: PERSONAL_INFO.socialLinks.email,
    href: `mailto:${PERSONAL_INFO.socialLinks.email}`,
    external: false,
    icon: <Mail className="h-5 w-5" />,
    grad: "from-[#4A90A4] to-[#357A8A]",
    text: "text-[#2A7F96]",
    g1: "#4a90a4",
    g2: "#9ad4e6",
  },
  {
    key: "business",
    label: "Business email",
    title: PERSONAL_INFO.socialLinks.businessEmail,
    href: `mailto:${PERSONAL_INFO.socialLinks.businessEmail}`,
    external: false,
    icon: <Briefcase className="h-5 w-5" />,
    grad: "from-[#F2A33A] to-[#D9841A]",
    text: "text-[#B96C0E]",
    g1: "#f2a33a",
    g2: "#ffd9a0",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    title: "Start a direct chat",
    href: PERSONAL_INFO.socialLinks.whatsapp,
    external: true,
    icon: <MessageCircle className="h-5 w-5" />,
    grad: "from-[#3FBF9F] to-[#1F8F76]",
    text: "text-[#1F8F76]",
    g1: "#3fbf9f",
    g2: "#9be8d2",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    title: "Connect professionally",
    href: PERSONAL_INFO.socialLinks.linkedin,
    external: true,
    icon: <LinkedinIcon className="h-5 w-5" />,
    grad: "from-[#5B8DEF] to-[#3F63C9]",
    text: "text-[#3F63C9]",
    g1: "#5b8def",
    g2: "#a9c4ff",
  },
  {
    key: "upwork",
    label: "Upwork",
    title: "Hire me on Upwork",
    href: PERSONAL_INFO.socialLinks.upwork,
    external: true,
    icon: <span className="font-display text-base font-extrabold leading-none">Up</span>,
    grad: "from-[#8B6FE0] to-[#6A4FC4]",
    text: "text-[#6A4FC4]",
    g1: "#8b6fe0",
    g2: "#c9b8ff",
  },
];

const fieldBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#1F3A48] placeholder:text-[#8AA3B0] transition-all duration-200 focus:outline-none";
const fieldOk =
  "border-[#B8D8E8] hover:border-[#7BB8C8] focus:border-[#4A90A4] focus:ring-4 focus:ring-[#4A90A4]/15";
const fieldErr = "border-rose-400 focus:ring-4 focus:ring-rose-400/15";

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="mb-1.5 block text-[13px] font-semibold text-[#1F3A48]">
    {children}
  </label>
);

const FieldError = ({ msg }: { msg?: string }) =>
  msg ? (
    <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600" role="alert">
      <AlertCircle className="h-3.5 w-3.5" />
      {msg}
    </p>
  ) : null;

export default function ContactSection() {
  const [formData, setFormData] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<false | "sent" | "mailto">(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!formData.name.trim()) next.name = "Please enter your name.";
    if (!formData.email.trim()) next.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      next.email = "Please enter a valid email address.";
    if (!formData.message.trim())
      next.message = "Please add a few details about your project.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Sends the inquiry straight to the owner's inbox through a form service
  // (set NEXT_PUBLIC_FORM_ENDPOINT, e.g. a Formspree URL). If it is not set,
  // falls back to opening the visitor's email app with the message pre-filled.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (honeypot) return; // bots fill the hidden field; silently drop

    const subject = `Project inquiry: ${formData.serviceType}`;
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

    if (endpoint) {
      setSending(true);
      setSendError("");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            projectType: formData.serviceType,
            budget: formData.budget,
            message: formData.message,
            _subject: subject,
            _replyto: formData.email,
          }),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        setSubmitted("sent");
        setFormData(INITIAL);
      } catch {
        setSendError(
          `Your message could not be sent. Please try again, or email me directly at ${PERSONAL_INFO.socialLinks.email}.`
        );
      } finally {
        setSending(false);
      }
      return;
    }

    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Project type: ${formData.serviceType}`,
      `Budget: ${formData.budget}`,
      "",
      formData.message,
    ].join("\n");
    window.location.href = `mailto:${PERSONAL_INFO.socialLinks.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted("mailto");
    setFormData(INITIAL);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden pb-16 pt-8 md:pb-20 md:pt-10"
    >
      <div className="pointer-events-none absolute -left-28 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(184,216,232,0.6),transparent)]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-[380px] w-[380px] rounded-full bg-[radial-gradient(closest-side,rgba(74,144,164,0.18),transparent)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4A90A4]/25 bg-white px-4 py-1.5 text-[13px] font-semibold text-[#357A8A] shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#4FD1A1]" />
            Get in touch
          </p>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#1F3A48] sm:text-5xl">
            Let&apos;s build something great together
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4A6B7A] sm:text-lg">
            {PERSONAL_INFO.closingLine}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          {/* ── Left: channels ── */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {CHANNELS.map((c, i) => (
              <motion.a
                key={c.key}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="group glow-card [--glow-r:20px]"
                style={{ "--g1": c.g1, "--g2": c.g2 } as React.CSSProperties}
              >
                <div className="relative z-[1] flex items-center gap-4 overflow-hidden rounded-[18.5px] bg-gradient-to-r from-[#EAF6FC] to-[#DCEEF8] p-4">
                  <div className="card-shine" aria-hidden />
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110 ${c.grad}`}
                  >
                    {c.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-[12px] font-semibold ${c.text}`}>{c.label}</p>
                    <p className="truncate font-display text-[15px] font-bold text-[#1F3A48]">
                      {c.title}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-[#7BB8C8] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#1F3A48]" />
                </div>
              </motion.a>
            ))}

            {/* Turnaround */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="flex items-start gap-3.5 rounded-2xl border border-[#4A90A4]/25 bg-white/80 p-4 backdrop-blur"
            >
              <span className="animate-float flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F2A33A] to-[#D9841A] text-white shadow-md">
                <Zap className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-[15px] font-bold text-[#1F3A48]">
                  Fast project turnaround
                </p>
                <p className="mt-0.5 text-[13px] leading-relaxed text-[#4A6B7A]">
                  Scope review, timeline and kickoff within 24 to 48 hours of
                  your message.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group glow-card lg:col-span-7 [--glow-r:26px]"
          >
            <div className="relative z-[1] overflow-hidden rounded-[24.5px] bg-gradient-to-br from-[#F4FAFD] via-[#EAF6FC] to-[#DCEEF8] p-6 sm:p-9">
              {submitted ? (
                <div className="flex flex-col items-center py-14 text-center">
                  <motion.span
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3FBF9F] to-[#1F8F76] text-white shadow-lg shadow-[#3FBF9F]/30"
                  >
                    <CheckCircle2 className="h-8 w-8" />
                  </motion.span>
                  <h3 className="font-display text-2xl font-bold text-[#1F3A48]">
                    {submitted === "sent" ? "Message sent" : "Your email is ready to send"}
                  </h3>
                  {submitted === "sent" ? (
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-[#4A6B7A]">
                      Thank you for reaching out. I have received your project
                      details and will reply to you by email within 24 hours.
                    </p>
                  ) : (
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-[#4A6B7A]">
                      Your email app should now be open with your project details.
                      Press send there and I&apos;ll reply within 24 hours. If
                      nothing opened, write to me directly at{" "}
                      <a
                        href={`mailto:${PERSONAL_INFO.socialLinks.email}`}
                        className="font-semibold text-[#357A8A] underline"
                      >
                        {PERSONAL_INFO.socialLinks.email}
                      </a>
                      .
                    </p>
                  )}
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 cursor-pointer text-sm font-semibold text-[#357A8A] underline hover:text-[#1F3A48]"
                  >
                    Write another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="mb-1 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#4A90A4] to-[#357A8A] text-white shadow-md">
                      <PhoneCall className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#1F3A48]">
                        Tell me about your project
                      </h3>
                      <p className="text-[13px] text-[#4A6B7A]">
                        Takes about a minute. I reply within 24 hours.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <Label>Your name *</Label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sarah Jenkins"
                        className={`${fieldBase} ${errors.name ? fieldErr : fieldOk}`}
                      />
                      <FieldError msg={errors.name} />
                    </div>
                    <div>
                      <Label>Your email *</Label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@company.com"
                        className={`${fieldBase} ${errors.email ? fieldErr : fieldOk}`}
                      />
                      <FieldError msg={errors.email} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <Label>Project type</Label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className={`${fieldBase} ${fieldOk} cursor-pointer`}
                      >
                        <option>Full Web Platform</option>
                        <option>AI Chatbot / Automation</option>
                        <option>SaaS Dashboard / Portal</option>
                        <option>E-Commerce Store</option>
                        <option>FYP / Research Project</option>
                      </select>
                    </div>
                    <div>
                      <Label>Budget range</Label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className={`${fieldBase} ${fieldOk} cursor-pointer`}
                      >
                        <option value="< $500">Under $500</option>
                        <option value="$500 - $1,500">$500 - $1,500</option>
                        <option value="$1,500 - $3,000">$1,500 - $3,000</option>
                        <option value="$3,000+">$3,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label>Project details *</Label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your idea, the features you need, preferred tools and your deadline."
                      className={`${fieldBase} resize-none ${errors.message ? fieldErr : fieldOk}`}
                    />
                    <FieldError msg={errors.message} />
                  </div>

                  {/* Spam trap: hidden from people, filled in by bots */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />

                  {sendError && (
                    <p
                      role="alert"
                      className="flex items-start gap-2 rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      {sendError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="group/btn relative inline-flex w-full cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-[#1F3A48] py-4 text-base font-semibold text-white shadow-xl shadow-[#1F3A48]/20 transition-all duration-300 hover:bg-[#357A8A] hover:shadow-[#4A90A4]/30 disabled:cursor-wait disabled:opacity-70"
                  >
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-1" />
                    {sending ? "Sending..." : "Send project inquiry"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
