import React from 'react'
// Ícone de seta para o botão "Ver tudo"
import { LuArrowRight } from 'react-icons/lu'
// Cartão de exibição de uma transação individual
import TransactionInfoCard from '../Cards/TransactionInfoCard'
// Biblioteca para manipular e formatar datas
import moment from 'moment'

// Componente que exibe uma seção de transações de despesas
const ExpenseTransactions = ({ transactions, onSeeMore }) => {
    return (
        // Container principal com borda, sombra, padding e bordas arredondadas (classe customizada "card")
        <div className='card'>
            
            {/* Linha com título e botão, alinhados horizontalmente e espaçados entre si */}
            <div className='flex items-center justify-between'>
                {/* Título com tamanho de fonte grande */}
                <h5 className='text-lg'>Despesas</h5>

                {/* Botão com estilos reutilizáveis definidos na classe "card-btn" */}
                <button className='card-btn' onClick={onSeeMore}>
                    {/* Texto do botão + ícone de seta */}
                    Ver tudo <LuArrowRight className='text-base' />
                    {/* "text-base" = tamanho de fonte padrão para o ícone */}
                </button>
            </div>

            {/* Margem superior de 1.5rem (24px) para separar do conteúdo acima */}
            <div className='mt-6'>
                {/* Mostrar as 4 primeiras transações (ou menos) */}
                {transactions?.slice(0, 4)?.map((expense) => (
                    <TransactionInfoCard
                        key={expense._id} // Identificador único
                        title={expense.category} // Nome da categoria
                        icon={expense.icon} // Ícone da transação
                        date={moment(expense.date).format("DD/MM/YYYY")} // Data formatada
                        amount={expense.amount} // Valor da despesa
                        type="expense" // Indica que é uma despesa (pode influenciar estilo)
                        hideDeleteBtn // Esconde o botão de deletar, se o card tiver essa opção
                    />
                ))}
            </div>
        </div>
    )
}

export default ExpenseTransactions
