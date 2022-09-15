/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    extend: {
      backgroundImage: {
        background: "url('/Fundo.png')",
        'nlw-gradient':
          'linear-gradient(120.86deg, #9572FC 15.08%, #43E7AD 75.94%, #E1D55D 89.57%)'
      }
    }
  },
  plugins: []
}
