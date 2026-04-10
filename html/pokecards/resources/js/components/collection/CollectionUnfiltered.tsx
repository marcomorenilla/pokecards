import React from 'react';
import { PokemonCard } from '../cards/PokemonCard';
import ReverseCard from '../cards/ReverseCard';

export default function CollectionUnfiltered({ pokemonObject }: any) {
    return (
        <>
            {Array.from({ length: 151 }).map((_: any, i: number) => {
                const pokeId = i + 1;
                let found = pokemonObject.get(pokeId);

                if (found) {
                    return (
                        <PokemonCard
                            key={i}
                            parent="collection"
                            pokemon={found.pokemon}
                            quantity={found.quantity}
                        />
                    );
                }

                return <ReverseCard key={pokeId} />;
            })}
        </>
    );
}
