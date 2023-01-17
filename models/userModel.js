import { DataTypes } from "sequelize";
import db from "../db/db.js";
import bcryp from 'bcrypt'
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
        lowercase: true,
        
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    token: DataTypes.STRING,
    confirmed: DataTypes.BOOLEAN
}, {
        hooks : {
            beforeCreate: async function (user) {
                const salt = await bcryp.genSalt(10)
                const password = await user.password
                const hash = bcryp.hashSync(password,salt)
                user.password = hash
            }
        }
})

export default User;