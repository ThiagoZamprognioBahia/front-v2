import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import store from '@/store'; 


export default createStore({
  state: {
    authToken: null,
  },
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token;
    },
  },
  actions: {
    setAuthToken({ commit }, token) {
      commit('setAuthToken', token);
    },
  },
  getters: {
    authToken: state => state.authToken,
    
    formatarValorReal: (state) => (valor) => {
      // Lógica para formatar o valor para real
      const valorFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(valor);

      return valorFormatado;
    },
  },
  plugins: [
    createPersistedState({
      key: 'ChaveDePersistencia', 
      paths: ['authToken'],
    }),
  ],
});

// Recupera o token ao inicializar o store (se aplicável)
const authToken = localStorage.getItem('ChaveDePersistencia_authToken');
if (authToken) {
  store.commit('setAuthToken', authToken);
}