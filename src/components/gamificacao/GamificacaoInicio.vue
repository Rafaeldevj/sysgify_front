<template>
    <div>
        <div>
            <v-layout row wrap>
                <v-flex grow pa-1>
                    <h2>Gamificação</h2>
                </v-flex>
                
            </v-layout>
        </div>
        <v-layout row wrap>

            <v-flex xs12 sm6 md4 lg3 v-for="item in gamification" :key="item.nome">
                
                <v-card flat class="text-xs-center ma-3" elevation="5" dark>
                    <v-responsive class="pt-4">
                        <v-avatar>
                            <img :src="item.imagem">
                        </v-avatar>
                    </v-responsive>
                    <v-card-text>
                        <div class="subheading">
                            {{ item.nome }}
                        </div>
                        <div class="grey--text">
                           {{ item.descricao }}
                        </div>
                    </v-card-text>
                    <div class="text-xs-center">
                        <v-card-actions>
                            <v-btn block color="teal" style="color: white" @click="navegar(item.rota)">
                                <span>Acessar</span>
                            </v-btn>
                        </v-card-actions>
                    </div>
                </v-card>

            </v-flex>

        </v-layout>
    </div>
</template>

<script>
export default {
    data () {
        return {
            modoCards: false,
            gamification:[
                //{ nome: 'Pontos', descricao: 'Pontos para os usuários' , imagem: './images/coin.png' , rota: '/dashboard/gamificacao'},
                //{ nome: 'Medalhas', descricao: 'Medalhas para os usuários' , imagem: './images/medal.png' , rota: '/dashboard/gamificacao'},
                { nome: 'Conquistas', descricao: 'Conquistas para os usuários' , imagem: './images/rank.png' , rota: '/dashboard/conquistas'},
                //{ nome: 'Níveis', descricao: 'Níveis para os usuários' , imagem: './images/level.png' , rota: '/gamificacao'},
                { nome: 'Ranking', descricao: 'Ranking para os usuários' , imagem: './images/podium.png' , rota: '/dashboard/ranking'},
                { nome: 'Missões', descricao: 'Missões para os usuários' , imagem: './images/win.png' , rota: '/dashboard/missao_listagem'},
                //{ nome: 'Troféus', descricao: 'Troféus para os usuários' , imagem: './images/award.png' , rota: '/gamificacao'},
                { nome: 'Loja', descricao: 'Loja para os usuários' , imagem: './images/cart.png' , rota: '/gamificacao'},
                { nome: 'Equipes', descricao: 'Equipes compostas por usuários' , imagem: './images/team.png' , rota: '/dashboard/equipes'}
            ]

        }
    },

    methods:{

        navegar(pagina) {
            this.$router.push(pagina)
        }

    }
}
</script>

<style>

</style>
