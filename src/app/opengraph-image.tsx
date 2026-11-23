import { ImageResponse } from "next/og";

export const alt = "Arooba Alam Khan, Full-Stack Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social-share card for every page that has no image of its own.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #18222E 0%, #243344 55%, #357A8A 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 30, color: "#9AD4E6", letterSpacing: 2 }}>PORTFOLIO</div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 16, lineHeight: 1.05 }}>Arooba Alam Khan</div>
        <div style={{ fontSize: 38, marginTop: 24, color: "#D6EAF2" }}>
          Full-Stack Software Engineer
        </div>
        <div style={{ fontSize: 28, marginTop: 36, color: "#9AD4E6" }}>
          Websites · AI Chatbots · SaaS Dashboards · E-Commerce
        </div>
      </div>
    ),
    { ...size }
  );
}
