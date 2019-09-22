<template>
    <div>
        <v-layout row wrap>
            <v-flex grow pa-1>
                <h1>Ativar Item</h1>
            </v-flex>
        </v-layout>
        <v-layout align-center justify-center row fill-height>
            <v-flex xs12 pa-2 md4>
                <v-card class="text-md-center">
                    <v-toolbar card prominent dark color="primary">
                        <v-container fluid grid-list-xl pa-1>
                            <v-layout row justify-space-between>
                                <v-flex xs2>
                                </v-flex>
                                <v-flex xs8 md8>
                                    <v-toolbar-title class="white--text">Código de Ativação do Item</v-toolbar-title>
                                </v-flex>
                                <v-flex xs2>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-container fluid grid-list-lg pa-1 class="text-xs-center">
                            <v-layout row wrap align-center justify-center>
                                <v-flex md-3></v-flex>
                                <v-flex xs12 md6>
                                    <v-text-field
                                            prepend-inner-icon="code"
                                            style="font-size: x-large; text-align: center"
                                            placeholder="Código"
                                            maxlength="5"
                                            solo
                                    ></v-text-field>
                                </v-flex>
                                <v-flex md-3>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions style="margin-top: -20px">
                        <v-btn type="button" color="primary" block>
                            <v-icon>power_settings_new</v-icon> &nbsp; Ativar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>

    </div>
</template>

<script>
export default {
    data() {
        return {
            mascara: 'NN'
        }
    }
}
</script>

<style scoped>

</style>