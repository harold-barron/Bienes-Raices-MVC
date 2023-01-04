const loginForm = (req,res) =>{
    res.render('auth/login', {
        page:'Login'
    })
}

const signUpForm = (req,res) =>{
    res.render('auth/sign_up', {
        page: 'Create account'
    })
}

export {
    loginForm,
    signUpForm
}