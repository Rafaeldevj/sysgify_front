<template>
    <div>
        <div>
            <v-layout row wrap>
                <v-flex grow pa-1>
                    <h1>Ranking</h1>
                </v-flex>
                
            </v-layout>
        </div>

        <v-layout row wrap>

            <v-flex xs12 sm6 md12>
                
                <v-card flat class="text-xs-center ma-3" elevation="5" dark>
                    <v-list two-line>
                        <template>

                            <v-list-tile
                            avatar
                            >
                            <v-list-tile-avatar>
                                <img src="../../../assets/images/profile/man.png">
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title>Rafael</v-list-tile-title>
                                <v-list-tile-sub-title> 1000 </v-list-tile-sub-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <h1>1º</h1>
                            </v-list-tile-action>
                            </v-list-tile>
                        </template>
                    </v-list>
                </v-card>

            </v-flex>
        </v-layout>

        
    </div>
</template>

<script>
import rankingService from '../../../services/gamificacao/ranking'

export default {
    data() {
        return {
            listaRanking: []
        }
    },
    methods: {

        carregaRanking() {

            rankingService.getRanking().then(
                (response) => {
                    console.log(response.data)
                    this.listaRanking = response.data
                }
            );
        }

    },
    mounted() {

        this.carregaRanking()
    }
}
</script>

<style>

</style>