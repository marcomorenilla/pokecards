import React from 'react';
import CollectionFiltered from './CollectionFiltered';
import CollectionUnfiltered from './CollectionUnfiltered';

export default function CollectionGrid({
    pokemons: pokemonCollection,
    isFiltered,
}: any) {
    const pokemonObject = new Map();
    pokemonCollection.forEach((pokemonCollected: any) => {
        pokemonObject.set(pokemonCollected.pokemons['pokeapi_id'], {
            pokemon: pokemonCollected.pokemons,
            quantity: pokemonCollected.quantity,
        });
    });
    return (
        <section className="grid grid-cols-1 content-center gap-10 p-3 md:grid-cols-3 lg:grid-cols-5">
            {isFiltered ? (
                <CollectionFiltered pokemonObject={pokemonObject} />
            ) : (
                <CollectionUnfiltered pokemonObject={pokemonObject} />
            )}
        </section>
    );
}
