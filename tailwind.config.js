module.exports = {
  mode: "jit",
  content: ['./pages/**/*.js', './components/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#121316",
          600: "#3F4042",
          500: "#595A5C",
          400: "#88898A",
          300: "#B8B8B9",
          200: "#E7E7E8",
          100: "#F6F6F6",
        },
        secondary: {
          DEFAULT: "#224034",
          300: "#4D74FF",
          200: "#E5EBFF",
          100: "#F5F7FF",
        },
      },
      zIndex: {
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    // ...
  ],
}