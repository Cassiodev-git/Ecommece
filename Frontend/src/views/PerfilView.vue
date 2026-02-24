<script setup>
import { ref, onMounted } from "vue"
import usuarioService from '../services/usuarioService';
import AuthService from "../services/AuthService";
const usuario = ref({})
const loading = ref(false)
const erro = ref(null)
const mostrarModal = ref(false)
async function CarregarUsuario() {
    try {
        loading.value = true
        erro.value = null
        usuario.value = await usuarioService.listarUsuarioId()
    } catch {
        erro.value = "Não foi possível recuperar os dados"
    } finally {
        loading.value = false
    }
}
async function logout(){
    AuthService.logout()
    window.location.href = '/login'
}
onMounted(() => {
    CarregarUsuario()
})
</script>
<template>
    <div class="perfil-layout">
        <div class="perfil-card">

            <div class="perfil-avatar">
                <img src="/src/assets/perfil.png" alt="Usuario" class="avatar-circle" />
            </div>
            <button class="btn-logout" @click="logout()">Sair</button>


            <h2 class="perfil-nome">
                {{ usuario.nome }}
            </h2>


            <p class="perfil-email">
                {{ usuario.email }}
            </p>


            <span class="perfil-badge">
                Tipo de Conta
            </span>

            <div v-if="usuario && usuario.adm" class="admin-section">
                <h3>Área Administrativa</h3>

                <p>Você possui permissões administrativas no sistema.</p>

                <router-link to="/admin" class="btn-admin">
                    Acessar Painel
                </router-link>
            </div>
            <div class="pedidos-section">
                <h3>Meus Pedidos</h3>
                <div class="pedidos-box">
                    Você ainda não possui pedidos.
                </div>
            </div>

        </div>
    </div>

</template>
<style scoped>
.perfil-layout {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 80px;
    background: linear-gradient(145deg, #eef2f7, #e2e8f0);
    padding: 20px;
    font-family: Arial, Helvetica, sans-serif;
}

.perfil-card {
    width: 100%;
    max-width: 420px;
    background: #ffffff;
    border-radius: 24px;
    padding: 45px 30px;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.08);
    text-align: center;
    transition: 0.3s ease;
}

.perfil-card:hover {
    transform: translateY(-4px);
}


.perfil-avatar {
    margin-bottom: 20px;
}

.avatar-circle {
    width: 110px;
    height: 110px;
    margin: 0 auto;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 38px;
    font-weight: bold;
    color: #ffffff;
    box-shadow: 0 15px 35px rgba(37, 99, 235, 0.35);
}

.btn-logout {
    margin-top: 10px;
    padding: 8px 18px;
    border-radius: 10px;
    background-color: #ef4444;
    color: white;
    font-size: 13px;
    border: none;
    cursor: pointer;
    transition: 0.2s ease;
}

.btn-logout:hover {
    background-color: #dc2626;
    transform: translateY(-2px);
}

.perfil-nome {
    margin-top: 15px;
    font-size: 22px;
    font-weight: 600;
    color: #111827;
}



.perfil-email {
    margin-top: 6px;
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 15px;
}


.perfil-badge {
    display: inline-block;
    padding: 6px 16px;
    border-radius: 20px;
    background-color: #e5e7eb;
    font-size: 12px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 35px;
}


.admin-section {
    background: #f8fafc;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 30px;
    border: 1px solid #e2e8f0;
}

.admin-section h3 {
    font-size: 16px;
    margin-bottom: 8px;
    color: #111827;
}

.admin-section p {
    font-size: 13px;
    color: #64748b;
    margin-bottom: 15px;
}

.btn-admin {
    display: inline-block;
    padding: 8px 18px;
    border-radius: 10px;
    background-color: #2563eb;
    color: #ffffff;
    font-size: 14px;
    text-decoration: none;
    transition: 0.2s ease;
}

.btn-admin:hover {
    background-color: #1e40af;
}

.pedidos-section h3 {
    font-size: 16px;
    margin-bottom: 10px;
}

.pedidos-box {
    background-color: #f1f5f9;
    padding: 18px;
    border-radius: 14px;
    font-size: 13px;
    color: #64748b;
}
</style>