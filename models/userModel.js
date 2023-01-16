import { DataTypes } from "sequelize";
import db from "../db/db.js";

const User = db.define('users', {
    name: {
        type: DataTypes.STRING,
        required:true,
        trim: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    token: DataTypes.STRING,
    confirmed: DataTypes.BOOLEAN

})

export default User;