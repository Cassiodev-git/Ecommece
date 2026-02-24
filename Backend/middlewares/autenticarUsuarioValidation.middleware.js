import JWT from "jsonwebtoken"
export function autenticarMiddleware(req, res, next){
    
    const autenticaToken = req.headers.authorization

    if(!autenticaToken){
        return res.status(401).json({
            success: false,
            erro: "Token não informado"
        })
    }
    const [, token] = autenticaToken.split(" ")
    try{
        const decodificado = JWT.verify(token, process.env.JWT_SECRET)
        req.usuario = {
            id:decodificado.id,
            email: decodificado.email,
            adm: decodificado.adm
        }
        return next()
    }catch(erro){
        return res.status(401).json({
            success: false,
            erro: "Token inválido ou expirado"
        })
    }
}