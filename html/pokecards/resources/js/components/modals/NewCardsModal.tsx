import React, { useEffect, useRef } from 'react';
import { PokemonCard } from '@/js/components/cards/PokemonCard';
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
            <div className="flex h-full w-full items-center justify-center text-white">
                <div className="animate-opacity flex h-auto w-auto flex-col items-center justify-between gap-5 rounded-xl bg-gray-600 p-5 shadow-[0px_0px_20px_20px] shadow-cyan-500 md:w-3/5">
                    <div className="group peer flex h-full cursor-grabbing flex-col items-center justify-center gap-2">
                        <h1 className="text-3xl font-bold transition-opacity duration-300 group-hover:opacity-0">
                            SOBRE CONSEGUIDO
                        </h1>
                        <PokemonCard
                            parent="modal"
                            key={pokemon.id}
                            pokemon={pokemon}
                            quantity={1}
                        />
                    </div>

                    <button
                        onClick={handleNextCard}
                        className="w-3/5 cursor-pointer rounded-xl bg-yellow-500 p-2 text-xl font-bold transition-opacity duration-300 peer-hover:opacity-0 hover:bg-yellow-600"
                    >
                        Siguiente carta
                    </button>
                </div>
            </div>
        </dialog>
    );
}
