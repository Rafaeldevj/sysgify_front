<template>
    <div>
        <v-layout row wrap>
            <v-flex grow pa-1>
                <h1>Cadastro de Item</h1>
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
                                    <v-toolbar-title class="white--text">Dados do Item</v-toolbar-title>
                                </v-flex>
                                <v-flex xs2>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <form @submit.prevent="salvarItem">
                        <v-card-text>
                            <v-container fluid grid-list-lg pa-1>
                                <v-layout row wrap>

                                    <v-flex xs12 md7>
                                        <v-text-field
                                                v-model="item.nm_item"
                                                label="Nome da Item"
                                                required
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 md5>
                                        <v-btn color="primary" @click="selecionarImagem">Imagem do Item</v-btn>
                                        <input v-show="false" ref="inputUpload" type="file" @change="onFilePicked">

                                    </v-flex>

                                </v-layout>

                                <v-layout row wrap>

                                    <v-flex xs5 md5>
                                        <v-text-field
                                                v-model="item.nu_valor"
                                                type="number"
                                                min="0"
                                                label="Valor do Item"
                                                required
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs7 md2>
                                        <v-checkbox
                                                style="float: right"
                                                v-model="item.fl_disponivel"
                                                color="primary"
                                                value="S"
                                                label="Item Disponível"
                                        ></v-checkbox>
                                    </v-flex>

                                </v-layout>

                                <v-layout row wrap>
                                    <v-flex xs12 md7>

                                        <v-textarea
                                                v-model="item.ds_descricao"
                                                label="Descrição do Item"
                                        ></v-textarea>

                                    </v-flex>

                                    <v-flex xs12 md5>
                                        <img :src="item.img_foto" height="140">
                                    </v-flex>

                                </v-layout>

                            </v-container>

                        </v-card-text>
                        <br>
                        <v-card-actions>
                            <v-btn type="submit" color="primary">
                                <v-icon>save</v-icon> &nbsp; SALVAR
                            </v-btn>
                            <v-btn type="reset" color="warning" @click="cancelarItem">
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
import lojaService from "../../../services/gamificacao/lojaService";
import LoaderSave from "../../loader/LoaderSave";
export default {
    components: {
        LoaderSave
    },
    data() {
        return {
            dialog: false,
            corLoader: 'primary',
            textoLoarder: 'Salvando Item',
            barraLoader: true,
            editando: false,
            item: {
                cd_item: '',
                nm_item: '',
                nu_valor: '',
                ds_descricao: '',
                fl_disponivel: 'S',
                img_foto: null
            }
        }
    },

    methods: {

        setLoader(cor, texto, barra){

            this.dialog = true
            this.corLoader = cor
            this.textoLoarder = texto
            this.barraLoader = barra
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

                this.item.img_foto = e.target.result;

            }
        },

        salvarItem() {

            this.dialog = true

            if (!this.editando) {

                lojaService.saveItem(this.item).then(
                    (response) => {

                        if (response.data.cd_item > 0) {

                            this.setLoader('success', 'Item salvo com sucesso!', false)

                            setTimeout(() => { this.navegar('/loja') }, 1500)

                        } else {

                            this.setLoader('error', 'Falha ao salvar Item!', false)
                        }

                    }
                ).catch(
                    () => {
                        this.setLoader('error', 'Falha no servidor!', false)
                    }
                ).finally(
                    () => {
                        setTimeout(() => { this.dialog = false}, 1500)
                    }
                )

            } else {

                //EDITAR ITEM
                lojaService.updateItem(this.item).then(
                    (response) => {

                        if (response.data == 1) {

                            this.setLoader('success', 'Item atualizado com sucesso!', false)
                            setTimeout(() => { this.navegar('/dashboard/loja')}, 1500)


                        } else {

                            this.setLoader('error', 'Falha ao atualizar Item!', false)
                        }

                    }
                ).catch(
                    () => {
                        this.setLoader('error', 'Falha no servidor!', false)
                    }
                ).finally(
                    () => {
                        setTimeout(() => { this.dialog = false}, 1500)
                    }
                )

            }

        },

        verificaItemEdicao() {

            const item = this.$route.params.id

            if (item != undefined) {

                lojaService.getItem(item).then(
                    (response) => {
                        if (response.data.cd_item > 0) {

                            this.editando = true
                            this.item = response.data

                        } else {

                            this.editando = false
                            alert('Item não existente!')
                        }

                        //this.item = response.data
                    }
                )
            }

        },

        cancelarItem() {

            const item = this.$route.params.id

            if (item != undefined) {

                this.navegar('/dashboard/loja')

            } else {

                this.navegar('loja')
            }
        }

    },

    mounted() {
        this.verificaItemEdicao()
    }
}
</script>

<style scoped>

</style>