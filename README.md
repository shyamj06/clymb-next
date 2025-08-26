# Clymb - Modern Business Website Template

A beautiful, responsive one-page website template built with Next.js 14 and Tailwind CSS. Perfect for businesses looking to showcase their services, clients, case studies, and contact information.

## Features

- 🎨 **Modern Design**: Clean, professional design with smooth animations
- 📱 **Fully Responsive**: Optimized for all devices and screen sizes
- ⚡ **Fast Performance**: Built with Next.js 14 for optimal performance
- 🎯 **SEO Optimized**: Proper meta tags and semantic HTML
- 🔧 **Easy Customization**: Well-structured components and Tailwind CSS
- 📝 **Contact Form**: Functional contact form with form validation

## Sections

1. **Intro/Hero**: Compelling headline with call-to-action buttons
2. **Clients**: Showcase trusted brands and logos
3. **Services**: Display your service offerings with icons and features
4. **Cases**: Portfolio of successful projects and case studies
5. **Contact**: Contact form and business information

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd clymb-next
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
clymb-next/
├── app/
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles and Tailwind imports
├── components/
│   ├── Navigation.tsx      # Navigation bar component
│   ├── IntroSection.tsx    # Hero/intro section
│   ├── ClientsSection.tsx  # Clients showcase
│   ├── ServicesSection.tsx # Services display
│   ├── CasesSection.tsx    # Case studies/portfolio
│   └── ContactSection.tsx  # Contact form and info
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Customization

### Colors
The primary color scheme can be customized in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    // ... customize your colors
  },
}
```

### Content
Update the content in each component file:
- `IntroSection.tsx`: Change headline, description, and statistics
- `ClientsSection.tsx`: Replace client logos and names
- `ServicesSection.tsx`: Modify services, descriptions, and features
- `CasesSection.tsx`: Update case studies and results
- `ContactSection.tsx`: Change contact information and form fields

### Styling
All styling is done with Tailwind CSS classes. You can:
- Modify existing classes in component files
- Add custom styles in `globals.css`
- Extend Tailwind configuration in `tailwind.config.js`

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
Build the project for production:
```bash
npm run build
npm start
```

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React 18**: Latest React features
- **PostCSS**: CSS processing

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please open an issue in the repository or contact the development team.
