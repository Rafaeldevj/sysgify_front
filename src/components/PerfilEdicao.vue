<template>
    <div>
        <v-layout row wrap>
            <v-flex grow pa-1>
                <h1>Edição do Perfil</h1>
            </v-flex>
        </v-layout>

        <v-layout row wrap class="box-perfil">

            <v-flex grow pa-1 md8 xs12>

                <v-card flat class="text-xs-center ma-3" elevation="5" >
                    <v-card-text>
                        <div class="subheading titulo">
                            <h3><strong>Dados</strong></h3>
                        </div>
                    </v-card-text>
                    <v-list>
                        <v-divider></v-divider>
                    </v-list>
                    <div class="dados">

                        <form @submit.prevent="atualizarDados">

                            <v-responsive class="pt-4">
                                <v-avatar size="100" class="image-picker" @click="selectImage">
                                    <img :src="img_usuario">
                                    <input v-show="false" ref="inputUpload" type="file" @change="onFilePicked">
                                </v-avatar>
                            </v-responsive>

                            <v-card-text>

                                <br>
                                <v-container fluid grid-list-lg pa-1>

                                    <v-layout row wrap>

                                        <v-flex xs12 md4>
                                            <v-text-field
                                                    v-model="usuario.nm_usuario"
                                                    label="Nome do Usuário"
                                                    required
                                            ></v-text-field>
                                        </v-flex>

                                        <v-flex xs12 md4>
                                            <v-text-field
                                                    v-model="usuario.nm_apelido"
                                                    label="Apelido do Usuário"
                                                    required
                                            ></v-text-field>
                                        </v-flex>

                                        <v-flex xs12 md4>
                                            <v-text-field
                                                    v-model="usuario.nm_email"
                                                    label="Email do Usuário"
                                                    required
                                            ></v-text-field>
                                        </v-flex>

                                    </v-layout>


                                </v-container>

                            </v-card-text>

                            <v-card-actions>
                                <v-btn @click="navegar('perfil')"><v-icon>clear</v-icon> Cancelar</v-btn>

                                <v-spacer></v-spacer>

                                <v-btn type="submit" color="primary">
                                    <v-icon>save</v-icon> Salvar</v-btn>
                            </v-card-actions>

                        </form>

                    </div>

                </v-card>

            </v-flex>

        </v-layout>

        <LoaderSave :texto="textoLoarder" :dialog="dialog" :cor="corLoader" :barra="barraLoader"></LoaderSave>

    </div>
</template>

<script>
import usuarioService from '../services/usuario/usuarioCadastro'
import LoaderSave from "./loader/LoaderSave"

export default {
    components: {
        LoaderSave
    },
    data() {
        return {
            dialog: false,
            corLoader: 'primary',
            textoLoarder: 'Salvando Dados',
            barraLoader: true,
            img_usuario: null,
            usuario: {
                cd_usuario: '',
                nm_usuario: '',
                nm_email: '',
                nm_apelido: '',
                img_foto: ''
            }
        }
    },
    created() {

        this.usuario = this.$store.state.usuario

        if (this.$store.state.usuario.img_foto != null) {
            this.img_usuario = this.$store.state.usuario.img_foto

        } else {
            this.img_usuario = "../assets/images/profile/man.png"
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

        selectImage() {

            this.$refs.inputUpload.click()
        },

        onFilePicked(event) {
            let imagem = event.target.files[0];
            if (imagem != undefined) {
                let reader = new FileReader();
                reader.readAsDataURL(imagem);
                reader.onload = e => {

                    this.img_usuario = e.target.result;
                    this.usuario.img_foto = e.target.result
                }
            }

        },

        atualizarDados() {

            this.dialog = true

            usuarioService.atualizar(this.usuario).then(
                (response) => {
                    if (response.data != null) {

                        this.$store.state.usuario = response.data

                        //MENSAGEM DE SUCESSO!

                        setTimeout(() => {
                            this.dialog = false

                            this.setLoader('success', 'Dados alterados com sucesso!', false)

                        }, 1500)

                    } else {

                        //MENSAGEM DE ERROR

                        setTimeout(() => {
                            this.dialog = false

                            this.setLoader('error', 'Falha ao alterar dados!', false)

                        }, 1500)

                    }
                }
            ).catch(
                () => {

                    //FALHA NO SERVIDOR
                    setTimeout(() => {
                        this.dialog = false

                        this.setLoader('error', 'Falha no servidor!', false)

                    }, 1500)

                }
            )
        },

        navegar(pagina) {
            this.$router.push(pagina)
        },
    }
}
</script>

<style>

    .dados {
        margin-top: -10px;
    }

    .box-perfil {
        display: flex;
        justify-content: center;
    }

    .image-picker {
        cursor: pointer;
    }

</style>