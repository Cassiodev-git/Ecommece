import CategoriaRepository from "../repositories/CategoriaRepository.js"

class CategoriaController{
    async listar(req, res){
        try{
            const categorias = await CategoriaRepository.listar()
            return res.status(200).json(categorias)
        }catch(erro){
            return res.status(500).json({
                success: false,
                erro: 'Problemas no servidor'
            })

        }
    }
    async criar(req, res){
        try{
            const novaCategoria = await CategoriaRepository.criar(req.body)
            return res.status(201).json(novaCategoria)
        }catch(erro){
            return res.status(500).json({
                success: false,
                erro: 'Problemas no servidor'
            })
        }
    }
    async atualizar(req, res){
        try{
            const {id} = req.params
            await CategoriaRepository.atualizar(id, req.body)
            return res.status(200).json({mensagen: "Produto atualizado com sucesso"})
        }catch(erro){
            return res.status(500).json({
                success: false,
                erro: "Problemas no servidor"
            })
        }
    }
    async deletar(req, res){
        try{
            const {id} = req.params
            await CategoriaRepository.deletar(id)
            return res.status(200).json({
                success: true,
                mensagen: "Produto deletado"
            })
        }catch(erro){
            return res.status(500).json({
                success: false,
                Erro: "Problemas no servidor"
            })
        }
    }

}

export default new CategoriaController()