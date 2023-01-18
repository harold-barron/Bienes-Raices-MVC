import nodemailer from 'nodemailer'

const confirmationEmail = async ({name,email,token}) =>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Restore yout passwsord',
        text: 'Please confirm your account in the link',
        html: `
            <p> Hi ${name}, click in  the click below to reset the password of your account in bienesRaices.com</p>
            <a href="${process.env.SERVER_URL}:${process.env.PORT}/auth/confirm/${token}">Click here to confirm</a>
        `
    })
}

const resetPasswordEmail = async ({name,email,token}) =>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Please confirm your email',
        text: 'Pleas confirm your account in the link',
        html: `
            <p> Hi ${name}, please validate your account in bienesRaices.com</p>
            <a href="${process.env.SERVER_URL}:${process.env.PORT}/auth/newPassword/${token}">Click here to confirm</a>
        `
    })
    
}
export {
    confirmationEmail,
    resetPasswordEmail
}