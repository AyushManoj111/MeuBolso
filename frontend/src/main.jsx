// Importa o StrictMode do React, que ajuda a detectar problemas potenciais na aplicação
import { StrictMode } from 'react'

// Importa a função createRoot da nova API de rendering do React 18+
import { createRoot } from 'react-dom/client'

// Importa o ficheiro de estilos globais ( onde está o Tailwind CSS incluído)
import './index.css'

// Importa o componente principal da aplicação
import App from './App.jsx'

// Inicializa o React na div com id "root" ( definida no index.html)
// Envolve o componente <App /> com <StrictMode> para boas práticas durante o desenvolvimento
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
