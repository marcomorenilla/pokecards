/* eslint-disable @stylistic/padding-line-between-statements */
import React, { useEffect, useState } from 'react';

import { useInputChange } from '@/hooks/useInputChange';
import { Checkbox } from './CheckBox';
import { FormInput } from './FormInput';

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
    const [formValues, handleChangeValues] = useInputChange(initialState);
    useEffect(() => {
        setTimeout(() => {
            setBackgroundRender(true);
        }, 500);
    }, []);

    const { email, password, username } = formValues;

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        console.log('form', formData);
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
                <span className="self-start px-1 text-sm text-red-500">
                    Mensaje tipo
                </span>

                <button
                    type="submit"
                    className="cursor-pointer rounded-xl bg-yellow-600 p-2 font-semibold text-white hover:bg-yellow-800"
                >
                    Enviar
                </button>
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
