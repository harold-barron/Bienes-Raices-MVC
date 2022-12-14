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

const createAccount = (req,res) =>{
    console.log(req.body)
}

const resetPasswordForm = (req,res) =>{
    res.render('auth/resetPassword', {
        page: 'Reset password'
    })
}

export {
    loginForm,
    signUpForm,
    createAccount,
    resetPasswordForm
}