/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1e60f2', // MedAxis primary signature blue
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        med: {
          bg: '#F5F7FB',       // Soft grayish blue page background from photo
          card: '#FFFFFF',     // Clean white card background
          border: '#EDF1F7',   // Subtle delicate border
          teal: '#00C5BA',     // Cyan/teal curve & inpatient metric
          blue: '#1E60F2',     // Primary blue
          purple: '#7C3AED',   // Accent
          coral: '#FF5C5C',    // Coral / emergency
          amber: '#F59E0B',
          green: '#10B981',
          slate: '#6B7A99',    // Subdued secondary text
          dark: '#1A2338',     // Deep text heading
        }
      },
      boxShadow: {
        'card': '0 2px 14px 0 rgba(22, 38, 77, 0.04)',
        'card-hover': '0 10px 25px -3px rgba(22, 38, 77, 0.08), 0 4px 6px -2px rgba(22, 38, 77, 0.03)',
        'soft-glow': '0 0 20px -3px rgba(30, 96, 242, 0.15)',
      },
      borderRadius: {
        'xl': '14px',
        '2xl': '20px',
        '3xl': '24px',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
