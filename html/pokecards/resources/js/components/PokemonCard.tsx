import { useEffect, useState } from 'react';

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

    let primary = pokemon.types[0]?.type_color || '#ccc' + 80;
    let secondary = pokemon.types[1]?.type_color || primary + 80;
    const cardBaseExperience: any = Number(base_experience);
    let cardType = '';

    if (cardBaseExperience < 100) {
        cardType = 'COMÚN';
    } else if (cardBaseExperience < 150) {
        cardType = 'INFRECUENTE';
    } else if (cardBaseExperience < 200) {
        cardType = 'RARA';
    } else if (cardBaseExperience < 250) {
        cardType = 'ÉPICA';
    } else {
        cardType = 'LEGENDARIA';
    }

    console.log('cardBaseExperience', cardBaseExperience);

    return (
        <article
            style={{
                background: `linear-gradient(to bottom right, ${primary}, ${secondary})`,
            }}
            className={`h-auto w-72 rounded-xl p-3 md:w-96`}
        >
            <section className="flex justify-between font-bold text-gray-700">
                <div className="flex gap-1">
                    <p className="px-1">
                        #{String(pokeapi_id).padStart(3, '0')}
                    </p>
                    <p className="text-gray-800">
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                    </p>
                </div>
                <div className="flex gap-1">
                    <p className="font-bold text-red-500">HP</p>
                    <p>{hp}</p>
                </div>
            </section>
            <section className="rounded-xl bg-radial from-white/80 to-white/0 p-1">
                <p className="text-sm font-bold text-gray-600 italic">
                    {cardType}
                </p>
                <div className="flex justify-center">
                    <img
                        src={sprite}
                        alt="Imagen de carta pokemon cargada de Github"
                        className="size-70"
                    />
                </div>
                <div className="flex justify-between px-1 font-semibold text-gray-700">
                    <p>{height / 10}m</p>
                    <p>{weight / 10}kg</p>
                </div>
            </section>
            <section>
                <p className="mt-2 rounded-xl bg-white/30 p-1 text-gray-600 italic">
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
                    <p>{secondary_movement.toUpperCase() || ''}</p>
                </div>
            </section>
            <section className="mt-2 flex items-center justify-between border-t border-gray-600 p-3 text-xs font-bold text-gray-700">
                <div className="text-center">
                    <p>ATAQUE</p>
                    <div>{attack}</div>
                </div>
                <div className="text-center">
                    <p>DEFENSA</p>
                    <div>{defense}</div>
                </div>
                <div className="text-center">
                    <p>VELOCIDAD</p>
                    <div>{speed}</div>
                </div>
                <div className="text-center">
                    <p>EXPERIENCIA</p>
                    <div>{base_experience}</div>
                </div>
            </section>
        </article>
    );
}
