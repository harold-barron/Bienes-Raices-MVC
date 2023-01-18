import { check, validationResult } from "express-validator";
import { userModelValidators } from "../utils/userFunctions.js";
import User from '../models/userModel.js'

const userModelValidation = async (req,res,next) =>{
    try{
        let errors  = await userModelValidators(req)
        if(errors){
            return res.render('auth/sign_up', {
                page: 'Create account',
                nameError:errors.name,
                emailError:errors.email,
                passwordError:errors.password,
                repeatedPasswordError:errors.repeatedPassword,
                csrfToken: req.csrfToken(),
                user: {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }
            })
        }
        next()
    }catch(error){
        //console.log(error)
        return res.json(error)
    }
}
const emailValidation = async (req,res,next) =>{
    const isNotNewUser = await User.findOne({where :{email: req.body.email}})
    if (isNotNewUser){
        return res.render('auth/sign_up', {
            page: 'Create account',
            emailError: 'Email already in use',
            csrfToken: req.csrfToken(),
            user: {
                name: req.body.name,
                email: req.body.email,
            }
        })
    }
    next()
}

const resetPasswordValidation = async (req,res,next)=>{
    let errors  = await userModelValidators(req)
    if(errors.email){
        return res.render('auth/resetPassword', {
            page: 'Reset password',
            csrfToken: req.csrfToken(),
            emailError:errors.email
        })
    }
    
    next()
}
export{
    userModelValidation,
    emailValidation,
    resetPasswordValidation
} 
