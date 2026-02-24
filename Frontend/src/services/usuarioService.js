import api from "./api.js"

class UsuarioService{
    async listarUsuarios(){
        const response = await api.get("/usuario")
        return response.data
    }
    async cadastrarUsuario(dados){
        const response = await api.post("/usuario", dados)
        return response.data
    }
    async listarUsuarioId(){
        const response = await api.get("/me")
        return response.data
    }
    async deletarUsuario(usuarioId){
        const response = await api.delete(`/usuario/${usuarioId}`)
        return response.data
    }
    async editarUsuario(id, dados){
        const response = await api.put(`/usuario/${id}`, dados)
        return response.data
    }
}

export default new UsuarioService()