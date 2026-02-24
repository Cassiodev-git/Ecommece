import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        "Content-Type": "application/json"
    }
})
//procura o token, e se ele existir colocar no header da requisição
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("Token") //armazena no localstorage
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api