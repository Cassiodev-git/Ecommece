import api from "./api.js"


class ProdutoService {
    async listarTodos(){
        const response = await api.get("/produto")
        return response.data
    }
    async remover(produtoId){
        await api.delete(`/produto/${produtoId}`)
    }
    async atualizar(produtoId, dados){
        await api.put(`/produto/${produtoId}`, dados)
    }
    async criar(dados){
        const response =await api.post("/produto", dados)
        return response.data
    }
}
export default new ProdutoService()