/** @type {import('tailwindcss').Config} */

import TailwindForms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{svelte,js,ts}"],
  theme: {
    extend: {},
  },
  plugins: [TailwindForms],
};
