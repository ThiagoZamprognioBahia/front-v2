<template>
<v-row>
    <Menu />
    <v-col>
        <v-h1>Listagem de Produto</v-h1>
        <v-text-field class="mr-5" v-model="buscar" label="Pesquisar" append-icon="mdi-magnify" />
        <v-table class="mr-5">
            <thead>
                <tr>
                    <th class="text-left">Nome</th>
                    <th class="text-left">Valor</th>
                    <th class="text-left">Estoque</th>
                    <th class="text-left">Referência</th>
                    <th class="text-left">Opções</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in produtosFiltrados" :key="item.nome">
                    <td class="text-left">{{ item.nome }}</td>
                    <td class="text-left">{{ $store.getters.formatarValorReal(item.valor) }}</td>
                    <td class="text-left">{{ item.estoque }}</td>
                    <td class="text-left">{{ item.referencia }}</td>
                    <td>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon v-on="on" v-bind="attrs" @click="editarProduto(item)">
                                    mdi-pencil
                                </v-icon>
                            </template>
                            <span>Editar</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon v-on="on" v-bind="attrs" @click="removerProduto(item)">
                                    mdi-delete
                                </v-icon>
                            </template>
                            <span>Remover</span>
                        </v-tooltip>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <v-divider />
    </v-col>
</v-row>
</template>

<script>
import Menu from "@/components/Menu.vue";
import axiosService from "@/services/axiosService";

export default {
    data() {
        return {
            produtos: [],
            buscar: "",
        };
    },

    computed: {
        produtosFiltrados() {
            return this.produtos.filter((item) =>
                item.nome.toLowerCase().includes(this.buscar.toLowerCase())
            );
        },
    },

    mounted() {
        axiosService.get("/api/produto").then((response) => {
            this.produtos = response.data.data.map((produto) => ({
                id: produto.id,
                nome: produto.nome,
                valor: produto.valor,
                estoque: produto.estoque,
                referencia: produto.referencia,
            }));
        });
    },

    methods: {
        editarProduto(produto) {
            this.$router.push({
                name: 'EdicaoProduto',
                params: {
                    id: produto.id
                }
            });
        },
        removerProduto(produto) {
            // Lógica para remover o produto
            console.log(`Remover produto: ${produto.nome}`);
        },
    },

    components: {
        Menu,
    },
};
</script>
