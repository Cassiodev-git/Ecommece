import {Router}  from "express";
import CategoriaController from "../controllers/CategoriaController.js";
import { categoriaValidation } from "../middlewares/categoriaValidation.middleware.js";
import { autenticarMiddleware } from "../middlewares/autenticarUsuarioValidation.middleware.js";
import { admAutenticaMiddleware } from "../middlewares/adminAutenticaValidation.middleware.js";
const router = Router()

router.get("/", CategoriaController.listar)
router.post("/",autenticarMiddleware,admAutenticaMiddleware, categoriaValidation, CategoriaController.criar)
router.put("/:id",autenticarMiddleware,admAutenticaMiddleware,categoriaValidation, CategoriaController.atualizar)
router.delete("/:id",autenticarMiddleware,admAutenticaMiddleware, CategoriaController.deletar)


export default router
