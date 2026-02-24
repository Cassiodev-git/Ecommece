<script setup>
import { ref, onMounted } from "vue"
import usuarioService from "../../services/usuarioService";
const usuarios = ref([])
const usuarioSelecionado = ref(null)
const loading = ref(false)
const erro = ref(null)
async function carregarUsuarios() {
    try {
        loading.value = true
        erro.value = null
        usuarios.value = await usuarioService.listarUsuarios()
    } catch (e) {
        erro.value = "Erro ao carregar usuários"
    } finally {
        loading.value = false
    }
}
async function excluir(usuarioId) {
    await usuarioService.deletarUsuario(usuarioId)
    carregarUsuarios()
}
function editar(usuario) {
    usuarioSelecionado.value = { ...usuario }
}
async function salvarEdicao() {
    try {
        loading.value = true
        erro.value = null

        await usuarioService.editarUsuario(
            usuarioSelecionado.value.id,
            usuarioSelecionado.value
        )
        const index = usuarios.value.findIndex(
            u => u.id === usuarioSelecionado.value.id
        )

        if (index !== -1) {
            usuarios.value[index] = { ...usuarioSelecionado.value }
        }

        usuarioSelecionado.value = null

    } catch (e) {
        erro.value = "Erro ao atualizar usuário"
        console.error(e)
    } finally {
        loading.value = false
    }
}
onMounted(() => {
    carregarUsuarios()
})
</script>

<template>
    <div class="admin-layout">

        <aside class="sidebar">
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

            <router-link to="/home" class="btn-sair">Sair</router-link>
        </aside>

        <section class="content">
            <div v-if="usuarioSelecionado" class="edit-panel">

                <div class="edit-card">
                    <h3>Editar Usuário</h3>

                    <div class="form-group">
                        <label>Nome</label>
                        <input type="text" v-model="usuarioSelecionado.nome">
                    </div>

                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" v-model="usuarioSelecionado.email">
                    </div>

                    <div class="form-group checkbox">
                        <label>
                            <input type="checkbox" v-model="usuarioSelecionado.adm">
                            Administrador
                        </label>
                    </div>

                    <div class="actions">
                        <button class="save-btn" @click="salvarEdicao(usuarios.id)">Salvar</button>
                        <button class="cancel-btn" @click="usuarioSelecionado = null">Cancelar</button>
                    </div>
                </div>

            </div>
            <div class="table-container">
                <p v-if="loading">Carregando...</p>
                <p v-if="erro">{{ erro }}</p>
                <h2>Lista de Usuários</h2>

                <div class="table-responsive" v-if="!loading && !erro">
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="usuario in usuarios" :key="usuario.id">
                                <td>{{ usuario.nome }}</td>
                                <td>{{ usuario.email }}</td>
                                <td v-if="usuario.adm === true"><span class="badge admin">Sim</span></td>
                                <td v-if="usuario.adm === false"><span class="badge admin_no">Não</span></td>
                                <td>
                                    <button class="edit-btn" @click="editar(usuario)">Editar</button>
                                    <button class="delete-btn" @click="excluir(usuario.id)">Excluir</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </section>

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

.content {
    flex: 1;
    display: flex;
    flex-direction: column;
}


.cards {
    display: flex;
    gap: 20px;
    margin-bottom: 40px;
}

.card {
    flex: 1;
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.card h3 {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 10px;
}

.card p {
    font-size: 26px;
    font-weight: bold;
    color: #111827;
}

.table-container {
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.table-container h2 {
    margin-bottom: 20px;
    font-size: 18px;
    color: #111827;
}

.table-responsive {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
}

thead {
    background-color: #f3f4f6;
}

th,
td {
    text-align: left;
    padding: 12px;
    font-size: 14px;
}

td {
    border-top: 1px solid #e5e7eb;
    color: #374151;
}

tbody tr:hover {
    background-color: #f9fafb;
}


.badge {
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: bold;
}

.badge.admin {
    background-color: #d1fae5;
    color: #065f46;
}

.badge.admin_no {
    background-color: #fad1d1;
    color: #000000;
}

.edit-btn {
    background-color: #2563eb;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    margin-right: 8px;
    font-size: 12px;
}

.delete-btn {
    background-color: #dc2626;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
}

.edit-panel {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease-in-out;
}

.edit-card {
    background: #ffffff;
    width: 420px;
    max-width: 95%;
    padding: 30px;
    border-radius: 14px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
    animation: slideUp 0.25s ease-out;
}


.edit-card h3 {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 600;
    color: #2c3e50;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
}

.form-group label {
    font-size: 14px;
    margin-bottom: 6px;
    color: #555;
}

.form-group input[type="text"],
.form-group input[type="email"] {
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    font-size: 14px;
    transition: all 0.2s ease;
}

.form-group input:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15);
}

.checkbox {
    flex-direction: row;
    align-items: center;
    gap: 8px;
}

.actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.save-btn {
    background: #2ecc71;
    color: white;
    border: none;
    padding: 10px 18px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: 0.2s ease;
}

.save-btn:hover {
    background: #27ae60;
    transform: translateY(-2px);
}

.cancel-btn {
    background: #e74c3c;
    color: white;
    border: none;
    padding: 10px 18px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: 0.2s ease;
}

.cancel-btn:hover {
    background: #c0392b;
    transform: translateY(-2px);
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
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

    .btn-sair {
        width: auto;
        padding: 6px 10px;
        font-size: 12px;
        margin-top: 0;
    }

    .logo {
        margin: 0;
    }

    .menu {
        margin-right: 80px;
    }

    .menu ul {
        display: flex;
        gap: 10px;
        align-items: center;
    }

    .menu li {
        margin-bottom: 0;
    }

    .menu a {
        font-size: 13px;
    }

    .content {
        padding: 20px;
    }

    .cards {
        flex-direction: column;
    }

    .card {
        padding: 18px;
    }

    .card p {
        font-size: 20px;
    }

    .table-responsive {
        overflow-x: auto;
    }

    table {
        min-width: 500px;
    }

    th,
    td {
        padding: 8px;
        font-size: 12px;
    }

    .edit-btn,
    .delete-btn {
        padding: 4px 8px;
        font-size: 11px;
    }

    /* Painel de edição */
    .edit-panel {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
    }

    .edit-card {
        background: white;
        padding: 30px;
        border-radius: 10px;
        width: 400px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }

    .edit-card h3 {
        margin-bottom: 20px;
    }

    .form-group {
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
    }

    .form-group input[type="text"],
    .form-group input[type="email"] {
        padding: 8px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    .checkbox {
        flex-direction: row;
        align-items: center;
    }

    .actions {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    .save-btn {
        background: #2ecc71;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 5px;
        cursor: pointer;
    }

    .cancel-btn {
        background: #e74c3c;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 5px;
        cursor: pointer;
    }

}
</style>
