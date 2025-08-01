// swRegistration.js - Registro e gerenciamento do Service Worker
class ServiceWorkerManager {
  constructor() {
    this.isOnline = navigator.onLine;
    this.registration = null;
    this.isRegistering = false;
    this.setupEventListeners();
  }

  // Registrar o service worker
  async register() {
    if (this.isRegistering) {
      console.log('[SW Manager] Registration already in progress');
      return this.registration;
    }

    if (!('serviceWorker' in navigator)) {
      throw new Error('Service Worker não é suportado neste navegador');
    }

    this.isRegistering = true;

    try {
      // Primeiro, desregistra qualquer SW anterior se houver problemas
      const existingRegistrations = await navigator.serviceWorker.getRegistrations();
      for (let registration of existingRegistrations) {
        if (registration.scope.includes(window.location.origin)) {
          console.log('[SW Manager] Found existing registration, checking state...');
          // Só desregistra se estiver causando problemas
          if (registration.installing && registration.installing.state === 'redundant') {
            console.log('[SW Manager] Unregistering problematic SW');
            await registration.unregister();
          }
        }
      }

      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      
      console.log('[SW Manager] Service Worker registrado com sucesso:', this.registration);

      // Aguarda o SW estar pronto
      await navigator.serviceWorker.ready;

      // Escutar atualizações do service worker
      this.registration.addEventListener('updatefound', () => {
        const newWorker = this.registration.installing;
        console.log('[SW Manager] Nova versão do Service Worker encontrada');

        newWorker.addEventListener('statechange', () => {
          console.log('[SW Manager] SW state changed to:', newWorker.state);
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('[SW Manager] Nova versão disponível');
            this.showUpdateNotification();
          }
        });
      });

      // Escutar mudanças no controlador
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[SW Manager] Controller changed, reloading...');
        window.location.reload();
      });

      // Escutar mensagens do service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        this.handleServiceWorkerMessage(event.data);
      });

      this.isRegistering = false;
      return this.registration;
    } catch (error) {
      console.error('[SW Manager] Erro ao registrar Service Worker:', error);
      this.isRegistering = false;
      
      // Se houver erro, tenta limpar e registrar novamente
      await this.clearCache();
      throw error;
    }
  }

  // Desregistrar completamente o service worker
  async unregister() {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (let registration of registrations) {
        await registration.unregister();
        console.log('[SW Manager] Service Worker desregistrado');
      }
      await this.clearCache();
      return true;
    } catch (error) {
      console.error('[SW Manager] Erro ao desregistrar SW:', error);
      return false;
    }
  }

  // Configurar event listeners para estado online/offline
  setupEventListeners() {
    window.addEventListener('online', () => {
      console.log('[SW Manager] Aplicação online');
      this.isOnline = true;
      this.handleOnlineStatusChange(true);
    });

    window.addEventListener('offline', () => {
      console.log('[SW Manager] Aplicação offline');
      this.isOnline = false;
      this.handleOnlineStatusChange(false);
    });

    // Listener para quando a página é carregada
    window.addEventListener('load', () => {
      this.checkCacheStatus();
    });
  }

  // Verificar status do cache
  async checkCacheStatus() {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        console.log('[SW Manager] Caches disponíveis:', cacheNames);
        
        // Verifica se há cache da página principal
        const mainCache = await caches.open('dashboard-cache-v1');
        const cachedIndex = await mainCache.match('/');
        
        if (cachedIndex) {
          console.log('[SW Manager] Página principal está em cache');
        } else {
          console.log('[SW Manager] Página principal NÃO está em cache');
          // Tenta cachear a página atual
          await this.cacheCurrentPage();
        }
      } catch (error) {
        console.error('[SW Manager] Erro ao verificar cache:', error);
      }
    }
  }

  // Cachear a página atual
  async cacheCurrentPage() {
    if ('caches' in window) {
      try {
        const cache = await caches.open('dashboard-cache-v1');
        const response = await fetch(window.location.href);
        if (response.ok) {
          await cache.put('/', response);
          console.log('[SW Manager] Página atual cacheada com sucesso');
        }
      } catch (error) {
        console.error('[SW Manager] Erro ao cachear página atual:', error);
      }
    }
  }

  // Lidar com mudanças no status online/offline
  handleOnlineStatusChange(isOnline) {
    // Emitir evento customizado para componentes React
    const event = new CustomEvent('onlineStatusChange', {
      detail: { isOnline }
    });
    window.dispatchEvent(event);

    // Mostrar indicador visual
    this.showConnectionStatus(isOnline);

    if (isOnline && this.registration) {
      // Sincronizar dados quando voltar online
      this.requestBackgroundSync();
    }
  }

  // Mostrar status da conexão
  showConnectionStatus(isOnline) {
    // Remove indicador anterior se existir
    const existingIndicator = document.getElementById('connection-status');
    if (existingIndicator) {
      existingIndicator.remove();
    }

    // Cria novo indicador
    const indicator = document.createElement('div');
    indicator.id = 'connection-status';
    indicator.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      padding: 10px 15px;
      border-radius: 5px;
      color: white;
      font-weight: bold;
      z-index: 9999;
      transition: all 0.3s ease;
      ${isOnline ? 
        'background-color: #4CAF50;' : 
        'background-color: #f44336;'
      }
    `;
    indicator.textContent = isOnline ? 'Online' : 'Offline';
    
    document.body.appendChild(indicator);

    // Remove o indicador após 3 segundos
    setTimeout(() => {
      if (indicator && indicator.parentNode) {
        indicator.style.opacity = '0';
        setTimeout(() => {
          if (indicator && indicator.parentNode) {
            indicator.remove();
          }
        }, 300);
      }
    }, 3000);
  }

  // Solicitar sincronização em background
  async requestBackgroundSync() {
    if (this.registration && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        await this.registration.sync.register('dashboard-sync');
        console.log('[SW Manager] Background sync registrado');
      } catch (error) {
        console.error('[SW Manager] Erro ao registrar background sync:', error);
      }
    }
  }

  // Lidar com mensagens do service worker
  handleServiceWorkerMessage(message) {
    console.log('[SW Manager] Mensagem do Service Worker:', message);
    
    // Emitir evento para componentes React
    const event = new CustomEvent('serviceWorkerMessage', {
      detail: message
    });
    window.dispatchEvent(event);
  }

  // Mostrar notificação de atualização
  showUpdateNotification() {
    // Remove notificação anterior se existir
    const existingNotification = document.getElementById('update-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Cria notificação de atualização
    const notification = document.createElement('div');
    notification.id = 'update-notification';
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      z-index: 10000;
      text-align: center;
      max-width: 300px;
    `;
    
    notification.innerHTML = `
      <h3>Nova versão disponível!</h3>
      <p>Uma atualização da aplicação está disponível.</p>
      <button id="update-btn" style="
        background: #4CAF50;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 10px;
      ">Atualizar</button>
      <button id="later-btn" style="
        background: #ccc;
        color: #333;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
      ">Mais tarde</button>
    `;
    
    document.body.appendChild(notification);

    // Event listeners para os botões
    document.getElementById('update-btn').addEventListener('click', () => {
      this.updateServiceWorker();
      notification.remove();
    });

    document.getElementById('later-btn').addEventListener('click', () => {
      notification.remove();
    });
  }

  // Atualizar service worker
  updateServiceWorker() {
    if (this.registration && this.registration.waiting) {
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    } else {
      window.location.reload();
    }
  }

  // Verificar status online
  isApplicationOnline() {
    return this.isOnline;
  }

  // Limpar cache manualmente
  async clearCache() {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
        console.log('[SW Manager] Cache limpo com sucesso');
        return true;
      } catch (error) {
        console.error('[SW Manager] Erro ao limpar cache:', error);
        return false;
      }
    }
    return false;
  }

  // Verificar se dados são do cache offline
  static isOfflineData(response) {
    return response.headers.get('X-Offline-Data') === 'true';
  }

  // Forçar atualização do cache de uma URL específica
  async updateCache(url) {
    if ('caches' in window && this.registration) {
      try {
        const cache = await caches.open('dashboard-cache-v1');
        const response = await fetch(url);
        if (response.ok) {
          await cache.put(url, response);
          console.log(`[SW Manager] Cache atualizado para: ${url}`);
          return true;
        }
      } catch (error) {
        console.error(`[SW Manager] Erro ao atualizar cache de ${url}:`, error);
      }
    }
    return false;
  }
}

// Instância global do gerenciador
const swManager = new ServiceWorkerManager();

// Função para registrar com retry
async function registerWithRetry(maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await swManager.register();
      console.log(`[SW Manager] Registrado com sucesso na tentativa ${attempt}`);
      return;
    } catch (error) {
      console.error(`[SW Manager] Tentativa ${attempt} falhou:`, error);
      
      if (attempt === maxRetries) {
        console.error('[SW Manager] Todas as tentativas falharam');
        // Em caso de falha total, permite que a aplicação funcione normalmente
        return;
      }
      
      // Aguarda antes da próxima tentativa
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}

// Registrar automaticamente quando a página carrega
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    registerWithRetry().catch(console.error);
  });
} else {
  registerWithRetry().catch(console.error);
}

// Adicionar método de debug para o console
window.swDebug = {
  manager: swManager,
  clearCache: () => swManager.clearCache(),
  unregister: () => swManager.unregister(),
  register: () => swManager.register(),
  checkCache: () => swManager.checkCacheStatus()
};

export default swManager;