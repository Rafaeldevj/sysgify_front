<template>
    <div>
        
        <v-layout row wrap>
            <v-flex grow pa-1>
                <h1>Cadastro de Usuário</h1>
            </v-flex>
        </v-layout>
        <v-layout row align-center justify-center fill-height v-if="listaGrupos.length > 0">
            <v-flex xs12 pa-2 md10>
                <v-card class="text-md-center">
                    <v-toolbar card prominent dark color="primary">
                        <v-container fluid grid-list-xl pa-1>
                            <v-layout row justify-space-between>
                                <v-flex xs2>
                                </v-flex>
                                <v-flex xs8 md8>
                                    <v-toolbar-title class="white--text">Dados do Usuário</v-toolbar-title>
                                </v-flex>
                                <v-flex xs2>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <form @submit.prevent="salvarUsuario">
                        <v-card-text>
                            <input type="hidden" >
                            <v-container fluid grid-list-lg pa-1>
                                <v-layout row wrap>
                                    
                                    <v-flex xs12 md6>
                                        <v-text-field
                                            v-model="usuario.nm_usuario"
                                            label="Nome do Usuário"
                                            required
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 md6>
                                        <v-text-field
                                            v-model="usuario.nm_login"
                                            label="Login do Usuário"
                                            :color="cor_nome_login"
                                            :append-icon="icone_nome_login"
                                            required
                                        
                                            :error-messages="verificaLogin"
                                        ></v-text-field>
                                    </v-flex>

                                </v-layout>

                                <v-layout row wrap>
                                    
                                    <v-flex xs12 md6>
                                        <v-text-field
                                            v-model="usuario.nm_email"
                                            type="email"
                                            label="Email do Usuário"
                                            required
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 md6>

                                         <v-text-field
                                            v-model="usuario.nm_senha"
                                            :append-icon="show1 ? 'visibility' : 'visibility_off'"
                                            required
                                            :type="show1 ? 'text' : 'password'"
                                            label="Senha do Usuário"
                                            @click:append="show1 = !show1"
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 md6>
                                        <v-text-field
                                                v-model="usuario.nm_apelido"
                                                type="text"
                                                label="Apelido do Usuário"
                                                required
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 md6>
                                        <v-switch
                                            v-model="usuario.fl_ativo"
                                            color="primary"
                                            :label="exibeAtividadeUsuario"
                                        ></v-switch>
                                    </v-flex>

                                </v-layout>

                                <v-layout row wrap>
                                    <v-flex xs12 md3>
                                        <v-btn color="primary" @click="selecionarImagem">Selecione uma Imagem</v-btn>
                                        <input v-show="false" ref="inputUpload" type="file" @change="onFilePicked">
                                        <img :src="imageURL" height="150">
                                    </v-flex>
                                </v-layout>

                                <h2>Grupos</h2>
                                <br>
                                <v-divider></v-divider>
                                
                                <v-layout>
                                    
                                    <v-flex v-for="grupo in listaGrupos" xs12 md3 :key="grupo.cd_grupo">

                                        <v-checkbox
                                            color="primary"
                                            v-model="usuario.grupos"
                                            :label="grupo.nm_grupo" :value="grupo"
                                        ></v-checkbox>

                                    </v-flex>

                                </v-layout>

                            </v-container>

                        </v-card-text>
                        <v-card-actions>
                            <v-btn type="submit" color="primary">
                                <v-icon>save</v-icon> &nbsp; SALVAR
                            </v-btn>
                            <v-btn type="reset" color="warning" @click="navegar('usuario_listagem')">
                                <v-icon>clear</v-icon> &nbsp; CANCELAR
                            </v-btn>
                        </v-card-actions>
                    </form>
                </v-card>
            </v-flex>            
        </v-layout>

        <v-layout row align-center fill-height v-else>

            <LoaderSave 
                texto="Carregando Formulário" 
                :dialog="true" 
                cor="primary" 
                :barra="true">
            </LoaderSave>

        </v-layout>

        <LoaderSave :texto="textoLoarder" :dialog="dialog" :cor="corLoader" :barra="barraLoader"></LoaderSave>
    </div>
</template>

<script>

