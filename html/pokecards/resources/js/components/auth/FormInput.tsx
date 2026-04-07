import React from 'react';

interface FormProps {
    id: string;
    children: React.ReactNode;
    type: string;
    value: string;
    handleChange: () => void;
}

export function FormInput({
    id,
    type,
    value,
    handleChange,
    children,
}: FormProps) {
    return (
        <section className="relative flex flex-col items-center justify-center">
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={handleChange}
                placeholder=" "
                className="peer rounded-xl border-2 border-blue-500 p-2 outline-none focus:border-blue-500 focus:shadow focus:shadow-blue-500"
            />
            <label
                htmlFor={id}
                className="absolute top-2 left-2 bg-white text-blue-500 transition-all duration-300 ease-in-out peer-not-placeholder-shown:-top-3 peer-focus:-top-3 peer-focus:text-blue-500"
            >
                {children}
            </label>
        </section>
    );
}
