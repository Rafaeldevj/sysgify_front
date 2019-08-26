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

                                    <v-flex xs12 md6>
                                        <v-text-field
                                                v-model="item.nm_item"
                                                label="Nome da Item"
                                                required
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 md3>
                                        <v-text-field
                                                v-model="item.nu_valor"
                                                type="number"
                                                min="0"
                                                label="Valor do Item"
                                                required
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 md3>
                                        <v-checkbox
                                                v-model="item.fl_disponivel"
                                                color="primary"
                                                value="S"
                                                label="Item Disponível"
                                        ></v-checkbox>
                                    </v-flex>

                                </v-layout>

                                <v-layout row wrap>
                                    <v-flex xs12 md12>

                                        <v-textarea
                                                v-model="item.ds_descricao"
                                                label="Descrição da Missão"
                                        ></v-textarea>

                                    </v-flex>
                                </v-layout>

                                <v-layout row wrap>
                                    <v-flex xs12 md12>

                                        <input v-show="false" ref="inputUpload" type="file" @change="onFilePicked">
                                        <img :src="item.img_foto" height="150">

                                    </v-flex>
                                </v-layout>

                                <v-btn color="primary" @click="selecionarImagem">Imagem do Item</v-btn>

                            </v-container>

                        </v-card-text>
                        <v-card-actions>
                            <v-btn type="submit" color="primary">
                                <v-icon>save</v-icon> &nbsp; SALVAR
                            </v-btn>
                            <v-btn type="reset" color="warning" >
                                <v-icon>clear</v-icon> &nbsp; CANCELAR
                            </v-btn>
                        </v-card-actions>
                    </form>
                </v-card>
            </v-flex>
        </v-layout>

    </div>
</template>

<script>
export default {
    data() {
        return {
            item: {
                cd_item: '',
                nm_item: '',
                nu_valor: '',
                ds_descricao: '',
                fl_disponivel: 'S',
                img_foto: ''
            }
        }
    },

    methods: {

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
            console.log(this.item)
        }

    }
}
</script>

<style scoped>

</style>