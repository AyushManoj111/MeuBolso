import React from 'react';
import { LuPlus } from 'react-icons/lu';
import Table from '../Tables/Table'; // Tabela reutilizável
import moment from 'moment';

const ExpenseTable = ({ transactions, onExpenseIncome }) => {
  // Preparar os dados para a tabela reutilizável
  const tableData = transactions.map((expense) => ({
    date: moment(expense.date).format('YYYY-MM-DD'),
    amount: `${expense.amount}`,
    category: expense.category || 'Desconhecida',
  }));

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg">Tabela de Despesas</h5>
        <button
          className='add-btn'
          style={{ backgroundColor: '#155724', color: 'white' }}
          onClick={onExpenseIncome}
        >
          <LuPlus className='text-lg' />
          Adicionar Despesa
        </button>
      </div>

      <Table data={tableData} />
    </div>
  );
};

export default ExpenseTable;
