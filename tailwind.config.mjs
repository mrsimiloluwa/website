/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          base: '#080C14',       // deep near-black background
          surface: '#0D131F',    // secondary background / panel
          elevated: '#111827',   // dropdowns, raised cards
          card: '#131C2D',       // component card background
          hover: '#182337',      // hover state
          subtle: '#1E293B',     // subtle border
          border: '#263449',     // standard card border
          highlight: '#334155',  // active tab border
        },
        text: {
          primary: '#F8FAFC',    // soft white
          secondary: '#94A3B8',  // muted grey
          muted: '#64748B',      // low-emphasis grey
        },
        accent: {
          DEFAULT: '#3B82F6',    // restrained electric blue
          light: '#60A5FA',
          hover: '#2563EB',
          subtle: 'rgba(59, 130, 246, 0.1)',
          border: 'rgba(59, 130, 246, 0.25)',
        },
        emerald: {
          subtle: 'rgba(16, 185, 129, 0.1)',
          border: 'rgba(16, 185, 129, 0.25)',
        },
        amber: {
          subtle: 'rgba(245, 158, 11, 0.1)',
          border: 'rgba(245, 158, 11, 0.25)',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          '"Fira Code"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
};
