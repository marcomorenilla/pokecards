import React, { useEffect, useRef } from 'react';
import { PokemonCard } from '../cards/PokemonCard';
import '@/css/animate.css';

interface NewCardsModalProps {
    isDialogOpen: boolean;
    handleDialog: () => void;
    pokemon: any;
    handleNextCard: () => void;
}

export function NewCardsModal({
    isDialogOpen,
    handleDialog,
    pokemon,
    handleNextCard,
}: NewCardsModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if (isDialogOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isDialogOpen]);
    return (
        <dialog
            ref={dialogRef}
            onClose={handleDialog}
            className="h-screen max-h-none w-screen max-w-none bg-transparent backdrop-blur-lg"
        >
            <div className="flex h-full items-center justify-center text-white">
                <div className="animate-opacity flex h-auto w-1/2 flex-col items-center justify-start gap-3 rounded-xl bg-gray-600 p-5 shadow-[0px_0px_20px_20px] shadow-cyan-500">
                    <h1 className="text-3xl font-bold">SOBRE CONSEGUIDO</h1>
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    <button
                        onClick={handleNextCard}
                        className="w-full rounded-xl bg-yellow-500 p-2 text-xl font-bold hover:bg-yellow-600"
                    >
                        Siguiente carta
                    </button>
                </div>
            </div>
        </dialog>
    );
}
