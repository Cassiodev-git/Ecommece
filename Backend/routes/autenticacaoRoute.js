import {Router} from "express";
import AutenticacaoController from "../controllers/AutenticacaoController.js"

const router = Router()

router.post("/", AutenticacaoController.login)


export default router