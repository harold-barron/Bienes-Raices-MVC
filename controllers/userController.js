const loginForm = (req,res) =>{
    res.render('auth/login', {
    })
}

const signUpForm = (req,res) =>{
    res.render('auth/sign_up', {
        page: 'Create Account'
    })
}

export {
    loginForm,
    signUpForm
}