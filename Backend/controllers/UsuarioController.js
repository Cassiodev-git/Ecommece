import UsuarioRepository from "../repositories/UsuarioRepository.js"
import AutenticaService from "../services/AutenticaService.js"



class UsuarioController {
    async listar(req, res){
        try{
            const usuarios = await UsuarioRepository.listar()
            return res.status(200).json(usuarios)
        }catch(erro){
            return res.status(500).json({
                success: false,
                erro: "Problemas no servidor"
            })
        }
    }
    async me(req, res){
        try{
            const id = req.usuario.id
            const usuario = await UsuarioRepository.listarId(id)
            return res.status(200).json(usuario)
        }catch(erro){
            return res.status(500).json({
                success: false,
                erro: "Problemas no servidor"
            })
        }
    }
    async cadastrar (req, res){
        try{
            await AutenticaService.cadastra(req.body)
            return res.status(201).json({
                success: true,
                mensagem: "Usuário cadastrado com sucesso!"
            })
        }catch(erro){
            return res.status(400).json({
                success: false,
                erro: "Problemas no servidor"
            })
        }
    }
    async atualizar(req, res){
        try{
            const {id} = req.params
            await UsuarioRepository.atualizar(id, req.body)
            return res.status(200).json({
                success: true,
                nome: req.body.nome,
                mensagem: "Usuário atualizado com sucesso"
            })
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
            await UsuarioRepository.deletar(id)
            return res.status(200).json({
                success: true,
                mensagem: "Usuário deletado com sucesso!"
            })
        }catch(erro){
            return res.status(500).json({
                success: false,
                erro: "Problemas no servidor"
            })
        }
    }

}
export default new UsuarioController()