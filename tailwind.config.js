/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js", // Remove if not using Flowbite
  ],
  theme: {
    extend: {
      scrollbar: {
        enabled: true,
      },
    },
  },
  plugins: [
    require("flowbite/plugin"), // Remove if not using Flowbite
  ],
};
