import { useReducer, useState } from 'react';
import { registerReducer } from '@/js/reducers/registerReducer';
import {
    validateMail,
    validatePassword,
    validateUserName,
} from '@/js/services/fieldsValidator';

const initialErrorState = {
    emailError: '',
    passwordError: '',
    usernameError: '',
};

export function useInputChange(state: any, isRegister: boolean = false) {
    const [formValues, setFormValues] = useState(state);
    const [stateRegisterForm, dispatch] = useReducer(
        registerReducer,
        initialErrorState,
    );

    const handleFormErrors = (data: any) => {
        const { username, password, email } = data;

        if (username) {
            const validationNameResult = validateUserName(username);
            dispatch({ type: 'username', data: validationNameResult });
        }
        if (password) {
            const validationPasswordResult = validatePassword(password);
            dispatch({
                type: 'password',
                data: validationPasswordResult,
            });
        }
        if (email) {
            const validationEmailResult = validateMail(email);
            dispatch({ type: 'email', data: validationEmailResult });
        }
    };

    const handleValuesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = e;
        const { name, value } = target;

        setFormValues((prev: object) => {
            const newState = {
                ...prev,
                [name]: value,
            };
            if (isRegister) {
                handleFormErrors({ [name]: value });
            }

            return newState;
        });
    };

    const handleReset = (formValues: any) => {
        setFormValues(formValues);
    };

    return [formValues, handleReset, handleValuesChange, stateRegisterForm];
}
