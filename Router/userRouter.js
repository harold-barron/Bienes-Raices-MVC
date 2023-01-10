import express from "express";
import {loginForm, signUpForm,createAccount,resetPasswordForm} from '../controllers/userController.js'
const router = express.Router()

router.get('/login',loginForm)
router.get('/sign-up',signUpForm)
router.post('/sign-up',createAccount)

router.get('/reset-password', resetPasswordForm)

export default router