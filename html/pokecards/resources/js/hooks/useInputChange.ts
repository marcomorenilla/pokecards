/* eslint-disable @stylistic/padding-line-between-statements */
import { useReducer, useState } from 'react';
import { registerReducer } from '@/reducers/registerReducer';
import {
    validateMail,
    validatePassword,
    validateUserName,
} from '@/services/fieldsValidator';

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
        console.log('data', data);

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
        console.log('id', name);
        console.log('value', value);

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
