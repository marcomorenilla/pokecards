import { router } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import '@/css/animate.css';

interface AddCoinsModalProps {
    onHandleDialog: () => void;
    isDialogOpen: boolean;
}
export default function AddCoinsModal({
    isDialogOpen,
    onHandleDialog,
}: AddCoinsModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isDialogOpen) {
            console.log('order received, showing');
            dialogRef.current?.showModal();
        } else {
            console.log('order processed closing');
            dialogRef.current?.close();
        }
    }, [isDialogOpen]);

    const handleCoinsSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const selectedCoins = formData.get('coins') || 0;

        console.log('Cantidad seleccionada:', selectedCoins);
        router.post(
            '/users/addCoins',
            { coins: Number(selectedCoins) },
            {
                onError: (e) => {
                    console.log(e);
                },
            },
        );
    };
    return (
        <dialog
            ref={dialogRef}
            className="h-screen max-h-none w-screen max-w-none bg-transparent backdrop-blur-lg"
        >
            <div className="flex h-full w-full items-center justify-center">
                <form
                    onSubmit={handleCoinsSubmit}
                    method="dialog"
                    className="animate-opacity relative h-fit w-96 flex-col rounded-xl bg-gray-600 p-3 text-center text-white"
                >
                    <h1 className="mb-10 text-3xl font-bold">
                        Recargar monedas
                    </h1>
                    <p
                        className="absolute top-0 right-3 cursor-pointer text-3xl"
                        onClick={onHandleDialog}
                    >
                        ×
                    </p>
                    <p className="text-gray-300">
                        Elige la cantidad que quieres recargar:
                    </p>
                    <div className="mt-10 grid grid-cols-2 gap-2">
                        <label
                            htmlFor="100"
                            className="group cursor-pointer rounded-xl border border-gray-100 bg-gray-700 p-3 font-bold text-white has-checked:border-yellow-500 has-checked:bg-yellow-500/25 has-checked:text-yellow-500"
                        >
                            <input
                                type="radio"
                                id="100"
                                name="coins"
                                value={100}
                                className="sr-only"
                            />
                            100
                        </label>
                        <label
                            htmlFor="500"
                            className="group cursor-pointer rounded-xl border border-gray-100 bg-gray-700 p-3 font-bold text-white has-checked:border-yellow-500 has-checked:bg-yellow-500/25 has-checked:text-yellow-500"
                        >
                            <input
                                type="radio"
                                id="500"
                                name="coins"
                                value={500}
                                className="sr-only"
                            />
                            500
                        </label>
                        <label
                            htmlFor="1000"
                            className="group cursor-pointer rounded-xl border border-gray-100 bg-gray-700 p-3 font-bold text-white has-checked:border-yellow-500 has-checked:bg-yellow-500/25 has-checked:text-yellow-500"
                        >
                            <input
                                type="radio"
                                id="1000"
                                name="coins"
                                value={1000}
                                className="sr-only"
                            />
                            1000
                        </label>
                        <label
                            htmlFor="5000"
                            className="group cursor-pointer rounded-xl border border-gray-100 bg-gray-700 p-3 font-bold text-white has-checked:border-yellow-500 has-checked:bg-yellow-500/25 has-checked:text-yellow-500"
                        >
                            <input
                                type="radio"
                                id="5000"
                                name="coins"
                                value={5000}
                                className="sr-only"
                            />
                            5000
                        </label>
                    </div>
                    <button
                        type="submit"
                        onClick={onHandleDialog}
                        className="mt-10 mb-4 w-full cursor-pointer rounded-xl bg-white p-3 font-semibold text-black hover:bg-yellow-600 hover:text-white"
                    >
                        Confirmar
                    </button>
                </form>
            </div>
        </dialog>
    );
}
