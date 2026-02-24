<script setup>
    import { ref, onMounted } from "vue"
    import usuarioService from "../services/usuarioService"
    const loading = ref(false)
    const erro = ref(null)
    const novoUsuario = {
        nome: '',
        email: '',
        senha: ''
    }
    async function cadastraUsuario(){
        try{
            loading.value = true
            erro.value = null
            await usuarioService.cadastrarUsuario(novoUsuario)
        }catch{
            erro.value = "Erro ao cadastrar o usuário"
        }finally{
            loading.value = false
        }
    }
</script>

<template>
    <div class="user-create-container">
        <div class="card">

            <div class="header">
                <h1 class="title">Cadastrar Usuário</h1>
                <p class="subtitle">Preencha os dados abaixo</p>
            </div>

            <form class="form">

                <div class="form-group">
                    <label>Nome</label>
                    <input type="text" placeholder="Digite o nome completo" v-model="novoUsuario.nome"/>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Digite o email" v-model="novoUsuario.email"/>
                </div>

                <div class="form-group">
                    <label>Senha</label>
                    <input type="password" placeholder="Digite a senha" v-model="novoUsuario.senha""/>
                </div>

                <button type="submit" class="btn-submit" @click="cadastraUsuario()">
                    Cadastrar
                </button>
                <router-link to="/login" class="voltar-login">Tenho conta</router-link>
            </form>

        </div>
    </div>
</template>

<style scoped>
.user-create-container {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: linear-gradient(135deg, #eef2ff, #f4f6f9);
}

.card {
    width: 100%;
    max-width: 480px;
    background: #ffffff;
    padding: 35px 30px;
    border-radius: 18px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
    animation: fadeIn 0.4s ease;
}

.header {
    margin-bottom: 25px;
    text-align: center;
}

.title {
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 6px;
    color: #111827;
}

.subtitle {
    font-size: 14px;
    color: #6b7280;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    font-size: 13px;
    margin-bottom: 6px;
    font-weight: 600;
    color: #374151;
}

.form-group input {
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    font-size: 14px;
    transition: all 0.25s ease;
    background: #f9fafb;
}

.form-group input:focus {
    border-color: #4f46e5;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
    outline: none;
}
.voltar-login{
    text-decoration: none;
    text-align: center;
    color: #6f69eb;
}
.btn-submit {
    margin-top: 10px;
    padding: 13px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: white;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.25s ease;
}

.btn-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3);
}

.btn-submit:active {
    transform: translateY(0);
    box-shadow: none;
}

@media (max-width: 768px) {
    .card {
        padding: 28px 22px;
        border-radius: 14px;
    }

    .title {
        font-size: 22px;
    }
}

@media (max-width: 480px) {
    .card {
        padding: 24px 18px;
    }

    .form-group input {
        padding: 11px;
    }

    .btn-submit {
        padding: 12px;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(15px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>