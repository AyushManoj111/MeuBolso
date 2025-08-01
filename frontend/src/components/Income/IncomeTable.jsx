import React from 'react';
import { LuPlus } from 'react-icons/lu'
import Table from '../Tables/Table'; // Certifica-te do caminho
import moment from 'moment';

const IncomeTable = ({ transactions, onAddIncome }) => {
  // Preparar os dados para a tabela (assumindo que a transação tem category, amount, date)
  const tableData = transactions.map(tx => ({
    date: tx.date,
    amount: tx.amount,
    category: tx.category || tx.source || 'Desconhecida',
  }));

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Tabela de Rendimentos</h5>

        <button
          className='add-btn'
          style={{ backgroundColor: '#155724', color: 'white' }}
          onClick={onAddIncome}
        >
          <LuPlus className='text-lg' />
          Adicionar Rendimento
        </button>
      </div>

      <Table data={tableData} />
    </div>
  );
};

export default IncomeTable;
