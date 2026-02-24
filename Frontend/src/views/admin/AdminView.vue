<script setup>
import { ref, onMounted } from "vue"
import produtosServices from "../../services/produtosServices";
import usuarioService from "../../services/usuarioService";
import categoriaService from "../../services/categoriaService";
const produtos = ref([])
const usuarios = ref([])
const loading = ref(false)
const erro = ref(null)
const mostrarModal = ref(false)
const produtoSelecionado = ref(null)
const produtoEditando = ref({
    nome: '',
    preco: 0,
    quantidade: 0,
    categoriaId: null
})

const categorias = ref([])


async function carregarProdutos() {
    try {
        loading.value = true
        erro.value = null
        produtos.value = await produtosServices.listarTodos()
        usuarios.value = await usuarioService.listarUsuarios()
    } catch (e) {
        erro.value = "Erro ao carregar produtos"
    } finally {
        loading.value = false
    }
}
function abrirEdicao(produto) {
    produtoSelecionado.value = produto
    produtoEditando.value = { ...produto }
    mostrarModal.value = true
}
async function salvarEdicao() {
    try {
        await produtosServices.atualizar(produtoSelecionado.value.id, produtoEditando.value)
        await carregarProdutos()
        mostrarModal.value = false
    } catch (e) {
        alert("Erro ao atualizar produto")
    }
}


async function exlcuirItem(produtoId) {
    await produtosServices.remover(produtoId)
    await carregarProdutos()
}
async function carregarCategorias() {
    categorias.value = await categoriaService.listarCategorias()
}
onMounted(() => {
    carregarProdutos()
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
                        <li><router-link to="/admin">Central</router-link></li>
                        <li><router-link to="/admin/produtos">Novo Produto</router-link></li>
                        <li><router-link to="/admin/usuarios">Usuários</router-link></li>
                        <li>
                            <router-link to="/admin/categoria">Categoria</router-link>
                        </li>
                    </ul>
                </nav>
            </div>
            <router-link to="/home" class="btn-sair">Sair</router-link>

        </aside>
        <main class="main-content">

            <header class="header">
                <h1>Dashboard</h1>
                <div class="admin-info">
                    <span>Administrador</span>
                </div>
            </header>


            <section class="content">

                <div class="cards">
                    <div class="card">
                        <h3>Total de Produtos</h3>
                        <p>{{ produtos.length }}</p>
                    </div>

                    <div class="card">
                        <h3>Total de Usuários</h3>
                        <p>{{ usuarios.length }}</p>
                    </div>
                </div>

                <div class="table-container">
                    <h2>Últimos Produtos</h2>
                    <div class="grid" v-if="!loading && !erro">

                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Preço</th>
                                    <th>Estoque</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="produto in produtos" :key="produto.id">
                                    <td>{{ produto.nome }}</td>
                                    <td>{{ produto.preco }}</td>
                                    <td>{{ produto.quantidade }}</td>
                                    <td>
                                        <button class="edit-btn" @click="abrirEdicao(produto)">Editar</button>
                                        <button class="delete-btn" @click="exlcuirItem(produto.id)">Excluir</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>

            </section>

        </main>
        <div v-if="mostrarModal" class="modal-overlay">
            <div class="modal">
                <h2>Editar Produto</h2>

                <input v-model="produtoEditando.nome" placeholder="Nome" />
                <input v-model.number="produtoEditando.preco" type="number" placeholder="Preço" />
                <input v-model.number="produtoEditando.quantidade" type="number" placeholder="Estoque" />
                <select v-model="produtoEditando.categoriaId">
                    <option disabled value="">Selecione uma categoria</option>
                    <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
                        {{ categoria.nome }}
                    </option>
                </select>


                <div class="modal-actions">
                    <button @click="salvarEdicao" class="save-btn">Salvar</button>
                    <button @click="mostrarModal = false" class="cancel-btn">Cancelar</button>
                </div>
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
    height: 100vh;
    background-color: #f3f4f6;
}

.sidebar {
    width: 240px;
    background-color: #111827;
    color: white;
    display: flex;
    flex-direction: column;
    padding: 20px;
}

.logo {
    font-size: 18px;
    margin-bottom: 30px;
}

.menu ul {
    list-style: none;
}

.menu li {
    margin-bottom: 15px;
}

.menu a {
    text-decoration: none;
    color: #d1d5db;
    font-size: 14px;
    transition: 0.3s;
}

.menu a:hover {
    color: white;
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
    display: flex;
    flex-direction: column;
}

.header {
    background: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e5e7eb;
}

.header h1 {
    font-size: 20px;
}


.content {
    padding: 20px;
    overflow-y: auto;
}


.cards {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
}

.card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    flex: 1;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.card h3 {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 10px;
}

.card p {
    font-size: 22px;
    font-weight: bold;
}

.table-container {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
}

thead {
    background-color: #f9fafb;
}

th,
td {
    padding: 14px 12px;
    text-align: left;
    font-size: 14px;
}

th {
    color: #374151;
    font-weight: 600;
}

tbody tr {
    border-top: 1px solid #e5e7eb;
    transition: 0.2s;
}

tbody tr:hover {
    background-color: #f3f4f6;
}

tbody tr:hover {
    background-color: #f3f4f6;
}


.edit-btn {
    background-color: #16a34a;
    border: none;
    padding: 6px 12px;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    margin-right: 5px;
    transition: 0.3s;
}

.edit-btn:hover {
    background-color: #15803d;
}

.delete-btn {
    background-color: #dc2626;
    border: none;
    padding: 6px 12px;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s;
}

.delete-btn:hover {
    background-color: #b91c1c;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: white;
    padding: 25px;
    border-radius: 12px;
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.modal input {
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #ddd;
}

.modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.save-btn {
    background: #2563eb;
    color: white;
    border: none;
    padding: 8px 14px;
    border-radius: 6px;
    cursor: pointer;
}

.cancel-btn {
    background: #6b7280;
    color: white;
    border: none;
    padding: 8px 14px;
    border-radius: 6px;
    cursor: pointer;
}

.modal select {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
    background-color: #f9fafb;
    font-size: 14px;
    outline: none;
    transition: all 0.2s ease;
    cursor: pointer;
}

.modal select:hover {
    border-color: #2563eb;
}


.modal select:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
    background-color: #ffffff;
}

.modal select option {
    padding: 10px;
}

.novo-produto {
    text-decoration: none;
    color: blue;
}

@media (max-width: 768px) {

    .admin-layout {
        flex-direction: column;
        height: auto;
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
        width: auto;
        padding: 6px 12px;
        font-size: 12px;
        margin-top: 0;
    }

    .cards {
        flex-direction: column;
    }

    .content {
        padding: 15px;
    }

    th,
    td {
        font-size: 13px;
        padding: 10px 6px;
    }
}
</style>