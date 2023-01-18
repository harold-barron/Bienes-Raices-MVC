import { where } from 'sequelize'
import User from "../models/userModel.js";
import { generateID } from "./tokens.js";
//import { confirmationEmail } from "./emails";

const createUser =  async function(data) {
    const {name,email,password} = data
    return  User.create({
        name,
        email,
        password,
        token: generateID()
    }) 
}
export {
    createUser
}