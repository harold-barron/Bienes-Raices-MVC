import express from "express";
import {loginForm, signUpForm,createAccount,validateAccount,resetPasswordForm,resetPassword,validateResetToken,setNewPassword,loginAuth} from '../controllers/userController.js'
import {userModelValidation,emailValidation,resetPasswordValidation,newPasswordValidation,loginValidation} from "../middleware/userValidation.js"
const router = express.Router()

router.get('/login',loginForm)
router.post('/login',loginValidation,loginAuth)


router.get('/sign-up',signUpForm)
router.post('/sign-up',userModelValidation,emailValidation,createAccount)
router.get('/confirm/:token', validateAccount)

router.get('/reset-password', resetPasswordForm)
router.post('/reset-password',resetPasswordValidation, resetPassword)

router.get('/newPassword/:token',validateResetToken)
router.post('/newPassword/:token',newPasswordValidation,setNewPassword)
export default router