import React from 'react'
// Ícone de seta (usado no botão "Ver tudo")
import { LuArrowRight } from 'react-icons/lu'
// Componente que exibe informações de uma transação individual
import TransactionInfoCard from '../Cards/TransactionInfoCard'
// Biblioteca para formatação de datas
import moment from 'moment';

// Componente funcional que exibe uma lista recente de rendimentos (entradas de dinheiro)
const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    // Container principal com estilos definidos pela classe personalizada "card"
    <div className='card'>

        {/* Cabeçalho do cartão com o título e botão "Ver tudo" */}
        <div className='flex items-center justify-between'>
            {/* Título com tamanho de fonte grande */}
            <h5 className='text-lg'>Rendimento</h5>

            {/* Botão reutilizável com ícone, chama função onSeeMore ao clicar */}
            <button className='card-btn' onClick={onSeeMore}>
                Ver tudo <LuArrowRight className='text-base' />
            </button>
        </div>

        {/* Lista de transações recentes, com margem superior de 1.5rem (24px) */}
        <div className='mt-6'>
            {/* Mostrar no máximo as 5 transações mais recentes */}
            {transactions?.slice(0, 5)?.map((item) => (
                <TransactionInfoCard
                    key={item._id}                // Chave única para o React
                    title={item.source}           // Fonte do rendimento (ex: salário, presente, etc.)
                    icon={item.icon}              // Ícone que representa a transação
                    date={moment(item.date).format("DD/MM/YYYY")} // Data formatada (brasileira)
                    amount={item.amount}          // Valor do rendimento
                    type="income"                 // Indica que esta transação é de entrada
                    hideDeleteBtn                 // Esconde o botão de deletar
                />
            ))}
        </div>
    </div>
  );
};

export default RecentIncome;
