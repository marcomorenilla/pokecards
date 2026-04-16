/* eslint-disable import/order */
/* eslint-disable @stylistic/padding-line-between-statements */
import React, { useEffect, useState } from 'react';

import { useInputChange } from '@/js/hooks/useInputChange';
import { Checkbox } from './CheckBox';
import { FormInput } from './FormInput';
import ActionButton from './ActionButton';
import { ErrorSpan } from './ErrorSpan';
import { router } from '@inertiajs/react';

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
            router.post('/users/authenticate/new', data, {
                onSuccess: () => {
                    handleFormVisibility();
                },
            });
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
            img: `${String(formData.get('username')).trim()}.jpg`,
        };
        handleRegister(data);
        handleReset(initialState);
    };

    return (
        <>
            {isBackgroudRendered ? (
                <div className="animate-visibility z-0 h-screen w-1 border-r border-l border-yellow-600 bg-white"></div>
            ) : (
                ''
            )}
            <form
                method="post"
                onSubmit={handleSubmit}
                className="animate-visibility absolute z-1 flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-yellow-600 bg-white p-10 shadow-xl shadow-yellow-600"
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
