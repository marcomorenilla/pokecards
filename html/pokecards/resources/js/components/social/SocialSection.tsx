import { useEffect, useState } from 'react';
import { PokemonCard } from '../cards/PokemonCard';
import { UndraggedCard } from '../cards/UndraggedCard';
export function SocialSection({ pokemons, user }: any) {
    const { name, img, id } = user;
    const [liked, setLiked] = useState<boolean | null>(null);
    const [filled, setFilled] = useState<boolean>(false);

    const imgLower = img.toLowerCase();
    console.log('imgLower', imgLower);

    const handleLiked = () => {
        handleFilled();
        setLiked(true);
    };

    const handleDisliked = () => {
        handleFilled();
        setLiked(false);
    };

    const handleFilled = () => {
        setFilled(true);
    };

    return (
        <article className="mt-3 rounded-xl border border-white/30 bg-gray-800/50">
            <section className="flex items-center justify-start gap-5 p-2">
                <img
                    src={`/${imgLower}`}
                    alt="imagen por defecto de usuario"
                    loading="lazy"
                    className="size-15 rounded-full"
                />
                <p className="text-xl font-semibold text-white">{name}</p>
            </section>
            <section className="mt-4 flex flex-wrap gap-5 bg-gray-600/50 px-2 py-5">
                {Array.from({ length: 6 }).map((_: any, index: number) =>
                    index < pokemons.length ? (
                        <PokemonCard
                            parent="maze"
                            pokemon={pokemons[index]}
                            quantity={1}
                        />
                    ) : (
                        <UndraggedCard index={index} />
                    ),
                )}
            </section>
            <section className="flex gap-2 p-3">
                <svg
                    width="50"
                    height="50px"
                    viewBox="-2.4 -2.4 28.80 28.80"
                    fill="none"
                    onClick={handleLiked}
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                    className="cursor-pointer transition-all duration-300 hover:scale-110"
                >
                    <g stroke-width="0">
                        <path
                            transform="translate(-2.4, -2.4), scale(1.7999999999999998)"
                            fill={`${liked && filled ? '#ffcb05' : 'transparent'}`}
                            d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z"
                            strokeWidth="0"
                        ></path>
                    </g>

                    <g>
                        <path
                            d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
                            stroke="#ffffff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                    </g>
                </svg>
                <svg
                    width="50"
                    height="50px"
                    viewBox="-2.4 -2.4 28.80 28.80"
                    fill="none"
                    onClick={handleDisliked}
                    xmlns="http://www.w3.org/2000/svg"
                    transform="rotate(180)"
                    stroke="#ffffff"
                    className="cursor-pointer transition-all duration-300 hover:scale-110"
                >
                    <g id="SVGRepo_bgCarrier" stroke-width="0">
                        <path
                            transform="translate(-2.4, -2.4), scale(1.7999999999999998)"
                            fill={`${!liked && filled ? '#ffcb05' : 'transparent'}`}
                            d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z"
                            strokeWidth="0"
                        ></path>
                    </g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke="#CCCCCC"
                        stroke-width="0.048"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        {' '}
                        <path
                            d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
                            stroke="#ffffff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>{' '}
                    </g>
                </svg>
            </section>
        </article>
    );
}
