import Categoria from "../models/Categoria.js";

class CategoriaRepository{
    async listar(){
        return Categoria.findAll()
    }
    async criar(dados){
        return Categoria.create(dados)
    }
    async atualizar(id, dados){
        return Categoria.update(dados,{
            where: {id}
        })
    }
    async deletar(id){
        return Categoria.destroy({
            where:{id}
        })
    }
}

export default new CategoriaRepository()
