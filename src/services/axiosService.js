// axiosService.js
import axios from 'axios';
import store from '@/store';  
import router from '@/router';  // Certifique-se de importar seu router corretamente

const axiosService = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosService.interceptors.request.use(
  (config) => {
    const authToken = store.getters.authToken;
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosService.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      // Token expirado, redirecione para a página de login
      await store.dispatch('logout');  // Adapte conforme necessário
      router.push('/');
    }
    return Promise.reject(error);
  }
);

export default axiosService;