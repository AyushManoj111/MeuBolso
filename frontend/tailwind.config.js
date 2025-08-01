//Tailwind ja vem com breakpoints sm, md, lg para tornar os layouts responsivos sem esforco extra como com css tradicional.

/** @type {import('tailwindcss').Config} */
// Exporta a configuração do Tailwind
module.exports = {
  // Define os caminhos dos arquivos onde o Tailwind deve procurar classes CSS
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Todos os arquivos dentro de "src" com estas extensões
    "./public/index.html",             // Também verifica o HTML principal da aplicação
  ],
  theme: {
    extend: {
      // Permite adicionar ou sobrescrever cores personalizadas
      colors: {
        primary: '#875cf5', // Cor personalizada chamada "primary"
      },
      // Define fontes personalizadas
      fontFamily: {
        display: ['Poppins', 'sans-serif'], // Fonte chamada "display", usando "Poppins"
      },
      // Adiciona um novo breakpoint (tamanho de tela) personalizado
      screens: {
        '3xl': '1920px', // Aplica estilos a partir de 1920px de largura
      },
    },
  },
  // Lista de plugins do Tailwind que estão sendo usados
  plugins: [], // Nenhum plugin adicionado no momento
}
