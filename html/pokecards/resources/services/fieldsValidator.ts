 export   const validateMail =(email:string)=>{
        const emailRegex= /^\w+@\w+\.(com|org|es|dev)$/
        console.log('validating mail',email)
        

        if(emailRegex.test(email)){
            console.log('pass email', email)
        }else{
            const isEmailErrored = true
            const message ='El email debe tener un formato tipo algo@ejemplo.com'
        }

        return;
    }

    export const validatePassword = (password: string)=>{
        const passwordRegex= /^(?=.*[A-Za-z])(?=.*\d)(?=.*\W).{6,}$/
        console.log('validating password')

        if( passwordRegex.test(password)){
            console.log('pass password', password)
        }else{
            const isPasswordErrored = true;
            const message = 'La contraseña debe tener 6 carácteres letras números y carácteres especiales';
        }
    }

    export const validateUserName = (username:string)=>{
        const usernameRegex=/^.+$/

        if(usernameRegex.test(username)){
            console.log('test')
        }else{
            const isUsernameErrored = true;
            const message = 'El campo de nombre de usuario no puede estar vacío'
        }
    }