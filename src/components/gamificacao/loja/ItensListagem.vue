<template>
    <div>
        <v-layout row wrap>
            <v-flex grow pa-1>
                <h1>Loja da Aplicação</h1>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex grow pa-1 md12 xs12>

                <v-card flat class="text-xs-center" elevation="1">
                    <v-card-text>
                        <div class="subheading titulo">
                            <h3><strong>Itens</strong></h3>
                        </div>
                    </v-card-text>
                    <v-layout row wrap>
                        <v-flex v-for="item in listaItensLoja" grow pa-1 md3 xs12 :key="item.cd_item">

                            <v-card flat class="text-xs-center ma-3" elevation="5" dark>
                                <v-responsive class="pt-4 img-missao">
                                    <v-avatar>
                                        <img src="../../../assets/images/cart.png">
                                    </v-avatar>
                                </v-responsive>
                                <v-card-text>
                                    <div class="subheading">
                                        {{ item.nm_item }}
                                    </div>
                                    <div class="subheading">
                                        Valor: <span class="yellow--text">{{ item.nu_valor }}</span> moedas
                                    </div>

                                </v-card-text>
                                <div class="text-xs-center">
                                    <v-card-actions>
                                        <v-btn block color="teal" style="color: white" @click="acessarItem(item)">
                                            <span>Acessar</span>
                                        </v-btn>
                                    </v-card-actions>
                                </div>
                            </v-card>

                        </v-flex>

                    </v-layout>

                    <!--
                    <div class="text-xs-center">
                        <v-divider></v-divider>
                        <div class="paginacao">
                            <v-pagination
                                    v-model="pagina"
                                    :length="totalPaginas"
                                    @input="nextPage"
                            ></v-pagination>
                        </div>
                    </div>-->

                </v-card>
            </v-flex>
        </v-layout>


        <v-dialog
                v-model="dialog"
                width="600"
        >
            <v-card dark>

                <v-card-text class="text-xs-center">
                    <h2 class="title">Dados do Item</h2>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <h2>Item: {{ itemSelecionado.nm_item }}</h2>
                </v-card-text>

                <v-card-actions>
                    <v-btn
                        color="red"
                        flat
                        @click="dialog = false"
                    >
                        Fechar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>

import lojaService from "../../../services/gamificacao/lojaService";
import LoaderSave from "../../loader/LoaderSave";

export default {
    components: {
        LoaderSave
    },
    data() {
        return {
            dialog: false,
            listaItensLoja: [],
            itemSelecionado: {
                cd_item: "",
                nm_item: "",
                nu_valor: 0,
                ds_descricao: "",
                fl_disponivel: "",
                img_foto: null
            }
        }
    },

    methods: {

        recuperaItensLoja() {

            lojaService.getItensLoja().then(
                (response) => {
                    this.listaItensLoja = response.data
                    console.log(response.data)
                }
            )

        },

        acessarItem(item) {
            this.dialog = true
            this.itemSelecionado = item
        }

    },

    mounted() {
        this.recuperaItensLoja()
    }
}
</script>

<style>

</style>