export function produtoValidation(req, res, next) {
    const dados = req.body
    // Define campos esperados e regras de validação
    const regras = {
        nome: { type: "string", required: true, validate: (v) => v.trim() !== "" },
        preco: { type: "number", required: true, validate: (v) => v > 0 },
        quantidade: {
        type: "number",
        required: true,
        validate: (v) => Number.isInteger(v) && v >= 0,
        },
        categoriaId: {
        type: "number",
        required: true,
        validate: (v) => Number.isInteger(v),
        },
    }
    for (const [campo, regra] of Object.entries(regras)) {
        let valor = dados[campo]

        if (regra.required && (valor === undefined || valor === null)) {
        return res.status(400).json({
            success: false,
            error: `Campo obrigatório: ${campo}` 
        });
        }

        if (regra.type === "number" && valor !== undefined) {
        valor = Number(valor)
        dados[campo] = valor
        }

        if (valor !== undefined && !regra.validate(valor)) {
        return res.status(400).json({
            success: false,
            error: `Campo inválido: ${campo}` 
        });
        }
    }

    next()
    }
