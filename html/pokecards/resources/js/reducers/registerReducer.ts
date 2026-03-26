/* eslint-disable @stylistic/padding-line-between-statements */
export function registerReducer(state: any, { type, data }: any) {
    console.log('registerReducer', type, data);
    switch (type) {
        case 'email': {
            const { error, message } = data;

            if (error) {
                return {
                    ...state,
                    emailError: message,
                };
            }
            return { ...state, emailError: '' };
        }

        case 'username': {
            const { error, message } = data;

            if (error) {
                return {
                    ...state,
                    usernameError: message,
                };
            }
            return { ...state, userNameError: '' };
        }
        case 'password': {
            const { error, message } = data;

            if (error) {
                return {
                    ...state,
                    passwordError: message,
                };
            }
            return { ...state, passwordError: '' };
        }
        default:
            return state;
    }
}
