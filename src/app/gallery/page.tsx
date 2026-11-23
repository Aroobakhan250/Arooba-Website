"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Play,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Images,
  Film,
  LayoutGrid,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PROJECTS_DATA } from "@/data/portfolioData";

/* One accent per project, used for dots, glow border and badges */
const TONES = [
  { dot: "#4A90A4", g1: "#4a90a4", g2: "#9ad4e6", text: "text-[#2A7F96]", soft: "bg-[#4A90A4]/12 border-[#4A90A4]/30" },
  { dot: "#5B8DEF", g1: "#5b8def", g2: "#a9c4ff", text: "text-[#3F63C9]", soft: "bg-[#5B8DEF]/12 border-[#5B8DEF]/30" },
  { dot: "#8B6FE0", g1: "#8b6fe0", g2: "#c9b8ff", text: "text-[#6A4FC4]", soft: "bg-[#8B6FE0]/12 border-[#8B6FE0]/30" },
  { dot: "#3FBF9F", g1: "#3fbf9f", g2: "#9be8d2", text: "text-[#1F8F76]", soft: "bg-[#3FBF9F]/12 border-[#3FBF9F]/30" },
  { dot: "#F2A33A", g1: "#f2a33a", g2: "#ffd9a0", text: "text-[#B96C0E]", soft: "bg-[#F2A33A]/15 border-[#F2A33A]/35" },
];

const toneFor = (projectId: string) => {
  const i = PROJECTS_DATA.findIndex((p) => p.id === projectId);
  return TONES[(i < 0 ? 0 : i) % TONES.length];
};

const shortName = (title: string) => title.split("—")[0].trim();

type MediaFilter = "all" | "images" | "videos";

