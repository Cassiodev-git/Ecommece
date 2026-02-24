<script setup>
import { ref, onMounted } from "vue"
import categoriaService from "../../services/categoriaService";
import produtosServices from "../../services/produtosServices";
const categorias = ref([])
const loading = ref(false)
const erro = ref(null)
const novoProduto = ref({
    nome: '',
    preco: 0,
    quantidade: 0,
    imagem: '',
    categoriaId: null
})
const mensagem = ref(null)
const tipoMensagem = ref(null)


async function carregarCategorias() {
    try {
        loading.value = true
        erro.value = null
        categorias.value = await categoriaService.listarCategorias()
    } catch (e) {
        erro.value = "Erro ao carregar as categorias"
    } finally {
        loading.value = false
    }
}
onMounted(() => {
    carregarCategorias()
})

async function salvarProduto() {
    try {
        mensagem.value = null
        tipoMensagem.value = null
        const response = await produtosServices.criar(novoProduto.value)
        if (response.success) {
            mensagem.value = "Produto cadastrado com sucesso!"
            tipoMensagem.value = "success"
            novoProduto.value = {
                nome: '',
                preco: 0,
                quantidade: 0,
                imagem: '',
                categoriaId: null
            }
        } else {
            mensagem.value = "Não foi possível cadastrar o produto."
            tipoMensagem.value = "error"
        }
    } catch (error) {
        mensagem.value = "Erro ao cadastrar produto."
        tipoMensagem.value = "error"
    }
}
</script>
<template>
    <div class="admin-layout">

        <aside class="sidebar">
            <div>
                <h2 class="logo">Painel</h2>

                <nav class="menu">
                    <ul>
                        <li>
                            <router-link to="/admin">Central</router-link>
                        </li>
                        <li>
                            <router-link to="/admin/produtos">Novo Produto</router-link>
                        </li>
                        <li>
                            <router-link to="/admin/usuarios">Usuários</router-link>
                        </li>
                        <li>
                            <router-link to="/admin/categoria">Categoria</router-link>
                        </li>
                    </ul>
                </nav>
            </div>

            <router-link to="/home" class="btn-sair">
                Sair
            </router-link>
        </aside>
        <main class="main-content">

            <header class="header">
                <h1>Cadastrar Produto</h1>
            </header>

            <section class="content">

                

                <div class="form-card">
                    <div v-if="mensagem" :class="['alerta', tipoMensagem === 'success' ? 'sucesso' : 'erro']">
                    {{ mensagem }}
                    </div>
                    <div class="form-group">
                        <label>Nome do Produto</label>
                        <input type="text" placeholder="Digite o nome do produto" v-model="novoProduto.nome" />
                    </div>

                    <div class="form-group">
                        <label>Preço</label>
                        <input type="number" placeholder="Digite o preço" v-model="novoProduto.preco" />
                    </div>

                    <div class="form-group">
                        <label>Quantidade em Estoque</label>
                        <input type="number" placeholder="Digite a quantidade" v-model="novoProduto.quantidade" />
                    </div>
                    <div class="form-group">
                        <label>Url da imagem</label>
                        <input type="text" placeholder="Cole a url da imagem" v-model="novoProduto.imagem" />
                    </div>

                    <div class="form-group">
                        <label>Categoria</label>
                        <select v-model="novoProduto.categoriaId">

                            <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
                                {{ categoria.nome }}
                            </option>
                        </select>
                    </div>

                    <div class="form-actions">
                        <button class="btn-salvar" @click="salvarProduto()">
                            Salvar Produto
                        </button>
                    </div>

                </div>
            </section>

        </main>


    </div>
</template>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
}
.admin-layout {
    display: flex;
    min-height: 100vh;
    background-color: #f3f4f6;
}

.sidebar {
    width: 240px;
    background-color: #111827;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
}

.logo {
    margin-bottom: 30px;
    font-size: 18px;
    font-weight: bold;
}

.menu ul {
    list-style: none;
    font-size: 14px;
    
}

.menu li {
    margin-bottom: 15px;
}

.menu a {
    text-decoration: none;
    color: #d1d5db;
    transition: 0.2s;
}

.menu a:hover {
    color: #ffffff;
}

.btn-sair {
    text-decoration: none;
    margin-top: 70vh;
    display: flex;
    justify-content: center;
    width: 180px;
    padding: 10px;
    background-color: #dc2626;
    border: none;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s;
}

.btn-sair:hover {
    background-color: #b91c1c;
}

.main-content {
    flex: 1;
    padding: 30px;
    display: flex;
    flex-direction: column;
}

.content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}


.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.header h1 {
    font-size: 24px;
}

.btn-voltar {
    text-decoration: none;
    background-color: #2563eb;
    color: white;
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 14px;
    transition: 0.2s;
}

.btn-voltar:hover {
    background-color: #1d4ed8;
}
.form-card {
    background-color: white;
    padding: 30px;
    border-radius: 12px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}
.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

.form-group label {
    margin-bottom: 6px;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
}

.form-group input,
.form-group select {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    font-size: 14px;
    outline: none;
    transition: 0.2s;
}

.form-group input:focus,
.form-group select:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}


.form-actions {
    display: flex;
    gap: 15px;
    margin-top: 10px;
}

.btn-salvar {
    background-color: #10b981;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: 0.2s;
}

.btn-salvar:hover {
    background-color: #059669;
}

.alerta {
    margin-bottom: 15px;
    padding: 12px;
    border-radius: 8px;
    font-size: 14px;
    text-align: center;
}

.sucesso {
    background-color: #d1fae5;
    color: #065f46;
}

.erro {
    background-color: #fee2e2;
    color: #991b1b;
}

@media (max-width: 768px) {

    .admin-layout {
        flex-direction: column;
        height: auto;
    }

    .sidebar {
        width: auto;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 10px 15px;
    }

    .sidebar>div {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .logo {
        margin-bottom: 0;
        font-size: 16px;
    }

    .menu ul {
        display: flex;
        gap: 12px;
    }

    .menu li {
        margin-bottom: 0;
    }

    .menu a {
        font-size: 13px;
    }

    .btn-sair {
        width: auto;
        padding: 6px 12px;
        font-size: 12px;
        margin-top: 0;
    }

    .main-content {
        padding: 20px;
    }
}

@media (max-width: 600px) {
    .form-card {
        padding: 20px;
    }

    .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }

    .form-actions {
        flex-direction: column;
    }

    .btn-salvar,
    .btn-cancelar {
        width: auto;
        text-align: center;
    }
}
</style>
