import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';  // Importe o seu store

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'Admin',
        component: () => import('@/views/Admin.vue'),
      },
      {
        path: 'painel-view',
        name: 'PainelView', 
        component: () => import('@/views/Painel.vue'), 
        meta: { requiresAuth: true },
      },
      {
        path: 'listarProduto',
        name: 'ListarProduto',
        component: () => import('@/views/Produto/ListarProduto.vue'),
        meta: { requiresAuth: true },  // Adiciona esta meta para exigir autenticação
      },
      {
        path: 'cadastrarProduto',
        name: 'CadastrarProduto',
        component: () => import('@/views/Produto/CadastrarProduto.vue'),
        meta: { requiresAuth: true },  // Adiciona esta meta para exigir autenticação
      },
      {
        path: 'editarProduto/:id',
        name: 'EdicaoProduto',
        component: () => import('@/views/Produto/EdicaoProduto.vue'),
        meta: { requiresAuth: true },  // Adiciona esta meta para exigir autenticação
      },
      {
        path: '/edicao-estoque-produto',
        name: 'EdicaoEstoqueProduto',
        component: () => import('@/views/Produto/EdicaoEstoqueProduto.vue'), 
        meta: { requiresAuth: true },
        props: true,
      },
      
    ],
  },
  {
    path: '',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.authToken) {
    next('/');
  } else if (to.meta.requiresAuth && (await tokenExpirado(store.getters.authToken))) {
    next('/');
  } else {
    next();
  }
});

async function tokenExpirado(token) {
  // Lógica para verificar se o token está expirado
  // Implemente conforme necessário para o seu sistema
  return false;  // Assume que o token nunca expira
}


export default router;