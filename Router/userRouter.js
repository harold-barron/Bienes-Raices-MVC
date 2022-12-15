import express from "express";
import {loginForm, signUpForm} from '../controllers/userController.js'
const router = express.Router()

router.get('/login',loginForm)
router.get('/sign-up',signUpForm)

export default router