import { DataTypes } from "sequelize";
import { connection } from "../config/db.js";

const Produto = connection.define("Produto", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model:'Categorias',
            key: 'id'
        }
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
export default Produto