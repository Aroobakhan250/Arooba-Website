"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import InfiniteTicker from "@/components/InfiniteTicker";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import WorkflowSection from "@/components/WorkflowSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#EAF6FC] via-[#F5FBFF] to-[#E0F0F8] text-[#2C4A5A] flex flex-col selection:bg-[#4A90A4] selection:text-white overflow-x-hidden">
      {/* Ambient Glows with Light Theme Colors */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-[#4A90A4]/10 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-10 w-[500px] h-[400px] bg-[#B8D8E8]/20 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Modern Capsule Sticky Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow relative z-10">
        {/* 1. Jenny Scott Style Hero Section */}
        <HeroSection />

        {/* 2. Bottom Infinite Scrolling Ticker (✦ WEBSITE DESIGN ✦ DASHBOARD ✦ ETC) */}
        <InfiniteTicker />

        {/* 3. Services Section */}
        <ServicesSection />

        {/* 4. Projects Showcase */}
        <ProjectsSection />

        {/* 5. About Me Section */}
        <AboutSection />

        {/* 6. Skills Section */}
        <SkillsSection />

        {/* 7. Workflow Timeline */}
        <WorkflowSection />

        {/* 8. Testimonials Section */}
        <TestimonialsSection />

        {/* 9. Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
