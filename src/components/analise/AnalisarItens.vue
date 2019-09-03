<template>
    <div>
        <v-layout row wrap>
            <v-flex grow pa-1 md8 xs12>
                <h1>Análise de Itens</h1>
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
                        <v-flex v-for="item in listItensAnalise" grow pa-1 md3 xs12 :key="item.usuario_item">

                                <v-card flat class="text-xs-center ma-3" elevation="5" dark>
                                <v-responsive class="pt-4 img-missao">
                                    <v-avatar>
                                        <img src="../../assets/images/box.png">
                                    </v-avatar>
                                </v-responsive>
                                <v-card-text>
                                    <div class="subheading">
                                        Item: <span class="yellow--text">{{ item.nm_item }}</span>
                                    </div>
                                    <div class="subheading">
                                        Data do Pedido: <span class="yellow--text">{{ item.dt_cadastro }}</span>
                                    </div>

                                </v-card-text>
                                <div class="text-xs-center">
                                    <v-card-actions>
                                        <v-btn block color="teal" style="color: white" @click="analisar(item)">
                                            <span>Analisar</span>
                                        </v-btn>
                                    </v-card-actions>
                                </div>
                            </v-card>

                        </v-flex>

                    </v-layout>

                </v-card>
            </v-flex>
        </v-layout>


        <v-dialog
                v-model="dialog"
                persistent
                width="600"
        >
            <v-card dark>

                <v-card-text class="text-xs-center">
                    <h2 class="title">Dados do Item</h2>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <v-layout>
                        <v-flex xs5>
                            <v-img  v-if="itemSelecionado.img_item == null"
                                    src="./images/box.png"
                                    height="125px"
                                    contain
                            ></v-img>
                            <v-img  v-else
                                    :src="itemSelecionado.img_item"
                                    height="125px"
                                    contain
                            ></v-img>
                        </v-flex>
                        <v-flex xs7>
                            <v-card-title primary-title>
                                <div>
                                    <div class="headline">Item: {{ itemSelecionado.nm_item }}</div>
                                    <h3>Solicitante: <span class="yellow--text">{{ itemSelecionado.nm_usuario }} moedas</span></h3>

                                </div>
                            </v-card-title>
                        </v-flex>
                    </v-layout>
                    <br>
                    <div><strong>Descrição:</strong> {{ itemSelecionado.ds_descricao }}</div>
                </v-card-text>

                <v-card-actions>
                    <v-btn
                            color="red"
                            flat
                            @click="dialog = false"
                    >
                        Fechar
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn
                            color="success"
                            @click="perimitarItem"
                            flat>Permitir</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import analiseItem from "../../services/analise/analiseItem";

export default {
    data() {
        return {
            dialog: false,
            listItensAnalise: [],
            itemSelecionado: {
                nm_usuario: '',
                nm_item: "",
                cd_item_analise: "",
                ds_descricao: '',
                img_item: null
            },
        }
    },
    methods: {
        carregaItens() {

            analiseItem.getItems().then(
                (response) => {

                    this.listItensAnalise = response.data
                }
            )

        },

        analisar(item) {

            this.itemSelecionado = item
            this.dialog = true
        },

        perimitarItem() {

            const item_analise = {
                cd_item_analise: this.itemSelecionado.cd_item_analise,
                cd_usuario_supervisor: this.$store.state.usuario.cd_usuario
            }


            analiseItem.allowItem(item_analise).then(
                (response) => {

                    console.log(response)

                }
            )
        }

    },
    mounted() {

        this.carregaItens()
    }
}
</script>

<style scoped>

</style>