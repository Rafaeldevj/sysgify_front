<template>
    <div>

        <v-layout row wrap>
            <v-flex grow pa-1 md12 xs12>

                <v-card flat elevation="1">
                    <v-card-text>
                        <v-layout row wrap>                
                            <v-flex grow pa-1 md6 x12>
                                <v-btn dark color="indigo" @click="navegar('/dashboard/missao_cadastro')">
                                    <v-icon>add</v-icon>Nova Missão
                                </v-btn>
                            </v-flex>
                            <v-flex pa-1 md6 x12 style="float: right;">
                                <div style="float: right">
                                    <v-chip color="indigo darken-2" text-color="white">Missão Ativa</v-chip>
                                    <v-chip color="grey darken-2" text-color="white">Missão Inativa</v-chip>
                                </div>
                            </v-flex>
                        </v-layout>
                        
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout row wrap v-if="!dialogLoader">
            <v-flex grow pa-1 md12 xs12>

                <v-card flat class="text-xs-center" elevation="1">
                    <v-card-text>
                        <div class="subheading titulo">
                            <h3><strong>Missões</strong></h3>
                        </div>
                    </v-card-text>
                    <v-layout row wrap>
                        <v-flex v-for="missao in missoes" grow pa-1 md3 xs12 :key="missao.cd_missao">

                            <v-card flat class="text-xs-center ma-3" elevation="5" dark>
                                <v-avatar v-if="missao.cd_missao_situacao == 1" color="indigo darken-2">
                                    <v-icon dark>playlist_add_check</v-icon>
                                </v-avatar>
                                <v-avatar v-else color="grey darken-2">
                                    <v-icon dark>playlist_add_check</v-icon>
                                </v-avatar>
                                <v-responsive class="pt-4 img-missao">
                                    <v-avatar>
                                        <img src="../../../assets/images/win.png">
                                    </v-avatar>
                                </v-responsive>
                                <v-card-text>
                                    <div class="subheading">
                                        {{ missao.nm_missao }}
                                    </div>
                                    <div class="dados-numeros">
                                        <v-layout row wrap>
                                            
                                            <v-flex grow pa-1 md6 xs6>
                                                <div>
                                                    <v-avatar size="40" tile>
                                                        <img src="../../../assets/images/coins.png">
                                                    </v-avatar>
                                                    <h3>{{ missao.nu_qtd_moedas }} moedas</h3>
                                                </div>
                                            </v-flex>

                                            <v-flex grow pa-1 md6 xs6>
                                                <div>
                                                    <v-avatar size="40">
                                                        <img src="../../../assets/images/level.png">
                                                    </v-avatar>
                                                    <h3>{{ missao.nu_qtd_experiencia }} XP</h3>
                                                </div>
                                            </v-flex>
                                        </v-layout>
                                    </div>
                                </v-card-text>
                                <div class="text-xs-center">
                                    <v-card-actions>
                                        <v-btn block color="teal" style="color: white" @click="infoMissao(missao.cd_missao)">
                                            <span>Detalhes da Missão</span>
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

        
        <LoaderSave :texto="textoLoarder" :dialog="dialogLoader" :cor="corLoader" :barra="barraLoader"></LoaderSave>
        

        <!-- INÍCIO MODAL COM OS DADOS DA MISSÃO SELECIONADA -->
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="780">
                <v-card>
                    <v-card-title class="headline">
                        <v-avatar size="40">
                            <v-icon class="teal lighten-1">terrain</v-icon>
                        </v-avatar>&nbsp;
                        Dados da Missão
                        <v-spacer></v-spacer>
                        <v-btn color="teal" dark @click="editarMissao(dadosMissao.missao.cd_missao)" > <v-icon>edit</v-icon>&nbsp; Editar Missão</v-btn>
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-container grid-list-xs>
                        <v-list single-line subheader>

                        <v-list-tile avatar>
                            <v-list-tile-avatar>
                                <v-icon class="teal lighten-1">perm_identity</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-sub-title>Nome</v-list-tile-sub-title>
                                <v-list-tile-title>{{ dadosMissao.missao.nm_missao }}</v-list-tile-title>
                                
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile avatar>
                            <v-list-tile-avatar>
                                <v-icon class="teal lighten-1">assignment</v-icon>
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
                                        <v-icon class="green" 
                                        v-if="dadosMissao.dificuldade.cd_missao_dificuldade == 1"
                                        >whatshot</v-icon>

                                        <v-icon class="yellow dark-1" 
                                        v-if="dadosMissao.dificuldade.cd_missao_dificuldade == 2"
                                        >whatshot</v-icon>

                                        <v-icon class="deep-orange dark-1" 
                                        v-if="dadosMissao.dificuldade.cd_missao_dificuldade == 3"
                                        >whatshot</v-icon>

                                        <v-icon class="red dark-1" 
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
                                        <v-icon class="green lighten" 
                                        v-if="dadosMissao.prioridade.cd_missao_prioridade == 1"
                                        >warning</v-icon>

                                        <v-icon class="yellow dark" 
                                        v-if="dadosMissao.prioridade.cd_missao_prioridade == 2"
                                        >warning</v-icon>

                                        <v-icon class="deep-orange dark" 
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
                                        <v-icon class="green lighten" 
                                        v-if="dadosMissao.situacao.cd_missao_situacao == 1"
                                        >warning</v-icon>

                                        <v-icon class="yellow dark" 
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
                                        <v-icon class="teal lighten-1">monetization_on</v-icon>
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
                                        <v-icon class="teal lighten-1">trending_up</v-icon>
                                    </v-list-tile-avatar>

                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Experiência</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ dadosMissao.missao.nu_qtd_experiencia }} +</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>

                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex grow md4 xs12>

                                <v-list-tile avatar>
                                    <v-list-tile-avatar>
                                        <v-icon class="teal lighten-1">calendar_today</v-icon>
                                    </v-list-tile-avatar>

                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Data de Cadastro</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ refatoraDataTabela(dadosMissao.missao.dt_cadastro) }}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>

                            </v-flex>

                            <v-flex gow md4 xs12>
                                
                            </v-flex>

                            <v-flex grow md4 xs12>

                                <v-list-tile avatar>
                                    <v-list-tile-avatar>
                                        <v-icon class="teal lighten-1">update</v-icon>
                                    </v-list-tile-avatar>

                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Data de Atualização</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ refatoraDataTabela(dadosMissao.missao.dt_atualizacao) }}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>

                            </v-flex>
                        </v-layout>

                    </v-list>
                    </v-container>
                    

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" dark @click="dialog = false"><v-icon dark>clear</v-icon>&nbsp; Fechar</v-btn>
                        <v-btn color="primary darken-1" dark @click="delegarMissao = true"><v-icon>supervisor_account</v-icon>&nbsp; Delegar Missão</v-btn>
                        
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
                        <v-icon class="teal lighten-1">assignment</v-icon>
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

        <!-- MODAL PARA DELEGAR MISSÇÕES -->
        <v-dialog persistent v-model="delegarMissao" width="650px">
            <v-card>
                <v-card-title class="headline">
                    <v-avatar size="40">
                        <v-icon class="teal lighten-1">assignment</v-icon>
                    </v-avatar>&nbsp;
                     Delegar Missão
                     <v-spacer></v-spacer>
                     <v-btn small color="teal darken-1" dark @click="delegarMissao = false" style="width: 10px;">
                         <v-icon>clear</v-icon>
                     </v-btn>
                </v-card-title>

                <div class="headline text-xs-center pa-5">

                    <div v-if="bottomNav == 1">
                        
                        <v-flex xs8 sm12>
                            <v-autocomplete
                                :items="listaUsuarios"
                                :filter="customFilter"
                                v-model="usuario"
                                item-text="nome"
                                item-value="id"
                                :auto-select-first="true"
                                label="Usuário"
                            ></v-autocomplete>
                        </v-flex>

                        <v-flex xs4 sm12>
                            <v-btn color="primary" @click="delegarMissaoUsuario"> <v-icon>send</v-icon>&nbsp;Delegar</v-btn>
                        </v-flex>

                    </div>

                    <div v-if="bottomNav == 2">
                        Active: {{ bottomNav }}
                    </div>
                    
                    <div v-if="bottomNav == 3">
                        <v-layout row wrap>

                            <v-flex xs8 sm12>

                                <v-select
                                    v-model="usuarios"
                                    :items="listaUsuarios"
                                    item-text="nome"
                                    item-value="id"
                                    label="Grupo"
                                    multiple
                                    chips
                                    :key="listaUsuarios.id"
                                ></v-select>
                            </v-flex>
                            <v-flex xs4 sm12>
                                <v-btn color="primary" @click="delegarMissaoGrupo"> <v-icon>send</v-icon>&nbsp;Delegar</v-btn>
                            </v-flex>

                        </v-layout>
                        

                    </div>

                </div>
                <br><br>
                <v-bottom-nav
                    :active.sync="bottomNav"
                    :value="true"
                    absolute
                    color="transparent"
                    >
                    <v-btn
                        color="teal"
                        flat
                        :value="1"
                    >
                        <span>Funcionário</span>
                        <v-icon>person</v-icon>
                    </v-btn>

                    <v-btn
                        color="teal"
                        flat
                        value="2"
                    >
                        <span>Time</span>
                        <v-icon>group</v-icon>
                    </v-btn>

                    <v-btn
                        color="teal"
                        flat
                        value="3"
                    >
                        <span>Grupo</span>
                        <v-icon>group</v-icon>
                    </v-btn>
                </v-bottom-nav>
                
            </v-card>
        </v-dialog>
        <!-- FIM MODAL PARA DELEGAR MISSÇÕES -->
        
    </div>
