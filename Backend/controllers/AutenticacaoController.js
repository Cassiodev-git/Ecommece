import AutenticaService from "../services/AutenticaService.js";
import TokenService from "../services/TokenService.js";


class AutenticacaoController {
    async login(req, res) {
        try {
            const resultado = await AutenticaService.login(
            req.body.email,
            req.body.senha,
        );
        if (!resultado || resultado.success !== true) {
            return res.status(401).json({
                success: false,
                erro: "Credencias inválidas"
            })
        }
        const token = TokenService.gerarToken(resultado)
        return res.status(200).json({
            success: true,
            email: resultado.email,
            token: token
        })
        } catch (erro) {
        return res.status(500).json({
            success: false,
            erro: "Problemas no servidor",
        });
        }
    }
}
export default new AutenticacaoController()
