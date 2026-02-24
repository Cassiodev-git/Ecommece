export function usuarioValidation(req, res, next) {
    const dados = req.body;
    const regras = {
        nome: { type: "string", required: true, validate: (v) => v.trim() !== "" },
        email: { type: "string", required: true, validate: (v) => v.includes('@') },
        senha: { type: "string", required: true, validate: (v) => v.trim() !== "" },
    };
    for (const [campo, regra] of Object.entries(regras)) {
        let valor = dados[campo];
        if (regra.required && (valor === undefined || valor === null)) {
        return res.status(400).json({ error: `Campo obrigatório ${campo}` });
        }
        if(valor === undefined || valor === null) continue

        if(typeof valor !== regra.type){
            return res.status(400).json({
                success: false,
                erro: `Campo obrigatório : ${campo}`
            })
        }
        if(regra.validate && !regra.validate(valor)){
            return res.status(400).json({
                success: false,
                erro: `Campo obrigatório : ${campo}`
            })
        }
    }
    next()
}
