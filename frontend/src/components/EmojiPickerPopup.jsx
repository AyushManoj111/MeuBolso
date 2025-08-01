import React, { useState } from 'react'
import EmojiPicker from "emoji-picker-react" // Biblioteca de seleção de emojis
import { LuImage, LuX } from 'react-icons/lu' // Ícones de imagem e fechar

const EmojiPickerPopup = ({ icon, onSelect }) => {
    // Estado para controlar se o seletor de emoji está visível ou não
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
            {/* Área clicável para abrir o seletor de emojis */}
            <div
                className='flex items-center gap-4 cursor-pointer'
                onClick={() => setIsOpen(true)}
            >
                {/* Ícone ou imagem selecionada */}
                <div className='w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg'>
                    {icon ? (
                        // Se o ícone for uma imagem (URL), mostra a imagem
                        <img src={icon} alt="Icon" className='w-12 h-12' />
                    ) : (
                        // Se não tiver ícone ainda, mostra o ícone padrão
                        <LuImage />
                    )}
                </div>
                <p className=''>{icon ? "Alterar ícone" : "Escolher ícone"}</p>
            </div>

            {/* Se o seletor estiver aberto, mostra o popup do EmojiPicker */}
            {isOpen && (
                <div className='relative'>
                    {/* Botão de fechar o seletor */}
                    <button
                        className='w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer'
                        onClick={() => setIsOpen(false)}
                    >
                        <LuX />
                    </button>

                    {/* Componente de seleção de emoji */}
                    <EmojiPicker
                        open={isOpen}
                        // Quando um emoji for clicado, envia sua imagem para o pai
                        onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
                    />
                </div>
            )}
        </div>
    )
}

export default EmojiPickerPopup
