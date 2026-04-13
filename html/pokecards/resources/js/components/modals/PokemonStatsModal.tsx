import React, { useEffect, useRef } from 'react';
import { PokemonCard } from '../cards/PokemonCard';
import '@/css/animate.css';
import PokemonDescriptionCard from '../cards/PokemonDescriptionCard';

export default function PokemonStatsModal({
    isDialogOpen,
    handleDialog,
    pokemon,
}: any) {
    const dialogref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isDialogOpen) {
            dialogref.current?.showModal();
        } else {
            dialogref.current?.close();
        }
    }, [isDialogOpen]);
    return (
        <dialog
            ref={dialogref}
            onClose={handleDialog}
            className="fixed inset-0 h-screen max-h-none w-screen max-w-none bg-black/90"
        >
            <div className="animate-opacity flex h-full w-full max-w-screen flex-wrap items-center justify-center gap-5 md:gap-10">
                <section className="my-3 h-auto w-auto bg-black">
                    <PokemonCard
                        key={pokemon.id + 'diag'}
                        pokemon={pokemon}
                        quantity={1}
                        parent="modal"
                    />
                </section>
                <section className="w-auto max-w-96 rounded-xl border border-[#ffcb05]/50 bg-[#220] p-4">
                    <PokemonDescriptionCard
                        pokemon={pokemon}
                        onClose={handleDialog}
                    />
                </section>
            </div>
        </dialog>
    );
}
