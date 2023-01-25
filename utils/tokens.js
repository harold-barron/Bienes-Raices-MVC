
//import { data } from 'autoprefixer';
import Jwt  from 'jsonwebtoken'

const generateID =  () => Date.now().toString(32)+ Math.random().toString(32).substring(2);

const createJWT= (id) =>{Jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:'1d'})
}


export {
    generateID,
    createJWT
}