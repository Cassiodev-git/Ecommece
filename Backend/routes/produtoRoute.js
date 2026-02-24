import {Router} from 'express'
import ProdutoController from '../controllers/ProdutoController.js' 
import { produtoValidation } from '../middlewares/produtoValidation.middleware.js'
import { admAutenticaMiddleware } from '../middlewares/adminAutenticaValidation.middleware.js'
import { autenticarMiddleware } from '../middlewares/autenticarUsuarioValidation.middleware.js'

const router = Router()

router.get("/", ProdutoController.listar)
router.post("/",autenticarMiddleware, admAutenticaMiddleware, produtoValidation, ProdutoController.cadastrar)
router.put("/:id",autenticarMiddleware,admAutenticaMiddleware, produtoValidation, ProdutoController.atualizar)
router.delete("/:id",autenticarMiddleware,admAutenticaMiddleware, ProdutoController.deletar)



export default router