<template>
    <div>
        <v-layout row wrap>
            <v-flex grow pa-1 md8 xs12>
                <h1>Meus Itens</h1>
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
                        <v-flex v-for="item in meusItensLista" grow pa-1 md3 xs12 :key="item.usuario_item">

                            <v-card flat class="text-xs-center ma-3" elevation="5" dark>
                                <v-responsive class="pt-4 img-missao">
                                    <v-avatar>
                                        <img v-if="item.item.img_foto == null || item.item.img_foto == undefined" src="../../../assets/images/box.png">
                                        <img v-else :src="item.item.img_foto">
                                    </v-avatar>
                                </v-responsive>
                                <v-card-text>
                                    <div class="subheading">
                                        {{ item.item.nm_item }}
                                    </div>
                                    <div class="subheading green--text" v-if="item.utilizado == 2">
                                        Item permitido para uso
                                    </div>
                                    <div class="subheading" v-else>
                                        Valor: <span class="yellow--text">{{ item.item.nu_valor }}</span> moedas
                                    </div>

                                </v-card-text>
                                <div class="text-xs-center">
                                    <v-card-actions v-if="item.utilizado == 1">
                                        <v-btn  block color="teal" style="color: white" @click="selecionaItem(item)">
                                            <span>Selecionar</span>
                                        </v-btn>
                                    </v-card-actions>

                                    <v-card-text class="text-xs-center" v-else-if="item.utilizado == 3" style="margin-top: -3px">
                                        <div class="subheading blue--text">
                                            Item em análise
                                        </div>
                                    </v-card-text>
                                    <!--
                                    <v-card-text class="text-xs-center" v-else style="margin-top: -12px">
                                        <div class="subheading">
                                            Código para uso: <span class="green--text">{{ item.codigo }}</span>
                                        </div>


                                    </v-card-text>-->

                                    <v-card-actions v-else>
                                        <v-btn block color="indigo" style="color: white" @click="exibirCodigo(item.codigo)">
                                            <span>Exibir código</span>
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
                            <v-img  v-if="itemSelecionado.img_foto == null"
                                    src="./images/box.png"
                                    height="125px"
                                    contain
                            ></v-img>
                            <v-img  v-else
                                    :src="itemSelecionado.img_foto"
                                    height="125px"
                                    contain
                            ></v-img>
                        </v-flex>
                        <v-flex xs7>
                            <v-card-title primary-title>
                                <div>
                                    <div class="headline">Item: {{ itemSelecionado.nm_item }}</div>
                                    <div class="headline">Valor: <span class="yellow--text">{{ itemSelecionado.nu_valor }} moedas</span></div>

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
                            @click="dialodConfirmaItem = true"
                            flat>Utilizar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <LoaderSave :texto="textoLoarder" :dialog="dialogLoader" :cor="corLoader" :barra="barraLoader"></LoaderSave>


        <v-dialog
                persistent
                v-model="dialodConfirmaItem"
                max-width="300"
        >
            <v-card>
                <v-card-title class="headline">Deseja utilizar este item?</v-card-title>

                <v-card-actions>

                    <v-btn
                            color="red darken-1"
                            dark
                            @click="dialodConfirmaItem = false"
                    >
                        Não
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="green darken-1"
                            dark
                            @click="utilizarItem"
                    >
                        Sim
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-dialog
                v-model="openCodigo"
                persistent
                width="400"
                class="text-xs-center"
        >
            <v-card dark>

                <v-card-text class="text-xs-center">
                    <h2 class="title">Código do Item</h2>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text class="text-xs-center">
                    <h1 class="green--text">{{ codigo_item }}</h1>
                </v-card-text>



                <v-card-actions>
                    <v-btn
                            color="red"
                            flat
                            block
                            @click="openCodigo = false"
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
            openCodigo: false,
            dialodConfirmaItem: false,
            dialog: false,
            dialogLoader: false,
            corLoader: 'primary',
            textoLoarder: 'Carregando meus itens',
            barraLoader: true,
            meusItensLista: [],
            codigo_item: '',
            itemSelecionado: {
                cd_item: "",
                nm_item: "",
                nu_valor: 0,
                ds_descricao: "",
                cd_item_status: "",
                img_foto: null
            },
            itemUtilizado: {
                cd_usuario_item: ''
            }
        }
    },
    methods: {

        recuperaItens() {

            this.dialogLoader = true

            lojaService.getMyItems(this.$store.state.usuario.cd_usuario).then(
                (response) => {

                    if (response.data[0].cod != 2) {

                        this.meusItensLista = response.data

                        this.dialogLoader = false

                    } else {
                        this.dialogLoader = false
                    }
                }
            ).catch(
                () => {

                }
            )

        },

        selecionaItem(item) {

            this.itemUtilizado.cd_usuario_item = item.usuario_item

            this.itemSelecionado = item.item

            this.dialog = true
        },

        utilizarItem() {

            lojaService.useItem(this.itemUtilizado).then(
                (response) => {

                    if (response.data.cd_item_analise > 0) {

                        this.dialodConfirmaItem = false
                        this.dialog = false

                        this.recuperaItens()

                    }

                }
            )

        },

        exibirCodigo(codigo) {

            this.codigo_item = codigo

            this.openCodigo = true

        }

    },

    mounted() {
        this.recuperaItens()
    }
}
</script>

<style scoped>

</style>