<template>
    <div>
        <v-layout row wrap>

            <v-flex grow pa-1 md12 xs12>
                <v-layout row wrap>
                    <v-flex grow pa-1 md6 x12>
                        <h1>Módulo de Equipes</h1>

                    </v-flex>
                    <v-flex pa-1 md6 x12 style="float: right;">
                        <div style="float: right">
                            <v-btn dark color="indigo" @click="novaEquipe">
                                <v-icon>add</v-icon> Nova Equipe
                            </v-btn>
                        </div>
                    </v-flex>
                </v-layout>
            </v-flex>

        </v-layout>

        <v-layout row wrap>
            <v-flex grow pa-1 md12 xs12>

                <v-card flat class="text-xs-center" elevation="1">
                    <v-card-text>
                        <div class="subheading titulo">
                            <h3><strong>Equipes</strong></h3>
                        </div>
                    </v-card-text>

                    <v-layout row wrap>

                        <v-flex v-for="equipeL in equipeLista" grow pa-1 md3 xs12 :key="equipeL.cd_equipe">

                            <v-card flat class="text-xs-center ma-3" elevation="5" dark>

                                <v-responsive class="pt-4">
                                    <v-avatar>
                                        <img src="../../../assets/images/team.png" alt="">
                                    </v-avatar>
                                </v-responsive>

                                <v-card-text>
                                    <div class="subheading">
                                        {{ equipeL.nm_equipe }}
                                    </div>
                                </v-card-text>

                                <div class="text-xs-center">
                                    <v-card-actions>
                                        <v-btn block color="teal" style="color: white" @click="infoEquipe(equipeL)">
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
                    </div>
                    -->
                </v-card>
            </v-flex>
        </v-layout>


        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <form @submit.prevent="salvarEquipe">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Nova Equipe</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-layout>
                                    <v-flex xs10 md8>
                                        <v-text-field label="Nome da equipe" required  v-model="equipe.nm_equipe"/>
                                    </v-flex>
                                    &nbsp;&nbsp;&nbsp;
                                    <v-flex xs2 md4>
                                        <v-checkbox
                                            color="indigo"
                                            label="Equipe Ativa"
                                            value="S"
                                            v-model="equipe.fl_ativo">
                                        </v-checkbox>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="blue darken-1" flat @click="dialog = false">Fechar</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn type="submit" color="blue darken-1" flat>Salvar</v-btn>
                        </v-card-actions>
                    </v-card>
                </form>
            </v-dialog>
        </v-layout>


        <LoaderSave :texto="textoLoarder" :dialog="dialogLoader" :cor="corLoader" :barra="barraLoader"></LoaderSave>


        <v-layout row justify-center>
            <v-dialog v-model="dialogInfo" persistent max-width="800px">

                <v-card>
                    <v-card-title>
                        <span class="headline">Equipe {{ equipeInfo.nm_equipe }}</span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-layout row wrap>

                            <v-flex grow pa-1 md12 xs12 class="text-xs-center">
                                <v-layout row wrap>
                                    <v-flex grow pa-1 md12 x12>
                                        <h1>Membros</h1>
                                    </v-flex>
                                </v-layout>

                                <v-layout row wrap>
                                    <v-flex md12 x12>

                                        <v-card flat class="text-xs-center ma-3" elevation="5" dark>

                                            <template v-for="(item, index) in equipeLista">

                                                <v-list-tile
                                                        :key="item.index"
                                                        avatar
                                                >
                                                    <v-list-tile-avatar>
                                                        <img v-if="item.foto != null" :src="item.foto">
                                                        <img v-else src="../../../assets/images/profile/man.png">
                                                    </v-list-tile-avatar>

                                                    <v-list-tile-content>
                                                        <v-list-tile-title>{{ item.nm_equipe }}</v-list-tile-title>
                                                        <v-list-tile-sub-title>Pontos: {{ item.fl_ativo }} </v-list-tile-sub-title>
                                                    </v-list-tile-content>

                                                    <!--
                                                    <v-list-tile-action>

                                                        <h1 v-if="item.posicao == 1" style="color: #FFC107">{{ item.posicao }}º</h1>
                                                        <h1 v-else-if="item.posicao == 2" style="color: grey">{{ item.posicao }}º</h1>
                                                        <h1 v-else-if="item.posicao == 3" style="color: #cd7f32">{{ item.posicao }}º</h1>
                                                        <h1 v-else>{{ item.posicao }}º</h1>

                                                    </v-list-tile-action>
                                                    -->
                                                </v-list-tile>

                                                <v-divider
                                                        :key="index"
                                                        :inset="true"
                                                ></v-divider>
                                            </template>

                                        </v-card>

                                    </v-flex>

                                </v-layout>
                            </v-flex>

                        </v-layout>
                        <v-divider></v-divider>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="blue darken-1" flat @click="dialogInfo = false">Fechar</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat>
                            Novo Membro
                        </v-btn>
                    </v-card-actions>
                </v-card>

            </v-dialog>
        </v-layout>

    </div>
</template>

<script>

import equipeService from '../../../services/gamificacao/equipeListagem'
import LoaderSave from "../../loader/LoaderSave"
export default {
    components: {
        LoaderSave
    },
    data() {
        return {
            dialogLoader: false,
            corLoader: 'primary',
            textoLoarder: 'Carregando Equipes',
            barraLoader: true,
            dialog: false,
            dialogInfo: false,
            itensPagina: 3,
            pagina: 1,
            totalPaginas: 1,
            equipeLista: [],
            equipe: {
                cd_equipe: '',
                nm_equipe: '',
                fl_ativo: 'S'
            },
            equipeInfo: {
                cd_equipe: '',
                nm_equipe: '',
                fl_ativo: ''
            }
        }
    },
    methods: {

        setLoader(cor, texto, barra){

            this.dialogLoader = true
            this.corLoader = cor
            this.textoLoarder = texto
            this.barraLoader = barra

            setTimeout(() => {
                this.dialogLoader = false
            }, 1500)
        },

        carregaEquipes() {
            this.dialogLoader = true
            equipeService.getEquipes().then(
                response => {
                    this.equipeLista = response.data

                    this.dialogLoader = false
                }
            )

        },

        infoEquipe(equipeInfo) {

            this.dialogInfo = true
            this.equipeInfo = equipeInfo

        },

        novaEquipe() {

            this.limparEquipe()

            this.dialog = true
        },

        limparEquipe() {

            this.equipe.cd_equipe = ''
            this.equipe.nm_equipe = ''
            this.equipe.fl_ativo = 'S'

        },

        salvarEquipe() {

            equipeService.salvar(this.equipe).then(
                response => {

                    if (response.data.cd_equipe > 0) {

                        this.setLoader('success', 'Equipe salva com sucesso!', false)
                        this.carregaEquipes()
                        this.dialog = false
                        this.limparEquipe()

                    } else {
                        this.setLoader('error', 'Falha ao salvar equipe!', false)
                        this.dialog = false
                        this.limparEquipe()
                    }

                }
            ).catch(
                () => {
                    this.setLoader('error', 'Falha no servidor!', false)
                    this.dialog = false
                    this.limparEquipe()
                }
            )

        }

    },

    mounted() {
        this.carregaEquipes()
    }
}
</script>

<style scoped>

</style>