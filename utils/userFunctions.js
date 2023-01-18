import { where } from 'sequelize'
import { check, validationResult } from "express-validator";
import User from "../models/userModel.js";
import { generateID } from "./tokens.js";
import bcryp from 'bcrypt'


const createUser =  async function(data) {
    const {name,email,password} = data
    return  User.create({
        name,
        email,
        password,
        token: generateID()
    }) 
}

const userModelValidators = async function (req) {
    await check('name').notEmpty().withMessage('Please write your name').run(req)
    await check('email').notEmpty().withMessage('Please write a valid email direcction').run(req)
    await check('password').notEmpty().withMessage('Please write your password').isLength({min:6}).withMessage('Your password must have at least 6 digits').run(req)
    await check('repeatedPassword').equals(req.body.password).withMessage('Passwords do not match').run(req)
    let nameResult = validationResult(req)
    if(!nameResult.isEmpty()){
            let resultsArray = nameResult.array()
            let  errors = {}
            const errorsArray = resultsArray.forEach(element => {                    
                if(element.param === 'name'){
                    errors.name = element.msg
                }  
                if(element.param === 'email'){
                    errors.email = element.msg
                }   
                if(element.param === 'password'){
                    errors.password = element.msg
                }    
                if(element.param === 'repeatedPassword'){
                    errors.repeatedPassword = element.msg
                }
            });
            return errors
        }
}

const findUserByEmail = async (data) =>{
    const {email} = await data
    const validEmail = await User.findOne({where :{email}})
    if(!validEmail){
        return false
    }
    return validEmail
}

const hashPassword = async (pass) =>{
        const salt = await bcryp.genSalt(10)
        const password = await pass
        const hash = bcryp.hashSync(password,salt)
        return hash
    
}
export {
    createUser,
    userModelValidators,
    findUserByEmail,
    hashPassword
}