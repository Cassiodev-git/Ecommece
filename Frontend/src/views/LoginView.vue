<script setup>
    import {useRouter} from "vue-router"
    import {ref} from "vue"
    import AuthService from "../services/AuthService.js"
    const router = useRouter()
    const loading = ref(false)
    const erro = ref(null)
    const email = ref("")
    const senha = ref("")
    async function login() {
        
        try{
            
            loading.value = true
            erro.value = null
            const resposta = await AuthService.login({
                email: email.value,
                senha: senha.value
            })
            router.push("/home")
        }catch{
            erro.value = "Credencias inválidas"
            loading.value = false
        }
    }
</script>
<template>
    <div class="container">
        <form @submit.prevent="login()">
            <h2 class="titulo">Compra<span class="sub-titulo">Fácil</span></h2>
            <input type="text" placeholder="Email..." name="email" v-model="email">
            <input type="password" placeholder="Senha..." name="senha" v-model="senha">
            <div class="resposta">
                <p v-if="loading" class="load">Carregando...</p>
                <p v-if="erro" class="erro">{{erro}}</p>
            </div>
            <button class="btn">Entrar</button>
            <router-link to="/cadastro" class="voltar-cria">Criar conta</router-link>
        </form>
    </div>
</template>
<style scoped>
.container {
    min-height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

form {
    width: 350px;
    height: 280px;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 00.19);
}
.titulo {
    color: #22C55E;
}
.sub-titulo {
    color: #FFFFFF;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
}

form h2 {
    text-align: center;
    margin-bottom: 10px;
    font-weight: 600;
    color: #333;
}

input {
    width: 90%;
    padding: 12px 14px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.2s ease;
}

input:focus {
    outline: none;
    border-color: #27ae60;
    box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.15);
}

input::placeholder {
    color: #aaa;
}

button {
    padding: 12px;
    border: none;
    border-radius: 8px;
    background-color: #27ae60;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

button:hover {
    background-color: #219150;
    transform: translateY(-2px);
}

button:active {
    transform: translateY(0);
}
.voltar-cria{
    text-align: center;
    text-decoration: none;
}
.resposta {
    min-height: 20px;
    text-align: center;
    font-size: 14px;
}
.load{
    text-align: center;
}
.erro{
    color: red;
    align-items: center;
}
</style>