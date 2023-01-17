import express from "express";
import {loginForm, signUpForm,createAccount,validateAccount,resetPasswordForm} from '../controllers/userController.js'
import {userModelValidation,emailValidation} from "../middleware/userValidation.js"
const router = express.Router()

router.get('/login',loginForm)
router.get('/sign-up',signUpForm)
router.post('/sign-up',userModelValidation,emailValidation,createAccount)
router.get('/confirm/:token', validateAccount)

router.get('/reset-password', resetPasswordForm)

export default router