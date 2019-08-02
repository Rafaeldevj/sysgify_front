<template>
    <div>
        <v-layout row wrap>
            <v-flex grow pa-1>
                <h1>Perfil</h1>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex grow pa-1 md4 xs12>
                
                <v-card flat class="text-xs-center ma-3" elevation="5">
                    <v-card-text>
                        <div class="subheading titulo">
                            <h3><strong>Dados Gerais</strong></h3>
                        </div>
                    </v-card-text>
                    <v-list>
                        <v-divider></v-divider>
                    </v-list>
                    <div v-if="!carregando" class="dados">
                        <v-responsive class="pt-4">
                            <v-avatar size="80">
                                <img :src="img_usuario">
                            </v-avatar>
                        </v-responsive>
                        
                        <v-card-text>
                            <div class="subheading">
                                <strong>{{ this.$store.state.usuario.nm_usuario }}</strong>
                            </div>
                            <v-container fluid grid-list-lg pa-1>
                                <v-layout row wrap>
                                    
                                    <v-flex xs12 md6>
                                        <div class="subheading">
                                            <v-progress-circular
                                            :rotate="-90"
                                            :size="85"
                                            :width="15"
                                            :value="progresso"
                                            color="primary"
                                            dark
                                            >
                                                <strong>{{ this.$store.state.usuario.nu_nivel  }}</strong>
                                            </v-progress-circular>
                                        </div>
                                        <div class="subheading">
                                            XP: <strong>{{ this.$store.state.usuario.nu_experiencia }}/{{ nivel_xp_max }}</strong> ({{ this.progresso }}%)
                                        </div>
                                    </v-flex>

                                    <v-flex xs12 md6>
                                        <div class="subheading">
                                            <v-responsive class="pt-1">
                                                <v-avatar size="80" tile>
                                                    <img :src="img_moedas">
                                                </v-avatar>
                                            </v-responsive>
                                        </div>
                                        <div class="subheading">
                                            Moedas: <strong>{{ this.$store.state.usuario.nu_moedas }}</strong>
                                        </div>
                                    </v-flex>

                                </v-layout>
                            </v-container>
                            
                            <v-list>
                                <v-divider></v-divider>

                                <v-list-tile>

                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-list-tile-action v-on="on">
                                                <v-icon color="indigo" class="icone_perfil">account_circle</v-icon>
                                            </v-list-tile-action>
                                        </template>
                                        <span>Nome de Usuário</span>
                                    </v-tooltip>

                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ this.$store.state.usuario.nm_usuario }}</v-list-tile-title>
                                    </v-list-tile-content>

                                </v-list-tile>

                                <v-list-tile>

                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-list-tile-action v-on="on">
                                                <v-icon color="indigo" class="icone_perfil">group</v-icon>
                                            </v-list-tile-action>
                                        </template>
                                        <span>Grupo</span>
                                    </v-tooltip>

                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ this.$store.state.grupo.nm_grupo }}</v-list-tile-title>
                                    </v-list-tile-content>

                                </v-list-tile>

                                <v-list-tile>

                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-list-tile-action v-on="on">
                                                <v-icon color="indigo" class="icone_perfil">email</v-icon>
                                            </v-list-tile-action>
                                        </template>
                                        <span>Email</span>
                                    </v-tooltip>

                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ this.$store.state.usuario.nm_email }}</v-list-tile-title>
                                    </v-list-tile-content>
                                    
                                </v-list-tile>

                                <v-list-tile>

                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-list-tile-action v-on="on">
                                                <v-icon color="indigo" class="icone_perfil">how_to_reg</v-icon>
                                            </v-list-tile-action>
                                        </template>
                                        <span>Status do Usuário</span>
                                    </v-tooltip>

                                    <v-list-tile-content>
                                        <v-list-tile-title>Ativo</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                
                                <v-list-tile>

                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-list-tile-action v-on="on">
                                                <v-icon color="indigo" class="icone_perfil">calendar_today</v-icon>
                                            </v-list-tile-action>
                                        </template>
                                        <span>Data de Cadastro</span>
                                    </v-tooltip>

                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ refatoraDataTabela(this.$store.state.usuario.dt_cadastro) }}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                                                
                        </v-card-text>
                    </div>
                    <div class="text-xs-center" v-else>
                        <Loader />
                        <h3>Carregando</h3>
                        <br>
                        
                    </div>
                    
                </v-card>

            </v-flex>

            <v-flex grow pa-1 md8 xs12>
                
                <v-card flat class="text-xs-center ma-3" elevation="5" >
                    <v-card-text>
                        <div class="subheading titulo">
                            <h3><strong>Conquistas</strong></h3>
                        </div>
                    </v-card-text>
                    <v-list>
                        <v-divider></v-divider>
                    </v-list>
                    <div v-if="!carregando" class="dados">
                        
                        <v-card-text>
                            <div class="subheading titulo">
                                <h4>Nenhuma conquista realizada!</h4>
                            </div>           
                        </v-card-text>
                    </div>
                    <div class="text-xs-center" v-else>
                        <Loader />
                        <h3>Carregando</h3>
                        <br>
                    </div>
                    
                </v-card>

            </v-flex>

        </v-layout>
    </div>
</template>

<script>

import perfilService from '../services/perfil'
import Loader from './loader/Loader'

export default {
    components: {
        Loader
    },
    data() {
        return{
            img_usuario: './images/profile/man.png',
            img_moedas: './images/coins.png',
            progresso: 0,
            carregando: true,
            nivel_xp_max: 0
        }
    },
    methods: {

        informacaoNivel() {
            perfilService.infoNivel(this.$store.state.usuario.nu_nivel).then(
                (response) => {
                    this.nivel_xp_max = response.data[0].nu_nivel_max_xp
                    
                }
            ).finally(() => {
                setTimeout(() => {
                    this.getProgresso()
                }, 1500);
                
            })
        },

        getProgresso() {
            
            this.progresso = ((this.$store.state.usuario.nu_experiencia * 100)/this.nivel_xp_max)
            this.progresso = parseFloat(this.progresso.toFixed(2))
            this.carregando = false
        },

        refatoraDataTabela(data){

            if (data != null) {
                let dia = data.slice(8,10);
                let mes = data.slice(5,7);
                let ano = data.slice(0,4);
                let hora = data.slice(11,13);
                let minuto = data.slice(14,16);
                let segundo = data.slice(17, 19)

                return `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
            } else {
                return "";
            }

        }

    },
    mounted() {
        
        this.informacaoNivel()
    }
}
</script>

<style>

.dados {
    margin-top: -10px;
}

.titulo {
    margin-bottom: -10px;
}

.icone_perfil {
    cursor: pointer;
}

</style>
