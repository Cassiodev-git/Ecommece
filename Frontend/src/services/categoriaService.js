import api from "./api";

class categoriaService{
    async listarCategorias(){
        const response = await api.get("/categoria")
        return response.data
    }
    async novaCategoria(dados){
        const response = await api.post('/categoria', dados)
        return response.data
    }
    async removerCategoria(id){
        await api.delete(`/categoria/${id}`)
    }
    async atualizarCategoria(id, dados){
        await api.put(`/categoria/${id}`, dados)
    }
}

export default new categoriaService()