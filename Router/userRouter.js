import express from "express";

const router = express.Router()

router.get('/login',(req,res)  =>{
    res.render('auth/login')
})
router.get('/about',(req,res)  =>{
    res.json({msg:'About us'})
})


export default router