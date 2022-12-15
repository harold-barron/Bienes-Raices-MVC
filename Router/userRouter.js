import express from "express";

const router = express.Router()

router.get('/',(req,res)  =>{
    res.json({msg:'Concectado desde Express'})
})
router.get('/about',(req,res)  =>{
    res.json({msg:'About us'})
})


export default router