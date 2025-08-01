import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

// Componente para renderizar um gráfico de pizza (pie chart) customizado
const CustomPieChart = ({
    data,           // Array com os dados do gráfico, cada item com "name" e "amount"
    label,          // Texto a ser exibido no centro do gráfico (ex: categoria)
    totalAmount,    // Valor total a ser exibido no centro do gráfico
    colors,         // Array de cores para as fatias do gráfico
    showTextAnchor  // Boolean para mostrar ou não o texto central
}) => {
    return (
        // Container responsivo que ajusta o gráfico ao tamanho do container pai
        <ResponsiveContainer width="100%" height={380}>
            <PieChart>
                {/* Componente Pie que desenha as fatias */}
                <Pie
                    data={data}            // Dados para o gráfico
                    dataKey="amount"       // Chave que indica o valor de cada fatia
                    nameKey="name"         // Chave que indica o nome de cada fatia
                    cx="50%"               // Centro do gráfico no eixo X (50% = centro horizontal)
                    cy="50%"               // Centro do gráfico no eixo Y (50% = centro vertical)
                    outerRadius={130}      // Raio externo das fatias
                    innerRadius={100}      // Raio interno, criando um donut (buraco no centro)
                    labelLine={false}      // Desliga as linhas que ligam rótulos às fatias
                >
                    {/* Para cada dado, cria uma célula com a cor correspondente */}
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>

                {/* Tooltip customizado que aparece ao passar o mouse */}
                <Tooltip content={CustomTooltip} />

                {/* Legenda customizada do gráfico */}
                <Legend content={CustomLegend} />

                {/* Texto central opcional com label e valor total */}
                {showTextAnchor && (
                    <>
                        <text
                            x="50%"
                            y="50%"
                            dy={-25}          // desloca para cima em relação ao centro
                            textAnchor='middle'
                            fill='#666'
                            fontSize="14px"
                        >
                            {label}
                        </text>
                        <text
                            x="50%"
                            y="50%"
                            dy={8}           // desloca para baixo em relação ao centro
                            textAnchor='middle'
                            fill="#333"
                            fontSize="24px"
                            fontWeight="semi-bold"
                        >
                            {totalAmount}
                        </text>
                    </>
                )}
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;
