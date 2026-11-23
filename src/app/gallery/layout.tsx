import type { Metadata } from "next";

// The gallery page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Screenshots and screen recordings of the websites, dashboards, AI chatbots and custom software built by Arooba Alam Khan.",
  alternates: { canonical: "/gallery" },
  openGraph: { url: "/gallery", title: "Project Gallery | Arooba Alam Khan" },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
