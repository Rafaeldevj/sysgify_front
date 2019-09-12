<template>
    <div>
        <v-layout row wrap>
            <v-flex grow pa-1>
                <h2>Minhas Missões</h2>
            </v-flex>
        </v-layout>
        <v-layout row fill-height wrap>

            <!--MISSÕES EM ABERTO-->
            <v-flex xs12 pa-1 md3>
                <v-card class="text-md-center">
                    <v-toolbar card prominent dark color="cyan darken-2">
                        <v-container fluid grid-list-xl pa-1>
                            <v-layout row justify-space-between>
                                <v-flex xs12 md12>
                                    <v-toolbar-title class="white--text">
                                        <v-icon>description</v-icon> Em Aberto {{ listaMissoesEmAberto.length }}
                                    </v-toolbar-title>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-card-text>

                        <v-layout row wrap>
                            <v-flex v-for="missao in listaMissoesEmAberto" grow pa-1 md3 xs12 :key="missao.cd_usuario_missao">

                                <v-card flat class="text-xs-center ma-3" elevation="5" dark>

                                    <v-card-text>
                                        <div class="subheading">
                                            {{ missao.missao.nm_missao }}
                                        </div>


                                    </v-card-text>
                                    <div class="text-xs-center">
                                        <v-card-actions>
                                            <v-btn block color="teal" style="color: white" @click="acessarMissao(missao)">
                                                <span>Vizualizar</span>
                                            </v-btn>
                                        </v-card-actions>
                                    </div>
                                </v-card>

                            </v-flex>

                        </v-layout>

                    </v-card-text>
                </v-card>
            </v-flex>

            <!--MISSÕES ANDAMENTO-->
            <v-flex xs12 pa-1 md3>
                <v-card class="text-md-center">
                    <v-toolbar card prominent dark color="indigo">
                        <v-container fluid grid-list-xl pa-1>
                            <v-layout row justify-space-between>
                                <v-flex xs12 md12>
                                    <v-toolbar-title class="white--text">
                                        <v-icon>description</v-icon> Em Andamento {{ listaMissoesEmAndamento.length }}
                                    </v-toolbar-title>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-card-text>

                        <v-layout row wrap>
                            <v-flex v-for="missao in listaMissoesEmAndamento" grow pa-1 md3 xs12 :key="missao.cd_usuario_missao">

                                <v-card flat class="text-xs-center ma-3" elevation="5" dark>

                                    <v-card-text>
                                        <div class="subheading">
                                            {{ missao.missao.nm_missao }}
                                        </div>


                                    </v-card-text>
                                    <div class="text-xs-center">
                                        <v-card-actions>
                                            <v-btn block color="teal" style="color: white" @click="acessarMissao(missao)">
                                                <span>Vizualizar</span>
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
            <v-flex xs12 pa-1 md3>
                <v-card class="text-md-center">
                    <v-toolbar card prominent dark color="amber darken-2">
                        <v-container fluid grid-list-xl pa-1>
                            <v-layout row justify-space-between>
                                <v-flex xs12 md12>
                                    <v-toolbar-title class="white--text">
                                       <v-icon>description</v-icon> Em Análise {{ listaMissoesEmAnalise.length }}
                                    </v-toolbar-title>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-card-text>

                        <v-flex v-for="missao in listaMissoesEmAnalise" grow pa-0 md12 xs12 :key="missao.cd_usuario_missao">

                            <v-card flat class="text-xs-center ma-1" elevation="5" dark>

                                <v-card-text>
                                    <div class="subheading">
                                        {{ missao.missao.nm_missao }}
                                    </div>
                                    <div class="subheading">
                                        Prazo: <span class="yellow--text">{{ missao.dt_prazo }}</span>
                                    </div>


                                </v-card-text>
                                <div class="text-xs-center">
                                    <v-card-actions>
                                        <v-btn block color="teal" style="color: white" @click="acessarMissao(missao)">
                                            <span>Vizualizar</span>
                                        </v-btn>
                                    </v-card-actions>
                                </div>
                            </v-card>

                        </v-flex>

                    </v-card-text>
                </v-card>
            </v-flex>

            <!--MISSÕES FINALIZADA-->
            <v-flex xs12 pa-1 md3>
                <v-card class="text-md-center">
                    <v-toolbar card prominent dark color="green darken-2">
                        <v-container fluid grid-list-xl pa-1>
                            <v-layout row justify-space-between>
                                <v-flex xs12 md12>
                                    <v-toolbar-title class="white--text">
                                        <v-icon>description</v-icon> Finalizadas {{ listaMissoesFinalizadas.length }}
                                    </v-toolbar-title>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-card-text>

                        <v-flex v-for="missao in listaMissoesFinalizadas" grow pa-0 md12 xs12 :key="missao.cd_usuario_missao">

                            <v-card flat class="text-xs-center ma-1" elevation="5" dark>

                                <v-card-text>
                                    <div class="subheading">
                                        {{ missao.missao.nm_missao }}
                                    </div>
                                    <div class="subheading">
                                        Prazo: <span class="yellow--text">{{ missao.dt_prazo }}</span>
                                    </div>


                                </v-card-text>
                                <div class="text-xs-center">
                                    <v-card-actions>
                                        <v-btn block color="teal" style="color: white" @click="acessarMissao(missao)">
                                            <span>Vizualizar</span>
                                        </v-btn>
                                    </v-card-actions>
                                </div>
                            </v-card>

                        </v-flex>

                    </v-card-text>
                </v-card>
                <br>
                <v-card class="text-md-center">
                    <v-toolbar card prominent dark color="grey darken-2">
                        <v-container fluid grid-list-xl pa-1>
                            <v-layout row justify-space-between>
                                <v-flex xs12 md12>
                                    <v-toolbar-title class="white--text">
                                        <v-icon>description</v-icon> Pausadas {{ listaMissoesPausadas.length }}
                                    </v-toolbar-title>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-card-text>

                        <v-flex v-for="missao in listaMissoesPausadas" grow pa-0 md12 xs12 :key="missao.cd_usuario_missao">

                            <v-card flat class="text-xs-center ma-1" elevation="5" dark>

                                <v-card-text>
                                    <div class="subheading">
                                        {{ missao.missao.nm_missao }}
                                    </div>
                                    <div class="subheading">
                                        Prazo: <span class="yellow--text">{{ missao.dt_prazo }}</span>
                                    </div>


                                </v-card-text>
                                <div class="text-xs-center">
                                    <v-card-actions>
                                        <v-btn block color="teal" style="color: white" @click="acessarMissao(missao)">
                                            <span>Vizualizar</span>
                                        </v-btn>
                                    </v-card-actions>
                                </div>
                            </v-card>

                        </v-flex>

                    </v-card-text>
                </v-card>
            </v-flex>


        </v-layout>


        <v-dialog
                v-model="dialog"
                persistent
                width="900"
        >
            <v-card dark>

                <v-card-text class="text-xs-center">
                    <h2 class="title">Dados da Missão</h2>
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
                                    <h2><strong>Nome: </strong> {{ dadosMissao.missao.nm_missao }} </h2>
                                    <h2><strong>Recompensa em moedas: </strong> <span class="yellow--text">{{ dadosMissao.missao.nu_qtd_moedas }} moedas</span></h2>
                                    <h2><strong>Recompensa em experiência: </strong> <span class="cyan--text">{{ dadosMissao.missao.nu_qtd_experiencia }} xp</span></h2>
                                </div>
                            </v-card-title>
                        </v-flex>
                    </v-layout>
                    <br>
                    <div><strong>Descrição da Missão:</strong> {{ dadosMissao.missao.ds_missao }}</div>
                </v-card-text>

                <v-card-actions>
                    <v-btn
                            color="red"
                            @click="dialog = false"
                    >
                        Fechar
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="cyan darken-2"  v-if="dadosMissao.cd_missao_status.cd_missao_status == 1">Iniciar Missão</v-btn>
                    <v-btn color="cyan darken-2"  v-if="dadosMissao.cd_missao_status.cd_missao_status == 2">Enviar para Análise</v-btn>
                    <v-btn color="cyan darken-2"  v-if="dadosMissao.cd_missao_status.cd_missao_status == 3">Finalizar Missão</v-btn>
                    <v-btn color="cyan darken-2"  v-if="dadosMissao.cd_missao_status.cd_missao_status == 4">Retomar Missão</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>

