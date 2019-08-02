<template>
   <div>
       
       <v-layout row wrap>
            <v-flex grow pa-1 md12 xs12>

                <v-card flat elevation="1">
                    <v-card-text>
                        <v-layout row wrap>                
                            <v-flex grow pa-1 md6 x12>
                                <v-btn dark color="indigo" @click="navegar('/dashboard/usuario_cadastro')">
                                    <v-icon>add</v-icon>Novo Usuário
                                </v-btn>
                            </v-flex>
                            <v-flex pa-1 md6 x12 style="float: right;">
                                <div style="float: right">
                                    <v-chip color="indigo darken-2" text-color="white">Usuário Ativo</v-chip>
                                    <v-chip color="grey darken-2" text-color="white">Usuário Inativo</v-chip>
                                </div>
                            </v-flex>
                        </v-layout>
                        
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex grow pa-1 md12 xs12>

                <v-card flat class="text-xs-center" elevation="1">
                    <v-card-text>
                        <div class="subheading titulo">
                            <h3><strong>Usuários</strong></h3>
                        </div>
                    </v-card-text>
                    <v-layout row wrap>
                        <v-flex v-for="usuario in lista_usuarios" grow pa-1 md3 xs12 :key="usuario.cd_usuario">

                            <v-card flat class="text-xs-center ma-3" elevation="5" dark>
                                <v-avatar v-if="usuario.status == 'S'" color="indigo darken-2">
                                    <v-icon dark>how_to_reg</v-icon>
                                </v-avatar>
                                <v-avatar v-else color="grey darken-2">
                                    <v-icon dark>how_to_reg</v-icon>
                                </v-avatar>
                                <v-responsive class="pt-4 img-missao">
                                    <v-avatar>
                                        <img src="../../../assets/images/profile/man.png">
                                    </v-avatar>
                                </v-responsive>
                                <v-card-text>
                                    <div class="subheading">
                                        {{ usuario.nome }}
                                    </div>
                                    
                                </v-card-text>
                                <div class="text-xs-center">
                                    <v-card-actions>
                                        <v-btn block color="teal" style="color: white" @click="infoUsuario(usuario)">
                                            <span>Detalhe do Usuário</span>
                                        </v-btn>
                                    </v-card-actions>
                                </div>
                            </v-card>

                        </v-flex>

                    </v-layout>
                    
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="480">
            <v-card>
                <v-card-title class="headline">Dados do Usuário</v-card-title>
                <v-card-text class="text-xs-center ">
       
                    <v-card
                        class="pt-4 mx-auto"
                        flat
                        max-width="400"
                    >
                        <v-card-text class="card-info">
                        <v-avatar size="88">
                            <img src="../../../assets/images/profile/man.png">
                        </v-avatar>
                        <h3 class="headline mb-2">
                            {{ usuarioDados.nome }}
                        </h3>
                        <div class="blue--text mb-2">{{ usuarioDados.email }}</div>
                        <div class="blue--text subheading font-weight-bold">{{ usuarioDados.login }}</div>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-layout
                        tag="v-card-text"
                        text-xs-left
                        wrap
                        >
                        <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Grupo:</v-flex>
                        <v-flex>{{ usuarioDados.grupo }}</v-flex>
                        <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Nível:</v-flex>
                        <v-flex>
                            {{ usuarioDados.nivel }}
                        </v-flex>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <br>
                        <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Data de Cadastro:</v-flex>
                        <v-flex>{{ usuarioDados.dt_cadastro }}</v-flex>
                        </v-layout>
                    </v-card>
                </v-card-text>
                
                <v-card-actions>
                    <v-btn color="primary darken-1" flat @click="dialog = false">Fechar</v-btn>
                    <v-spacer></v-spacer>
                    <div v-if="usuarioDados.status == 'S'">
                        <v-btn color="red darken-1" flat @click="ativarDesativar(usuarioDados.id)">Desativar</v-btn>
                    </div>
                    <div v-else>
                        <v-btn color="primary darken-1" flat @click="ativarDesativar(usuarioDados.id)">Ativar</v-btn>
                    </div>
                    
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-layout>

        <LoaderSave :texto="textoLoarder" :dialog="dialogLoader" :cor="corLoader" :barra="barraLoader"></LoaderSave>
    </div> 
</template>

<script>

import usuarioService from '../../../services/usuario/usuarioListagem'
import LoaderSave from '../../loader/LoaderSave'

export default {
    components: {
        LoaderSave
    },
    data(){
        return{
            dialogLoader: false,
            corLoader: 'primary',
            textoLoarder: 'Carragndo Usuários',
            barraLoader: true,
            lista_usuarios: [],
            dialog: false,
            usuarioDados: {
                dt_cadastro: '',
                email: '',
                grupo: '',
                id: '',
                login: '',
                nivel: '',
                nome: '',
                status: ''
            }
        }
    },
    methods: {

        carregaUsuarios() {
            this.dialogLoader = true
            usuarioService.getUsuarios().then(
                (response) => {
                    
                    setTimeout(() => {
                        this.lista_usuarios = response.data
                        this.dialogLoader = false
                    }, 1000);
                }
            ).finally(() => {
                //this.dialogLoader = false
            })

            
        },

        infoUsuario(usuario) {
            this.dialog = true
            this.usuarioDados = usuario
        },

        navegar(pagina) {
            this.$router.push(pagina)
        },

        ativarDesativar(id) {
            const user = {
                id: id
            }
            usuarioService.ativarDesativarUsuario(user).then(
                (response) => {
                    
                    if (response != null) {
                        this.dialog = false
                        this.carregaUsuarios()

                    }
                }
            )
        }

    },
    mounted() {
        this.carregaUsuarios()
    }
}
</script>

<style>
.card-info{

    margin-top: -20px;

}
</style>
