import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

// Definição das cores usadas para as fatias do gráfico de pizza
const COLORS = ["#FA2C37", "#FF6900", "#4f39f6", "#875CF5", "#00C49F", "#FFBB28"];

const Last30DaysExpenses = ({ data }) => {
  // Estado para armazenar os dados preparados para o gráfico
  const [chartData, setChartData] = useState([]);
  // Estado para armazenar o total de despesas calculado
  const [totalExpenses, setTotalExpenses] = useState(0);

  // Função que prepara os dados para o gráfico
  const prepareChartData = () => {
    // Objeto auxiliar para agrupar os valores por categoria
    const grouped = {};

    // Itera sobre cada item do array de despesas
    data?.forEach((item) => {
      // Usa a categoria da despesa, ou "Outro" se não existir
      const category = item?.category || "Outro";

      // Se ainda não existir a categoria no objeto agrupado, inicializa com 0
      if (!grouped[category]) {
        grouped[category] = 0;
      }
      // Soma o valor da despesa à categoria correspondente
      grouped[category] += item.amount;
    });

    // Transforma o objeto agrupado em um array com formato { name, amount }
    const result = Object.entries(grouped).map(([category, amount]) => ({
      name: category,
      amount,
    }));

    // Atualiza o estado com os dados formatados para o gráfico
    setChartData(result);

    // Calcula o total somando todos os valores das categorias
    const total = result.reduce((sum, item) => sum + item.amount, 0);
    // Atualiza o estado do total de despesas
    setTotalExpenses(total);
  };

  // Hook que executa a preparação dos dados sempre que o prop 'data' mudar
  useEffect(() => {
    prepareChartData();
    // Não há limpeza específica necessária aqui, por isso retorna vazio
    return () => {};
  }, [data]);

  // Renderiza o componente com o título e o gráfico de pizza personalizado
  return (
    <div className='card col-span-1'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Visão Geral das Despesas</h5>
      </div>

      <CustomPieChart
        data={chartData}                    // Dados agrupados e formatados para o gráfico
        label="Despesa Total"               // Texto que aparecerá no centro do gráfico
        totalAmount={`${totalExpenses} MZN`} // Valor total exibido no centro do gráfico
        showTextAnchor                     // Indica para mostrar o texto central
        colors={COLORS}                   // Cores das fatias do gráfico
      />
    </div>
  );
};

export default Last30DaysExpenses;
