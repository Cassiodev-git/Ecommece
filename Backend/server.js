import "./config/env.js"
import express from 'express'
import { connection } from './config/db.js'
import './models/Produto.js'
import './models/Usuario.js'
import './models/Carrinho.js'
import router from './routes/index.js'
import './models/associacao.js'
import cors from 'cors'


const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())


//Starta o servidor e cria as tabelas
async function startServer() {
    try{
        await connection.authenticate()//autentica a servidor
        await connection.sync({force: false})//sincroniza com o banco criando o model
        app.use(router)
        app.listen(4000)

    }catch(erro){
        console.log("Erro ao iniciar a API", erro)
    }
}


startServer()