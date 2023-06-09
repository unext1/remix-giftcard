import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["winter", "night"],
  },
  plugins: [require("daisyui")],
} satisfies Config;
