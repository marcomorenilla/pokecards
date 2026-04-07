import { useEffect, useState } from 'react';
import '@/css/animate.css';
import { TypeBadge } from './TypeBadge';
import { config } from 'process';

interface PokemonType {
    type: string;
    type_color: string;
}

interface Pokemon {
    id: number;
    pokeapi_id: number;
    name: string;
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
    weight: number;
    height: number;
    description: string;
    main_movement: string;
    secondary_movement: string;
    base_experience: string;
    sprite: string;
    created_at: string;
    updated_at: string;
    types: PokemonType[];
}
interface CardProps {
    pokemon: Pokemon;
}

const typeConfig: any = {
    common: {
        label: 'COMÚN',
    },
    uncommon: {
        label: 'INFRECUENTE',
    },
    rare: {
        label: 'RARA',
        color: '#77c24d',
        effect: 'animate-rare',
    },
    epic: {
        label: 'ÉPICA',
        color: '#b15db0',
        effect: 'animate-epic',
    },
    legendary: {
        label: 'LEGENDARIA',
        color: '#ffcb05',
        effect: 'animate-legendary',
    },
};

export function PokemonCard({ pokemon }: CardProps) {
    const {
        id,
        pokeapi_id,
        name,
        hp,
        attack,
        defense,
        special_attack,
        special_defense,
        speed,
        weight,
        height,
        description,
        main_movement,
        secondary_movement,
        base_experience,
        sprite,
        types,
    } = pokemon;

    const cardBaseExperience: any = Number(base_experience);
    let typeKey = '';
    if (cardBaseExperience < 100) {
        typeKey = 'common';
    } else if (cardBaseExperience < 150) {
        typeKey = 'uncommon';
    } else if (cardBaseExperience < 200) {
        typeKey = 'rare';
    } else if (cardBaseExperience < 250) {
        typeKey = 'epic';
    } else {
        typeKey = 'legendary';
    }
    let cardType = typeConfig[typeKey];

    let primary = cardType.color || types[0]?.type_color || '#ccc' + 80;
    let secondary = cardType.color || types[1]?.type_color || primary + 80;

    return (
        <article
            style={{
                background: `linear-gradient(to bottom right, ${primary}, ${secondary})`,
            }}
            className={`animate-opacity relative h-140 w-72 overflow-hidden rounded-xl p-3 md:w-96`}
        >
            <section className="flex justify-between text-xl font-bold text-gray-700">
                <div className="flex gap-1">
                    <p className="px-1">
                        #{String(pokeapi_id).padStart(3, '0')}
                    </p>
                    <p className="text-gray-800">
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                    </p>
                </div>
                <div className="flex gap-1">
                    <p className="font-bold">HP</p>
                    <p className="font-black text-red-500">{hp}</p>
                </div>
            </section>
            <section className="rounded-xl bg-radial from-white/80 to-white/0 p-1">
                <p className="text-sm font-bold text-gray-600 italic">
                    {cardType.label}
                </p>
                <div className="flex justify-center">
                    <img
                        src={sprite}
                        alt="Imagen de carta pokemon cargada de Github"
                        className="size-40"
                    />
                </div>
                <div className="flex justify-between px-1 font-semibold text-gray-700">
                    <p>{height / 10}m</p>
                    <p>{weight / 10}kg</p>
                </div>
            </section>
            <section>
                <p className="mt-2 h-24 rounded-xl bg-white/30 p-1 text-gray-600 italic">
                    "{description}"
                </p>
            </section>
            <section className="mt-4 text-sm font-bold text-gray-800">
                <div className="flex items-center gap-1 border-b border-gray-600 p-2">
                    <div className="size-1 rounded-full bg-gray-600"></div>

                    <p>{main_movement.toUpperCase()}</p>
                </div>
                <div className="flex items-center gap-1 p-2 text-sm">
                    <div className="size-1 rounded-full bg-gray-600"></div>
                    <p>{secondary_movement?.toUpperCase() || ''}</p>
                </div>
            </section>
            <section className="mt-2 flex items-center justify-between border-t border-gray-600 p-3 font-bold text-gray-700">
                <div className="text-center">
                    <p className="text-gray-600">AT.</p>
                    <div>{attack}</div>
                </div>
                <div className="text-center">
                    <p className="text-gray-600">DEF.</p>
                    <div>{defense}</div>
                </div>
                <div className="text-center">
                    <p className="text-gray-600">VEL.</p>
                    <div>{speed}</div>
                </div>
                <div className="text-center">
                    <p className="text-gray-600">EXP.</p>
                    <div>{base_experience}</div>
                </div>
            </section>
            <section className="text flex justify-center gap-1 text-sm font-bold text-gray-600">
                {types.map((type) => {
                    return <TypeBadge key={type.type}>{type.type}</TypeBadge>;
                })}
            </section>
            {cardType.effect == 'animate-rare' && (
                <div className="animate-rare absolute inset-0 z-1 h-full w-full rounded-xl bg-linear-to-r from-transparent from-40% via-white/60 to-white/30 to-70%"></div>
            )}
            {cardType.effect == 'animate-epic' && (
                <div className="animate-epic absolute inset-0 z-1 h-full w-full rounded-xl bg-radial from-white to-10% bg-size-[50px_50px]"></div>
            )}
            {cardType.effect == 'animate-legendary' && (
                <section>
                    <div className="animate-rare absolute inset-0 z-2 h-full w-full rounded-xl bg-linear-to-r from-transparent from-40% via-white/60 to-white/30 to-70%"></div>
                    <div className="animate-epic absolute inset-0 z-1 h-full w-full rounded-xl bg-radial from-white to-30% bg-size-[20px_20px]"></div>
                </section>
            )}
        </article>
    );
}
