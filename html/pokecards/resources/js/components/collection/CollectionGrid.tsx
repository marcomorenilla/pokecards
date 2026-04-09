import React from 'react';
import ReverseCard from '../cards/ReverseCard';
import { PokemonCard } from '../cards/PokemonCard';

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

        console.log(pokemonObject.get(39));
    });
    return (
        <section className="grid grid-cols-1 content-center gap-10 p-3 md:grid-cols-3 lg:grid-cols-5">
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
            })}
        </section>
    );
}
