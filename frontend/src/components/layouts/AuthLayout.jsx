import React from 'react'
import CARD_2 from '../../assets/images/card.png'
import { LuTrendingUpDown } from 'react-icons/lu'

const AuthLayout = ({ children }) => {
    return (
        <div className='flex'>
            {/* Painel Principal - ocupa 100% no mobile, 60% em md+ */}
            <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 z-20 relative'>
                <h2 className='text-lg font-semibold text-green-900'>Meu Bolso</h2>

                {/* Conteúdo dinâmico (ex: formulários) */}
                {children}
            </div>

            {/* Painel Gráfico - oculto no mobile, visível em md+ (40% largura) */}
            <div className='hidden md:block w-[40vw] h-screen bg-zinc-100 bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
                
                {/* Decorações visuais com losangos verdes */}
                <div className='w-32 h-32 bg-emerald-300 rotate-45 absolute top-16 left-10 opacity-80 rounded-2xl drop-shadow-lg' />
                <div className='w-40 h-40 border-[12px] border-emerald-500 rotate-45 absolute top-[40%] -right-12 opacity-70 rounded-2xl drop-shadow-lg' />
                <div className='w-32 h-32 bg-green-300 rotate-45 absolute bottom-10 left-8 opacity-80 rounded-2xl drop-shadow-lg' />

                {/* Cartão com estatísticas */}
                <div className='grid grid-cols-1 z-20 relative mt-20'>
                    <StatsInfoCard
                        icon={<LuTrendingUpDown />}
                        label="Controle Financeiro"
                        value="430,000"
                        color="bg-emerald-900"
                    />
                </div>

                {/* Imagem ilustrativa - responsiva em telas grandes */}
                <img
                    src={CARD_2}
                    className='w-60 lg:w-[85%] absolute bottom-20 right-8 shadow-xl shadow-zinc-500/30 z-10 scale-105 transition-transform duration-300'
                    alt='Card ilustrativo'
                />
            </div>
        </div>
    )
}

export default AuthLayout

// Cartão informativo com ícone e valor
const StatsInfoCard = ({ icon, label, value, color }) => {
    return (
        <div className='flex gap-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-md shadow-zinc-300/10 border border-zinc-200 z-10'>
            {/* Ícone destacado */}
            <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-xl drop-shadow-lg`}>
                {icon}
            </div>

            {/* Texto do cartão */}
            <div>
                <h6 className='text-xs text-green-800 mb-1 tracking-wide'>{label}</h6>
                <span className='text-[20px] font-semibold text-green-900'>{value} MZN</span>
            </div>
        </div>
    )
}

/*
    Responsividade: o layout adapta-se ao tamanho da tela.
    Em telas pequenas, mostra apenas o painel principal (100% largura).
    Em md+ (≥768px), divide em dois painéis: principal (60%) e imagem (40%).
*/
