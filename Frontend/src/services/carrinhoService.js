import api from "./api.js";

class CarrinhoService{
    async adicionarItem(produtoId){
        const resposta =  await api.post("/carrinho",{
            produtoId: produtoId,
            quantidade: 1
        })
        return resposta.data
    }
    async listarItems(){
        const resposta = await api.get("/carrinho")
        return resposta.data
    }
    async removerItem(produtoId){
        await api.delete(`/carrinho/${produtoId}`)
    }
    async atualizaItem(dados){
        const resposta = await api.put("/carrinho", {
            produtoId: dados.produtoId,
            novaQuantidade: dados.quantidade
        })
        return resposta.data
    }
    async limparCarrinho(){
        await api.delete("/carrinho")
    }
}
export default new CarrinhoService()