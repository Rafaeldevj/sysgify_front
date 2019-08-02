import Vue from 'vue'
import Router from 'vue-router'

//componentes
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import Inicio from './components/Inicio.vue'
import Perfil from './components/Perfil.vue'

//componentes da gamificação
import Gamificacao from './components/gamificacao/GamificacaoInicio.vue'
import MissaoCadastro from './components/gamificacao/missao/MissaoCadastro.vue'
import MissaoListagem from './components/gamificacao/missao/MissaoListagem.vue'

//componentes da administração
import Administracao from './components/administracao/AdministracaoInicio.vue'
import UsuarioListagem from './components/administracao/usuario/UsuarioListagem.vue'
import UsuarioCadastro from './components/administracao/usuario/UsuarioCadastro.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/dashboard',
            component: Dashboard,
            redirect: '/dashboard/inicio',
            children: [
                {
                    path: 'inicio',
                    component: Inicio
                },
                {
                    path: 'perfil',
                    component: Perfil
                },
                {
                    path: 'admin',
                    component: Administracao
                },
                {
                    path: 'usuario_listagem',
                    component: UsuarioListagem
                },
                {
                    path: 'usuario_cadastro',
                    component: UsuarioCadastro
                },
                {
                    path: 'gamificacao',
                    component: Gamificacao
                },
                {
                    path: 'missao_cadastro',
                    component: MissaoCadastro
                },
                {
                    path: 'missao_listagem',
                    component: MissaoListagem
                },
                {
                    path: 'missao_cadastro/:id',
                    component: MissaoCadastro
                }
            ]
        },
    ]
})