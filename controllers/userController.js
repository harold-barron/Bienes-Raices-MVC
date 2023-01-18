import { where } from 'sequelize'
import User from '../models/userModel.js'
import { generateID } from '../utils/tokens.js'
import { confirmationEmail,resetPasswordEmail } from '../utils/emails.js'
import { createUser,findUserByEmail} from '../utils/userFunctions.js'
const loginForm = (req,res) =>{
    res.render('auth/login', {
        page:'Login'
    })
}

const signUpForm = (req,res) =>{
    res.render('auth/sign_up', {
        page: 'Create account',
        csrfToken: req.csrfToken()
    })
}

const createAccount = async(req,res) =>{
    const newUser = await createUser(req.body)
    confirmationEmail(newUser)
    res.render('templates/confirmationURL', {
        page: 'Account created succesfully',
        message: 'We sended you a verification link to your email please verify your account'
    })
}

const validateAccount = async (req,res) =>{
    const {token} = await req.params
    const validUser = await User.findOne({where :{token}})
    if(!validUser){
        return res.render('auth/invalidToken', {
            page: 'Something went wrong',
            message: 'We cant find your credentials please try again',
            error: true
        })
    }

    validUser.token = null
    validUser.confirmed = true
    await validUser.save()
    
    return res.render('auth/invalidToken', {
        page: 'Account created succesfully',
        message: 'Account created succesfully'
    })
}

const resetPasswordForm = (req,res) =>{
    res.render('auth/resetPassword', {
        page: 'Reset password',
        csrfToken: req.csrfToken() 
    })
}
const resetPassword = async (req,res) =>{
    const userfinded = await findUserByEmail(req.body)
    if(!userfinded)
    {
        return res.render('auth/resetPassword', {
            page: 'Reset password',
            csrfToken: req.csrfToken(),
            emailError:'your email is not in use'
        })
    }
    userfinded.token = generateID()
    await userfinded.save()
    resetPasswordEmail(userfinded)
    res.render('templates/confirmationURL', {
        page: 'Instructions sended',
        message: 'We sended the instructions to your email'
    })
    
}
export {
    loginForm,
    signUpForm,
    createAccount,
    validateAccount,
    resetPasswordForm,
    resetPassword
}