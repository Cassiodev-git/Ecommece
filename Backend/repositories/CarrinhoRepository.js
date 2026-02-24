import Carrinho from "../models/Carrinho.js";
import Produto from "../models/Produto.js";

class CarrinhoRepository{
    async listar(usuarioId){
        return Carrinho.findAll({
            where: {usuarioId},
            include:{
                model: Produto,
                as: 'produto',
                attributes: ['id','nome','preco','categoriaId','imagem']
            }
        
        })
    }
    async buscarItem(usuarioId, produtoId){
        return Carrinho.findOne({
            where:{usuarioId, produtoId},
        })
    }
    async adicionar(dados){
        return Carrinho.create(dados)
    }
    async atualizarQuantidade(usuarioId, produtoId, novaQuantidade){
        return Carrinho.update({quantidade: novaQuantidade},{
            where: {usuarioId, produtoId}
        })
    }
    async removerItem(usuarioId, produtoId){
        return Carrinho.destroy({
            where:{usuarioId, produtoId}
        })
    }
    async removerTodos(usuarioId){
        return Carrinho.destroy({
            where: {usuarioId}
        })
    }
}
export default new CarrinhoRepository