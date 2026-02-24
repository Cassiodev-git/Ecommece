import UsuarioRepository from "../repositories/UsuarioRepository.js";
import bcrypt from "bcrypt"

class AutenticaService{
    async cadastra(dados){
        const hash = await bcrypt.hash(dados.senha, 11)
        dados.senha = hash
        await UsuarioRepository.criar(dados)
        return true
    }
    async login(email,dadoSenha){
        const dados = await UsuarioRepository.listarLogin(email)
        if(dados === undefined || dados === null){
            let resultado = {
                success: false,
                mensagem: "Usuario ou senha não encontrado"
            }
            return resultado
        }if(await bcrypt.compare(dadoSenha, dados.senha)){
            let resultado = {
                success: true,
                id: dados.id,
                email: dados.email,
                adm: dados.adm
            }
            return resultado
        }else{
            let resultado = {
                success: false,
                mensagem: "Credencias inválidas"
            }
            return resultado
        } 
    }
}
export default new AutenticaService()