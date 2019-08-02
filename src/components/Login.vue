<template>
    <v-app>
        <v-content class="content-login">
            
            <v-layout align-center justify-center row fill-height>
                <v-flex xs12 pa-2 md4>
                    <v-card class="text-md-center">
                        <v-toolbar card prominent dark color="primary">
                            <v-container fluid grid-list-xl pa-1>
                                <v-layout row justify-space-between>
                                    <v-flex xs2>
                                    </v-flex>
                                    <v-flex xs8>
                                        <v-toolbar-title class="white--text">Login</v-toolbar-title>
                                    </v-flex>
                                    <v-flex xs2>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <form @submit.prevent="logar">
                            <v-card-text>
                                    <v-text-field
                                        label="Login de usuário"
                                        v-model="usuario.nm_login"
                                        prepend-icon="person"
                                        id="login"
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        label="Senha de acesso"
                                        v-model="usuario.nm_senha"
                                        type="password"
                                        prepend-icon="lock"
                                        required
                                    ></v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn 
                                    type="submit" 
                                    color="primary" 
                                    block 
                                    :disabled="dialog"
                                    :loading="dialog"
                                >ENTRAR</v-btn>
                            </v-card-actions>
                        </form>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-content>

        <v-dialog
        v-model="dialog"
        hide-overlay
        persistent
        width="400"
        >
            <v-card
                color="primary"
                dark
            >
                <v-card-text class="text-xs-center">
                Realizando autenticação
                <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-snackbar
            pa-1
            v-model="snackbar"
            :color="color"
            :timeout="timeout"
            top
        >
        {{ text }}
        </v-snackbar>

    </v-app>
</template>

<script>

import loginService from '../services/login'

export default {
    data() {
        return {
            dialog: false,
            snackbar: false,
            color: 'error',
            mode: '',
            timeout: 1000,
            text: '',
            usuario: {
                nm_login: '',
                nm_senha: ''
            }
        }
    },
    methods: {
        logar(){
            this.dialog = true
            loginService.logar(this.usuario).then(
                (response) => {

                    if(response.data.cod != 1) {

                        setTimeout(() => {
                            this.dialog = false
                            this.snackbar = true
                            this.text = response.data.msg
                        }, 1000)

                    } else {

                        setTimeout(() => {
                            this.dialog = false
                            this.$store.state.usuario = response.data.usr[0]
                            this.$store.state.grupo = response.data.grupo
                            this.$router.push('/dashboard')
                        }, 1000)

                    }
                }
            ).catch(
                (error) => {
                    console.log(error)
                    
                    if(error) {
                        setTimeout(() => {
                            this.dialog = false
                            this.snackbar = true
                            this.text = 'Servidor fora do ar!'
                        }, 500)
                    
                    }
                    
                }
            )
        
        }
    }
}
</script>

<style>
.content-login {
    
    background-color: #ececec
}
</style>
