import React, { useEffect, useState } from 'react'
// Componente personalizado que renderiza um gráfico de pizza
import CustomPieChart from '../Charts/CustomPieChart'

// Paleta de cores usada no gráfico (1 cor por item/rendimento)
const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {

    // Estado para armazenar os dados prontos para o gráfico
    const [chartData, setChartData] = useState([]);

    // Função que prepara os dados no formato esperado pelo gráfico
    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,   // Nome da fonte de rendimento (ex: Salário, Venda)
            amount: item?.amount, // Valor do rendimento
        }));

        // Atualiza o estado com os dados formatados
        setChartData(dataArr);
    };

    // useEffect é executado sempre que "data" mudar
    useEffect(() => {
        prepareChartData(); // Prepara os dados

        return () => {};    // Cleanup vazio (opcional aqui)
    }, [data]);

    return (
        // Container principal com classe "card" (customizada com Tailwind ou CSS manual)
        <div className='card'>

            {/* Cabeçalho do cartão com título */}
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Visão Geral do Rendimento</h5>
                {/* "flex" = layout horizontal, "items-center" = alinha verticalmente, "justify-between" = espaçamento total */}
            </div>

            {/* Gráfico de pizza com dados formatados */}
            <CustomPieChart
                data={chartData}                // Dados prontos para o gráfico
                label="Rendimento Total"        // Texto central no gráfico
                totalAmount={`${totalIncome} MZN`} // Valor total exibido no centro
                showTextAnchor                  // Exibe texto central fixo (componente interno usa isso)
                colors={COLORS}                 // Cores atribuídas aos segmentos
            />
        </div>
    )
}

export default RecentIncomeWithChart;
