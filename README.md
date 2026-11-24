# Arooba Alam Khan - Full Stack Developer Portfolio

A modern, high-converting portfolio website tailored for full-stack engineering contracts, freelance clients (Upwork, Freelancer, direct clients), and recruiters.

Built with **Next.js 16 (App Router)**, **Tailwind CSS**, **Framer Motion**, and **Lucide Icons**, following a dark modern design aesthetic (`#0F172A` background, `#1E293B` cards, `#6366F1` indigo accent, and Inter typography).

---

## 🚀 Live Demo & Development

### 1. Run Locally
```bash
# Navigate to the portfolio folder
cd arooba-portfolio

# Install dependencies (if not already installed)
npm install

# Start the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Deploy to Vercel (1-Click or CLI)

### Method A: Deploy via GitHub & Vercel Dashboard (Recommended)
1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "Initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/arooba-portfolio.git
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com) and log in.
3. Click **"Add New Project"** and import your `arooba-portfolio` repository.
4. Framework preset will automatically detect **Next.js**.
5. Click **"Deploy"**. Your website will be live with a free SSL certificate!

### Method B: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 📁 Where to Replace Placeholders

All project data, bio details, stats, social links, and testimonials are organized in a single file for quick updates:

- **Portfolio Data File**: `src/data/portfolioData.ts`
  - `PERSONAL_INFO`: Update your headline, about copy, stats, education, email, phone/WhatsApp number, LinkedIn (`linkedin.com/in/aroobaalamkhan`), and Upwork link.
  - `SERVICES_DATA`: Add or customize your 8 core service cards.
  - `PROJECTS_DATA`: Replace live demo links, repository URLs, and tags for your 4 featured projects.
  - `SKILLS_DATA`: Add or modify technologies and languages.
  - `TESTIMONIALS_DATA`: Add real client testimonials and reviews.

- **Profile Picture & Project Mockups**:
  - `public/avatar.svg`: Replace with your own profile photo (e.g. `public/avatar.png` or `avatar.jpg`). Update the reference in `src/components/HeroSection.tsx`.
  - `public/projects/`: Add screenshots of your real applications (`cms-preview.svg`, `restaurant-preview.svg`, `solaria-preview.svg`, `ecommerce-preview.svg`).

---

## 🎨 Design System
- **Background**: `#0F172A`
- **Cards**: `#1E293B`
- **Primary Accent**: `#6366F1`
- **Main Text**: `#F8FAFC`
- **Subtext / Muted**: `#94A3B8`
- **Typography**: Inter (Google Fonts)
- **Theme**: Dark Modern with light/dark toggle and persistence
