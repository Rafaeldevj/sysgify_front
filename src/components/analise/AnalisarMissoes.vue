<template>
    <div>
        <v-layout row wrap>
            <v-flex grow pa-1>
                <h2>Análise de Missões</h2>
            </v-flex>
        </v-layout>
        <v-layout row fill-height wrap>


            <v-flex xs0 pa-1 md2>

            </v-flex>

            <!--MISSÕES PAUSADAS-->
            <v-flex xs12 pa-1 md4>
                <v-card class="text-md-center">
                    <v-toolbar card prominent dark color="indigo darken-2">
                        <v-container fluid grid-list-xl pa-1>
                            <v-layout row justify-space-between>
                                <v-flex xs12 md12>
                                    <v-toolbar-title class="white--text missoes-label">
                                        <v-icon size="20">description</v-icon> Solicitação de Novo Prazo {{ listaMissoesSolicitacaoNovoPrazo.length }}
                                    </v-toolbar-title>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-card-text>

                        <v-layout row wrap>
                            <v-flex v-for="missao in listaMissoesSolicitacaoNovoPrazo" grow pa-0 md12 xs12 :key="missao.cd_usuario_missao">

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
                                            <v-btn block color="teal" style="color: white" @click="analisaNovoPrazoModal(missao)">
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
                                            <v-btn block color="teal" style="color: white" @click="analisarMissao(missao)">
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
                v-model="dialogNovoPrazo"
                persistent
                width="600"
        >
            <v-card dark>

                <v-card-text class="text-xs-center">
                    <h2 class="title">Dados da Solicitação de Novo Prazo</h2>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <v-layout row fill-height wrap>
                        <v-flex md4 xs12>
                            <v-img
                                    src="./images/win.png"
                                    height="125px"
                                    contain
                            ></v-img>
                        </v-flex>
                        <v-flex md8 xs12>
                            <v-card-title primary-title>
                                <div>
                                    <h2><strong>Solicitante: </strong> {{ dadosMissao.nm_usuario }} </h2>
                                    <h2><strong>Prazo original: </strong> <span class="yellow--text"> {{ dadosMissao.dt_prazo }} </span></h2>
                                </div>
                            </v-card-title>
                        </v-flex>
                    </v-layout>
                    <br>
                    <v-divider></v-divider>
                    <v-card-text>

                        <div class="subheading"><strong>Descrição do Solicitante:</strong> {{ dadosMissao.ds_motivo_prazo }}</div>

                    </v-card-text>
                </v-card-text>

                <v-card-actions>
                    <v-btn
                            color="red"
                            @click="dialogNovoPrazo = false"
                    >
                        Fechar
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn color="yellow darken-2" @click="negarNovoPrazo(dadosMissao.cd_usuario_missao)">Negar</v-btn>
                    <v-btn color="cyan darken-2" @click="novoPrazoForm(dadosMissao.cd_usuario_missao)">Conceder</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
                v-model="dialogNovoPrazoForm"
                persistent
                width="600"
        >
            <v-card >

                <v-card-text class="text-xs-center">
                    <h2 class="title">Novo Prazo</h2>
                </v-card-text>
                <v-divider></v-divider>
                <form @submit.prevent="salvarNovoPrazo">
                    <v-card-text class="text-xs-center">

                        <v-layout row wrap>
                            <v-flex grow pa-0 md3 xs0>
                            </v-flex>
                            <v-flex grow pa-0 md6 xs12>

                                <v-card-text>

                                    <v-text-field
                                            label="Novo Prazo"
                                            type="datetime-local"
                                            class="ma-1"
                                            v-model="novoPrazo.dt_prazo"
                                    ></v-text-field>

                                </v-card-text>

                            </v-flex>

                        </v-layout>



                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                color="red"
                                type="button"
                                flat
                                @click="dialogNovoPrazoForm = false"
                        >
                            Fechar
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn type="submit" color="primary" flat dark >SALVAR</v-btn>
                    </v-card-actions>
                </form>
            </v-card>
        </v-dialog>

        <v-dialog
                v-model="dialog"
                persistent
                width="700"
        >
            <v-card dark>

                <v-card-text class="text-xs-center">
                    <h2 class="title">Dados da Missão em Análise</h2>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <v-layout row fill-height wrap>
                        <v-flex md4 xs12>
                            <v-img
                                    src="./images/win.png"
                                    height="125px"
                                    contain
                            ></v-img>
                        </v-flex>
                        <v-flex md8 xs12>
                            <v-card-title primary-title>
                                <div>
                                    <h2><strong>Missão: </strong> <span class="cyan--text"> {{ dadosMissao.nm_missao }} </span> </h2>
                                    <h2><strong>Solicitante: </strong> <span class="cyan--text"> {{ dadosMissao.nm_usuario }} </span> </h2>
                                </div>
                            </v-card-title>
                        </v-flex>
                    </v-layout>
                    <br>
                    <v-divider></v-divider>
                    <v-card-text>

                        <div class="subheading"><strong class="cyan--text">Descrição da Missão:</strong> {{ dadosMissao.ds_missao }}</div>

                    </v-card-text>
                </v-card-text>

                <v-card-actions>
                    <v-btn
                            color="red"
                            @click="dialog = false"
                    >
                        Fechar
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn color="yellow darken-2">Retomar Missão</v-btn>
                    <v-btn color="cyan darken-2" @click="finalizarMissao">Finalizar Missão</v-btn>
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
            dialogNovoPrazo: false,
            dialogNovoPrazoForm: false,
            listaMissoesSolicitacaoNovoPrazo: [],
            listaMissoesEmAnalise: [],
            dadosMissao: {
                cd_missao: '',
                cd_missao_status: '',
                cd_usuario: '',
                cd_usuario_missao: '',
                ds_motivo_prazo: '',
                dt_prazo: '',
                dt_termino: '',
                nm_missao: '',
                nm_usuario: '',
                ds_missao: ''
            },
            novoPrazo: {
                cd_usuario_missao: '',
                dt_prazo: ''
            }
        }
    },
    methods: {

        limparListas() {

            this.listaMissoesEmAnalise = []
            this.listaMissoesSolicitacaoNovoPrazo = []

        },

        carregaMinhasMissoesAnalise() {

            this.limparListas()

            analiseMissao.getMissoes(this.$store.state.usuario.cd_usuario).then(
                (response) => {

                    for (let i = 0; i < response.data.length; i++) {

                        if (response.data[i].cd_missao_status == 4) {
                            this.listaMissoesSolicitacaoNovoPrazo = this.listaMissoesSolicitacaoNovoPrazo.concat(response.data[i])
                        }

                        if (response.data[i].cd_missao_status == 3) {
                            this.listaMissoesEmAnalise = this.listaMissoesEmAnalise.concat(response.data[i])
                        }

                    }

                }
            )

        },

        analisaNovoPrazoModal(data) {

            this.dadosMissao = data
            this.dialogNovoPrazo = true

        },

        analisarMissao(data) {

            this.dadosMissao = data
            this.dialog = true

        },

        novoPrazoForm(data) {
            this.novoPrazo.cd_usuario_missao = data
            this.dialogNovoPrazoForm = true

        },

        salvarNovoPrazo() {

            analiseMissao.setaNovoPrazo(this.novoPrazo).then(
                (response) => {

                    if (response.data.cd_usuario_missao > 0) {

                        this.carregaMinhasMissoesAnalise()
                        this.dialog = false
                        this.dialogNovoPrazo = false
                        this.dialogNovoPrazoForm = false

                    }

                }
            )

        },

        negarNovoPrazo(id) {

            analiseMissao.negarNovoPrazo(id).then(
                (response) => {

                    if (response.data.cd_usuario_missao > 0) {

                        this.carregaMinhasMissoesAnalise()
                        this.dialog = false
                        this.dialogNovoPrazo = false
                        this.dialogNovoPrazoForm = false

                    }

                }
            )

        },

        finalizarMissao() {

            analiseMissao.finalizarMissao(this.dadosMissao).then(
                (response) => {

                    if (response.data.cd_usuario > 0) {

                        if (this.$store.state.usuario.cd_usuario == response.data.cd_usuario) {
                            this.$store.state.usuario = response.data
                        }

                        this.carregaMinhasMissoesAnalise()
                        this.dialog = false

                    }

                }
            )

        }
    
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
