<template>
    <div>
        <div>
            <v-layout row wrap>
                <v-flex grow pa-1>
                    <h1>Administração</h1>
                </v-flex>
                
            </v-layout>
        </div>
        <v-layout row wrap>

            <v-flex xs12 sm6 md4 lg3 v-for="item in gamification" :key="item.nome">
                
                <v-card flat class="text-xs-center ma-3" elevation="5" dark>
                    <v-responsive class="pt-4">
                        <v-avatar>
                            <v-icon class="teal">{{ item.icone }}</v-icon>
                        </v-avatar>
                    </v-responsive>
                    <v-card-text>
                        <div class="subheading">
                            {{ item.nome }}
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
                { nome: 'Usuários' , icone: 'person' , rota: '/dashboard/usuario_listagem'},
                { nome: 'Grupos' , icone: 'group' , rota: '/dashboard/admin'},
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
