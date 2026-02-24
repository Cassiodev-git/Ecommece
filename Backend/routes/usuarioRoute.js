import {Router} from "express";
import UsuarioController from "../controllers/UsuarioController.js";
import { autenticarMiddleware } from "../middlewares/autenticarUsuarioValidation.middleware.js";
import { admAutenticaMiddleware } from "../middlewares/adminAutenticaValidation.middleware.js";

const router = Router()

router.get("/",autenticarMiddleware,admAutenticaMiddleware, UsuarioController.listar)
router.post("/", UsuarioController.cadastrar)
router.put("/:id",autenticarMiddleware,admAutenticaMiddleware, UsuarioController.atualizar)
router.delete("/:id",autenticarMiddleware,admAutenticaMiddleware, UsuarioController.deletar)

export default router