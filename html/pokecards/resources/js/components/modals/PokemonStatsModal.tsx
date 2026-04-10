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

    console.log('pokemon', pokemon);

    useEffect(() => {
        if (isDialogOpen) {
            console.log('showing dialog...');
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
            <div className="animate-opacity grid h-full w-full grid-cols-1 gap-10 lg:grid-cols-2">
                <section className="w-1/2 self-center justify-self-end">
                    {pokemon.id && (
                        <PokemonCard
                            key={pokemon.id + 'diag'}
                            pokemon={pokemon}
                            quantity={1}
                            parent="collection"
                        />
                    )}
                </section>
                <section className="h-auto w-fit self-center rounded-xl border border-[#ffcb05]/50 bg-[#220] p-4">
                    {pokemon.id && <PokemonDescriptionCard pokemon={pokemon} />}
                </section>
            </div>
        </dialog>
    );
}
