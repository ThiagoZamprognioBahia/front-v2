<template>
    <v-row>
        <Menu />
        <v-col>
            <v-form @submit.prevent="submitProduto">
                <v-container>
                    <v-h1>Cadastro de Produto</v-h1>
                    <v-div v-if="mostrarMensagem">
                        <alert-message :type="resposta.tipo" :message="resposta.mensagem"></alert-message>
                      </v-div>
                    <v-row class="mt-5">
                        <v-col cols="12" md="3">
                            <v-text-field v-model="produto.nome" label="Nome" :rules="rules">
                              </v-text-field>
                        </v-col>
    
                        <v-col cols="12" md="3">
                            <v-text-field v-model="produto.referencia" label="Referência" :rules="rules"></v-text-field>
                        </v-col>
    
                        <v-col cols="12" md="3">
                            <v-text-field v-model="produto.valor" label="Valor" type="number" :rules="rules"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field v-model="produto.valor_riscado" label="Valor riscado" type="number"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="3">
                            <v-text-field v-model="produto.altura" label="Altura" type="number"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field v-model="produto.largura" label="Largura" type="number"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field v-model="produto.comprimento" label="Comprimento" type="number"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field v-model="produto.peso" label="Peso" type="number"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="produto.estoque" label="Estoque" :rules="rules" type="number"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="produto.ncm" label="NCM" type="number"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-select v-model="produto.departamento_id" :items="departamentos"  item-title="text" item-value="value" label="Departamento" :rules="rules"></v-select>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-select v-model="produto.categoria_id" :items="categorias"  item-title="text" item-value="value" label="Categoria" :rules="rules"></v-select>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-select v-model="produto.sub_categoria_id" :items="sub_categorias" item-title="text" item-value="value" label="Sub Categoria" :rules="rules"></v-select>
                        </v-col>
    
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-textarea v-model="produto.descricao" :rules="rules" label="Descrição" maxlength="199"></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="text-right" cols="12" md="2">
                            <v-btn type="submit" block color="success" class="mt-2" :disabled="isSubmitDisabled" @click="submitProduto">Salvar</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-col>
    </v-row>
    </template>
    
    <script>
    import AlertMessage from '@/components/AlertMessage.vue';
    import Menu from '@/components/Menu.vue';
    import axiosService from '@/services/axiosService';
    
    export default {
        data: () => ({
            departamentos: [],
            categorias: [],
            sub_categorias: [],
        }),
    
        mounted() {
            axiosService.get('/api/departamento')
                .then(response => {
                    this.departamentos = response.data.data.map(departamento => ({
                    text: departamento.nome,
                    value: departamento.id,
                    }));
                })
                axiosService.get('/api/categoria')
                .then(response => {
                    this.categorias = response.data.data.map(categoria => ({
                    text: categoria.nome,
                    value: categoria.id,
                    }));
                })
                axiosService.get('/api/sub-categoria')
                .then(response => {
                    this.sub_categorias = response.data.data.map(sub_categoria => ({
                    text: sub_categoria.nome,
                    value: sub_categoria.id,
                    }));
                })
        },
    
        components: {
            Menu,
        },
    }
    </script>
    
    <script setup>
    import { ref, computed } from 'vue';
    
    const produto = ref({
        nome: '',
        descricao: '',
        referencia: '',
        valor: '',
        valor_riscado: '',
        estoque: '',
        ncm: '',
        altura: '',
        largura: '',
        comprimento: '',
        peso: '',
        departamento_id: '',
        categoria_id: '',
        sub_categoria_id: '',
    });


    const mostrarMensagem = ref(false);

    const resposta = {
        tipo: 'success',
        mensagem: ""
    }

    const rules = [
      value => {
        if (value) return true;
        return 'Campo obrigatório';
      },
    ];
    
    const isSubmitDisabled = computed(() => {
      return !produto.value.nome || 
             !produto.value.descricao ||
             !produto.value.referencia ||
             !produto.value.valor ||
             !produto.value.estoque ||
             !produto.value.departamento_id ||
             !produto.value.categoria_id ||
             !produto.value.sub_categoria_id;
    });

    const submitProduto = async () => {
        mostrarMensagem.value = false;
    try {
        const response = await axiosService.post('/api/produto', produto.value);
        resposta.tipo = 'success';
        resposta.mensagem = response.data.message;
        mostrarMensagem.value = true;

        Object.keys(produto.value).forEach(key => {
            produto.value[key] = '';
        });

    } catch (error) {
        resposta.tipo = 'error';
        resposta.mensagem = error.response.data.message;
        mostrarMensagem.value = true;
    }
};
    </script>
    