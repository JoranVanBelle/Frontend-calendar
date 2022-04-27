module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'loginregi': "url('./Images/backgroundLoginRegister.jpg')",
        'notFound': "url('./Images/404notFoundGIF.gif')",
      }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    }
  },
  plugins: [],
};
