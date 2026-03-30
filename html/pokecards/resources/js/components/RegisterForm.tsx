/* eslint-disable import/order */
/* eslint-disable @stylistic/padding-line-between-statements */
import React, { useEffect, useState } from 'react';

import { useInputChange } from '@/hooks/useInputChange';
import { Checkbox } from './CheckBox';
import { FormInput } from './FormInput';
import ActionButton from './ActionButton';
import { registerUser } from '@/services/authService';
import { ErrorSpan } from './ErrorSpan';

interface RegisterProps {
    handleFormVisibility: () => void;
}

const initialState = {
    email: '',
    password: '',
    username: '',
};

export function RegisterForm({ handleFormVisibility }: RegisterProps) {
    const [isBackgroudRendered, setBackgroundRender] = useState(false);
    const [isFormValid, setFormValid] = useState(false);
    const [formValues, handleReset, handleChangeValues, stateRegisterErrors] =
        useInputChange(initialState, true);
    useEffect(() => {
        setTimeout(() => {
            setBackgroundRender(true);
        }, 500);
    }, []);

    const { email, password, username } = formValues;
    const { emailError, usernameError, passwordError } = stateRegisterErrors;

    const handleRegister = async (data: any) => {
        try {
            await registerUser(data);
        } catch (error) {
            console.error('Axios error', error);
        }
    };

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            name: formData.get('username'),
            password: formData.get('password'),
            email: formData.get('email'),
        };
        handleRegister(data);
        handleReset(initialState);
    };

    return (
        <>
            {isBackgroudRendered ? (
                <div className="z-0 h-screen w-1 animate-visibility border-r border-l border-yellow-600 bg-white"></div>
            ) : (
                ''
            )}
            <form
                method="post"
                onSubmit={handleSubmit}
                className="absolute z-1 flex animate-visibility flex-col items-center justify-center gap-4 rounded-xl border-2 border-yellow-600 bg-white p-10 shadow-xl shadow-yellow-600"
            >
                <h1 className="mb-10 text-3xl font-bold">Registro:</h1>
                <FormInput
                    id="username"
                    data-id-username
                    value={username}
                    type="text"
                    handleChange={handleChangeValues}
                >
                    Nombre de usuario:
                </FormInput>
                <FormInput
                    id="password"
                    value={password}
                    type="password"
                    handleChange={handleChangeValues}
                >
                    Contraseña:
                </FormInput>

                <FormInput
                    id="email"
                    value={email}
                    type="email"
                    handleChange={handleChangeValues}
                >
                    Email:
                </FormInput>
                {emailError.length > 0 && <ErrorSpan>{emailError}</ErrorSpan>}
                {passwordError.length > 0 && (
                    <ErrorSpan>{passwordError}</ErrorSpan>
                )}
                {usernameError.length > 0 && (
                    <ErrorSpan>{usernameError}</ErrorSpan>
                )}
                <ActionButton isFormValid={isFormValid}>Enviar</ActionButton>
                <button
                    onClick={handleFormVisibility}
                    className="cursor-pointer self-start font-semibold text-blue-500 hover:underline"
                >
                    Ya tengo una cuenta
                </button>
                <Checkbox>Acepto los términos de privacidad</Checkbox>
            </form>
        </>
    );
}
