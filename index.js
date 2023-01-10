import express from 'express'
import userRouter from './Router/userRouter.js'
import db from './config/db.js'
const app = express()
const port = 3000 || process.env.port
const pass=process.env.sequelizePassword
console.log(pass)
try{
    await db.authenticate();
    console.log('Succesfuly connectet to database')
} catch(error){
    console.log(error)
}

app.set('view engine','pug')
app.set('views', './views')

app.use(express.static('public'))


app.use('/auth',userRouter)

app.listen(port, () =>{
    console.log(`Server running on port ${port}` )
})
console.log("index js")