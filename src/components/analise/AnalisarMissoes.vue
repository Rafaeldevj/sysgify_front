<template>
    <div>
        <v-layout row wrap>
            <v-flex grow pa-1>
                <h2>Análise de Missões</h2>
            </v-flex>
        </v-layout>
        <v-layout row fill-height wrap>

            <!--MISSÕES COM SOLICITAÇÃO DE PAUSA-->
            <v-flex xs12 pa-1 md4>
                <v-card class="text-md-center">
                    <v-toolbar card prominent dark color="indigo darken-2">
                        <v-container fluid grid-list-xl pa-1>
                            <v-layout row justify-space-between>
                                <v-flex xs12 md12>
                                    <v-toolbar-title class="white--text missoes-label">
                                        <v-icon size="20">description</v-icon> Solicitação de Pausa {{ listaMissoesSolicitacaoPausa.length }}
                                    </v-toolbar-title>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-card-text>

                        <v-layout row wrap>
                            <v-flex v-for="missao in listaMissoesSolicitacaoPausa" grow pa-0 md12 xs12 :key="missao.cd_usuario_missao">

                                <v-card flat class="text-xs-center ma-1" elevation="5" dark>

                                    <v-card-text>
                                        <div class="subheading">
                                            Missão: <span class="yellow--text">{{ missao.nm_missao }}</span>
                                        </div>

                                        <div class="subheading">
                                            Solicitante: <span class="cyan--text">{{ missao.nm_usuario }}</span>
                                        </div>

                                    </v-card-text>
                                    <div class="text-xs-center">
                                        <v-card-actions>
                                            <v-btn block color="teal" style="color: white">
                                                <span>Analisar</span>
                                            </v-btn>
                                        </v-card-actions>
                                    </div>
                                </v-card>

                            </v-flex>

                        </v-layout>

                    </v-card-text>
                </v-card>
            </v-flex>

            <!--MISSÕES PAUSADAS-->
            <v-flex xs12 pa-1 md4>
                <v-card class="text-md-center">
                    <v-toolbar card prominent dark color="blue-grey darken-2">
                        <v-container fluid grid-list-xl pa-1>
                            <v-layout row justify-space-between>
                                <v-flex xs12 md12>
                                    <v-toolbar-title class="white--text missoes-label">
                                        <v-icon size="20">description</v-icon> Pausadas {{ listaMissoesPausadas.length }}
                                    </v-toolbar-title>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-card-text>

                        <v-layout row wrap>
                            <v-flex v-for="missao in listaMissoesPausadas" grow pa-0 md12 xs12 :key="missao.cd_usuario_missao">

                                <v-card flat class="text-xs-center ma-1" elevation="5" dark>

                                    <v-card-text>
                                        <div class="subheading">
                                            Missão: <span class="yellow--text">{{ missao.nm_missao }}</span>
                                        </div>

                                        <div class="subheading">
                                            Solicitante: <span class="cyan--text">{{ missao.nm_usuario }}</span>
                                        </div>

                                    </v-card-text>
                                    <div class="text-xs-center">
                                        <v-card-actions>
                                            <v-btn block color="teal" style="color: white">
                                                <span>Analisar</span>
                                            </v-btn>
                                        </v-card-actions>
                                    </div>
                                </v-card>

                            </v-flex>

                        </v-layout>

                    </v-card-text>
                </v-card>
            </v-flex>


            <!--MISSÕES EM ANÁLISE-->
            <v-flex xs12 pa-1 md4>
                <v-card class="text-md-center">
                    <v-toolbar card prominent dark color="orange darken-2">
                        <v-container fluid grid-list-xl pa-1>
                            <v-layout row justify-space-between>
                                <v-flex xs12 md12>
                                    <v-toolbar-title class="white--text missoes-label">
                                        <v-icon size="20">description</v-icon> Em Análise {{ listaMissoesEmAnalise.length }}
                                    </v-toolbar-title>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-card-text>

                        <v-layout row wrap>
                            <v-flex v-for="missao in listaMissoesEmAnalise" grow pa-0 md12 xs12 :key="missao.cd_usuario_missao">

                                <v-card flat class="text-xs-center ma-1" elevation="5" dark>

                                    <v-card-text>

                                        <div class="subheading">
                                            Missão: <span class="yellow--text">{{ missao.nm_missao }}</span>
                                        </div>

                                        <div class="subheading">
                                            Solicitante: <span class="cyan--text">{{ missao.nm_usuario }}</span>
                                        </div>

                                    </v-card-text>
                                    <div class="text-xs-center">
                                        <v-card-actions>
                                            <v-btn block color="teal" style="color: white" @click="dialog = true">
                                                <span>Analisar</span>
                                            </v-btn>
                                        </v-card-actions>
                                    </div>
                                </v-card>

                            </v-flex>

                        </v-layout>

                    </v-card-text>
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
                    <h2 class="title">Análise da Missão</h2>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>

                </v-card-text>

                <v-card-actions>
                    <v-btn
                            color="red"
                            @click="dialog = false"
                    >
                        Fechar
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import analiseMissao from "../../services/analise/analiseMissao";

export default {
    data(){
        return {
            dialog: false,
            listaMissoesSolicitacaoPausa: [],
            listaMissoesPausadas: [],
            listaMissoesEmAnalise: [],

        }
    },
    methods: {

        carregaMinhasMissoesAnalise() {

            analiseMissao.getMissoes(this.$store.state.usuario.cd_usuario).then(
                (response) => {

                    console.log(response.data)

                    for (let i = 0; i < response.data.length; i++) {

                        if (response.data[i].cd_missao_status == 4) {
                            this.listaMissoesPausadas = this.listaMissoesPausadas.concat(response.data[i])
                        }

                        if (response.data[i].cd_missao_status == 5) {
                            this.listaMissoesEmAnalise = this.listaMissoesEmAnalise.concat(response.data[i])
                        }

                        if (response.data[i].cd_missao_status == 7) {
                            this.listaMissoesSolicitacaoPausa = this.listaMissoesSolicitacaoPausa.concat(response.data[i])
                        }

                    }

                }
            )

        },


    
    },

    mounted() {
        this.carregaMinhasMissoesAnalise()
    }
}
</script>

<style>
.missoes-label {
    font-size: medium;
}
</style>
