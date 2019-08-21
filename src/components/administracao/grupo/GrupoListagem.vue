<template>
    <div>
        <v-layout row wrap>

            <v-flex grow pa-1 md12 xs12>
                <v-layout row wrap>
                    <v-flex grow pa-1 md6 x12>
                        <h1>Grupos</h1>

                    </v-flex>
                    <v-flex pa-1 md6 x12 style="float: right;">
                        <div style="float: right">
                            <v-btn dark color="indigo" @click="novoGrupo">
                                <v-icon>add</v-icon> Novo Grupo
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
                            <h3><strong>Grupos</strong></h3>
                        </div>
                    </v-card-text>
                    <v-layout row wrap>
                        <v-flex v-for="grupoLista in listaGrupos" grow pa-1 md3 xs12 :key="grupoLista.cd_grupo">

                            <v-card flat class="text-xs-center ma-3" elevation="5" dark>

                                <v-responsive class="pt-4">
                                    <v-avatar>
                                        <v-icon class="teal">group</v-icon>
                                    </v-avatar>
                                </v-responsive>

                                <v-card-text>
                                    <div class="subheading">
                                        {{ grupoLista.nm_grupo }}
                                    </div>
                                </v-card-text>

                                <div class="text-xs-center">
                                    <v-card-actions>
                                        <v-btn block color="teal" style="color: white" @click="editarGrupo(grupoLista)">
                                            <span>Editar</span>
                                        </v-btn>
                                    </v-card-actions>
                                </div>
                            </v-card>

                        </v-flex>

                    </v-layout>

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

                </v-card>
            </v-flex>
        </v-layout>


        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <form @submit.prevent="salvarGrupo">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Novo Grupo</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-xs>
                                <v-layout wrap>
                                    <v-flex xs12 md12>
                                        <v-text-field label="Nome do grupo" required v-model="grupo.nm_grupo" />
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

import grupoService from '../../../services/grupo/grupoListagem'
import LoaderSave from "../../loader/LoaderSave";
export default {
    components: {
        LoaderSave
    },
    data() {
        return {
            dialogLoader: false,
            corLoader: 'primary',
            textoLoarder: 'Salvando Grupo',
            barraLoader: true,
            permitido_salvar: true,
            dialog: false,
            listaGrupos: [],
            itensPagina: 3,
            pagina: 1,
            totalPaginas: 1,
            grupo: {
                cd_grupo: '',
                nm_grupo: ''
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

        carregaGrupos() {

            this.dialogLoader = true
            this.corLoader = 'primary'
            this.textoLoarder = 'Carregando grupos'
            this.barraLoader = true

            grupoService.getGruposPaginado(this.itensPagina, this.pagina).then(
                response => {

                    setTimeout(() => {
                        this.totalPaginas = response.data.last_page
                        this.listaGrupos = response.data.data
                        this.dialogLoader = false
                    }, 1500);
                }
            )

        },

        nextPage(event) {
            this.pagina = event
            this.carregaGrupos()
        },

        limparGrupo() {

            this.grupo.cd_grupo = ''
            this.grupo.nm_grupo = ''
        },

        novoGrupo() {

            this.dialog = true
            this.limparGrupo()

        },

        editarGrupo(grupoLista) {

            this.dialog = true

            this.grupo = grupoLista
        },

        salvarGrupo() {

            if (this.grupo.cd_grupo != "") {

                grupoService.atualizar(this.grupo).then(
                    (response) => {

                        if (response.data.cd_grupo > 0) {

                            //EXIBIR MENSAGEM DE GRUPO CRIADO
                            this.setLoader('success', 'Grupo atualizado com sucesso!', false)

                            this.carregaGrupos()
                            this.dialog = false

                        } else {

                            //EXIBIR MENSAGEM DE FALHA
                            this.setLoader('error', 'Falha ao atualizado Grupo!', false)
                        }

                    }
                ).catch(
                    () => {
                        this.setLoader('error', 'Servidor fora do ar!', false)
                    }
                )

            } else {

                grupoService.salvar(this.grupo).then(
                    (response) => {

                        if (response.data.cd_grupo > 0) {

                            //EXIBIR MENSAGEM DE GRUPO CRIADO
                            this.setLoader('success', 'Grupo criado com sucesso!', false)

                            this.carregaGrupos()
                            this.dialog = false

                        } else {

                            //EXIBIR MENSAGEM DE FALHA
                            this.setLoader('error', 'Falha ao cadastrar Grupo!', false)
                        }

                    }
                ).catch(
                    () => {
                        this.setLoader('error', 'Servidor fora do ar!', false)
                    }
                )

            }




        }

    },

    mounted() {

        this.carregaGrupos()
    }
}
</script>

<style scoped>

</style>