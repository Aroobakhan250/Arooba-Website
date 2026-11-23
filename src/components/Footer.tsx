"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { Mail, ArrowUp, ArrowRight, MapPin, Clock, Briefcase, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { LinkedinIcon } from "@/components/BrandIcons";
import { PERSONAL_INFO } from "@/data/portfolioData";

const NAV = [
  { label: "Home", href: "/#hero" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "About me", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const SERVICES = [
  "Business websites",
  "AI chatbots",
  "E-commerce stores",
  "Admin dashboards",
  "SaaS platforms",
  "Custom software",
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: PERSONAL_INFO.socialLinks.linkedin,
    icon: <LinkedinIcon className="h-4 w-4" />,
    hover: "hover:from-[#5B8DEF] hover:to-[#3F63C9]",
  },
  {
    label: "WhatsApp",
    href: PERSONAL_INFO.socialLinks.whatsapp,
    icon: <MessageCircle className="h-4 w-4" />,
    hover: "hover:from-[#3FBF9F] hover:to-[#1F8F76]",
  },
  {
    label: "Email",
    href: `mailto:${PERSONAL_INFO.socialLinks.email}`,
    icon: <Mail className="h-4 w-4" />,
    hover: "hover:from-[#4A90A4] hover:to-[#357A8A]",
  },
];

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="group relative inline-block text-[14px] font-medium text-[#4A6B7A] transition-colors duration-200 hover:text-[#1F3A48]"
  >
    {children}
    <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 rounded-full bg-[#4A90A4] transition-all duration-300 group-hover:w-full" />
  </Link>
);

const ColTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-4 font-display text-[15px] font-bold text-[#1F3A48]">{children}</h3>
);

export default function Footer() {
  // Computed on the client only (avoids a build-time date in the prerendered page)
  const year = useSyncExternalStore(
    () => () => {},
    () => String(new Date().getFullYear()),
    () => "2026"
  );
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden border-t border-[#B8D8E8] bg-gradient-to-b from-[#F3FAFD] to-[#DCEEF8] pt-14">
      <div className="pointer-events-none absolute -left-24 top-0 h-[320px] w-[320px] rounded-full bg-[radial-gradient(closest-side,rgba(184,216,232,0.6),transparent)]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(closest-side,rgba(74,144,164,0.2),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="keep-original relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1F3A48] via-[#2A5568] to-[#357A8A] p-7 shadow-[0_30px_60px_-28px_rgba(31,58,72,0.6)] sm:p-10"
        >
          <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(154,212,230,0.45),transparent)]" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(123,184,200,0.3),transparent)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_right,transparent,black_60%)]" />

          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-[12px] font-semibold text-[#CDEBF5] backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#4FD1A1]" />
                Available for new projects
              </p>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-white sm:text-4xl">
                Have a project in mind?
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#CDEBF5]">
                Tell me what you need and get a clear plan, timeline and quote
                within 24 to 48 hours.
              </p>
            </div>
            <Link
              href="/#contact"
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#1F3A48] shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EAF6FC] hover:shadow-2xl"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 md:grid-cols-12"
        >
          {/* Brand */}
          <div className="col-span-2 md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4A90A4] to-[#357A8A] font-display text-lg font-extrabold text-white shadow-lg shadow-[#4A90A4]/30">
                A
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-display text-lg font-bold text-[#1F3A48]">
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-[12px] font-medium text-[#4A6B7A]">
                  Full-stack developer &amp; solutions architect
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-[#4A6B7A]">
              I design, build and launch websites, AI chatbots and custom
              business software for clients around the world.
            </p>

            <div className="mt-5 flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border border-[#B8D8E8] bg-white text-[#357A8A] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-gradient-to-br hover:text-white hover:shadow-lg ${s.hover}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div className="md:col-span-2">
            <ColTitle>Navigate</ColTitle>
            <ul className="space-y-2.5">
              {NAV.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <ColTitle>Services</ColTitle>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s}>
                  <FooterLink href="/#services">{s}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-3">
            <ColTitle>Contact</ColTitle>
            <ul className="space-y-3 text-[14px] text-[#4A6B7A]">
              <li>
                <a
                  href={`mailto:${PERSONAL_INFO.socialLinks.email}`}
                  className="group flex items-center gap-2.5 font-medium transition-colors hover:text-[#1F3A48]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4A90A4]/12 text-[#357A8A] transition-transform duration-300 group-hover:scale-110">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="break-all">{PERSONAL_INFO.socialLinks.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PERSONAL_INFO.socialLinks.businessEmail}`}
                  className="group flex items-center gap-2.5 font-medium transition-colors hover:text-[#1F3A48]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F2A33A]/15 text-[#B96C0E] transition-transform duration-300 group-hover:scale-110">
                    <Briefcase className="h-4 w-4" />
                  </span>
                  <span className="break-all">{PERSONAL_INFO.socialLinks.businessEmail}</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5B8DEF]/12 text-[#3F63C9]">
                  <Clock className="h-4 w-4" />
                </span>
                Replies within 24 hours
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3FBF9F]/12 text-[#1F8F76]">
                  <MapPin className="h-4 w-4" />
                </span>
                Working with clients worldwide
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#B8D8E8] py-6 text-[13px] text-[#4A6B7A] sm:flex-row">
          <p>
            &copy; {year} {PERSONAL_INFO.name}. All rights reserved.
          </p>
          <p className="text-center">Built with Next.js, React and Tailwind CSS.</p>
          <button
            onClick={scrollToTop}
            id="footer-scroll-top-btn"
            aria-label="Scroll back to top"
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#B8D8E8] bg-white px-4 py-2 text-[13px] font-semibold text-[#1F3A48] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4A90A4] hover:bg-[#1F3A48] hover:text-white"
          >
            Back to top
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
