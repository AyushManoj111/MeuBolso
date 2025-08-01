import React from 'react'
// Ícone de seta para o botão (não está sendo usado aqui, mas foi importado)
import { LuArrowRight } from 'react-icons/lu'
// Biblioteca para formatação de datas
import moment from 'moment'
// Componente para exibir informações de uma transação
import TransactionInfoCard from '../Cards/TransactionInfoCard'

// Componente que exibe uma lista das últimas transações (entrada e saída)
const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    // Container principal com estilos definidos por uma classe personalizada "card"
    <div className='card'>
        
        {/* Cabeçalho do cartão */}
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Transacções Recentes</h5>
            {/* "justify-between" é útil caso se deseje adicionar um botão "Ver tudo" à direita */}
        </div>

        {/* Conteúdo com margem superior de 1.5rem (24px) para separar do cabeçalho */}
        <div className='mt-6'>
            {/* Pega as 5 transações mais recentes e exibe como cartões */}
            {transactions?.slice(0, 5)?.map((item) => (
                <TransactionInfoCard
                    key={item._id} // Identificador único para renderização
                    title={
                        item.type === 'expense'
                          ? item.category  // Se for despesa, mostra a categoria (ex: Alimentação)
                          : item.source    // Se for rendimento, mostra a fonte (ex: Salário)
                    }
                    icon={item.icon} // Ícone correspondente à categoria/fonte
                    date={moment(item.date).format("DD/MM/YYYY")} // Data formatada
                    amount={item.amount} // Valor da transação
                    type={item.type}     // Tipo da transação: 'income' ou 'expense'
                    hideDeleteBtn        // Oculta botão de exclusão (caso o card tenha essa função)
                />
            ))}
        </div>
    </div>
  )
}

export default RecentTransactions;
