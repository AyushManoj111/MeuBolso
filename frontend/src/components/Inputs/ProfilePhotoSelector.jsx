import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

// Componente para selecionar, pré-visualizar e remover foto de perfil
const ProfilePhotoSelector = ({ image, setImage }) => {
    // Referência ao input file escondido para disparar clique programaticamente
    const inputRef = useRef(null);
    
    // Estado para armazenar a URL da imagem para pré-visualização
    const [previewUrl, setPreviewUrl] = useState(null);

    // Manipulador que ocorre ao selecionar uma nova imagem
    const handleImageChange = (event) => {
        const file = event.target.files[0];  // Pega o primeiro arquivo selecionado
        if (file) {
            setImage(file); // Atualiza o estado da imagem no componente pai
            // Cria uma URL temporária para mostrar a prévia da imagem
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    // Remove a imagem atual (limpa seleção e pré-visualização)
    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    // Função para disparar clique no input escondido, abrindo o seletor de arquivo
    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className='flex justify-center mb-6'>
            {/* Input file escondido para seleção de imagem */}
            <input
                type="file"
                accept="image/*"  // Aceita somente arquivos de imagem
                ref={inputRef}    // Referência para abrir seletor via código
                onChange={handleImageChange}
                className='hidden'
            />

            {/* Se não há imagem selecionada, mostra ícone padrão e botão upload */}
            {!image ? (
                <div className='w-20 h-20 flex items-center justify-center bg-green-200 rounded-full relative'>
                    <LuUser className='text-4xl text-green-900' />

                    {/* Botão para abrir seletor de arquivos */}
                    <button
                        type="button"
                        className='w-8 h-8 flex items-center justify-center bg-green-800 text-white rounded-full absolute -bottom-1 -right-1 hover:bg-green-900 transition-colors'
                        onClick={onChooseFile}
                    >
                        <LuUpload />
                    </button>
                </div>
            ) : (
                // Se imagem está selecionada, mostra pré-visualização e botão para remover
                <div className='relative'>
                    <img
                        src={previewUrl}            // URL temporária para mostrar a foto
                        alt="profile photo"
                        className='w-20 h-20 rounded-full object-cover'
                    />
                    <button
                        type="button"
                        className='w-8 h-8 flex items-center justify-center bg-green-800 text-white rounded-full absolute -bottom-1 -right-1 hover:bg-green-900 transition-colors'
                        onClick={handleRemoveImage}
                    >
                        <LuTrash />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;
