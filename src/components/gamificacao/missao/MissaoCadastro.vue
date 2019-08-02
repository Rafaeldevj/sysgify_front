<template>
    <div>
        <v-layout row wrap>
            <v-flex grow pa-1>
                <h1>Cadastro de Missão</h1>
            </v-flex>
        </v-layout>
        <v-layout row align-center justify-center fill-height>
            <v-flex xs12 pa-2 md10>
                <v-card class="text-md-center">
                    <v-toolbar card prominent dark color="primary">
                        <v-container fluid grid-list-xl pa-1>
                            <v-layout row justify-space-between>
                                <v-flex xs2>
                                </v-flex>
                                <v-flex xs8 md8>
                                    <v-toolbar-title class="white--text">Dados da Missão</v-toolbar-title>
                                </v-flex>
                                <v-flex xs2>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <form @submit.prevent="salvarMissao">
                        <v-card-text>
                            <input type="hidden" v-model="missao.cd_missao">
                            <v-container fluid grid-list-lg pa-1>
                                <v-layout row wrap>
                                    
                                    <v-flex xs12 md6>
                                        <v-text-field
                                            label="Nome da Missão"
                                            v-model="missao.nm_missao"
                                            required
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 md3>
                                        <v-text-field
                                            type="number"
                                            v-model="missao.nu_qtd_moedas"
                                            min="0"
                                            step="5"
                                            label="Recompensa em Moedas"
                                            required
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 md3>
                                        <v-text-field
                                            type="number"
                                            v-model="missao.nu_qtd_experiencia"
                                            min="0"
                                            step="5"
                                            label="Recompensa em Experiência"
                                            required
                                        ></v-text-field>
                                    </v-flex>

                                </v-layout>

                                <v-layout row wrap>
                                    <v-flex xs12 md4>
                            
                                        <v-select
                                            v-model="missao.cd_missao_dificuldade"
                                            :items="listaMissaoNivel"
                                            item-text="nm_missao_dificuldade"
                                            item-value="cd_missao_dificuldade"
                                            label="Dificuldade da Missão"
                                            required
                                        ></v-select>
                                
                                    </v-flex>

                                    <v-flex xs12 md4>

                                        <v-select
                                            v-model="missao.cd_missao_situacao"
                                            :items="listaMissaoSituacao"
                                            item-text="nm_missao_situacao"
                                            item-value="cd_missao_situacao"
                                            label="Situação da Missão"
                                            required
                                        ></v-select>
                                
                                    </v-flex>

                                    <v-flex xs12 md4>

                                        <v-select
                                            v-model="missao.cd_missao_prioridade"
                                            :items="listaMissaoPrioridade"
                                            item-text="nm_missao_prioridade"
                                            item-value="cd_missao_prioridade"
                                            label="Prioridade da Missão"
                                            required
                                        ></v-select>
                                
                                    </v-flex>
                                </v-layout>

                                <v-layout row wrap>
                                    <v-flex xs12 md12>
                                        
                                        <v-textarea
                                        v-model="missao.ds_missao"
                                            label="Descrição da Missão"
                                        ></v-textarea>

                                    </v-flex>
                                </v-layout>

                            </v-container>

                        </v-card-text>
                        <v-card-actions>
                            <v-btn type="submit" color="primary">
                                <v-icon>save</v-icon> &nbsp; SALVAR
                            </v-btn>
                            <v-btn type="reset" color="warning" @click="navegar('/dashboard/missao_listagem')">
                                <v-icon>clear</v-icon> &nbsp; CANCELAR
                            </v-btn>
                        </v-card-actions>
                    </form>
                </v-card>
            </v-flex>            
        </v-layout>

        <LoaderSave :texto="textoLoarder" :dialog="dialog" :cor="corLoader" :barra="barraLoader"></LoaderSave>
    </div>
</template>

<script>

import missaoService from '../../../services/gamificacao/missaoCadastro'
import LoaderSave from '../../loader/LoaderSave'

