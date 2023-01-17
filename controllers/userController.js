import { where } from 'sequelize'
import User from '../models/userModel.js'

const loginForm = (req,res) =>{
    res.render('auth/login', {
        page:'Login'
    })
}

const signUpForm = (req,res) =>{
    res.render('auth/sign_up', {
        page: 'Create account'
    })
}

const createAccount = async(req,res) =>{
    const {name,email,password,token} = req.body
    const newUser = await User.create({
        name,
        email,
        password,
        token
    })
    res.json(newUser)
}

const resetPasswordForm = (req,res) =>{
    res.render('auth/resetPassword', {
        page: 'Reset password'
    })
}

export {
    loginForm,
    signUpForm,
    createAccount,
    resetPasswordForm
}