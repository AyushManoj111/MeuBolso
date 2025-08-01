import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/Cards/InfoCard';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import RecentIncome from '../../components/Dashboard/RecentIncome';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Algo correu mal. Tenta novamente.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {

    }
  }, []);

  return (
    // Layout principal com o menu ativo definido como "Dashboard"
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'> {/* Margem vertical e centralização horizontal */}

        {/* Grid com 1 coluna em telas pequenas e 3 colunas a partir do breakpoint 'md' (>=768px) */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Cada InfoCard representa um resumo financeiro com ícone, label e valor */}

          <InfoCard
            icon={<IoMdCard />} // Ícone do cartão
            label="Saldo Disponível"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-green-500" // Cor verde
          />

          <InfoCard
            icon={<LuWalletMinimal />}
            label="Rendimento Total"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-black" // Cor preta
          />

          <InfoCard
            icon={<LuHandCoins />}
            label="Despesa Total"
            value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
            color="bg-red-500" // Mantém vermelho
          />

        </div>

        {/* Espaço vertical entre seções e margem superior */}
        <div className='mt-6'>

          {/* Grid de 2 colunas com 3 linhas */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

            <RecentTransactions
              transactions={dashboardData?.recentTransactions}
              onSeeMore={() => navigate("/expense")}
            />

            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpenses || 0}
            />

            <ExpenseTransactions
              transactions={dashboardData?.last30DaysExpenses?.transactions || []}
              onSeeMore={() => navigate("/expense")}
            />
            {/*
            <Last30DaysExpenses
              data={dashboardData?.last30DaysExpenses?.transactions || []}
            />
            */}
            <RecentIncome
              transactions={dashboardData?.last60DaysIncome?.transactions || []}
              onSeeMore={() => navigate("/income")}
            />
            {/*
            <RecentIncomeWithChart
              data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
              totalIncome={dashboardData?.totalIncome || 0}
            />
            */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home