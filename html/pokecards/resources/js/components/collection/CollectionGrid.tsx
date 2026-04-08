import React from 'react';
import ReverseCard from '../cards/ReverseCard';
import { PokemonCard } from '../cards/PokemonCard';

export default function CollectionGrid({ pokemons: pokemonCollection }: any) {
    const pokemonObject = new Map();
    pokemonCollection.forEach((pokemonCollected: any) => {
        pokemonObject.set(pokemonCollected.pokemons['pokeapi_id'], {
            pokemon: pokemonCollected.pokemons,
            quantity: pokemonCollected.quantity,
        });
    });
    console.log('pokemons', pokemonObject);
    return (
        <section className="grid grid-cols-1 content-center gap-10 md:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 151 }).map((_: any, i: number) => {
                let findedPokemon = pokemonObject.get(i);
                console.log('finded-pokemon', findedPokemon);

                return findedPokemon ? (
                    <PokemonCard
                        key={i}
                        parent="collection"
                        pokemon={findedPokemon.pokemon}
                        quantity={findedPokemon.quantity}
                    />
                ) : (
                    <ReverseCard key={i} />
                );
            })}
        </section>
    );
}
