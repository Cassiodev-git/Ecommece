<script setup>
import { ref, onMounted } from "vue"
import categoriaService from "../../services/categoriaService";
const categorias = ref([])
const loading = ref(false)
const erro = ref(null)
const editandoId = ref(null)
const nomeEditado = ref('')
const novaCategoria = {
    nome: '',
}
async function carregarCategorias() {
    try {
        loading.value = true
        erro.value = null
        categorias.value = await categoriaService.listarCategorias()
    } catch {
        erro.value = "Erro ao carregar categorias"
    } finally {
        loading.value = false
    }
}
async function salvarCategoria() {
    await categoriaService.novaCategoria(novaCategoria)
    carregarCategorias()
}
async function removerCategoria(id) {
    await categoriaService.removerCategoria(id)
    carregarCategorias()
}
function iniciarEdicao(categoria) {
    editandoId.value = categoria.id
    nomeEditado.value = categoria.nome
}

function cancelarEdicao() {
    editandoId.value = null
    nomeEditado.value = ''
}

async function atualizarCategoria(id) {
    try {
        await categoriaService.atualizarCategoria(id, {
            nome: nomeEditado.value
        })

        cancelarEdicao()
        carregarCategorias()

    } catch (e) {
        erro.value = "Erro ao atualizar categoria"
    }
}
onMounted(() => {
    carregarCategorias()
})
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
        <div class="categoria-container">

            <h1 class="titulo">Gerenciar Categorias</h1>

            <div class="card">
                <h2>Nova Categoria</h2>

                <div class="form-group">
                    <input type="text" placeholder="Nome da categoria" class="input" v-model="novaCategoria.nome" />
                    <button class="btn-primary" @click="salvarCategoria()">
                        Cadastrar
                    </button>

                </div>
            </div>

            <div class="card">
                <h2>Lista de Categorias</h2>
                <p v-if="loading">Carregando...</p>
                <p v-if="erro" class="erro-msg">
                    {{ erro }}
                </p>
                <ul class="lista">

                    <li class="item" v-for="categoria in categorias" :key="categoria.id">

                        <template v-if="editandoId === categoria.id">

                            <input type="text" class="input-edit" v-model="nomeEditado" />

                            <div class="acoes">
                                <button class="btn-save" @click="atualizarCategoria(categoria.id)">
                                    Salvar
                                </button>

                                <button class="btn-cancel" @click="cancelarEdicao">
                                    Cancelar
                                </button>
                            </div>

                        </template>

                        <template v-else>

                            <span>{{ categoria.nome }}</span>

                            <div class="acoes">
                                <button class="btn-edit" @click="iniciarEdicao(categoria)">
                                    Editar
                                </button>

                                <button class="btn-delete" @click="removerCategoria(categoria.id)">
                                    Excluir
                                </button>
                            </div>

                        </template>

                    </li>

                </ul>

            </div>

        </div>

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
    padding: 6px 12px;
    display: flex;
    justify-content: center;
    background-color: #dc2626;
    color: white;
    border-radius: 6px;
    transition: 0.3s;
}

.btn-sair:hover {
    background-color: #b91c1c;
}


.categoria-container {
    flex: 1;
    padding: 30px;
    background-color: #f3f4f6;
}

.titulo {
    font-size: 22px;
    margin-bottom: 25px;
    font-weight: bold;
    color: #111827;
}

.card {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    margin-bottom: 25px;
}

.card h2 {
    font-size: 16px;
    margin-bottom: 15px;
    color: #374151;
}

.form-group {
    display: flex;
    gap: 10px;
}

.input {
    flex: 1;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #d1d5db;
    outline: none;
    font-size: 14px;
}

.input:focus {
    border-color: #2563eb;
}

.btn-primary {
    padding: 10px 18px;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s;
}

.btn-primary:hover {
    background-color: #1d4ed8;
}

.lista {
    list-style: none;
    max-height: 300px;
    overflow-y: auto;
    padding-right: 5px;
}

.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 10px;
    border-bottom: 1px solid #e5e7eb;
}

.item:last-child {
    border-bottom: none;
}

.btn-delete {
    padding: 6px 12px;
    background-color: #dc2626;
    border: none;
    color: white;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
    transition: 0.3s;
}

.btn-delete:hover {
    background-color: #b91c1c;
}

.acoes {
    display: flex;
    gap: 8px;
}

.btn-edit {
    padding: 6px 12px;
    background-color: #f59e0b;
    border: none;
    color: white;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
    transition: 0.3s;
}

.btn-edit:hover {
    background-color: #d97706;
}

.btn-save {
    padding: 6px 12px;
    background-color: #16a34a;
    border: none;
    color: white;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
}

.btn-save:hover {
    background-color: #15803d;
}

.btn-cancel {
    padding: 6px 12px;
    background-color: #6b7280;
    border: none;
    color: white;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
}

.erro-msg {
    margin-top: 10px;
    color: #dc2626;
    font-size: 13px;
}

.input-edit {
    flex: 1;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #d1d5db;
}

@media (max-width: 768px) {

    .admin-layout {
        flex-direction: column;
    }

    .sidebar {
        width: 100%;
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
        padding: 6px 12px;
        font-size: 12px;
    }

    .form-group {
        flex-direction: column;
    }

    .btn-primary {
        width: 100%;
    }

    .item {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }

    .btn-delete {
        align-self: flex-end;
    }
}
</style>