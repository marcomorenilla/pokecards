import { useEffect, useState } from 'react';
import '@/css/animate.css';
import { TypeBadge } from './TypeBadge';
import { useCardContext } from '@/js/hooks/useCardContext';

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
    parent: string;
    quantity: number;
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

const cardConfig: any = {
    collection: {
        nameTextSize: 'text-sm',
        badgeTextSize: 'text-xs',
        cardHeight: 'h-90',
        mainTextSize: 'text-xs',
        spriteSize: 'size-20',
    },
    modal: {
        nameTextSize: 'text-xl',
        badgeTextSize: 'text-sm',
        cardHeight: 'h-140',
        mainTextSize: 'text-lg',
        spriteSize: 'size-40',
    },
};

export function PokemonCard({ pokemon, parent, quantity }: CardProps) {
    const { onCardClick } = useCardContext() || {};

    const handleCardClick = () => {
        if (onCardClick) onCardClick(pokemon);
    };
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

    const {
        cardHeight,
        mainTextSize,
        badgeTextSize,
        spriteSize,
        nameTextSize,
    } = cardConfig[parent];

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
        <div className="relative">
            <article
                onClick={handleCardClick}
                style={{
                    background: `linear-gradient(to bottom right, ${primary}, ${secondary})`,
                }}
                className={`${onCardClick ? 'cursor-pointer' : ''} animate-opacity relative flex max-w-100 flex-col ${cardHeight} overflow-hidden rounded-xl p-3`}
            >
                <section
                    className={`flex items-center justify-between ${mainTextSize} font-bold text-gray-700`}
                >
                    <div className="flex items-center gap-1">
                        <p className="px-1">
                            #{String(pokeapi_id).padStart(3, '0')}
                        </p>
                        <p className={`text-gray-800 ${nameTextSize}`}>
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                        </p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-bold">HP</p>
                        <p className="font-black text-red-500">{hp}</p>
                    </div>
                </section>
                <section className="rounded-xl bg-radial from-white/80 to-white/0 p-1">
                    <p
                        className={`${mainTextSize} font-bold text-gray-600 italic`}
                    >
                        {cardType.label}
                    </p>
                    <div className="flex justify-center">
                        <img
                            src={sprite}
                            alt="Imagen de carta pokemon cargada de Github"
                            className={`${spriteSize}`}
                        />
                    </div>
                    <div
                        className={`flex ${mainTextSize} justify-between px-1 font-semibold text-gray-700`}
                    >
                        <p>{height / 10}m</p>
                        <p>{weight / 10}kg</p>
                    </div>
                </section>
                <section className="h-24">
                    <p
                        className={`mt-1 h-auto rounded-xl ${mainTextSize} bg-white/30 p-1 text-gray-600 italic`}
                    >
                        "{description}"
                    </p>
                </section>
                <section className={`${mainTextSize} font-bold text-gray-800`}>
                    <div className="flex items-center gap-1 border-b border-gray-600 p-1">
                        <div className="size-1 rounded-full bg-gray-600"></div>

                        <p>{main_movement.toUpperCase()}</p>
                    </div>
                    <div className="flex items-center gap-1 border-b border-gray-600 p-1">
                        <div className="size-1 rounded-full bg-gray-600"></div>
                        <p>{secondary_movement?.toUpperCase() || ''}</p>
                    </div>
                </section>
                <section
                    className={`flex ${mainTextSize} items-center justify-between p-1 font-bold text-gray-700`}
                >
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
                <section
                    className={`${badgeTextSize} mt-1 flex justify-center gap-1 font-bold text-gray-600 [&_div]:bg-white/10`}
                >
                    {types.map((type) => {
                        return (
                            <TypeBadge key={type.type}>{type.type}</TypeBadge>
                        );
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
            {quantity > 1 && parent != 'modal' && (
                <div className="animate-jump absolute -top-15 -right-10 z-10 p-4">
                    <div className="relative">
                        <svg
                            width="100px"
                            height="100px"
                            fill="none"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
                                fill="#ffcb05"
                            />
                        </svg>
                        <span className="absolute top-10 right-11 text-lg font-bold text-white">
                            x{quantity}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
