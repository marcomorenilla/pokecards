export const validateMail = (email: string) => {
    const emailRegex = /^\w+@\w+\.(com|org|es|dev)$/;
    console.log('validating mail', email);

    const isErrored = !emailRegex.test(email);

    return {
        error: isErrored,
        message: isErrored
            ? 'El mail debe tener formato alguien@ejemplo.com'
            : `No hay error ${isErrored}`,
    };
};

export const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*\W).{6,}$/;

    console.log('validating password', password);

    const isErrored = !passwordRegex.test(password);
    console.log('resultado de validación', passwordRegex.test(password));

    return {
        error: isErrored,
        message: isErrored
            ? 'La contraseña dene tener una longitud de 6 caracteres, incluir números y carácteres especiales'
            : `No hay error ${isErrored}`,
    };
};

export const validateUserName = (username: string) => {
    const usernameRegex = /^.+$/;

    const isErrored = !usernameRegex.test(username);

    return {
        error: isErrored,
        message: isErrored
            ? 'El campo del usuario no puede estar vacío'
            : `No hay error ${isErrored}`,
    };
};