import inicio from "../services/inicio";

export default {
    data() {
        return {
            dialog: false,
            listaMissoesEmAberto: [],
            listaMissoesEmAndamento: [],
            listaMissoesEmAnalise: [],
            listaMissoesFinalizadas: [],
            listaMissoesPausadas: [],
            dadosMissao: {
                cd_missao_status: {
                    cd_missao_status: '',
                    nm_missao_status: ''
                },
                missao: {
                    cd_missao: '',
                    cd_missao_dificuldade: '',
                    cd_missao_prioridade: '',
                    cd_missao_situacao: '',
                    ds_missao: '',
                    dt_atualizacao: '',
                    dt_cadastro: '',
                    nm_missao: '',
                    nu_qtd_experiencia: '',
                    nu_qtd_moedas: '',
                },
                cd_usuario_missao: '',
                dt_atualizacao: '',
                dt_cadastro: '',
                dt_prazo: ''
            }
        }
    },

    methods: {
        carregaMinhasMissoes() {

            inicio.missoesUsuario(this.$store.state.usuario.cd_usuario).then(
                (response) => {

                    for (let i = 0; i < response.data.length; i++) {

                        if (response.data[i].cd_missao_status.cd_missao_status == 1) {
                            this.listaMissoesEmAberto = this.listaMissoesEmAberto.concat(response.data[i])
                        }

                        if (response.data[i].cd_missao_status.cd_missao_status == 2) {
                            this.listaMissoesEmAndamento = this.listaMissoesEmAndamento.concat(response.data[i])
                        }

                        if (response.data[i].cd_missao_status.cd_missao_status == 3) {
                            this.listaMissoesEmAnalise = this.listaMissoesEmAnalise.concat(response.data[i])
                        }

                        if (response.data[i].cd_missao_status.cd_missao_status == 4) {
                            this.listaMissoesPausadas = this.listaMissoesPausadas.concat(response.data[i])
                        }

                        if (response.data[i].cd_missao_status.cd_missao_status == 5) {
                            this.listaMissoesFinalizadas = this.listaMissoesFinalizadas.concat(response.data[i])
                        }

                    }

                }
            )

        },

        acessarMissao(data) {
            this.dialog = true

            this.dadosMissao = data

            console.log(data)
        }
    },

    mounted() {
        this.carregaMinhasMissoes()
    }
}
</script>

<style scoped>

</style>