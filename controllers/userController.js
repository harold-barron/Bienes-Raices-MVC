import { where } from 'sequelize'
import User from '../models/userModel.js'
import { generateID,createJWT} from '../utils/tokens.js'
import { confirmationEmail,resetPasswordEmail } from '../utils/emails.js'
import { createUser,findUserByEmail,hashPassword} from '../utils/userFunctions.js'

const loginForm = (req,res) =>{
    res.render('auth/login', {
        page:'Login',
        csrfToken: req.csrfToken() 
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
const validateResetToken = async (req,res) =>{
    const {token} = await req.params
    const validUser = await User.findOne({where :{token}})
    if(!validUser){
        return res.render('auth/invalidToken', {
            page: 'Something went wrong',
            message: 'We cant find your credentials please try again',
            error: true
        })
    }
  
    return res.render('auth/newPassword', {
        page: 'Reset password',
        message: 'Enter the new password',
        csrfToken: req.csrfToken()
    })
}
const setNewPassword = async (req,res) =>{
    
    const {token} = req.params
    const {password }=req.body

    const currentUser = await User.findOne({where:{token}})
    
    const hashpass = await hashPassword(password)

    currentUser.password = hashpass
    currentUser.token = null
    await currentUser.save()
    res.render('templates/confirmationURL', {
        page: 'password changed',
        message: 'password changed successfully',
    })
    
}
const loginAuth = async (req,res) => {
    console.log(req.body.email)
    const userRegistered = await findUserByEmail(req.body)
    if(!userRegistered){
        return res.render('auth/login', {
            page: 'Reset password',
            csrfToken: req.csrfToken(),
            emailError:'email not finded',
        })
    }
    if(!userRegistered.confirmed){
        return res.render('auth/login', {
            page: 'Reset password',
            csrfToken: req.csrfToken(),
            emailError:'Please confirm your email in the link sended to you',
        })
    }
    const corretPass=userRegistered.verifyPassword(req.body.password)
    if(!corretPass){
        return res.render('auth/login', {
            page: 'LOGIN',
            csrfToken: req.csrfToken(),
            passwordError: 'Incorrect Password ',
        })
    }

    const token = generateID(userRegistered.id)
    return res.cookie('_token', token, {
        httpOnly: true,
        //secure: true //only in deploys with https
    })
    console.log(token)
}


export {
    loginForm,
    signUpForm,
    createAccount,
    validateAccount,
    resetPasswordForm,
    resetPassword,
    validateResetToken,
    setNewPassword,
    loginAuth
}