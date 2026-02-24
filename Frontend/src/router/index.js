import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CarrinhoView from '../views/CarrinhoView.vue'
import AuthService from '../services/AuthService.js'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/admin/AdminView.vue'
import AdminProdutos from '../views/admin/AdminProdutos.vue'
import PerfilView from '../views/PerfilView.vue'
import AdminUsuariosView from '../views/admin/AdminUsuariosView.vue'
import AdminCategoria from '../views/admin/AdminCategoria.vue'
import CadastroView from '../views/CadastroView.vue'


const routes = [
    {
        path: "/",
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: {layout: "auth"}
        
    },
    {
        path:'/home',
        name: 'home',
        component: HomeView,
        meta:{requiresAuth: true }
    },
    {
        path: '/carrinho',
        name: 'carrinho',
        component: CarrinhoView,
        meta:{requiresAuth: true }
    },
    {
        path: '/admin',
        name: 'admin',
        component: AdminView,
        meta: {requiresAuth: true, requiresAdmin: true, layout: "auth"}
    },
    {
        path: '/admin/produtos',
        component: AdminProdutos,
        meta: {requiresAuth: true, requiresAdmin: true, layout: "auth"}
    },
    {
        path: '/admin/usuarios',
        component: AdminUsuariosView,
        meta: {requiresAuth: true, requiresAdmin: true, layout: "auth"}
    },
    {
        path: '/admin/categoria',
        component: AdminCategoria,
        meta: {requiresAuth: true, requiresAdmin: true, layout: "auth"}
    },
    {
        path: '/cadastro',
        component: CadastroView,
        meta: {layout: 'auth'}
    },
    {
        path: '/perfil',
        name: 'perfil',
        component: PerfilView,
        meta: {requiresAuth: true}
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const autenticado = AuthService.authToken()
    const admin = AuthService.admin()
    if(to.meta.requiresAuth && !autenticado){
        next("/login")
    }else if (to.meta.requiresAdmin && !admin){
        next("/")
    }else{
        next()
    }
}) 
export default router