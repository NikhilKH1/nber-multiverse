# NBER Assignment: The Role of Artificial Intelligence in Multiverse Theory

A responsive web application built for the Junior Web Developer Co-op position at the National Bureau of Economic Research. This project demonstrates modern web development practices by recreating a research paper page inspired by the NBER website design.

## Features

- **Personalized Header**: Custom welcome message with rounded avatar profile
- **Responsive Layout**: Mobile-friendly design with clean typography
- **Interactive Components**: Expandable metadata fields with accessibility features
- **Dynamic Content**: Lazy-loaded images and real-time GDP data integration
- **Professional Styling**: SCSS-based styling system inspired by NBER.org

## Tech Stack

- **Frontend**: React 18, HTML5, ES6 JavaScript
- **Styling**: SCSS with CSS custom properties
- **Build Tool**: Vite for fast development and optimized builds
- **Data Visualization**: DataTables for interactive GDP data display
- **APIs**: FRED (Federal Reserve Economic Data) for economic indicators

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nber-multiverse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` or the local host displayed in the terminal to view the application


## Project Structure

```
nber-multiverse/
├── index.html              # Main HTML template
├── package.json            # Dependencies and scripts
├── src/
│   ├── main.jsx           # React application entry point
│   ├── components/        # Reusable React components
│   │   ├── HeaderProfile.jsx
│   │   └── ExpandableField.jsx
│   └── styles/
│       └── main.scss      # Global styles and components
└── README.md
```

## Key Components

### HeaderProfile Component
- Replaces login functionality with personalized welcome message
- Features a styled rounded avatar

### ExpandableField Component
- Accessible expand/collapse functionality

## Data Integration

The application fetches quarterly GDP data from the Federal Reserve Economic Data (FRED) API: 
- **Data Source**: [FRED GDP Series](https://fred.stlouisfed.org/series/GDP)
- **Display**: Interactive DataTables with sorting and filtering
- **Fallback**: Graceful error handling with user-friendly messages

## Design Philosophy

This project emphasizes:
- **Accessibility**: WCAG-compliant components with proper ARIA labels
- **Performance**: Lazy loading, optimized images, and efficient bundling
- **User Experience**: Intuitive navigation and responsive design
- **Code Quality**: Clean, maintainable React components with modern ES6

## Acknowledgments

- **Design Inspiration**: [NBER.org](https://www.nber.org/) for layout and styling
- **Economic Data**: Federal Reserve Bank of St. Louis (FRED®)
- **Images**: Unsplash (royalty-free stock photography)
- **Icons**: Modern web standards and accessibility guidelines

---