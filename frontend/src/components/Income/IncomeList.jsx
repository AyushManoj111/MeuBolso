import React from 'react'
// Ícone para botão de download
import { LuDownload } from 'react-icons/lu'
// Componente que mostra detalhes de cada transação
import TransactionInfoCard from '../Cards/TransactionInfoCard'
// Biblioteca para manipular datas
import moment from 'moment'

// Componente para listar todas as fontes de rendimento
const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    // Container principal com estilo de cartão
    <div className='card'>

      {/* Cabeçalho com título e botão para descarregar */}
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Fontes de Rendimento</h5>

        {/* Botão que dispara a função onDownload passada por prop */}
        <button className='card-btn' onClick={onDownload}>
          <LuDownload className='text-base' /> Descarregar
        </button>
      </div>

      {/* Grid responsivo para listar os cartões das fontes de rendimento */}
      <div className='grid grid-cols-1 md:grid-cols-2'>
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income._id}                              // ID único para React otimizar renderização
            title={income.source}                         // Nome da fonte de rendimento
            icon={income.icon}                            // Ícone que representa essa fonte
            date={moment(income.date).format("DD/MM/YYYY")} // Data formatada
            amount={income.amount}                        // Valor do rendimento
            type="income"                                 // Tipo 'income' para estilização/identificação
            onDelete={() => onDelete(income._id)}         // Função para excluir, passa o id
          />
        ))}
      </div>
    </div>
  )
}

export default IncomeList
