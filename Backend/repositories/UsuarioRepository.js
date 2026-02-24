import Usuario from "../models/Usuario.js";


class UsuarioRepository{
    async listar(){
        return Usuario.findAll(
            {
                attributes:['id', 'nome', 'email', 'adm']
            }
        )
    }
    async listarId(id){
        return Usuario.findOne(
            {
                where: {id},
                attributes: ['id','nome','email','adm']
            }
        )
    }
    async listarLogin(email){
        return Usuario.findOne(
            {   where: {email},
                attributes: ['id','email','senha','adm']
            }
        )
    }
    async criar(dados){
        return Usuario.create(dados)
    }
    async atualizar(id, dados){
        return Usuario.update(dados,{
            where: {id}
        })
    }
    async deletar(id){
        return Usuario.destroy({
            where: {id}
        })
    }
}
export default new UsuarioRepository()