import express from 'express'

const app = express()
const port = 3000 || process.env.port


app.get('/',(req,res)  =>{
    res.json({msg:'Concectado desde Express'})
})





app.listen(port, () =>{
    console.log(`Server running on port ${port}` )
})
console.log("index js")