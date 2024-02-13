<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Conta</div>

      <v-text-field
        v-model="email"
        density="compact"
        placeholder="Endereço de Email"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        v-model="senha"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Coloque sua senha"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <div v-if="resposta">
        <v-alert
        :type="resposta ? ( erro ? 'warning' : 'success') : null"
        class="mb-4"
        :text=resposta
        ></v-alert>
      </div>

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        :loading="loading"
        @click="fazerLogin"
      >
      {{ loading ? 'Conectando...' : 'Conecte-se' }}
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    loading: false,
    visible: false,
    email: '',
    senha: '',
    resposta: '',
    erro: false,
  }),
  methods: {
    fazerLogin() {
      this.loading = true;
      const dados = {
        email: this.email,
        senha: this.senha
      };
      axios.post('api/admin', dados)
        .then(response => {
          // Processar a resposta do backend, redirecionar, exibir mensagens de sucesso, etc.
           this.resposta = response.data.message
           this.senha = ''
           this.loading = false;
           this.$store.dispatch('setAuthToken', response.data.token);
           const redirectRoute = this.$route.query.redirect;
           const redirectTo = redirectRoute ? redirectRoute : '/painel-view';
           this.$router.push(redirectTo);
        })
    
        .catch(error => {
          this.loading = false;
          this.resposta = error.response.data.errors.message
          this.erro = true
        });
    }
  }
}
</script>
