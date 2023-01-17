import express from 'express'
import csurf from 'csurf'
import cookieParser from 'cookie-parser'
import userRouter from './Router/userRouter.js'
import db from './db/db.js'

const app = express()
const port =process.env.PORT

app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

try{
    await db.authenticate();
    db.sync()
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