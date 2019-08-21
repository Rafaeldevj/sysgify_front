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
                                        <v-btn block color="teal" style="color: white">
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
                <form @submit.prevent="">
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
            itensPagina: 3,
            pagina: 1,
            totalPaginas: 1,
            equipeLista: [],
            equipe: {
                cd_equipe: '',
                nm_equipe: '',
                fl_ativo: 'S'
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

            equipeService.getEquipes().then(
                response => {
                    this.equipeLista = response.data
                }
            )

        },

        novaEquipe() {

            this.dialog = true
        }

    },

    mounted() {
        this.carregaEquipes()
    }
}
</script>

<style scoped>

</style>