</template>

<script>

import missaoService from '../../../services/gamificacao/missaoListagem'
import usuarioService from '../../../services/usuario/usuarioListagem'
import LoaderSave from '../../loader/LoaderSave'

export default {
    components: {
        LoaderSave
    },
    data(){
        return{
            bottomNav: 1,
            dialogLoader: false,
            corLoader: 'primary',
            textoLoarder: 'Carregando Missões',
            barraLoader: true,
            dialog: false,
            infoDescricao: false,
            delegarMissao: false,
            itensPagina: 8,
            pagina: 1,
            totalPaginas: 1,
            listaUsuarios: [],
            listaMissoes: [],
            missoes: [],
            usuario: '',
            usuarios: [],
            descricao_completa: '',
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
        nextPage(event) {
            this.pagina = event
            this.exibeMissoes()
        },

        customFilter (item, queryText) {
            const textOne = item.nome.toLowerCase()
            const searchText = queryText.toLowerCase()

            return textOne.indexOf(searchText) > -1 
        },

        setLoader(cor, texto, barra){

            this.dialogLoader = true
            this.corLoader = cor
            this.textoLoarder = texto
            this.barraLoader = barra

            setTimeout(() => {
                this.dialogLoader = false
            }, 1500)
        },

        navegar(pagina) {
            this.$router.push(pagina)
        },

        delegarMissaoUsuario() {

            const usuarioMissao = {
                cd_usuario: this.usuario,
                cd_missao: this.dadosMissao.missao.cd_missao
                
            }

            if(this.usuario == "") {

                //ENVIAR MENSAGEM DE ERRO E NÃO DEIXAR DELEGAR A MISSÃO
                this.setLoader('red', 'Selecione um usuário', false)

            } else {

                missaoService.delegarMissaoUsuario(usuarioMissao).then(
                    (response) => {
                        if (response.status == 200) {

                            this.setLoader('green', 'Missão Delegada com Sucesso!', false)

                        } else {

                            this.setLoader('red', 'Falha ao Delegar Missão!', false)

                        }
                    }
                ).catch((error) => {
                    
                }).finally(() => {
                    this.delegarMissao = false
                    this.dialog = false

                    this.usuario = 0
                    this.dadosMissao.missao.cd_missao = 0
                })

            }
            
        },

        delegarMissaoGrupo() {

            if(this.usuarios.length < 2) {

                alert('Selecione mais de 1 usuário!')

            } else {

                const usuarioGrupoMissao = {
                    missao: this.dadosMissao.missao.cd_missao,
                    usuarios: this.usuarios
                }

                console.log(usuarioGrupoMissao)

            }

            
        },

        exibeMissoes() {
            this.dialogLoader = true
            missaoService.getMissoesPaginado(this.itensPagina, this.pagina).then(
                response => {
                    
                    setTimeout(() => {
                       this.totalPaginas = response.data.last_page
                        this.missoes = response.data.data
                        this.dialogLoader = false 
                    }, 1500);
                }
            )
        },

        exibeDeescricao(descricao) {

            this.descricao_completa = descricao
            this.infoDescricao = true

        },

        infoMissao(id) {
            this.dialog = true
            
            missaoService.informacaoMissao(id).then(
                (response) => {
                    this.dadosMissao = response.data
                }
            )
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

        editarMissao(id) {
            
            this.navegar(`/dashboard/missao_cadastro/${id}`)
        },

        carregaUsuarios() {

            usuarioService.getUsuarios().then(
                (response) => {
                    this.listaUsuarios = response.data
                }
            )
        }
    },
    mounted() {
        this.exibeMissoes()
        this.carregaUsuarios()
    }
}
</script>

<style>
.dados {
    margin-top: -10px;
}

.titulo {
    margin-bottom: -10px;
}

.paginacao {
    margin-top: 5px; 
    padding-bottom: 5px;
}

.img-missao {
    margin-top: -10px;
}

.dados-numeros {
    padding-top: 10px;
    margin-bottom: -15px;
}

</style>