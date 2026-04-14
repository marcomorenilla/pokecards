import { useState } from 'react';
import CollectionFiltered from '../collection/CollectionFiltered';
import { MazeContext } from '@/js/context/MazeContext';
import { UndraggedCard } from '../cards/UndraggedCard';
import { MazeInfo } from './MazeInfo';
import '@/css/animate.css';
import { PokemonCard } from '../cards/PokemonCard';
import { ConfirmModal } from '../modals/ConfirmModal';
import axios from 'axios';
import { router } from '@inertiajs/react';
const initialMazeTeam: any = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
};
export function MazeWrapper({ pokemons, auth, maze }: any) {
    const [isDragging, setIsDragging] = useState(false);

    const startingMaze = { ...initialMazeTeam };

    maze.forEach((mazeEntry: any, index: number) => {
        startingMaze[`${index}`] = {
            pokemon: mazeEntry.pokemons,
            quantity: 1,
        };
    });

    const [mazeTeam, setMazeTeam] = useState<any>(startingMaze);
    const [isDialogOpen, setisDialogOpen] = useState(false);

    const pokemonObject = new Map();
    pokemons.forEach((pokemonCollected: any) => {
        pokemonObject.set(pokemonCollected.pokemons['pokeapi_id'], {
            pokemon: pokemonCollected.pokemons,
            quantity: pokemonCollected.quantity,
        });
    });
    const [pokemonMap, setPokemonMap] = useState(pokemonObject);
    const { user } = auth;
    const handleCardDrag = (pokemon: any) => {
        setIsDragging(true);
    };

    let cardIndex = -1;

    const handleDragOver = (index: any) => {
        setIsDragging(true);
        cardIndex = index;
    };

    const handleEndDrag = (pokemon: any) => {
        const newPokemonMap = new Map(pokemonMap);
        console.log(cardIndex);
        if (cardIndex >= 0) {
            console.log('colocando pokemon', pokemon);
            console.log('posicion', cardIndex);
            const actualPokemon = newPokemonMap.get(pokemon.id);
            console.log('actualpokemon', actualPokemon);
            console.log('actualPokemon qty', actualPokemon.quantity);
            if (actualPokemon) {
                const newMazeTeam = { ...mazeTeam, [cardIndex]: actualPokemon };
                if (actualPokemon.quantity - 1 > 0) {
                    newPokemonMap.set(pokemon.id, {
                        ...actualPokemon,
                        quantity: actualPokemon.quantity - 1,
                    });
                } else {
                    newPokemonMap.delete(pokemon.id);
                }
                setPokemonMap(newPokemonMap);

                router.post(
                    '/maze/addToMaze',
                    { user_id: user.id, pokemon_id: pokemon.id },
                    {
                        onSuccess: () => {
                            console.log('success');
                        },
                        onError: (err) => {
                            console.error(err.message);
                        },
                    },
                );

                setMazeTeam(newMazeTeam);
            }
        }
        cardIndex = -1;

        setIsDragging(false);
    };

    const handleCloseDialog = () => {
        setisDialogOpen(false);
    };

    const handleOpenDialog = () => {
        setisDialogOpen(true);
    };

    const handleDeleteMaze = () => {
        setMazeTeam(initialMazeTeam);

        router.post('/maze/delete');
        setisDialogOpen(false);
    };
    return (
        <>
            {' '}
            <MazeInfo />
            <section
                className={`mt-15 flex ${isDragging ? 'cursor-grabbing' : ''} justify-center gap-5`}
            >
                {' '}
                <article className="scroll-custom relative hidden h-3/5 max-h-screen w-1/2 overflow-scroll rounded-xl border border-4 border-[#ffcb05]/30 lg:block">
                    <div className="sticky top-0 z-30 flex justify-between self-center bg-[#222] p-10 text-2xl font-bold text-white/60">
                        <h2>INVENTARIO </h2>
                        <button
                            onClick={handleOpenDialog}
                            className="cursor-pointer rounded-xl border border-red-500 bg-red-500/30 p-2 text-sm text-red-500 hover:scale-110 hover:bg-red-500 hover:text-white"
                        >
                            Eliminar mazo
                        </button>
                    </div>
                    <div className="mt-10 flex flex-wrap justify-center gap-3">
                        <MazeContext.Provider
                            value={{
                                onCardDrag: handleCardDrag,
                                onEndDrag: handleEndDrag,
                            }}
                        >
                            <CollectionFiltered pokemonObject={pokemonMap} />
                        </MazeContext.Provider>
                    </div>
                </article>
                <div className="scroll-custom flex h-full max-h-screen w-full flex-col overflow-scroll rounded-xl border-4 border-[#ffcb05]/30 lg:h-fit lg:max-h-none lg:w-1/2">
                    <h2 className="sticky top-0 flex w-full justify-center self-center bg-[#222] p-2 p-10 text-2xl font-bold text-white/60">
                        MAZO
                    </h2>
                    <div className="mt-10 mb-10 grid grid-cols-1 place-content-center gap-5 px-10 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map(
                            (_: any, index: number) => {
                                const pokemonFinded: any = mazeTeam[`${index}`];
                                if (pokemonFinded) {
                                    return (
                                        <PokemonCard
                                            key={index}
                                            parent="maze"
                                            quantity={1}
                                            pokemon={pokemonFinded.pokemon}
                                        />
                                    );
                                } else {
                                    return (
                                        <UndraggedCard
                                            key={index}
                                            index={index}
                                            onDragOver={handleDragOver}
                                        />
                                    );
                                }
                            },
                        )}
                    </div>
                </div>
            </section>
            <ConfirmModal
                onCancelDialog={handleCloseDialog}
                onConfirmDialog={handleDeleteMaze}
                isDialogOpen={isDialogOpen}
            />
        </>
    );
}
