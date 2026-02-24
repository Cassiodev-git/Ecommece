import {Router} from "express";
import UsuarioController from "../controllers/UsuarioController.js";
import { autenticarMiddleware } from "../middlewares/autenticarUsuarioValidation.middleware.js";

const router = Router()

router.get("/", autenticarMiddleware, UsuarioController.me)

export default router