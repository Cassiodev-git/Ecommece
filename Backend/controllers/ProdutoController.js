import ProdutoRepository from "../repositories/ProdutoRepository.js"

class ProdutoController{
    async listar(req, res){
        
        try{
            const produtos = await ProdutoRepository.listar()
            return res.status(200).json(produtos)
        }catch(erro){
            return res.status(500).json({
                success: false,
                erro:'Problemas no servidor'
            })
        }
    }
    async cadastrar(req, res){
        
        try{
            const novoProduto = await ProdutoRepository.criar(req.body)
            return res.status(200).json({
                success: true,
                mensagem: "Produto cadastrado com sucesso"
            })
        }catch(erro){
            return res.status(500).json({
                success: false,
                erro:'Problemas no servidor'
            })
        }
    }
    async atualizar(req, res){
        try{
            const {id} = req.params
            await ProdutoRepository.atualizar(id, req.body)
            return res.json({
                success: true,
                mensagem: "Produto atualizado com sucesso"
            })
        }catch(erro){
            return res.status(500).json({
                success: false,
                erro: "Problemas no servidor"
            })        }
    }
    async deletar(req, res){
        try{
            const {id} = req.params
            await ProdutoRepository.deletar(id)
            return res.status(200).json({
                success: true,
                mensagem: "Produto deletado"
            })
        }catch(erro){
            return res.status(500).json({
                success: false,
                erro: "Problemas no servidor"
            })
        }
    }
}
export default new ProdutoController()