<script setup>
import { ref, onMounted, computed } from "vue"
import carrinhoService from "../services/carrinhoService.js"

const carrinho = ref([])
const loading = ref(false)
const erro = ref(null)
//Carrega items na view
async function carregarCarrinho() {
    try {
        loading.value = true
        erro.value = null
        carrinho.value = await carrinhoService.listarItems()
    } catch (err) {
        erro.value = "Erro ao carregar o carrinho"
    } finally {
        loading.value = false
    }
}
onMounted(() => {
    carregarCarrinho()
})
async function adicionarItem(item) {
    try{
        await carrinhoService.atualizaItem({
            produtoId: item.produto.id,
            quantidade: item.quantidade + 1
        })
        await carregarCarrinho()
    }catch(e){
        erro.value = "Erro ao atualizar quantidade" 
    }
}
async function diminuirItem(item){
    if(item.quantidade < 1){
        await carrinhoService.removerItem(item.produto.id)
    }
    try{
        await carrinhoService.atualizaItem({
            produtoId: item.produto.id,
            quantidade: item.quantidade - 1
        })
        await carregarCarrinho()
    }catch(e){
        erro.value = "Erro ao atualizar quantidade"
    }
}
const limpar =  async () =>{
    await carrinhoService.limparCarrinho()
    await carregarCarrinho()
}
//Calcula o total do valor armazenando em uma variavel dinamica
const totalCarrinho = computed(() => {
    return carrinho.value.reduce((total, item) => {
        return total + item.produto.preco * item.quantidade
    }, 0)
})
</script>
<template>
    <div class="container">
        <div class="cabecalho">
            <h2>Carrinho de compras</h2>
            <p><span class="Total">Total:</span> {{totalCarrinho.toFixed(2) }}</p>
            <button class="btn-limpar" @click="limpar()">Limpar carrinho</button>
        </div>
        <p v-if="erro" class="erro">{{ erro }}</p>
        <div v-if="!loading && !erro" class="grid">
            <div v-for="item in carrinho" :key="item.produto.id" class="card">
                <img :src="item.produto.imagem" :alt="item.produto.nome" class="card-img" />
                <h3>{{ item.produto.nome }}</h3>
                <p class="preco">R$ {{ item.produto.preco }} <span style="color: black;">/un</span></p>
                <div class="controle-quantidade">
                    <button class="btn-qtd" @click="diminuirItem(item)">-</button>
                    <span class="numero">{{ item.quantidade }}</span>
                    <button class="btn-qtd" @click="adicionarItem(item)">+</button>
                </div>
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
    box-shadow: 0 0px 16px rgba(0, 0, 0, 0.15);
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
.quantidade{
    font-size: 14px;
    font-weight: 100;
    color: black;
}
.btn-limpar{
    margin-top: 5px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 14px;
    padding: 3px;
    color: rgb(231, 35, 35);
    transition: transform 0.1s ease;
}
.btn-limpar:hover{
    transform: translateY(-2px);
}
.cabecalho{
    padding: 10px;
    border-bottom: 1px solid rgb(29, 29, 29);
}
.cabecalho h2 {
    font-weight: 700;
    font-size: 25px;
    margin-bottom: 5px;
}
.Total{
    font-weight: 300;
    font-size: 18px;
}
.btn-selecao{
    background: none;
    border: none;
    color: rgb(71, 71, 235);
    cursor: pointer;
    font-size: 13px ;
}
.controle-quantidade {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-top: 10px;
}

.btn-qtd {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: none;
    background-color: #16a34a;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s ease;
}

.btn-qtd:hover {
    background-color: #15803d;
}

.numero {
    font-size: 16px;
    font-weight: 600;
    min-width: 20px;
    text-align: center;
}

.card-img {
    width: 100%;
    height: 180px;
    object-fit: contain;
}

.btn-carrinho {
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