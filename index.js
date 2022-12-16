import express from 'express'
import userRouter from './Router/userRouter.js'
const app = express()
const port = 3000 || process.env.port

app.set('view engine','pug')
app.set('views', './views')

app.use(express.static('public'))


app.use('/auth',userRouter)

app.listen(port, () =>{
    console.log(`Server running on port ${port}` )
})
console.log("index js")