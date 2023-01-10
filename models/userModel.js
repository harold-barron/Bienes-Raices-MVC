import { DataTypes } from "sequelize";
import db from "../db/db.js";

const User = db.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }

})