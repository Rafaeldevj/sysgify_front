<template>
    <div>
        <div>
            <v-layout row wrap>
                <v-flex grow xs6 sm6 md6 lg6 pa-1>
                    <h1>Início</h1>
                </v-flex>
                <v-flex xs6 sm6 md6 lg6 >
                    <div style="float: right;">
                        <v-btn color="indigo" dark @click="carregaMissoesUsuario"><v-icon>autorenew</v-icon> Atualizar Missões</v-btn>
                    </div>
                </v-flex>
            </v-layout>
        </div>
        <v-layout row wrap>

            <v-flex md12>
                <v-tabs
                    v-model="active"
                    color="blue darken-3"
                    dark
                    slider-color="yellow"
                    grow
                >
                    <v-tab
                        v-for="missoes in missoesAbas"
                        :key="missoes.status"
                        ripple
                    >
                        
                        <v-badge color="red">
                            <template v-slot:badge>
                                <span dark small>{{ missoes.tamanho }}</span>
                            </template>
                            <span>{{ missoes.aba }}</span>
                        </v-badge>

                    </v-tab>
                    <v-tab-item
                        v-for="missoes in missoesAbas"
                        :key="missoes.status"
                    >
                        <v-card flat>
                            <v-layout row wrap class="corpo_tab">

                                <v-flex xs12 sm6 md3 lg3 >

                                    <v-card class="ma-2">
                                        
                                        <h1 class="text-xs-center titulo green--text">Missões Fáceis</h1>

                                        <div v-if="listaMissoesUsuarioFacil.length == 0">
                                            <br>
                                            <h2 class="text-xs-center">Nenhuma Missão Desta Dificuldade</h2>
                                        </div>

                                        <div 
                                            v-else 
                                            v-for="missaoFacil in listaMissoesUsuarioFacil" 
                                            :key="missaoFacil.cd_usuario_missao"
                                            >

                                            <div v-if="missaoFacil.cd_missao_status.cd_missao_status == missoes.status">
                                                
                                                <v-card flat class="text-xs-center ma-3" elevation="5" dark >
                                            
                                                    <v-card-text>
                                                        <div class="subheading">
                                                            {{ missaoFacil.missao.nm_missao }}
                                                        </div>
                                                        <div :class="retornaCorPrioridade(missaoFacil.missao.cd_missao_prioridade.cd_missao_prioridade)">
                                                            {{ missaoFacil.missao.cd_missao_prioridade.nm_missao_prioridade }}
                                                        </div>
                                                        <div class="white--text">
                                                            {{ missaoFacil.dt_cadastro }}
                                                        </div>
                                                    </v-card-text>

                                                    <div class="text-xs-center">
                                                        <v-card-actions>
                                                            <v-btn block color="green" style="color: white" @click="infoMissao(missaoFacil)">
                                                                <span>Acessar</span>
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </div>
                                                </v-card>

                                            </div>

                                            <div v-else>
                                                <br>
                                                <h2 class="text-xs-center">Nenhuma Missão Deste Status</h2>
                                            </div>

                                        </div>
                                        
                                        <div class="espaco"></div>
                                    </v-card>
                                
                                </v-flex>

                                <!-- COLAR AQUI INICIO -->

                                <v-flex xs12 md3>
                                    <v-card class="ma-2">
                                        <h1 class="text-xs-center titulo warning--text">Missões Medianas</h1>

                                        <div v-if="listaMissoesUsuarioMedia.length == 0">
                                            <br>
                                            <h2 class="text-xs-center">Nenhuma Missão Desta Dificuldade</h2>
                                        </div>

                                        <div 
                                            v-else
                                            v-for="missaoMedia in listaMissoesUsuarioMedia" 
                                            :key="missaoMedia.cd_usuario_missao">

                                            <div v-if="missaoMedia.cd_missao_status.cd_missao_status == missoes.status">

                                                <v-card flat class="text-xs-center ma-3" elevation="5" dark>
                                            
                                                    <v-card-text>
                                                        <div class="subheading">
                                                            {{ missaoMedia.missao.nm_missao }}
                                                        </div>
                                                        <div :class="retornaCorPrioridade(missaoMedia.missao.cd_missao_prioridade.cd_missao_prioridade)">
                                                            {{ missaoMedia.missao.cd_missao_prioridade.nm_missao_prioridade }}
                                                        </div>
                                                        <div class="white--text">
                                                            {{ missaoMedia.dt_cadastro }}
                                                        </div>
                                                    </v-card-text>
                                                    <div class="text-xs-center">
                                                        <v-card-actions>
                                                            <v-btn block color="warning" style="color: white" @click="infoMissao(missaoMedia.missao.cd_missao)">
                                                                <span>Acessar</span>
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </div>
                                                </v-card>

                                            </div>
                                            <div v-else>
                                                <br>
                                                <h2 class="text-xs-center">Nenhuma Missão Deste Status</h2>
                                            </div>

                                        </div>
                                        <div class="espaco"></div>
                                    </v-card>

                                </v-flex>

                                <v-flex xs12 md3>
                
                                    <v-card class="ma-2">
                                        
                                        <h1 class="text-xs-center titulo red--text">Missões Difíceis</h1>

                                        <div v-if="listaMissoesUsuarioDificil.length == 0">
                                            <br>
                                            <h2 class="text-xs-center">Nenhuma Missão Desta Dificuldade</h2>
                                        </div>

                                        <div 
                                            v-else
                                            v-for="missaoDificil in listaMissoesUsuarioDificil" 
                                            :key="missaoDificil.cd_usuario_missao">
                                            
                                            <div v-if="missaoDificil.cd_missao_status.cd_missao_status == missoes.status"> 

                                                <v-card flat class="text-xs-center ma-3" elevation="5" dark>
                                            
                                                    <v-card-text>
                                                        <div class="subheading">
                                                            {{ missaoDificil.missao.nm_missao }}
                                                        </div>
                                                        <div :class="retornaCorPrioridade(missaoDificil.missao.cd_missao_prioridade.cd_missao_prioridade)">
                                                            {{ missaoDificil.missao.cd_missao_prioridade.nm_missao_prioridade }}
                                                        </div>
                                                        <div class="white--text">
                                                            {{ missaoDificil.dt_cadastro }}
                                                        </div>
                                                    </v-card-text>
                                                    <div class="text-xs-center">
                                                        <v-card-actions>
                                                            <v-btn block color="red" style="color: white" @click="infoMissao(missaoDificil.missao.cd_missao)">
                                                                <span>Acessar</span>
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </div>
                                                </v-card>

                                            </div>
                                            <div v-else>
                                                <br>
                                                <h2 class="text-xs-center">Nenhuma Missão Deste Status</h2>
                                            </div>

                                        </div>

                                        <div class="espaco"></div>
                                    </v-card>

                                </v-flex>

                                <v-flex xs12 md3>
                
                                    <v-card class="ma-2">
                                        
                                        <h1 class="text-xs-center titulo red--text text--darken-2">Missões Muito Difíceis</h1>
                                    
                                        <div v-if="listaMissoesUsuarioMuitoDificil.length == 0">
                                            <br>
                                            <h2 class="text-xs-center">Nenhuma Missão Desta Dificuldade</h2>
                                        </div>

                                        <div 
                                            v-else
                                            v-for="missaoMuitoDificil in listaMissoesUsuarioMuitoDificil" 
                                            :key="missaoMuitoDificil.cd_usuario_missao">

                                            <div v-if="missaoDificil.cd_missao_status.cd_missao_status == missoes.status"> 
                                                <v-card flat class="text-xs-center ma-3" elevation="5" dark>
                                            
                                                    <v-card-text>
                                                        <div class="subheading">
                                                            {{ missaoMuitoDificil.missao.nm_missao }}
                                                        </div>
                                                        <div :class="retornaCorPrioridade(missaoMuitoDificil.missao.cd_missao_prioridade.cd_missao_prioridade)">
                                                            {{ missaoMuitoDificil.missao.cd_missao_prioridade.nm_missao_prioridade }}
                                                        </div>
                                                        <div class="white--text">
                                                            {{ missaoMuitoDificil.dt_cadastro }}
                                                        </div>
                                                    </v-card-text>
                                                    <div class="text-xs-center">
                                                        <v-card-actions>
                                                            <v-btn block color="red accent-4" style="color: white" @click="infoMissao(missaoMuitoDificil.missao.cd_missao)">
                                                                <span>Acessar</span>
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </div>
                                                </v-card>
                                            </div>
                                            <div v-else>
                                                <br>
                                                <h2 class="text-xs-center">Nenhuma Missão Deste Status</h2>
                                            </div>
                                            
                                        </div>
                                        <div class="espaco"></div>
                                    </v-card>
                                    
                                </v-flex>

                                <!-- COLAR AQUI FIM -->
                            </v-layout>
                            

                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </v-flex>

            

        <LoaderSave :texto="textoLoarder" :dialog="dialogLoader" :cor="corLoader" :barra="barraLoader"></LoaderSave>

        </v-layout>

        <!-- INÍCIO MODAL COM OS DADOS DA MISSÃO SELECIONADA -->
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="780">
                <v-card>
                    <v-card-title class="headline">
                        <v-avatar size="40">
                            <v-icon class="teal lighten-1 white--text">terrain</v-icon>
                        </v-avatar>&nbsp;
                        Dados da Missão
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-container grid-list-xs>
                        <v-list single-line subheader>

                        <v-list-tile avatar>
                            <v-list-tile-avatar>
                                <v-icon class="teal lighten-1 white--text">perm_identity</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-sub-title>Nome</v-list-tile-sub-title>
                                <v-list-tile-title>{{ dadosMissao.missao.nm_missao }}</v-list-tile-title>
                                
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile avatar>
                            <v-list-tile-avatar>
                                <v-icon class="teal lighten-1 white--text">assignment</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-sub-title>Descrição</v-list-tile-sub-title>
                                <v-list-tile-title class="descricao">{{ dadosMissao.missao.ds_missao }}</v-list-tile-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-btn icon ripple @click="exibeDeescricao(dadosMissao.missao.ds_missao)">
                                    <v-icon color="teal">info</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>

                        <v-layout row wrap>
                            <v-flex grow md4 xs12>
                                
                                <v-list-tile avatar>
                                    <v-list-tile-avatar>
                                        <v-icon class="green white--text" 
                                        v-if="dadosMissao.dificuldade.cd_missao_dificuldade == 1"
                                        >whatshot</v-icon>

                                        <v-icon class="yellow dark-1 white--text" 
                                        v-if="dadosMissao.dificuldade.cd_missao_dificuldade == 2"
                                        >whatshot</v-icon>

                                        <v-icon class="deep-orange dark-1 white--text" 
                                        v-if="dadosMissao.dificuldade.cd_missao_dificuldade == 3"
                                        >whatshot</v-icon>

                                        <v-icon class="red dark-1 white--text" 
                                        v-if="dadosMissao.dificuldade.cd_missao_dificuldade == 4"
                                        >whatshot</v-icon>

                                    </v-list-tile-avatar>

                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Dificuldade</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ dadosMissao.dificuldade.nm_missao_dificuldade }}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>

                            </v-flex>

                            <v-flex grow md4 xs12>
                                
                                <v-list-tile avatar>
                                    <v-list-tile-avatar>
                                        <v-icon class="green lighten white--text" 
                                        v-if="dadosMissao.prioridade.cd_missao_prioridade == 1"
                                        >warning</v-icon>

                                        <v-icon class="yellow dark white--text" 
                                        v-if="dadosMissao.prioridade.cd_missao_prioridade == 2"
                                        >warning</v-icon>

                                        <v-icon class="deep-orange dark white--text" 
                                        v-if="dadosMissao.prioridade.cd_missao_prioridade == 3"
                                        >warning</v-icon>

                                    </v-list-tile-avatar>

                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Prioridade</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ dadosMissao.prioridade.nm_missao_prioridade }}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>

                            </v-flex>

                            <v-flex grow md4 xs12>

                                <v-list-tile avatar>
                                    <v-list-tile-avatar>
                                        <v-icon class="green lighten white--text" 
                                        v-if="dadosMissao.situacao.cd_missao_situacao == 1"
                                        >warning</v-icon>

                                        <v-icon class="yellow dark white--text" 
                                        v-if="dadosMissao.situacao.cd_missao_situacao == 2"
                                        >warning</v-icon>

                                    </v-list-tile-avatar>

                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Situação</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ dadosMissao.situacao.nm_missao_situacao }}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>

                            </v-flex>
                        </v-layout>
                        
                        <v-layout row wrap>
                            <v-flex grow md4 xs12>

                                <v-list-tile avatar>
                                    <v-list-tile-avatar>
                                        <v-icon class="teal lighten-1 white--text">monetization_on</v-icon>
                                    </v-list-tile-avatar>

                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Moedas</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ dadosMissao.missao.nu_qtd_moedas }} +</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>

                            </v-flex>

                            <v-flex gow md4 xs12>
                                
                            </v-flex>

                            <v-flex grow md4 xs12>

                                <v-list-tile avatar>
                                    <v-list-tile-avatar>
                                        <v-icon class="teal lighten-1 white--text">trending_up</v-icon>
                                    </v-list-tile-avatar>

                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Experiência</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ dadosMissao.missao.nu_qtd_experiencia }} +</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>

                            </v-flex>
                        </v-layout>

                    </v-list>
                    </v-container>
                    

                    <v-card-actions>
    
                        <v-btn color="red darken-1" dark @click="dialog = false"><v-icon dark>clear</v-icon>&nbsp; Fechar</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary darken-1" dark @click="iniciarMissao(dadosMissao)"><v-icon>power_settings_new</v-icon>&nbsp; Iniciar Missão</v-btn>
                        
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
        <!-- FIM MODAL COM OS DADOS DA MISSÃO SELECIONADA -->

        <!-- MODAL PARA MISSÇÕES COM DESCRIÇÃO GRANDES -->
        <v-dialog v-model="infoDescricao" width="600px">
            <v-card>
                <v-card-title class="headline">
                    <v-avatar size="40">
                        <v-icon class="teal lighten-1 white--text">assignment</v-icon>
                    </v-avatar>&nbsp;
                     Descrição da Missão
                </v-card-title>

                <v-card-text>
                    {{ descricao_completa }}
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="teal darken-1"
                        dark
                        @click="infoDescricao = false"
                    >
                        OK
                    </v-btn>

                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- FIM MODAL PARA MISSÇÕES COM DESCRIÇÃO GRANDES -->
    </div>
