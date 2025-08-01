import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

export const useOfflineManager = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingActions, setPendingActions] = useState([]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('De volta online! Sincronizando dados...');
      syncPendingActions();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error('Você está offline. Alterações serão sincronizadas quando estiver online.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load pending actions from localStorage
    const stored = localStorage.getItem('pendingActions');
    if (stored) {
      setPendingActions(JSON.parse(stored));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const addPendingAction = (action) => {
    const newAction = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...action
    };
    
    const updatedActions = [...pendingActions, newAction];
    setPendingActions(updatedActions);
    localStorage.setItem('pendingActions', JSON.stringify(updatedActions));
    
    toast('Ação salva offline. Será sincronizada quando estiver online.', {
      icon: '📱'
    });
  };

  // Wrapper para handleAddIncome que pode ser usado no lugar da função original
  const createOfflineAddIncome = (originalAddIncome) => {
    return async (income) => {
      const { source, amount, date, icon } = income;

      // Validação (mesma do componente original)
      if (!source.trim()) {
        toast.error("A fonte é obrigatória.");
        return;
      }

      if (!amount || isNaN(amount) || Number(amount) <= 0) {
        toast.error("O valor deve ser um número válido maior que 0.");
        return;
      }

      if (!date) {
        toast.error("A data é obrigatória.");
        return;
      }

      if (isOnline) {
        // Executar a função original se online
        return await originalAddIncome(income);
      } else {
        // Salvar para sincronização posterior se offline
        addPendingAction({
          type: 'ADD_INCOME',
          data: {
            source,
            amount,
            date,
            icon,
          }
        });

        // Simular o comportamento da função original
        toast.success("Rendimento adicionado com sucesso (offline)");
        return Promise.resolve();
      }
    };
  };

  const syncPendingActions = async () => {
    if (pendingActions.length === 0) return;

    let successCount = 0;
    let failureCount = 0;

    try {
      // Process each pending action
      for (const action of pendingActions) {
        try {
          await processPendingAction(action);
          successCount++;
        } catch (error) {
          console.error(`Erro ao sincronizar ação ${action.id}:`, error);
          failureCount++;
        }
      }
      
      // Clear pending actions only if all succeeded
      if (failureCount === 0) {
        setPendingActions([]);
        localStorage.removeItem('pendingActions');
        toast.success(`${successCount} alterações offline sincronizadas com sucesso!`);
      } else {
        // Keep failed actions
        const failedActions = pendingActions.slice(-failureCount);
        setPendingActions(failedActions);
        localStorage.setItem('pendingActions', JSON.stringify(failedActions));
        
        toast.error(`${failureCount} de ${pendingActions.length} alterações falharam na sincronização.`);
      }
    } catch (error) {
      console.error('Erro ao sincronizar ações pendentes:', error);
      toast.error('Falha ao sincronizar algumas alterações offline.');
    }
  };

  const processPendingAction = async (action) => {
    switch (action.type) {
      case 'ADD_INCOME':
        await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, action.data);
        console.log('Rendimento sincronizado:', action.data);
        break;
      
      case 'ADD_EXPENSE':
        // await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, action.data);
        console.log('Sincronizando despesa:', action.data);
        break;
      
      case 'UPDATE_TRANSACTION':
        // await axiosInstance.put(API_PATHS.TRANSACTION.UPDATE(action.id), action.data);
        console.log('Sincronizando atualizações:', action.data);
        break;
      
      case 'DELETE_TRANSACTION':
        // await axiosInstance.delete(API_PATHS.TRANSACTION.DELETE(action.id));
        console.log('Sincronizando remoções:', action.id);
        break;
      
      default:
        console.warn('Ação desconhecida:', action.type);
        throw new Error(`Tipo de ação não suportado: ${action.type}`);
    }
  };

  // Função para limpar ações pendentes manualmente
  const clearPendingActions = () => {
    setPendingActions([]);
    localStorage.removeItem('pendingActions');
    toast.success('Ações pendentes removidas.');
  };

  return {
    isOnline,
    pendingActions,
    addPendingAction,
    syncPendingActions,
    createOfflineAddIncome,
    clearPendingActions
  };
};