import JWT from "jsonwebtoken"
export function admAutenticaMiddleware(req, res, next){
    const autenticaTokenadm = req.headers.authorization
    if(!autenticaTokenadm){
        return res.status(401).json({
            success: false,
            erro: "Token não informado"
        })
    }
    const [ , tokenadm] = autenticaTokenadm.split(" ")
    try{
        const decodificadoadm = JWT.verify(tokenadm, process.env.JWT_SECRET)
        if(decodificadoadm.adm){
            next()
        }else{
            return res.status(403).json({
                success: false,
                mensagem: "Acesso negado!"
            })
        }
    }catch(erro){
            return res.status(401).json({
                success: false,
                erro: "Token inválido ou expirado middleware: adm"
            })
    }
}