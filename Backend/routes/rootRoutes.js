import {Router} from 'express'

const router = Router()

router.get('/', (req, res) => {
    return res.status(200).json({
        nome: "API_REST Mercadinho",
        descrincao: "API desenvolvida em Express seguindo boas praticas de arquitetura, API_Mercadinho. ",
        versao: "1.0.0",
        funcionalidades:[
            "Autenticação com JWT",
            "Controle de acesso por perfil (admin)",
            "Middleware reutilizável",
            "CRUD de produtos e categorias"
        ],
        autenticacao: {
            tipo: "JWT",
            header: "Authorization: Bearer /Token/"
        },
        rotas_principais: {
            login: "POST /login",
            usuarios: "POST /usuario",
            produtos: "GET /produto",
            categorias: "GET /categoria"
        },
        observacao: "Outras rotas disponíveis delete e update",
        status: "OK"

    })
})

export default router