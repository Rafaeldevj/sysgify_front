<template>
    <div>
        <v-navigation-drawer
            clipped
            fixed
            v-model="drawer"
            dark
            app
            >

            <v-toolbar flat class="transparent">
                <v-list class="pa-0">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="../../assets/images/profile/man.png">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ this.$store.state.usuario.nm_usuario }}
                        </v-list-tile-title>
                        <v-list-tile-sub-title>
                            <strong>Nível: {{ this.$store.state.usuario.nu_nivel }}</strong>
                            
                            <span class="dados_moeda"><strong>Moedas: {{ this.$store.state.usuario.nu_moedas }}</strong></span>
                        </v-list-tile-sub-title>
                    </v-list-tile-content>

                </v-list-tile>
                </v-list>
            </v-toolbar>

            <v-list class="pt-0" dense>

                <v-divider></v-divider>

                <v-list-tile v-for="(item, index) in menu" @click="navegar(item.caminho)" :key="index">
                    <v-list-tile-action>
                        <v-icon >{{ item.icone }}</v-icon>
                    </v-list-tile-action>
                    
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.nome }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

            </v-list>
        </v-navigation-drawer>

        <v-toolbar app fixed clipped-left dark color="blue darken-3">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Sysgify</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" icon>
                        <v-badge overlap color="red">
                            <template v-slot:badge>
                                3
                            </template>
                            <v-icon large>notification_important</v-icon>
                        </v-badge>
                    </v-btn>
                </template>
                <span>Notificações</span>
            </v-tooltip>

        </v-toolbar>
    </div>
</template>

<script>
export default {
    data(){
        return {
            drawer: true,
            menu: [
                { caminho: '/dashboard', icone: 'home', nome: 'Início' },
                { caminho: '/dashboard/perfil', icone: 'person', nome: 'Perfil' },
                { caminho: '/dashboard/admin', icone: 'account_balance', nome: 'Administração' },
                { caminho: '/dashboard/gamificacao', icone: 'games', nome: 'Gamificação' },
                { caminho: '/dashboard', icone: 'history', nome: 'Histórico' },
                { caminho: '/login', icone: 'input', nome: 'Sair' }
            ]
        }
    },
    methods: {
       
        navegar(pagina) {
            this.$router.push(pagina)
        }
    
    }
}
</script>

<style>
.dados_moeda {
    float: right;
    color: gold;
}
</style>
