import api from "./api";

class AuthService {
    async login(dados) {
        const response = await api.post("/login", {
        email: dados.email,
        senha: dados.senha,
        });
        const token = response.data.token;

        localStorage.setItem("Token", token);
        return response.data;
    }
    logout() {
        localStorage.removeItem("Token");
    }
    getToken() {
        return localStorage.getItem("Token");
    }
    authToken() {
        return !!this.getToken();
    }
    //melhorar! criar um estado global
    admin(){
        const token = this.getToken()
        if(!token) return false
        try{
            const load = JSON.parse(atob(token.split(".")[1]))
            return load.adm === true
        }catch{
            return false
        }
        if(!token) return false
        const adm = JSON.parse(atob(token.split(".")[1]))
        return adm.adm === true
    }
}
export default new AuthService();
