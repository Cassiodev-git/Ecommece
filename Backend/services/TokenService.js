import JWT from "jsonwebtoken"


class TokenService {
    gerarToken(dados) {
        const token = JWT.sign(
            {
                id: dados.id,
                email: dados.email,
                adm: dados.adm
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "31d"
            }
        )

        return token;
    }
}

export default new TokenService();
