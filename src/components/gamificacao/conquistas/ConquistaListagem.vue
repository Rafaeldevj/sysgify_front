<template>
    <div>
        <v-layout row wrap>
            <v-flex grow pa-1>
                <h2>Conquistas</h2>
            </v-flex>
        </v-layout>

        <v-layout row wrap>

            <v-flex xs12 md3 v-for="item in listaConquistas" :key="item.cd_conquista">

                <v-card flat class="text-xs-center ma-3" elevation="5" dark>
                    <v-responsive class="pt-4">
                        <v-avatar tile>
                            <img :src="item.img_foto">
                        </v-avatar>
                    </v-responsive>
                    <v-card-text>
                        <div class="subheading">
                            {{ item.nm_conquista }}
                        </div>
                        <div class="grey--text">
                            Número de missões para realizar: {{ item.nu_qtd_missoes }}
                        </div>
                    </v-card-text>
                    <!--<div class="text-xs-center">
                        <v-card-actions>
                            <v-btn block color="teal" style="color: white">
                                <span>Acessar</span>
                            </v-btn>
                        </v-card-actions>
                    </div>-->
                </v-card>

            </v-flex>

        </v-layout>

    </div>
</template>

<script>
import conquista from "../../../services/gamificacao/conquista";
export default {
    data() {
        return {
            listaConquistas: []
        }
    },
    methods: {
        carregaConquistas() {
            conquista.getConquistas().then(
                (response) => {
                    this.listaConquistas = response.data
                }
            )
        }
    },
    mounted() {
        this.carregaConquistas()
    }
}
</script>

<style scoped>

</style>