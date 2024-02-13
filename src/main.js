import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import { registerPlugins } from '@/plugins'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000';

const app = createApp(App);

// Adicionando a instância do Vuex ao Vue
app.use(store);

registerPlugins(app);

app.mount('#app');