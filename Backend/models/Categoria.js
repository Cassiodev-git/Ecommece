import {DataTypes} from "sequelize"
import {connection} from "../config/db.js" 


const Categoria = connection.define("Categorias", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Categoria