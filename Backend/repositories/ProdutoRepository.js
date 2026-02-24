import Produto from "../models/Produto.js";
import Categoria from "../models/Categoria.js";


class ProdutoRepository{
    async listar(){
        return Produto.findAll({
            include: Categoria
        })
    }
    async listarId(produtoId){
        return Produto.findOne({
            where: produtoId
        })
    }
    async criar(dados){
        return Produto.create(dados)
    }
    async atualizar(id, dados){
        return Produto.update(dados, {
            where: {id}
        })
    }
    async deletar(id){
        return Produto.destroy({
            where: {id}
        })
    }

}

export default new ProdutoRepository()