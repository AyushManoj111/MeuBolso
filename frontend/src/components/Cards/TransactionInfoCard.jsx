import React from 'react'
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from 'react-icons/lu'

// Componente para exibir informações de uma transação financeira
const TransactionInfoCard = ({
  title,          // título ou descrição da transação
  icon,           // ícone personalizado (URL da imagem) ou padrão
  date,           // data da transação
  amount,         // valor da transação
  type,           // tipo da transação: "income" (entrada) ou "expense" (saída)
  hideDeleteBtn,  // boolean para ocultar o botão de deletar
  onDelete,       // função chamada ao clicar no botão de deletar
}) => {
  // Define o estilo do valor baseado no tipo da transação
  const getAmountStyles = () =>
    type === "income"
      ? "bg-green-100 text-green-700"  // verde para entradas
      : "bg-red-100 text-red-700";     // vermelho para saídas

  return (
    // Container principal com hover e espaçamento entre itens
    <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-black/5'>
      
      {/* Caixa do ícone, pode mostrar imagem ou ícone padrão */}
      <div className='w-12 h-12 flex items-center justify-center text-xl text-black bg-black/10 rounded-full'>
        {icon ? (
          <img src={icon} alt={title} className='w-6 h-6' />
        ) : (
          <LuUtensils />
        )}
      </div>

      {/* Área principal com título, data e controles */}
      <div className='flex-1 flex items-center justify-between'>
        
        {/* Informações da transação: título e data */}
        <div>
          <p className='text-sm text-black font-medium'>{title}</p>
          <p className='text-xs text-black/60 mt-1'>{date}</p>
        </div>

        {/* Botão de deletar e valor da transação */}
        <div className='flex items-center gap-2'>
          {/* Botão delete aparece só se hideDeleteBtn for false */}
          {!hideDeleteBtn && (
            <button
              className='text-black/40 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          {/* Valor da transação com estilo e ícone que indica entrada/saída */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
          >
            <h6 className='text-xs font-medium'>
              {/* Sinal positivo para entrada e negativo para saída */}
              {type === "income" ? "+" : "-"} {amount} MZN
            </h6>
            {/* Ícones para indicar tendência */}
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