export default function GalleryPage() {
  const [activeProject, setActiveProject] = useState<string>("all");
  const [activeMediaType, setActiveMediaType] = useState<MediaFilter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Flatten all media
  const allMediaItems = PROJECTS_DATA.flatMap((proj) => {
    const list = proj.images && proj.images.length > 0 ? proj.images : [proj.image];
    return list.map((mediaUrl, idx) => ({
      projectId: proj.id,
      projectTitle: proj.title,
      projectCategory: proj.category,
      mediaUrl,
      isVideo: mediaUrl.endsWith(".mp4") || mediaUrl.endsWith(".webm"),
      index: idx + 1,
      totalProjectMedia: list.length,
    }));
  });

  const displayedItems = allMediaItems.filter((item) => {
    const matchesProject = activeProject === "all" || item.projectId === activeProject;
    const matchesType =
      activeMediaType === "all" ||
      (activeMediaType === "videos" && item.isVideo) ||
      (activeMediaType === "images" && !item.isVideo);
    return matchesProject && matchesType;
  });

  const videoCount = allMediaItems.filter((i) => i.isVideo).length;

  // Open a specific project from links like /gallery#solaria-ai
  useEffect(() => {
    const apply = () => {
      const id = window.location.hash.slice(1);
      if (id && PROJECTS_DATA.some((p) => p.id === id)) setActiveProject(id);
    };
    const raf = requestAnimationFrame(apply);
    window.addEventListener("hashchange", apply);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", apply);
    };
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((p) => (p !== null ? (p + 1) % displayedItems.length : null));
      if (e.key === "ArrowLeft")
        setLightboxIndex((p) =>
          p !== null ? (p - 1 + displayedItems.length) % displayedItems.length : null
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, displayedItems.length]);

  const activeItem = lightboxIndex !== null ? displayedItems[lightboxIndex] : null;

  const typeTabs: { key: MediaFilter; label: string; icon: React.ReactNode }[] = [
    { key: "all", label: "All", icon: <LayoutGrid className="h-3.5 w-3.5" /> },
    { key: "images", label: "Screenshots", icon: <Images className="h-3.5 w-3.5" /> },
    { key: "videos", label: "Videos", icon: <Film className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-br from-[#EAF6FC] via-[#F5FBFF] to-[#E0F0F8] text-[#1F3A48] selection:bg-[#4A90A4] selection:text-white">
      {/* ambient background */}
      <div className="pointer-events-none fixed -left-32 top-16 -z-10 h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(184,216,232,0.7),transparent)]" />
      <div className="pointer-events-none fixed -right-28 bottom-10 -z-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(74,144,164,0.2),transparent)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40 [background-image:radial-gradient(rgba(74,144,164,0.2)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" />

      <Navbar />

      <main className="relative z-10 mx-auto w-full max-w-[1500px] flex-grow px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        {/* Top row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-wrap items-center justify-between gap-3"
        >
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-full border border-[#4A90A4]/25 bg-white px-4 py-2 text-[13px] font-semibold text-[#357A8A] shadow-sm transition-all hover:border-[#4A90A4] hover:text-[#1F3A48] hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to projects
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#4A90A4]/25 bg-white px-3.5 py-2 text-[13px] font-semibold text-[#4A6B7A] shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#4FD1A1]" />
            Showing {displayedItems.length} of {allMediaItems.length} items
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4A90A4]/25 bg-white px-4 py-1.5 text-[13px] font-semibold text-[#357A8A] shadow-sm">
            <Images className="h-3.5 w-3.5" />
            Project gallery
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#1F3A48] sm:text-5xl lg:text-6xl">
            Screens and demos from every project
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#4A6B7A] sm:text-lg">
            Full-resolution screenshots and live recordings of the websites,
            dashboards and AI tools I have built for clients.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 flex flex-col items-center gap-5"
        >
          <div
            role="tablist"
            aria-label="Filter by project"
            className="flex max-w-5xl flex-wrap items-center justify-center gap-2"
          >
            <button
              role="tab"
              aria-selected={activeProject === "all"}
              onClick={() => setActiveProject("all")}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
                activeProject === "all"
                  ? "border-[#1F3A48] bg-[#1F3A48] text-white shadow-lg shadow-[#1F3A48]/20"
                  : "border-[#4A90A4]/25 bg-white text-[#4A6B7A] hover:border-[#4A90A4]/60 hover:text-[#1F3A48]"
              }`}
            >
              All projects
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10.5px] leading-none ${
                  activeProject === "all" ? "bg-white/20" : "bg-[#4A90A4]/12 text-[#357A8A]"
                }`}
              >
                {allMediaItems.length}
              </span>
            </button>

            {PROJECTS_DATA.map((proj, i) => {
              const active = activeProject === proj.id;
              const count = proj.images?.length || 1;
              return (
                <button
                  key={proj.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveProject(proj.id)}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
                    active
                      ? "border-[#1F3A48] bg-[#1F3A48] text-white shadow-lg shadow-[#1F3A48]/20"
                      : "border-[#4A90A4]/25 bg-white text-[#4A6B7A] hover:border-[#4A90A4]/60 hover:text-[#1F3A48]"
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: active ? "#fff" : TONES[i % TONES.length].dot }}
                  />
                  {shortName(proj.title)}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10.5px] leading-none ${
                      active ? "bg-white/20" : "bg-[#4A90A4]/12 text-[#357A8A]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Media type segmented control */}
          <div
            role="tablist"
            aria-label="Filter by media type"
            className="inline-flex items-center gap-1 rounded-2xl border border-[#B8D8E8] bg-white/80 p-1 shadow-sm backdrop-blur"
          >
            {typeTabs.map((t) => {
              const active = activeMediaType === t.key;
              return (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveMediaType(t.key)}
                  className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-[13px] font-semibold transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-br from-[#4A90A4] to-[#357A8A] text-white shadow-md shadow-[#4A90A4]/25"
                      : "text-[#4A6B7A] hover:text-[#1F3A48]"
                  }`}
                >
                  {t.icon}
                  {t.label}
                  {t.key === "videos" && (
                    <span className={`text-[10.5px] ${active ? "text-white/80" : "text-[#7A9BAA]"}`}>
                      {videoCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {displayedItems.map((item, idx) => {
              const tone = toneFor(item.projectId);
              return (
                <motion.button
                  type="button"
                  key={`${item.projectId}-${item.mediaUrl}`}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, delay: (idx % 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`Open ${shortName(item.projectTitle)} item ${item.index}`}
                  className="group glow-card cursor-pointer text-left [--glow-r:20px]"
                  style={{ "--g1": tone.g1, "--g2": tone.g2 } as React.CSSProperties}
                >
                  <div className="relative z-[1] flex h-full flex-col overflow-hidden rounded-[18.5px] bg-gradient-to-b from-[#EAF6FC] to-[#DCEEF8]">
                    <div className="card-shine" aria-hidden />

                    {/* media */}
                    <div className="keep-original relative aspect-[16/10] w-full overflow-hidden bg-[#0d151e]">
                      {item.isVideo ? (
                        <>
                          <video
                            src={item.mediaUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute inset-0 flex items-center justify-center bg-[#0E1B2C]/25 transition-colors group-hover:bg-transparent">
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-[#357A8A] shadow-xl transition-transform duration-300 group-hover:scale-110">
                              <Play className="ml-0.5 h-5 w-5 fill-current" />
                            </span>
                          </span>
                        </>
                      ) : (
                        <Image
                          src={item.mediaUrl}
                          alt={`${shortName(item.projectTitle)}, screen ${item.index}`}
                          fill
                          quality={92}
                          className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      )}

                      {/* hover overlay */}
                      <div className="pointer-events-none absolute inset-0 flex items-end justify-between bg-gradient-to-t from-[#0E1B2C]/70 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11.5px] font-semibold text-[#1F3A48] shadow">
                          <Maximize2 className="h-3 w-3" />
                          {item.isVideo ? "Play full screen" : "View full size"}
                        </span>
                        <span className="rounded-md bg-white/20 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur">
                          {item.index} / {item.totalProjectMedia}
                        </span>
                      </div>

                      {/* type badge */}
                      <span className="absolute right-2.5 top-2.5 z-10 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#1F3A48] shadow-sm">
                        {item.isVideo ? (
                          <Film className="h-3 w-3 text-[#357A8A]" />
                        ) : (
                          <Images className="h-3 w-3 text-[#357A8A]" />
                        )}
                        {item.isVideo ? "Video" : "Screenshot"}
                      </span>
                    </div>

                    {/* footer */}
                    <div className="flex items-center justify-between gap-3 border-t border-[#4A90A4]/20 px-4 py-3">
                      <div className="min-w-0">
                        <h3 className="flex items-center gap-2 truncate font-display text-[14px] font-bold text-[#1F3A48]">
                          <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ background: tone.dot }}
                          />
                          <span className="truncate">{shortName(item.projectTitle)}</span>
                        </h3>
                        <p className={`mt-0.5 truncate text-[12px] font-medium ${tone.text}`}>
                          {item.projectCategory}
                        </p>
                      </div>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#B8D8E8] bg-white text-[#357A8A] transition-all duration-300 group-hover:border-transparent group-hover:bg-[#1F3A48] group-hover:text-white">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {displayedItems.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-display text-xl font-bold text-[#1F3A48]">
              No items match these filters
            </p>
            <p className="mt-1 text-sm text-[#4A6B7A]">
              Try a different project or switch the media type back to All.
            </p>
            <button
              onClick={() => {
                setActiveProject("all");
                setActiveMediaType("all");
              }}
              className="mt-5 cursor-pointer rounded-full bg-[#1F3A48] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4A90A4]"
            >
              Reset filters
            </button>
          </div>
        )}
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${shortName(activeItem.projectTitle)} preview`}
            className="keep-original fixed inset-0 z-50 flex select-none flex-col justify-between bg-[#0E1B2C]/92 p-4 backdrop-blur-xl sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            <div
              className="z-10 mx-auto flex w-full max-w-7xl items-center justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="min-w-0">
                <h2 className="truncate font-display text-base font-bold text-white sm:text-xl">
                  {activeItem.projectTitle}
                </h2>
                <p className="mt-0.5 text-xs text-[#9AD4E6] sm:text-sm">
                  {lightboxIndex! + 1} of {displayedItems.length} &middot;{" "}
                  {activeItem.projectCategory}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href={activeItem.mediaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/20 bg-white/10 p-2 text-xs font-semibold text-white transition-colors hover:bg-white/20 sm:px-3.5 sm:py-2"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Open original</span>
                </a>
                <button
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close preview"
                  className="cursor-pointer rounded-full border border-white/20 bg-white/10 p-2 text-white transition-colors hover:bg-white hover:text-[#1F3A48] sm:p-2.5"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div
              className="relative mx-auto my-4 flex w-full max-w-7xl flex-grow items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() =>
                  setLightboxIndex((lightboxIndex! - 1 + displayedItems.length) % displayedItems.length)
                }
                aria-label="Previous"
                className="absolute left-2 z-20 cursor-pointer rounded-full border border-white/25 bg-[#0E1B2C]/70 p-2.5 text-white shadow-lg transition-all hover:bg-[#4A90A4] sm:left-4 sm:p-3"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <div className="relative flex h-[65vh] w-full items-center justify-center p-2 sm:h-[75vh]">
                {activeItem.isVideo ? (
                  <video
                    src={activeItem.mediaUrl}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-full max-w-full rounded-2xl border border-[#9AD4E6]/30 shadow-[0_0_60px_rgba(74,144,164,0.35)]"
                  />
                ) : (
                  <Image
                    src={activeItem.mediaUrl}
                    alt={activeItem.projectTitle}
                    fill
                    quality={100}
                    className="object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.6)]"
                  />
                )}
              </div>

              <button
                onClick={() => setLightboxIndex((lightboxIndex! + 1) % displayedItems.length)}
                aria-label="Next"
                className="absolute right-2 z-20 cursor-pointer rounded-full border border-white/25 bg-[#0E1B2C]/70 p-2.5 text-white shadow-lg transition-all hover:bg-[#4A90A4] sm:right-4 sm:p-3"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <p
              className="z-10 mx-auto max-w-md text-center text-xs text-[#9AD4E6]/80"
              onClick={(e) => e.stopPropagation()}
            >
              Use the left and right arrow keys to browse. Press Esc to close.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
