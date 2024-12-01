/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: [
        `Mona Sans`,
        `-apple-system`,
        `system-ui`,
        `BlinkMacSystemFont`,
        `Segoe UI`,
        `Roboto`,
        `Helvetica Neue`,
        `Arial`,
        `sans-serif`,
      ],
      mono: [
        `Space Mono`,
        `ui-monospace`,
        `SFMono-Regular`,
        `Menlo`,
        `Monaco`,
        `Consolas`,
        `Liberation Mono`,
        `Courier New`,
        `monospace`,
      ],
    },
    extend: {},
  },
  plugins: [],
};
