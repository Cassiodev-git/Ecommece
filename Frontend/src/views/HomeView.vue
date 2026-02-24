<script setup>
import { ref, onMounted } from "vue"
import ProdutoService from "../services/produtosServices.js"
import carrinhoService from "../services/carrinhoService.js"
//cria variaveis reativas
const produtos = ref([])
const loading = ref(false)
const erro = ref(null)

async function carregarProdutos() {
    try {
        loading.value = true
        erro.value = null
        produtos.value = await ProdutoService.listarTodos()
    } catch (err) {
        erro.value = "Erro ao carregar produtos"
    } finally {
        loading.value = false
    }
}
onMounted(() => {
    carregarProdutos()
})
async function addCarrinho(produtoId) {
    try{
        loading.value = true
        erro.value = null
        await carrinhoService.adicionarItem(produtoId)
    }catch(erro){
        erro.value = "Erro ao adicionar no carrinho"
    }finally{
        loading.value = false
    }
    
}

</script>
<template>
    <div class="container">
        <p v-if="loading">Carregando...</p>
        <p v-if="erro" class="erro">{{ erro }}</p>

        <div v-if="!loading && !erro" class="grid">
            <div v-for="produto in produtos" :key="produto.id" class="card">
                <img :src="produto.imagem" :alt="produto.nome" class="card-img" />
                <h3>{{ produto.nome }}</h3>
                <p class="preco">R$ {{ produto.preco }} <span style="color: black;">/un</span></p>
                <button class="btn-carrinho" @click="addCarrinho(produto.id)">Adicionar</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container {
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
    margin-top: 20px;
}

.card {
    background: white;
    border-radius: 12px;
    padding: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transition: 0.2s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.2s ease;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 0px 16px rgba(0,0,0,0.15);
}

.card h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
}
.preco {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 12px;
    color: #16a34a;
}

.card-img {
    width: 100%;
    height: 180px;
    object-fit: contain;
}
.btn-carrinho{
    margin-top: 2px;
    padding: 8px;
    background: #16a34a;
    color: white;
    border-radius: 6px;
    border: none;
    cursor: pointer
}

button:hover {
    opacity: 0.9;
}

.erro {
    color: red;
    display: flex;
    justify-content: center;
    
}
</style>