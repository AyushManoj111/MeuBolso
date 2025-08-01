import React from 'react';

// Tooltip customizada ao passar o mouse no gráfico
const CustomTooltip = ({ active, payload }) => {

    // Renderiza apenas se estiver ativo e com dados válidos
    if (active && payload && payload.length) {
        return (
            <div className='bg-emerald-50 shadow-md rounded-lg p-2 border border-emerald-300'>
                
                {/* Nome da categoria (ex: Rendimento Total) */}
                <p className='text-xs font-semibold text-emerald-700 mb-1'>
                    {payload[0].name}
                </p>

                {/* Valor da categoria com unidade MZN */}
                <p className='text-sm text-emerald-600'>
                    Montante: <span className='text-sm font-medium text-emerald-900'>
                        {payload[0].value} MZN
                    </span>
                </p>
            </div>
        );
    }

    // Caso contrário, não mostra nada
    return null;
};

export default CustomTooltip;
