// sw.js - Service Worker para cache offline

// Nomes dos caches
const CACHE_NAME = 'dashboard-cache-v1';           // Cache para arquivos estáticos
const DATA_CACHE_NAME = 'dashboard-data-cache-v1'; // Cache para dados da API (dinâmicos)

// Lista de arquivos estáticos que devem ser cacheados na instalação
// IMPORTANTE: Só adicione arquivos que realmente existem!
const STATIC_CACHE_URLS = [
  '/',                              // Página principal
  '/index.html'                     // HTML principal
  // '/static/js/bundle.js',
  // '/static/css/main.css',
  // '/manifest.json'
];

// Evento disparado quando o SW é instalado pela primeira vez
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');

  // Espera até que todos os arquivos estáticos sejam cacheados
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static files');
        // Tenta cachear cada arquivo individualmente para não falhar se um não existir
        return Promise.allSettled(
          STATIC_CACHE_URLS.map(url => {
            return fetch(url)
              .then(response => {
                if (response.ok) {
                  console.log(`[SW] Cached successfully: ${url}`);
                  return cache.put(url, response);
                } else {
                  console.warn(`[SW] Failed to cache (${response.status}): ${url}`);
                }
              })
              .catch(error => {
                console.warn(`[SW] Failed to fetch: ${url}`, error);
              });
          })
        );
      })
      .then(() => {
        console.log('[SW] Installation completed');
        return self.skipWaiting(); // Força ativação imediata do SW
      })
      .catch((error) => {
        console.error('[SW] Error during installation:', error);
      })
  );
});

// Evento de ativação do SW (após instalar ou atualizar)
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      // Remove caches antigos que não correspondem aos nomes atuais
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Service worker activated');
      return self.clients.claim(); // Assume o controle das páginas abertas
    })
  );
});

// Evento de interceptação de requisições
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Trata requisições para a API de dados
  if (
    url.pathname.includes('/api/dashboard') || url.pathname.includes('/dashboard') ||
    url.pathname.includes('/api/expense')   || url.pathname.includes('/expense')   ||
    url.pathname.includes('/api/income')    || url.pathname.includes('/income')
  ) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Cache para arquivos estáticos e navegação
  event.respondWith(handleStaticRequest(request));
});

// Função para lidar com requisições de API
async function handleApiRequest(request) {
  const cache = await caches.open(DATA_CACHE_NAME);
  
  try {
    const response = await fetch(request);
    
    // Se a resposta for bem-sucedida, salva no cache (apenas se for GET)
    if (response.status === 200 && request.method === 'GET') {
      console.log('[SW] Caching API data');
      cache.put(request.url, response.clone());
    }
    return response;
  } catch (error) {
    // Se offline e for GET, tenta retornar do cache
    if (request.method === 'GET') {
      console.log('[SW] Network failed, trying cache for:', request.url);
      const cachedResponse = await cache.match(request.url);
      
      if (cachedResponse) {
        // Adiciona um cabeçalho indicando que os dados são offline
        const headers = new Headers(cachedResponse.headers);
        headers.set('X-Offline-Data', 'true');

        return new Response(cachedResponse.body, {
          status: cachedResponse.status,
          statusText: cachedResponse.statusText,
          headers: headers
        });
      }

      // Se não há dados no cache, retorna um "fallback" padrão
      let defaultData = {};
      if (request.url.includes('dashboard')) {
        defaultData = {
          totalBalance: 0,
          totalIncome: 0,
          totalExpenses: 0,
          recentTransactions: [],
          last30DaysExpenses: { transactions: [] },
          last60DaysIncome: { transactions: [] },
          offline: true
        };
      } else {
        defaultData = []; // Para expense e income
      }

      return new Response(JSON.stringify(defaultData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-Offline-Data': 'true'
        }
      });
    } else {
      // Para POST, PUT, DELETE → retorna erro se estiver offline
      return new Response(JSON.stringify({
        error: 'Operação não disponível offline',
        offline: true
      }), {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
          'X-Offline-Data': 'true'
        }
      });
    }
  }
}

// Função para lidar com requisições estáticas
async function handleStaticRequest(request) {
  // Primeiro, tenta buscar do cache
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    console.log('[SW] Serving from cache:', request.url);
    return cachedResponse;
  }

  try {
    // Tenta buscar da rede
    const response = await fetch(request);
    
    // Se for GET e sucesso, pode armazenar no cache
    if (request.method === 'GET' && response.status === 200) {
      // Verifica se é um recurso que vale a pena cachear
      if (shouldCache(request.url)) {
        const cache = await caches.open(CACHE_NAME);
        console.log('[SW] Caching resource:', request.url);
        cache.put(request, response.clone());
      }
    }
    return response;
  } catch (error) {
    console.log('[SW] Network failed for:', request.url);
    
    // Se offline e for uma navegação HTML, tenta retornar a página principal
    if (request.headers.get('accept')?.includes('text/html')) {
      const cachedIndex = await caches.match('/');
      if (cachedIndex) {
        console.log('[SW] Serving cached index for navigation');
        return cachedIndex;
      }
      
      // Fallback HTML se não tiver cache
      return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Aplicação Offline</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
          <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
            <h1>Aplicação Offline</h1>
            <p>Você está offline. Verifique sua conexão e tente novamente.</p>
            <button onclick="window.location.reload()">Tentar Novamente</button>
          </div>
        </body>
        </html>
      `, {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
          'X-Offline-Data': 'true'
        }
      });
    }
    
    // Para outros tipos de recurso, retorna erro
    throw error;
  }
}

// Função para verificar se um recurso deve ser cacheado
function shouldCache(url) {
  const cacheableExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.svg', '.ico', '.woff', '.woff2'];
  return cacheableExtensions.some(ext => url.includes(ext)) || 
         url.endsWith('/') || 
         url.includes('index.html');
}

// Evento para sincronização em segundo plano
self.addEventListener('sync', (event) => {
  if (event.tag === 'dashboard-sync') {
    console.log('[SW] Background sync triggered');
    event.waitUntil(syncDashboardData());
  }
});

// Função para sincronizar dados com o servidor quando voltar online
async function syncDashboardData() {
  try {
    console.log('[SW] Syncing dashboard data...');
    const cache = await caches.open(DATA_CACHE_NAME);
    const keys = await cache.keys();

    for (const request of keys) {
      const response = await cache.match(request);
      
      // Verifica se os dados estão muito antigos (mais de 1 hora)
      const cacheTime = response.headers.get('date');
      if (cacheTime) {
        const cacheDate = new Date(cacheTime);
        const now = new Date();
        const hoursDiff = (now - cacheDate) / (1000 * 60 * 60);
        if (hoursDiff > 1) {
          console.log('[SW] Removing old cached data for:', request.url);
          await cache.delete(request);
        }
      }
    }
  } catch (error) {
    console.error('[SW] Error syncing data:', error);
  }
}

// Ouvinte para mensagens enviadas da aplicação
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Função utilitária para enviar mensagens para todos os clientes conectados
function notifyClients(message) {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(message);
    });
  });
}