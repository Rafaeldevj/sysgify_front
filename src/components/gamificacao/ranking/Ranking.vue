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

            <v-flex xs12 sm12 md12>
                
                <v-card flat class="text-xs-center ma-3" elevation="5" dark>

                    <template v-for="(item, index) in listaRanking">

                        <v-list-tile
                        :key="item.index"
                        avatar
                        >
                        <v-list-tile-avatar>
                            <img v-if="item.foto != null" :src="item.foto">
                            <img v-else src="../../../assets/images/profile/man.png">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>
                                <span class="yellow--text" v-if="$store.state.usuario.cd_usuario == item.id">{{ item.nome }}</span>
                                <span v-else>{{ item.nome }}</span>
                            </v-list-tile-title>
                            <v-list-tile-sub-title>Pontos: {{ item.pontos }} </v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>

                            <h1 v-if="item.posicao == 1" style="color: #FFC107">{{ item.posicao }}º</h1>
                            <h1 v-else-if="item.posicao == 2" style="color: grey">{{ item.posicao }}º</h1>
                            <h1 v-else-if="item.posicao == 3" style="color: #cd7f32">{{ item.posicao }}º</h1>
                            <h1 v-else>{{ item.posicao }}º</h1>

                        </v-list-tile-action>
                        </v-list-tile>

                        <v-divider
                        :key="index"
                        :inset="true"
                        ></v-divider>
                    </template>

                    
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