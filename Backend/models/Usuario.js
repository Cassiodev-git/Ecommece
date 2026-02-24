import { DataTypes } from "sequelize";
import { connection } from "../config/db.js";

const Usuario = connection.define("Usuario", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adm: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
})
export default Usuario