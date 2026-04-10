import React from 'react';
import { TypeBadge } from './TypeBadge';

export default function PokemonDescriptionCard({ pokemon }: any) {
    const statsColor = {
        hp: 'bg-green-500',
        attack: 'bg-red-500',
        defense: 'bg-blue-500',
        speed: 'bg-yellow-500',
        base_experience: 'bg-white',
    };
    console.log('types', pokemon);
    return (
        <article className="flex w-96 flex-col gap-1 text-white">
            <section className="flex items-center justify-between pe-1">
                <p className="text-sm font-bold text-[#ffcb05]">
                    #{String(pokemon.pokeapi_id).padStart(3, '0')}
                </p>
                <p className="cursor-pointer rounded-full p-1 font-black hover:bg-white/50">
                    x
                </p>
            </section>
            <h3 className="text-4xl font-bold">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h3>
            <section className="flex gap-2 font-bold [&_div]:bg-white/10">
                {pokemon.types.map((type: any) => (
                    <TypeBadge key={type.type}>{type.type}</TypeBadge>
                ))}
            </section>
            <section className="mt-3 w-1/2 rounded-xl bg-white/10 p-3 italic">
                "{pokemon.description}"
            </section>
            <div className="mt-5 flex items-center justify-between gap-2">
                <section>
                    <p className="font-bold text-white/50">Estadísticas</p>
                    <div className="mt-1 flex items-center justify-between text-xs font-bold">
                        <p>HP</p>
                        <p>{pokemon.hp}</p>
                    </div>
                    <div className="h-3 w-full">
                        <div className={''}></div>
                    </div>
                </section>
            </div>
        </article>
    );
}
