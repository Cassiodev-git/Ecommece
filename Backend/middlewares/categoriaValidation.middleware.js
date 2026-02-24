export function categoriaValidation(req, res, next){
    const dados = req.body
    const nome = dados.nome
    if(nome === undefined || nome === null){
        return res.status(400).json({
            success: false,
            erro: "Campo obrigatório: nome"
        })
    }
    if(typeof nome !== 'string' || nome.trim() === ""){
        return res.status(400).json({
            success: false,
            erro: "Campo obrigatório: nome"
        })
    }
    next()
}