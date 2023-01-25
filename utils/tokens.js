
import { data } from 'autoprefixer';
import { jwt } from 'jsonwebtoken'

const generateID =  () => Date.now().toString(32)+ Math.random().toString(32).substring(2);

const createJWT= (id) =>{jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:'1d'})
}
export {
    generateID,
    createJWT
}