import { Router } from "express";//responsavel por carregar as rotas 
import produtoRoute from "./produtoRoute.js"
import categoriaRoute from "./categoriaRoute.js"
import rootRoutes from './rootRoutes.js'
import usuarioRoute from './usuarioRoute.js'
import autenticacaoRoute from './autenticacaoRoute.js'
import carrinhoRoute from './carrinhoRoute.js'
import meRoute from './meRoute.js'

const router = Router()
//voce passa a rota em si, e depois o controller que ficará responsavel por tratar os dados
router.use('/produto', produtoRoute)
router.use('/categoria',categoriaRoute)
router.use('/usuario',usuarioRoute)
router.use('/login', autenticacaoRoute)
router.use('/carrinho',carrinhoRoute)
router.use('/me', meRoute)
router.use('/', rootRoutes)



export default router


