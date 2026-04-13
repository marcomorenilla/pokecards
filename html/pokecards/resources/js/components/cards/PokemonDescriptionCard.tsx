import React from 'react';
import { TypeBadge } from './TypeBadge';
import { StatRow } from '../stats/StatRow';

export default function PokemonDescriptionCard({ pokemon, onClose }: any) {
    const statsColor = {
        hp: 'bg-green-500',
        attack: 'bg-red-500',
        defense: 'bg-blue-500',
        speed: 'bg-yellow-500',
        base_experience: 'bg-white',
    };

    console.log(pokemon);

    return (
        <article className="flex h-full flex-col gap-1 text-white">
            <section className="flex items-center justify-between pe-1">
                <p className="text-sm font-bold text-[#ffcb05]">
                    #{String(pokemon.pokeapi_id).padStart(3, '0')}
                </p>

                <div
                    onClick={onClose}
                    className="flex size-5 cursor-pointer items-center justify-center rounded-full hover:bg-white/50"
                >
                    <p className="font-black">x</p>
                </div>
            </section>
            <h3 className="text-2xl font-bold md:text-4xl">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h3>
            <section className="flex gap-2 font-bold [&_div]:bg-white/10">
                {pokemon.types.map((type: any) => (
                    <TypeBadge key={type.type}>{type.type}</TypeBadge>
                ))}
            </section>
            <section className="mt-3 rounded-xl bg-white/10 p-3 italic">
                "{pokemon.description}"
            </section>
            <div className="mt-5 flex items-start justify-between gap-4">
                <section className="flex w-full flex-col gap-2">
                    <p className="font-bold text-white/50">Estadísticas</p>
                    <StatRow
                        statName={'hp'}
                        statValue={pokemon.hp}
                        statColor={statsColor['hp']}
                    />
                    <StatRow
                        statName={'ataque'}
                        statValue={pokemon.attack}
                        statColor={statsColor['attack']}
                    />
                    <StatRow
                        statName={'defensa'}
                        statValue={pokemon.defense}
                        statColor={statsColor['defense']}
                    />
                    <StatRow
                        statName={'velocidad'}
                        statValue={pokemon.speed}
                        statColor={statsColor['speed']}
                    />
                    <StatRow
                        statName={'experiencia'}
                        statValue={pokemon['base_experience']}
                        statColor={statsColor['base_experience']}
                    />
                </section>
                <section className="flex w-full flex-col gap-2">
                    <p className="font-bold text-white/50">
                        Ataques principales
                    </p>
                    <div className="flex items-center justify-between rounded-xl bg-gray-500/50 p-3 text-gray-300">
                        <p>{pokemon['main_movement']}</p>
                        <div className="size-3 animate-pulse rounded-full bg-[#ffcb05]"></div>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-gray-500/50 p-3 text-gray-300">
                        <p>{pokemon['secondary_movement']}</p>
                        <div className="size-3 animate-pulse rounded-full bg-[#ffcb05]"></div>
                    </div>
                </section>
            </div>
            <section className="mt-auto place-self-end">
                <button
                    onClick={onClose}
                    className="cursor-pointer rounded-xl bg-gray-500/50 p-1 font-bold text-white/70 hover:bg-gray-500/80"
                >
                    Cerrar
                </button>
            </section>
        </article>
    );
}
