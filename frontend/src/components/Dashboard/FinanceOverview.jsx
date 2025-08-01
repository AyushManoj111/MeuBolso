import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

// Definição das cores para cada categoria
const COLORS = ["#32FF6A", "#FA2C37", "#000000"]; // Verde, Vermelho, Preto

// Componente principal que resume os valores financeiros
const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {

    // Cria o array de dados que será passado para o gráfico
    const balanceData = [
        { name: "Saldo Disponível", amount: totalBalance }, // Verde
        { name: "Despesa Total", amount: totalExpense },    // Vermelho
        { name: "Rendimento Total", amount: totalIncome },  // Preto
    ];

    return (
        <div className='card'>
            {/* Cabeçalho do cartão */}
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Resumo Financeiro</h5>
            </div>

            {/* Componente de gráfico de pizza personalizado */}
            <CustomPieChart
                data={balanceData}
                label="Saldo Disponível"             // Texto central
                totalAmount={`${totalBalance} MZN`}  // Valor central
                colors={COLORS}                      // Cores definidas acima
                showTextAnchor                        // Mostrar textos no centro do gráfico
            />
        </div>
    );
};

export default FinanceOverview;
