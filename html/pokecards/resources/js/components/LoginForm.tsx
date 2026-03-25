import React, { useEffect, useState } from 'react';
import { useInputChange } from '@/hooks/useInputChange';
import { FormInput } from './FormInput';

interface LoginProps {
    handleFormVisibility: () => void;
}

const initialState = {
    email: '',
    password: '',
};

export function LoginForm({ handleFormVisibility }: LoginProps) {
    const [isBackgroudRendered, setBackgroundRender] = useState(false);
    const [formValues, handleChangeValues] = useInputChange(initialState);
    const { email, password } = formValues;

    useEffect(() => {
        setTimeout(() => {
            setBackgroundRender(true);
        }, 500);
    }, []);

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
                <h1 className="mb-10 text-3xl font-bold">Inicio de sesión:</h1>
                <FormInput
                    id="email"
                    value={email}
                    type="email"
                    handleChange={handleChangeValues}
                >
                    Email:
                </FormInput>

                <FormInput
                    id="password"
                    value={password}
                    type="password"
                    handleChange={handleChangeValues}
                >
                    Contraseña:
                </FormInput>
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
                    Quiero registrarme
                </button>
            </form>
        </>
    );
}
