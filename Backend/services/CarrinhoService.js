import CarrinhoRepository from "../repositories/CarrinhoRepository.js";
import ProdutoRepository from "../repositories/ProdutoRepository.js"

class CarrinhoService{
    async listar(usuarioId){
        return CarrinhoRepository.listar(usuarioId)
    }
    
    async cadastrar(usuarioId, produtoId, quantidade){
        if(quantidade <= 0){
            throw new Error("Quantidade inválida")
        }
        const produto = await ProdutoRepository.listarId(produtoId)
        if(!produto){
            throw new Error("Produto não encontrado")

        }
        const produtoCarrinho = await CarrinhoRepository.buscarItem(usuarioId, produtoId)
        if(!produtoCarrinho){
            await CarrinhoRepository.adicionar({
                usuarioId,
                produtoId,
                quantidade
            })

        }else {
            const novaQuantidade = produtoCarrinho.quantidade + quantidade
            await CarrinhoRepository.atualizarQuantidade(
                usuarioId,
                produtoId,
                novaQuantidade
            )
        }
        return await CarrinhoRepository.listar(usuarioId)
    }
    async remover(usuarioId, produtoId){
        const produto = await CarrinhoRepository.buscarItem(usuarioId, produtoId)
        if(!produto){
            throw new Error("Produto não encontrado")
        }else{
            await CarrinhoRepository.removerItem(usuarioId, produtoId)
        }
        return await CarrinhoRepository.listar(usuarioId)
    }
    async atualizarQuantidade(usuarioId, produtoId, novaQuantidade){
        if(novaQuantidade < 0){
            throw new Error("Quantidade inválida")
        }
        const itemCarrinho = await CarrinhoRepository.buscarItem(usuarioId, produtoId)
        if(!itemCarrinho){
            throw new Error("Item não encontrado no carrinho")
        }
        if(novaQuantidade === 0){
            await CarrinhoRepository.removerItem(usuarioId, produtoId)
        }else{
            await CarrinhoRepository.atualizarQuantidade(
                usuarioId,
                produtoId,
                novaQuantidade
            )
        }
        return await CarrinhoRepository.listar(usuarioId)
    }
    async removerTodos(usuarioId){
        await CarrinhoRepository.removerTodos(usuarioId)
    }
}
export default new CarrinhoService()