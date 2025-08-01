import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeBarChartData } from '../../utils/helper'

const IncomeOverview = ({ transactions }) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);

    return () => { };
  }, [transactions]);
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div className=''>
          <h5 className='text-lg'>Visão Geral das Receitas</h5>
          <p className='text-xs text-gray-400 mt-0.5'>
            Acompanhe os seus rendimentos ao longo do tempo e analisa as suas tendências de receita
          </p>
        </div>
      </div>
      
      <div className='mt-10'>
        <CustomBarChart data={chartData} />
      </div>
    </div>
  )
}

export default IncomeOverview
