import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arooba Alam Khan | Full-Stack Software Engineer & Solutions Architect",
  description:
    "Engineering modern responsive web platforms, AI chatbots, SaaS dashboards, and automated custom software solutions with Next.js, React, Node.js, and Python.",
  keywords: [
    "Arooba Alam Khan",
    "Full Stack Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Node.js",
    "Python",
    "AI Chatbots",
    "SaaS Architect",
    "Freelance Full Stack Developer",
    "Upwork Freelancer",
  ],
  authors: [{ name: "Arooba Alam Khan" }],
  creator: "Arooba Alam Khan",
  metadataBase: new URL("https://aroobaalamkhan.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aroobaalamkhan.com",
    title: "Arooba Alam Khan | Full-Stack Software Engineer",
    description:
      "Engineering modern responsive web platforms, AI chatbots, SaaS dashboards, and automated software solutions.",
    siteName: "Arooba Alam Khan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arooba Alam Khan | Full-Stack Software Engineer",
    description:
      "Engineering modern responsive web platforms, AI chatbots, SaaS dashboards, and automated software solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#2F4156",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable} scroll-smooth dark`} suppressHydrationWarning>
      <body className="min-h-screen font-sans bg-gradient-to-br from-[#18222E] via-[#243344] to-[#2F4156] text-[#FFFFFF] antialiased selection:bg-[#567C8D] selection:text-white">
        <Script id="theme-init" strategy="beforeInteractive">
          {"try{if(localStorage.getItem('portfolio-theme')==='dark'){document.documentElement.dataset.theme='dark'}}catch(e){}"}
        </Script>
        {children}
      </body>
    </html>
  );
}
