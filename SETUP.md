# Project Setup Guide

This guide will help you set up and run the portfolio website locally.

## Quick Start

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all necessary dependencies including:
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (for icons)
- And other required packages

### Step 2: Run the Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### Step 3: Open in Browser

Navigate to `http://localhost:3000` in your preferred browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Adding Your Figma Assets

Currently, the project uses placeholder images for Figma assets. To add your own images:

1. Place your PNG files in the `src/assets/` directory
2. Update the imports in `src/imports/Desktop1.tsx`:

```typescript
// Replace placeholders with actual imports
import imgV602Nunoon32Rippednotes2 from "../assets/v602-nunoon-32-rippednotes2.png";
import imgDsc0057Edited21 from "../assets/dsc0057-edited21.png";
```

3. Also update `src/App.tsx` if needed for the background image

## Customizing Content

Edit the following files to update your information:

- **Work Experience**: `src/components/WorkExperience.tsx`
- **Projects**: `src/components/Projects.tsx`
- **Education**: `src/components/Education.tsx`
- **Skills**: `src/components/LanguagesAndSkills.tsx`
- **Volunteering**: `src/components/Volunteering.tsx`
- **Achievements**: `src/components/Achievements.tsx`
- **Hobbies**: `src/components/Hobbies.tsx`
- **Landing Page**: `src/imports/Desktop1.tsx`

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, Vite will automatically use the next available port (3001, 3002, etc.)

### TypeScript Errors

If you see TypeScript errors, make sure all dependencies are installed:
```bash
npm install
```

### Tailwind CSS Not Working

Ensure you've installed all dependencies and that your PostCSS configuration is correct. The configuration files are already set up in the project.

## Project Structure

```
sudev_paper_portfolio/
├── src/
│   ├── assets/          # Place your images here
│   ├── components/      # React components
│   ├── imports/         # Imported components
│   ├── styles/          # CSS files
│   ├── App.tsx          # Main app
│   └── main.tsx         # Entry point
├── public/              # Static files
├── package.json         # Dependencies
└── README.md            # Project info
```

## Next Steps

1. Add your Figma assets to `src/assets/`
2. Customize the content in component files
3. Update colors and fonts if desired
4. Test the site in different browsers
5. Build for production when ready

Happy coding! 🚀

