import Vue from 'vue'
import Router from 'vue-router'

//componentes
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import Inicio from './components/Inicio.vue'
import Perfil from './components/Perfil.vue'
import PerfilEdicao from "./components/PerfilEdicao"
import AnaliseMissoes from './components/analise/AnalisarMissoes.vue'

//componentes da gamificação
import Gamificacao from './components/gamificacao/GamificacaoInicio.vue'
import MissaoCadastro from './components/gamificacao/missao/MissaoCadastro.vue'
import MissaoListagem from './components/gamificacao/missao/MissaoListagem.vue'
import Ranking from './components/gamificacao/ranking/Ranking.vue'
import EquipeListagem from "./components/gamificacao/equipe/EquipeListagem";
import ItensListagem from "./components/gamificacao/loja/ItensListagem";
import ItensCadastro from "./components/gamificacao/loja/ItensCadastro";
import MeusItensListagem from "./components/gamificacao/loja/MeusItensListagem";
import AnalisarItens from "./components/analise/AnalisarItens";
import AtivarItem from "./components/gamificacao/loja/AtivarItem";
import MonitorMissoes from "./components/MonitorMissoes";
import ConquistaListagem from "./components/gamificacao/conquistas/ConquistaListagem";

//componentes da administração
import Administracao from './components/administracao/AdministracaoInicio.vue'
import UsuarioListagem from './components/administracao/usuario/UsuarioListagem.vue'
import UsuarioCadastro from './components/administracao/usuario/UsuarioCadastro.vue'
import GrupoListagem from "./components/administracao/grupo/GrupoListagem";

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
            redirect: '/dashboard/monitor',
            children: [
                {
                    path: 'inicio',
                    component: MonitorMissoes
                },
                {
                    path: 'perfil',
                    component: Perfil
                },
                {
                    path: 'perfil_edicao',
                    component: PerfilEdicao
                },
                {
                    path: 'meus_itens',
                    component: MeusItensListagem
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
                    path: 'grupo_listagem',
                    component: GrupoListagem
                },
                {
                    path: 'analise_missoes',
                    component: AnaliseMissoes
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
                },
                {
                    path: 'ranking',
                    component: Ranking
                },
                {
                    path: 'conquistas',
                    component: ConquistaListagem
                },
                {
                    path: 'equipes',
                    component: EquipeListagem
                },
                {
                    path: 'loja',
                    component: ItensListagem
                },
                {
                    path: 'item',
                    component: ItensCadastro
                },
                {
                    path: 'item/:id',
                    component: ItensCadastro
                },
                {
                    path: 'analisar_itens',
                    component: AnalisarItens
                },
                {
                    path: 'ativar_item',
                    component: AtivarItem
                },
                {
                    path: 'monitor',
                    component: MonitorMissoes
                }
            ]
        },
    ]
})