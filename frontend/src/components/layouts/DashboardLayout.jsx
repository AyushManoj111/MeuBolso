import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import Navbar from './Navbar'
import SideMenu from './SideMenu'

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(UserContext)
    return (
        <div className=''>
            {/* Navbar sempre visível */}
            <Navbar activeMenu={activeMenu} />

            {/* Se existir utilizador autenticado, mostra o layout principal */}
            {user && (
                <div className='flex'>
                    {/* Menu lateral visível apenas em ecrãs maiores que 1080px */}
                    <div className='max-[1080px]:hidden'>
                        <SideMenu activeMenu={activeMenu} />
                    </div>

                    {/* Conteúdo principal ocupa o espaço restante */}
                    <div className='grow mx-5'>{children}</div>
                </div>
            )}
        </div>
    )
}

export default DashboardLayout

/*
    Responsividade: o SideMenu é ocultado em telas com largura ≤ 1080px
    (classe max-[1080px]:hidden). Em ecrãs maiores, o menu lateral aparece
    ao lado do conteúdo principal usando flexbox.
*/
