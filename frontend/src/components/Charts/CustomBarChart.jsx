import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {

    // Alterna entre tons de verde escuro e médio
    const getBarColor = (index) => {
        return index % 2 === 0 ? "#388E3C" : "#81C784"; // Verde escuro e verde médio
    };

    // Tooltip customizado com tons mais escuros
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className='bg-white shadow-md rounded-lg p-2 border border-green-400'>
                    <p className='text-xs font-semibold text-green-800 mb-1'>
                        {payload[0].payload.category}
                    </p>
                    <p className='text-sm text-green-900'>
                        Montante: <span className='font-medium'>{payload[0].payload.amount} MZN</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className='bg-white mt-6'>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none" />

                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#374151" }} stroke='none' />
                    <YAxis tick={{ fontSize: 12, fill: "#374151" }} stroke="none" />

                    <Tooltip content={<CustomTooltip />} />

                    <Bar
                        dataKey="amount"
                        radius={[10, 10, 0, 0]}
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={getBarColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarChart;
