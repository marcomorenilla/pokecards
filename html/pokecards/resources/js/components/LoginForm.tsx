/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';
import { useInputChange } from '@/hooks/useInputChange';
import ActionButton from './ActionButton';
import { FormInput } from './FormInput';
import { getAuthenticatedUser } from '@/services/authService';
import { router } from '@inertiajs/react';

interface LoginProps {
    handleFormVisibility: () => void;
}

const initialState = {
    email: '',
    password: '',
};

export function LoginForm({ handleFormVisibility }: LoginProps) {
    const [isBackgroudRendered, setBackgroundRender] = useState(false);
    const [formValues, handleReset, handleChangeValues] = useInputChange(
        initialState,
        false,
    );
    const [isFormValid, setIsFormValid] = useState(false);
    const { email, password } = formValues;

    useEffect(() => {
        setTimeout(() => {
            setBackgroundRender(true);
        }, 500);
    }, []);

    const handleGetUsers = async (data: any) => {
        try {
            const currentUser = await getAuthenticatedUser(data);
        } catch (error) {
            console.log('Login-form handle-get-users error', error);
        }
    };

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        };
        handleReset(initialState);
        router.post('/api/users/authenticate', data, {
            onSuccess: () => {
                console.log('success');
            },
        });
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
                <ActionButton isFormValid={isFormValid}>Enviar</ActionButton>
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
