import React from 'react';
import { PokemonCard } from '../cards/PokemonCard';

export default function CollectionFiltered({ pokemonObject }: any) {
    return (
        <>
            {Array.from(pokemonObject.entries()).map(([key, value]: any) => (
                <PokemonCard
                    parent="collection"
                    key={key}
                    pokemon={value.pokemon}
                    quantity={value.quantity}
                />
            ))}
        </>
    );
}
