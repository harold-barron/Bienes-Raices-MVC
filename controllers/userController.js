const loginForm = (req,res) =>{
    res.render('auth/login', {
        autenticado: false
    })
}

export {
    loginForm
}