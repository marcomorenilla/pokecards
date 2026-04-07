import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    isFormValid: boolean;
}

export default function ActionButton({ children, isFormValid }: ButtonProps) {
    console.log(isFormValid);
    return (
        <button className="w-full cursor-pointer rounded-xl bg-yellow-600 p-2 font-semibold text-white hover:bg-yellow-800">
            {children}
        </button>
    );
}
