<template>
    <v-card width="300" height="1300">
      <v-list v-model:opened="open">
  
        <v-list-group value="Users">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-package-variant-closed"
              title="Produto"
            ></v-list-item>
          </template>
          <v-list-item
            v-for="([title, icon, route], i) in admins"
            :key="i"
            :title="title"
            :prepend-icon="icon"
            :value="title"
            @click="navigateTo(route)"
          ></v-list-item>
  
        </v-list-group>
      </v-list>
    </v-card>
  
  
          <!-- <template v-slot:append>
            <div class="pa-2">
              <v-btn block>
                Logout
              </v-btn>
            </div>
          </template> -->
        
  </template>

  <script>
  export default {
    data: () => ({
      open: ['Users'],
      admins: [
        ['Listagem', 'mdi-archive-search-outline', 'ListarProduto'],
        ['Cadastro', 'mdi-package-variant-closed-plus', 'CadastrarProduto'],
      ],
    }),
    methods: {
    navigateTo(route) {
      this.$router.push({ name: route });
    }
  }

  }
</script>