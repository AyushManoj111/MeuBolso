import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import SideMenu from './SideMenu'

const Navbar = ({ activeMenu }) => {
  // Estado para controlar se o menu lateral está aberto ou fechado
  const [openSideMenu, setOpenSideMenu] = useState(false)

  return (
    <div className='flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>
      {/* Botão para abrir/fechar o menu lateral, visível apenas em telas menores que "lg" (1024px) */}
      <button
        className='block lg:hidden text-green-900 hover:text-green-800 transition-colors duration-200'
        onClick={() => {
          setOpenSideMenu(!openSideMenu)
        }}
        aria-label="Toggle menu"
      >
        {/* Ícone muda conforme o estado do menu (aberto ou fechado) */}
        {openSideMenu ? (
          <HiOutlineX className='text-2xl' />
        ) : (
          <HiOutlineMenu className='text-2xl' />
        )}
      </button>

      {/* Título fixo do Navbar */}
      <h2 className='text-lg font-medium text-green-950'>Meu Bolso</h2>

      {/* Menu lateral aparece como painel fixo sobre a tela quando aberto em telas pequenas */}
      {openSideMenu && (
        <div className='fixed top-[61px] -ml-4 bg-white'>
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  )
}

export default Navbar

/*
  Responsividade:
  - O botão de menu é exibido apenas em telas menores que 1024px (classe "lg:hidden").
  - Ao clicar no botão, o menu lateral aparece como um painel fixo (drawer) na tela.
  - Em telas maiores, o botão desaparece e o menu lateral é esperado estar sempre visível no layout principal.
*/
