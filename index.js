import express from 'express'
import userRouter from './Router/userRouter.js'
const app = express()
const port = 3000 || process.env.port

app.use('/',userRouter)


app.listen(port, () =>{
    console.log(`Server running on port ${port}` )
})
console.log("index js")