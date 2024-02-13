<template>
    <v-layout class="mt-4 overflow-visible" style="height: 56px;">
      <v-bottom-navigation horizontal v-model="value" grow>
        <v-btn @click="editarProduto(produto)">
          <v-icon>mdi-package-variant</v-icon>
          Principal
        </v-btn>
  
        <v-btn @click="navigateToPage('EdicaoEstoqueProduto', produto)">
          <v-icon>mdi-archive-cog-outline</v-icon>
          Configurar estoque
        </v-btn>
  
        <!-- <v-btn @click="navigateToPage('EdicaoEstoqueProduto', produto)">
          <v-icon>mdi-archive-arrow-down-outline</v-icon>
          Fotos
        </v-btn> -->
      </v-bottom-navigation>
    </v-layout>
  </template>
  
  <script>
export default {
  props: ['produto', 'posicao'],
  data: () => ({ value: 0 }),
  created() {
    this.value = this.posicao || 0;
  },
  methods: {
    navigateToPage(routeName, produto) {
      this.value = 0;
      this.$router.push({ name: routeName, params: { produto } });
    },
    editarProduto(produto) {
      this.value = 1;
      this.$router.push({
        name: 'EdicaoProduto',
        params: {
          id: produto
        }
      });
    },
  },
};
</script>