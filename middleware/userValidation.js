import { check, validationResult } from "express-validator";
import User from '../models/userModel.js'

const userModelValidation = async (req,res,next) =>{
    try{
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
                    
                    console.log(req.body.repeatedPassword)
                }
            });
            //console.log(errors,resultsArray)
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
export{
    userModelValidation,
    emailValidation
} 
