# Sudev's Paper Portfolio

A unique portfolio website built with React, TypeScript, and Tailwind CSS, featuring a handwritten paper notebook aesthetic.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
sudev_paper_portfolio/
├── src/
│   ├── assets/          # Static assets (images, etc.)
│   ├── components/      # React components
│   │   ├── ui/         # UI components (shadcn/ui)
│   │   └── figma/      # Figma-related components
│   ├── imports/        # Imported components and assets
│   ├── styles/         # Global styles
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── public/             # Public assets
├── index.html          # HTML template
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## 🎨 Features

- **Handwritten Paper Aesthetic**: Unique notebook-style design
- **Interactive Sections**: 
  - Work Experience
  - Projects
  - Education
  - Languages & Skills
  - Volunteering
  - Achievements
  - Hobbies
- **Responsive Design**: Works on all device sizes
- **Smooth Animations**: Scroll indicators and transitions

## 🔧 Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)
- clsx & tailwind-merge

## 📝 Customization

### Adding Images

Place your Figma assets in `src/assets/` and update the imports in `src/imports/Desktop1.tsx`:

```typescript
// Replace placeholder with actual image
import imgV602Nunoon32Rippednotes2 from "../assets/v602-nunoon-32-rippednotes2.png";
import imgDsc0057Edited21 from "../assets/dsc0057-edited21.png";
```

### Updating Content

Edit the data in the respective component files:
- `src/components/WorkExperience.tsx`
- `src/components/Projects.tsx`
- `src/components/Education.tsx`
- `src/components/LanguagesAndSkills.tsx`
- `src/components/Volunteering.tsx`
- `src/components/Achievements.tsx`
- `src/components/Hobbies.tsx`

## 🎭 Custom Fonts

The project uses Google Fonts:
- Caveat (handwriting style)
- Patrick Hand (handwritten text)
- Indie Flower (decorative text)

These are imported in `src/styles/globals.css`

## 📄 License

This project is personal and proprietary.

## 👤 Author

Sudev Suresh Sreedevi

---

Made with ❤️ and lots of ☕