import usuarioService from '../../../services/usuario/usuarioCadastro'
import LoaderSave from '../../loader/LoaderSave'

export default {
    components: {
        LoaderSave
    },
    data(){
        return{
            dialog: false,
            corLoader: 'primary',
            textoLoarder: 'Salvando Usuário',
            barraLoader: true,
            permitido_salvar: true,
            status_switch: 'Usuário Ativo',
            icone_nome_login: '',
            mensagem_nome_login: '',
            cor_nome_login: 'primary',
            show1: false,
            checkbox: true,
            imageURL: '',
            usuario: {
                cd_usuario: '',
                nm_usuario: '',
                nm_login: '',
                nm_email: '',
                nm_senha: '',
                fl_ativo: true,
                grupos: [],
                nm_apelido: '',
                img_foto: ''
            },
            listaLogins: [],
            listaGrupos: []
        }
    },
    computed: {

        exibeAtividadeUsuario() {

            this.status_switch = this.usuario.fl_ativo ? 'Usuário Ativo' : 'Usuário Inativo'
            return this.status_switch
        },

        verificaLogin() {

            for(let i = 0; i < this.listaLogins.length; i++) {

                if(this.usuario.nm_login == this.listaLogins[i].nm_login) {

                    this.permitido_salvar = false
                    this.mensagem_nome_login = 'Nome de usuário já existente!'
                    this.icone_nome_login = 'close'
                    break
                } else if(this.usuario.nm_login.length > 1 && this.usuario.nm_login.length < 3) {

                    this.permitido_salvar = false
                    this.mensagem_nome_login = 'Nome de usuário deve ter no mínimo 4 caracteres'
                    this.icone_nome_login = 'close'
                }
                else if(this.usuario.nm_login.length == 0) {

                    this.permitido_salvar = false
                    this.mensagem_nome_login = ''
                    this.icone_nome_login = ''
                    this.cor_nome_login = 'primary'
                }
                else if(this.usuario.nm_login.length > 3){
                    this.permitido_salvar = true
                    this.mensagem_nome_login = ''
                    this.cor_nome_login = 'success'
                    this.icone_nome_login = 'check'
                }
                
            }
            return this.mensagem_nome_login
        }
    },
    methods: {

        setLoader(cor, texto, barra){

            this.dialog = true
            this.corLoader = cor
            this.textoLoarder = texto
            this.barraLoader = barra

            setTimeout(() => {
                this.dialog = false
            }, 1500)
        },

        salvarUsuario() {

            this.usuario.img_foto = this.imageURL

            this.dialog = true

            if(this.permitido_salvar) {

                this.usuario.fl_ativo = this.usuario.fl_ativo ? 'S' : 'N'

                usuarioService.salvar(this.usuario).then(
                    (response) => {

                        if(response.data.cd_usuario != null) {

                            setTimeout(() => {
                                this.dialog = false

                                this.setLoader('success', 'Usuário salvo com sucesso!', false)


                                setTimeout(() => {
                                    this.$router.push('/dashboard/usuario_listagem')

                                }, 1000)

                            }, 1500)

                        } else {

                            setTimeout(() => {
                                this.dialog = false

                                this.setLoader('error', 'Falha ao salvar usuário!', false)

                            }, 1500)

                        }

                    }
                )

            }
            else {

                this.dialog = false

                this.setLoader('error', 'Login indisponível!', false)
            }

            

        },

        verificaNomeLogin() {

            usuarioService.getLogins().then(
                (response) => {
                    
                    this.listaLogins = response.data
                }
            )

        },

        recuperaGrupos() {

            usuarioService.getGrupos().then(
                (response) => {
                    setTimeout(() => {
                        this.listaGrupos = response.data
                    }, 2000);
                    
                }
            )
        },

        navegar(pagina) {
            this.$router.push(pagina)
        },

        selecionarImagem() {

            this.$refs.inputUpload.click()
        },

        onFilePicked(event) {
            let imagem = event.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(imagem);
            reader.onload = e => {

                this.imageURL = e.target.result;

            }
        }

    },
    mounted() {
        this.verificaNomeLogin()
        this.recuperaGrupos()
    }
    
}
</script>

<style>

</style>