export default {
    components: {
        LoaderSave
    },
    data() {
        return {
            dialog: false,
            corLoader: 'primary',
            textoLoarder: 'Salvando Missão',
            barraLoader: true,
            missao:{
                cd_missao: '',
                nm_missao: '',
                nu_qtd_moedas: '',
                nu_qtd_experiencia: '',
                cd_missao_dificuldade: '',
                cd_missao_situacao: '',
                cd_missao_prioridade: '',
                ds_missao: ''
            },
            listaMissaoNivel: [],
            listaMissaoSituacao: [],
            listaMissaoPrioridade: []
        }
    },
    methods: {

        navegar(pagina) {
            this.$router.push(pagina)
        },

        setLoader(cor, texto, barra){

            this.dialog = true
            this.corLoader = cor
            this.textoLoarder = texto
            this.barraLoader = barra

            setTimeout(() => {
                this.dialog = false
            }, 1500)
        },

        salvarMissao() {
            this.dialog = true

            if (this.missao.cd_missao == '') {
                
                missaoService.salvar(this.missao).then(
                    (response) => {
                        
                        if(response.data.cd_missao != null) {

                            setTimeout(() => {
                                this.dialog = false

                                this.setLoader('success', 'Missão salva com sucesso!', false)
                                

                                setTimeout(() => {
                                    this.$router.push('/dashboard/missao_listagem')

                                }, 1000)

                            }, 1500)
                        
                        } else {

                            setTimeout(() => {
                                this.dialog = false

                                this.setLoader('error', 'Falha ao salvar missão!', false)
                                
                            }, 1500)

                        }
                    
                    }
                )

            } else {

                missaoService.atualizar(this.missao.cd_missao, this.missao).then(
                    (response) => {
                        
                        if(response.data == 1) {

                            setTimeout(() => {
                                this.dialog = false

                                this.setLoader('success', 'Missão atualizada com sucesso!', false)
                                

                                setTimeout(() => {
                                    this.$router.push('/dashboard/missao_listagem')

                                }, 1000)

                            }, 1500)
                        
                        } else {

                            setTimeout(() => {
                                this.dialog = false

                                this.setLoader('error', 'Falha ao atualizar missão!', false)
                                
                            }, 1500)

                        }
                    
                    }
                )
            }
             
            
        },
        carregaListas() {

            missaoService.getMissaoDificuldade().then(
                (response) => {
                    this.listaMissaoNivel = response.data
                }
            )

            missaoService.getMissaoSituacao().then(
                (response) => {
                    this.listaMissaoSituacao = response.data
                }
            )

            missaoService.getMissaoPrioridade().then(
                (response) => {
                    this.listaMissaoPrioridade = response.data
                }
            )
        },
        
        verificaMissaoEdicao() {

            let codigo_missao = this.$route.params.id

            if (codigo_missao != undefined) {
                
                missaoService.getMissao(codigo_missao).then(
                    (response) => {
                        this.missao = response.data
                        for (let i = 0; i < this.listaMissaoNivel.length; i++) {

                            if(this.listaMissaoNivel[i].cd_missao_dificuldade == response.data.cd_missao_dificuldade) {
                                this.listaMissaoNivel[i].cd_missao_dificuldade = response.data.cd_missao_dificuldade
                            }

                        }

                        for (let i = 0; i < this.listaMissaoSituacao.length; i++) {

                            if(this.listaMissaoSituacao[i].cd_missao_situacao == response.data.cd_missao_situacao) {
                                this.listaMissaoSituacao[i].cd_missao_situacao = response.data.cd_missao_situacao
                            }

                        }

                        for (let i = 0; i < this.listaMissaoPrioridade.length; i++) {

                            if(this.listaMissaoPrioridade[i].cd_missao_prioridade == response.data.cd_missao_prioridade) {
                                this.listaMissaoPrioridade[i].cd_missao_prioridade = response.data.cd_missao_prioridade
                            }

                        }

                        
                    }

                    
                )

                

            }

        }

    },
    mounted() {
        this.carregaListas()
        this.verificaMissaoEdicao()

    }
}
</script>

<style>

</style>
