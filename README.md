# SoftSell - Software License Resale Platform

A responsive, single-page marketing website for a fictional software resale startup.

## Features Implemented

- Modern, responsive UI built with React + Vite and Tailwind CSS
- Interactive components with subtle animations (scroll reveals, hover effects)
- Form validation for the lead capture form
- Fully responsive design for mobile, tablet, and desktop
- Interactive navigation with smooth scrolling
- SEO optimized with proper meta tags

## Sections

1. **Hero Section** - Compelling headline, subheading, and clear CTA buttons
2. **How It Works** - Three-step process with icons and descriptions
3. **Why Choose Us** - Value proposition with icons and descriptions
4. **Testimonials** - Client testimonials with company information
5. **Contact Form** - Lead capture form with validation
6. **Footer** - Contact information and site links

## Design Choices

- **Color Palette**: Blue primary (#3B82F6) with teal accent (#0D9488) to convey trust and professionalism
- **Typography**: Inter font family for clean, modern readability
- **Spacing**: Consistent 8px spacing system for visual harmony
- **Animation**: Subtle animations on scroll and hover to enhance engagement without distraction
- **Icons**: Used Lucide React icons for consistency and ease of implementation
- **Cards**: Soft shadows and subtle hover effects for depth and interactivity
- **Accessibility**: Ensured readable text contrast and proper semantic HTML

## Technical Decisions

- Component structure follows a modular approach for maintainability
- Intersection Observer API for scroll-based animations
- Form validation with proper error handling and feedback
- Custom utility classes for consistent styling
- Responsive design using Tailwind breakpoints

## Time Spent

- Planning and design: 1 hour
- Component implementation: 3 hours
- Styling and animations: 2 hours
- Testing and refinements: 1 hour
- Total: 7 hours

  Tech Stack

React 18
TypeScript
Tailwind CSS
Lucide React Icons

Installation

Clone the repository:

bashgit clone https://github.com/yourusername/softsell.git
cd softsell

Install dependencies:

bashnpm install
or if you prefer yarn:
bashyarn install
Running the Application
Development Mode
To run the application in development mode with hot-reload:
bashnpm start
or
bashyarn start
The application will be available at http://localhost:3000.
Building for Production
To create an optimized production build:
bashnpm run build
or
bashyarn build
The build artifacts will be stored in the build/ directory.
Serving the Production Build
To serve the production build locally:
bashnpm install -g serve
serve -s build
Project Structure
softsell/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── logo.png
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── LicenseUpload.tsx
│   │   ├── Testimonials.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Footer.tsx
│   │   └── ChatWidget.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── styles/
│       └── tailwind.css
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
