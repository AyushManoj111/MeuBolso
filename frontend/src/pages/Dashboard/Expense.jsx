import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import ExpenseTable from '../../components/Expense/ExpenseTable';
import DeleteAlert from '../../components/DeleteAlert';

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  //Get All Expense Details
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Algo correu mal. Tenta novamente.", error);
    } finally {
      setLoading(false);
    }
  };

  //Handle Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    //Validation
    if (!category.trim()) {
      toast.error("A categoria é obrigatória.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("O valor deve ser um número válido maior que 0.")
      return;
    }

    if (!date) {
      toast.error("A data é obrigatória.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Despesa adicionada com sucesso");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Erro ao adicionar despesa:",
        error.response?.data?.message || error.message
      );
    }
  };

  //Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Detalhes da despesa eliminados com sucesso.");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Erro ao eliminar a despesa:",
        error.response?.data?.message || error.message
      );
    }
  };

  //handle download expense details
  // Função assíncrona para descarregar os detalhes da despesa em formato Excel
  const handleDownloadExpenseDetails = async () => {
    try {
      // Faz uma requisição GET para a rota de download das despesas
      // Define 'responseType: "blob"' para indicar que o retorno será binário (um ficheiro)
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        }
      );

      // Cria um objeto Blob com os dados binários recebidos da API
      const blob = new Blob([response.data]);

      // Cria uma URL temporária para o Blob
      const url = window.URL.createObjectURL(blob);

      // Cria dinamicamente um elemento <a> (link) para simular o download
      const link = document.createElement("a");
      link.href = url; // Define a URL do blob como destino do link
      link.setAttribute("download", "expense_details.xlsx"); // Define o nome do ficheiro a ser descarregado

      // Adiciona o link ao DOM (necessário para o clique funcionar em alguns navegadores)
      document.body.appendChild(link);

      // Simula o clique no link para iniciar o download
      link.click();

      // Remove o link do DOM após o clique
      link.parentNode.removeChild(link);

      // Libera a memória revogando a URL criada para o Blob
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // Em caso de erro, exibe no console e mostra um toast de erro ao utilizador
      console.error("Erro ao descarregar os detalhes da despesa:", error);
      toast.error("Falha ao descarregar os detalhes da despesa. Por favor, tente novamente.");
    }
  };



  useEffect(() => {
    fetchExpenseDetails();

    return () => { };
  }, []);

  return (
    <DashboardLayout activeMenu="Despesas">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <ExpenseTable
              transactions={expenseData}
              //onDownload={handleDownloadExpenseDetails}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Adicionar Despesa"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Eliminar Despesa"
        >
          <DeleteAlert
            content="Tem a certeza de que deseja eliminar esta despesa?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense
