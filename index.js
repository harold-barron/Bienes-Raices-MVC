import express from 'express'
import userRouter from './Router/userRouter.js'
import db from './db/db.js'
const app = express()
const port = 3000 || process.env.port

app.use(express.urlencoded({extended:true}))

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