</template>

<script>

import inicioService from '../services/inicio'
import LoaderSave from './loader/LoaderSave'
import missaoService from '../services/gamificacao/missaoListagem'

export default {
    components: {
        LoaderSave
    },
    data(){
        return {
            active: null,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            dialog: false,
            infoDescricao: false,
            dialogLoader: false,
            corLoader: 'primary',
            textoLoarder: 'Carregando suas missões',
            barraLoader: true,
            listaMissoesUsuarioFacil: [],
            listaMissoesUsuarioMedia: [],
            listaMissoesUsuarioDificil: [],
            listaMissoesUsuarioMuitoDificil: [],
            descricao_completa: '',
            missoesAbas: [
                { aba: 'Em Aberto', status: 1 , tamanho: 0},
                { aba: 'Iniciado', status: 2 , tamanho: 0},
                { aba: 'Em Andamento', status: 3 , tamanho: 0},
                { aba: 'Em Análise', status: 4 , tamanho: 0},
                { aba: 'Pausada', status: 5 , tamanho: 0},
                { aba: 'Finalizada', status: 6 , tamanho: 0},
                { aba: 'Cancelada', status: 7 , tamanho: 0}
            ],
            usuarioMissao: {
                cd_usuario_missao: '',
                cd_missao_status: ''
            },
            dadosMissao: {
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
                dificuldade: {
                    cd_missao_dificuldade: '',
                    nm_missao_dificuldade: '',
                },
                prioridade: {
                    cd_missao_prioridade: '',
                    nm_missao_prioridade: '',
                },
                situacao: {
                    cd_missao_situacao: '',
                    nm_missao_situacao: '',
                }
            }
        }
    },
    methods: {

        limparMissoes() {

            this.listaMissoesUsuarioFacil = []
            this.listaMissoesUsuarioMedia = []
            this.listaMissoesUsuarioDificil = []
            this.listaMissoesUsuarioMuitoDificil = []

            for (let i = 0; i < this.missoesAbas.length; i++) {
                this.missoesAbas[i].tamanho = 0
            }

        },

        exibeDeescricao(descricao) {

            this.descricao_completa = descricao
            this.infoDescricao = true

        },

        refatoraDataTabela(data){

            if (data != null) {
                let dia = data.slice(8,10);
                let mes = data.slice(5,7);
                let ano = data.slice(0,4);
                let hora = data.slice(11,13);
                let minuto = data.slice(14,16);
                let segundo = data.slice(17, 19)

                return `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
            } else {
                return "";
            }

        },

        infoMissao(data) {

            this.usuarioMissao.cd_usuario_missao = data.cd_usuario_missao
            this.usuarioMissao.cd_missao_status = data.cd_missao_status.cd_missao_status 

            this.dialog = true
            
            missaoService.informacaoMissao(data.missao.cd_missao).then(
                (response) => {
                    this.dadosMissao = response.data
                }
            )
        },

        retornaCorPrioridade(prioridade) {

            let cor = "white--text"

            switch(prioridade) {
                
                case 1:
                    cor = "success--text"
                    break
                case 2:
                    cor = "warning--text"
                    break
                case 3:
                    cor = "red--text"
                    break
                default:
                    break
            }

            return cor
        },

        carregaMissoesUsuario() {

            this.dialogLoader = true

            inicioService.missoesUsuario(this.$store.state.usuario.cd_usuario).then(
                (response) => {

                    setTimeout(() => {

                        this.limparMissoes()
                        
                        for(let i = 0; i < response.data.length; i++) {

                            for (let j = 0; j < this.missoesAbas.length; j++) {

                                if(this.missoesAbas[j].status == response.data[i].cd_missao_status.cd_missao_status) {

                                    this.missoesAbas[j].tamanho++

                                }

                            }

                            if (response.data[i].missao.cd_missao_dificuldade == 1) {
                                
                                this.listaMissoesUsuarioFacil = this.listaMissoesUsuarioFacil.concat(response.data[i])
                            } 

                            if (response.data[i].missao.cd_missao_dificuldade == 2) {
                                this.listaMissoesUsuarioMedia = this.listaMissoesUsuarioMedia.concat(response.data[i])
                            } 

                            if (response.data[i].missao.cd_missao_dificuldade == 3) {
                                this.listaMissoesUsuarioDificil = this.listaMissoesUsuarioDificil.concat(respo+nse.data[i])
                            } 

                            if (response.data[i].missao.cd_missao_dificuldade == 4) {
                                this.listaMissoesUsuarioMuitoDificil = this.listaMissoesUsuarioMuitoDificil.concat(response.data[i])
                            } 
                        }

                        this.dialogLoader = false

                    }, 1500);

                }
            )

        },

        iniciarMissao(data) {

            inicioService.iniciarMissao(this.usuarioMissao).then(
                (response) => {

                    if (response.data.cd_usuario_missao > 0) {

                        this.carregaMissoesUsuario()

                    }
                    
                }
            )
        }

    },

    mounted() {

        this.carregaMissoesUsuario()
    }
}
</script>

<style>

.espaco {

    padding-bottom: 8px;

}

.corpo_tab {

    background-color: #fafafa
}

</style>
