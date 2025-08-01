import React from 'react';

// Legenda customizada do gráfico de pizza
const CustomLegend = ({ payload }) => {
    return (
        // Layout flexível da legenda
        <div className='flex flex-wrap justify-center gap-2 mt-4 space-x-6'>
            {/* Cada item da legenda representa uma fatia do gráfico */}
            {payload.map((entry, index) => (
                <div key={`legend-${index}`} className='flex items-center space-x-2'>
                    
                    {/* Bolinha colorida da legenda */}
                    <div
                        className='w-2.5 h-2.5 rounded-full border border-gray-800'
                        style={{ backgroundColor: entry.color }} // Cor vinda do gráfico
                    ></div>

                    {/* Nome da categoria (ex: Saldo, Despesa) */}
                    <span className='text-xs text-gray-800 font-semibold'>
                        {entry.value}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default CustomLegend;
