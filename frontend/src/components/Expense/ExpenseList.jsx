import React from 'react'
// Ícone de download (seta para baixo com traço)
import { LuDownload } from 'react-icons/lu'
// Componente que exibe uma transação (cartão individual)
import TransactionInfoCard from '../Cards/TransactionInfoCard'
// Biblioteca para formatação de datas
import moment from 'moment'

// Componente que exibe todas as despesas com opção de deletar ou descarregar
const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    // Container principal com classe personalizada (Tailwind ou CSS manual)
    <div className='card'>

        {/* Cabeçalho do cartão com título e botão de descarregar */}
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Todas as Despesas</h5>

            {/* Botão de descarregar (chama a função passada via prop) */}
            <button className='card-btn' onClick={onDownload}>
                <LuDownload className='text-base' /> Descarregar
            </button>
        </div>

        {/* Área dos cartões de transação, com layout em grid (1 coluna no mobile, 2 no desktop) */}
        <div className='grid grid-cols-1 md:grid-cols-2'>
            {/* Itera sobre todas as transações e renderiza um cartão para cada */}
            {transactions?.map((expense) => (
                <TransactionInfoCard
                    key={expense._id}                            // Chave única
                    title={expense.category}                    // Categoria da despesa
                    icon={expense.icon}                         // Ícone representativo
                    date={moment(expense.date).format("DD/MM/YYYY")} // Data formatada
                    amount={expense.amount}                     // Valor da despesa
                    type="expense"                              // Tipo fixo: despesa
                    onDelete={() => onDelete(expense._id)}      // Passa ID para função deletar
                />
            ))}
        </div>
    </div>
  )
}

export default ExpenseList;
