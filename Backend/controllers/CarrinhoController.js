import CarrinhoService from "../services/CarrinhoService.js"

class CarrinhoCotroller{
    async listar(req, res){
        try{
            const carrinho = await CarrinhoService.listar(req.usuario.id)
            return res.status(200).json(carrinho)
        }catch(erro){
            return res.status(500).json({
                success: false,
                erro: "Problemas no servidor"
            })
        }
    }
    async cadastrar(req, res){
        try{
            const {produtoId, quantidade} = req.body
            const usuarioId = req.usuario.id
            const cadastro = await CarrinhoService.cadastrar(usuarioId, produtoId, quantidade)
                return res.status(200).json(cadastro)
            }catch(erro){
                return res.status(400).json({
                    success: false,
                    erro: erro.message
                })
        }
    }
    async atualizarQuantidade(req, res){
        try{
            const {novaQuantidade, produtoId} = req.body
            const usuarioId = req.usuario.id
            const retorno = await CarrinhoService.atualizarQuantidade(usuarioId, produtoId, novaQuantidade)
            return res.status(200).json(retorno)
        }catch(erro){
            return res.status(400).json({
                success: false,
                erro: erro.message
            })
        }
        
    }
    async remover(req, res){
        try{
            const retorno = await CarrinhoService.remover(req.usuario.id, req.params.id)
            return res.status(200).json(retorno)
        }catch(erro){
            return res.status(400).json({
                success: false,
                erro: erro.message
            })
        }
    }
    async removerTodos(req, res){
        try{
            await CarrinhoService.removerTodos(req.usuario.id)
            return res.status(200).json({
                success: true,
                mensagem: "Carrinho limpo"
            })
        }catch(e){
            return res.status(400).json({
                success: false,
                erro: "Problemas no servidor"
            })
        }
    }
        
}
export default new CarrinhoCotroller()