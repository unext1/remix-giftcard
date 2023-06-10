import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--n))',
        input: 'hsl(var(--n))',
        ring: 'hsl(var(--n))',
        background: 'hsl(var(--b1))',
        foreground: 'hsl(var(--bc))',
        primary: {
          DEFAULT: 'hsl(var(--p))',
          foreground: 'hsl(var(--pc))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--s))',
          foreground: 'hsl(var(--sc))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--er))',
          foreground: 'hsl(var(--pc))'
        },
        muted: {
          DEFAULT: 'hsl(var(--n) / 0.5)',
          foreground: 'hsl(var(--nc) / 0.5)'
        },
        accent: {
          DEFAULT: 'hsl(var(--a))',
          foreground: 'hsl(var(--ac))'
        },
        popover: {
          DEFAULT: 'hsl(var(--b2))',
          foreground: 'hsl(var(--bc))'
        },
        card: {
          DEFAULT: 'hsl(var(--b2))',
          foreground: 'hsl(var(--bc))'
        }
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['[data-theme=winter]']
        },
        dark: {
          ...require('daisyui/src/theming/themes')['[data-theme=night]']
        }
      }
    ]
  },
  plugins: [require('daisyui'), require('tailwindcss-animate'), require('tailwindcss-safe-area')]
} satisfies Config;
