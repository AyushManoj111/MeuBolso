import React from 'react';
import { getInitials } from '../../utils/helper';

// Componente que exibe um avatar circular com as iniciais do nome completo
const CharAvatar = ({ fullName, width, height, style }) => {
    return (
        <div
            // Define largura, altura e estilo customizados ou valores padrão
            className={`${width || 'w-12'} ${height || 'h-12'} ${style || ""} 
                flex items-center justify-center rounded-full 
                text-gray-900 font-medium bg-gray-100`}
        >
            {/* Exibe as iniciais extraídas do nome completo */}
            {getInitials(fullName || "")}
        </div>
    );
}

export default CharAvatar;
