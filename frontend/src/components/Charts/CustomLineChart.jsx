import React from 'react'
import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Area,
    AreaChart
} from 'recharts'

const CustomLineChart = ({ data }) => {

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className='bg-emerald-50 shadow-md rounded-lg p-2 border border-emerald-200'>
                    <p className='text-xs font-semibold text-emerald-700 mb-1'>
                        {payload[0].payload.category}
                    </p>
                    <p className='text-sm text-emerald-600'>
                        Montante:{' '}
                        <span className='text-sm font-medium text-emerald-900'>
                            {payload[0].payload.amount} MZN
                        </span>
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <div className='bg-zinc-100 p-4 rounded-xl shadow-sm'>
            <ResponsiveContainer width='100%' height={300}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id='incomeGradient' x1='0' y1='0' x2='0' y2='1'>
                            <stop offset='5%' stopColor='#10b981' stopOpacity={0.4} />
                            <stop offset='95%' stopColor='#10b981' stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#d4d4d8' />
                    <XAxis dataKey='month' tick={{ fontSize: 12, fill: '#064e3b' }} stroke='none' />
                    <YAxis tick={{ fontSize: 12, fill: '#064e3b' }} stroke='none' />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#d1fae5', opacity: 0.4 }} />

                    <Area
                        type='monotone'
                        dataKey='amount'
                        stroke='#10b981'
                        fill='url(#incomeGradient)'
                        strokeWidth={3}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomLineChart
