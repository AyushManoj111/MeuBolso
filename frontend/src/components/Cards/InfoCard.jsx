import React from 'react';

// Componente que exibe um cartão de informação com um ícone, título e valor
const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div 
      // Container principal com espaçamento, fundo branco, bordas arredondadas e sombra verde suave
      className='flex gap-6 bg-white p-6 rounded-2xl shadow-md shadow-green-100 border border-green-200/50'
    >
      <div
        // Caixa do ícone com tamanho fixo, alinhamento centralizado, texto branco e cor de fundo personalizada
        className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {/* Ícone passado como prop */}
        {icon}
      </div>
      <div>
        {/* Texto do label com estilo pequeno e cor verde escuro */}
        <h6 className='text-sm text-green-700 mb-1'>{label}</h6>
        {/* Valor exibido com fonte maior e cor verde mais forte */}
        <span className='text-[22px] text-green-900'>{value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
