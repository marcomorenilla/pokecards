import { useEffect, useState, useMemo } from 'react';
import { PokemonCard } from '../cards/PokemonCard';
import { UndraggedCard } from '../cards/UndraggedCard';
import CollectionFiltered from '../collection/CollectionFiltered';
import { router } from '@inertiajs/react';
import { MazeContext } from '@/js/context/MazeContext';
import { CollectionFilteredModal } from '../modals/CollectionFilteredModal';
import { ResponsiveContext } from '@/js/context/ResponsiveContext';

const initialMazeTeam: any = new Map();

export function MazeFlex({
    pokemons,
    maze,
    auth,
    handleOpenDialog,
    isDeleteConfirmed,
    handleDeleteConfirmed,
}: any) {
    const [isDragging, setIsDragging] = useState(false);
    const [mazeTeam, setMazeTeam] = useState<any>(initialMazeTeam);
    const [cardIndex, setCardIndex] = useState(-1);
    const { user } = auth;
    const [isDialogOpen, setisDialogOpen] = useState(false);
    console.log('maze', maze);
    useEffect(() => {
        console.log(mazeTeam);
        const startMap = new Map(initialMazeTeam);
        maze.forEach((mazeEntry: any, index: number) => {
            console.log('inserting on', mazeEntry);
            startMap.set(mazeEntry.position, {
                pokemon: mazeEntry.pokemons,
                quantity: 1,
            });
        });
        setMazeTeam(startMap);
    }, []);

    useEffect(() => {
        if (isDeleteConfirmed) {
            handleDeleteMaze();
        }
    }, [isDeleteConfirmed]);

    const pokemonMap = useMemo(() => {
        const pokemonObject = new Map();

        const mazeTeamValues = [...mazeTeam.values()];

        pokemons.forEach((pokemonCollected: any) => {
            const pokemon = pokemonCollected.pokemons;
            let quantity = pokemonCollected.quantity;

            const pokemonInMaze = mazeTeamValues.find(
                (value: any) =>
                    value.pokemon['pokeapi_id'] == pokemon['pokeapi_id'],
            );

            if (pokemonInMaze) {
                quantity--;
            }

            if (quantity > 0) {
                pokemonObject.set(pokemon['pokeapi_id'], { pokemon, quantity });
            }
        });

        return pokemonObject;
    }, [pokemons, mazeTeam]);

    const handleCardDrag = () => setIsDragging(true);

    const handleDragOver = (index: any) => {
        setIsDragging(true);
        setCardIndex(index);
    };

    const handleDeleteMaze = () => {
        setMazeTeam(initialMazeTeam);
        router.post('/maze/delete');
        handleDeleteConfirmed();
    };

    const handleEndDrag = (pokemon: any) => {
        if (cardIndex >= 0) {
            const actualPokemonData = pokemonMap.get(pokemon.id);

            if (actualPokemonData && actualPokemonData.quantity >= 0) {
                const newMazeTeam = new Map(mazeTeam);

                newMazeTeam.set(cardIndex, actualPokemonData);

                setMazeTeam(newMazeTeam);

                router.post(
                    '/maze/addToMaze',
                    {
                        user_id: user.id,
                        pokemon_id: pokemon.id,
                        position: cardIndex,
                    },
                    {
                        onSuccess: () => console.log('success'),
                        onError: (err) => console.error(err.message),
                    },
                );
            }
        }
        setCardIndex(-1);
        setIsDragging(false);
        handleCloseDialog();
    };

    const handleCloseDialog = () => {
        setisDialogOpen(false);
    };

    const handleOpenCollectionDialog = (index: any) => {
        setisDialogOpen(true);
        setCardIndex(index);
    };

    return (
        <>
            <section
                className={`mt-15 flex ${isDragging ? 'cursor-grabbing' : ''} justify-center gap-3`}
            >
                <article className="scroll-custom relative hidden h-3/5 max-h-screen w-2/5 overflow-scroll rounded-xl border-4 border-[#ffcb05]/30 lg:block">
                    <div className="sticky top-0 z-30 flex justify-between self-center bg-[#222] p-10 text-2xl font-bold text-white/60">
                        <h2>INVENTARIO</h2>
                    </div>
                    <div className="mt-10 flex flex-wrap justify-center gap-10">
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

                <div className="scroll-custom flex h-full max-h-screen w-3/5 flex-col overflow-scroll rounded-xl border-4 border-[#ffcb05]/30 lg:h-fit lg:max-h-none">
                    <div className="sticky top-0 z-30 flex w-full justify-between self-center bg-[#222] p-10 text-2xl font-bold text-white/60">
                        <h2>MAZO</h2>
                        <button
                            onClick={handleOpenDialog}
                            className="cursor-pointer rounded-xl border border-red-500 bg-red-500/30 p-2 text-sm text-red-500 hover:scale-110 hover:bg-red-500 hover:text-white"
                        >
                            Eliminar mazo
                        </button>
                    </div>
                    <div className="mt-10 mb-10 grid grid-cols-1 place-items-center gap-10 px-8 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map(
                            (_: any, index: number) => {
                                const pokemonFinded: any = mazeTeam.get(index);
                                if (pokemonFinded) {
                                    return (
                                        <div className="transition-all duration-300 ease-in-out hover:cursor-grabbing">
                                            <PokemonCard
                                                key={index}
                                                parent="maze"
                                                quantity={1}
                                                pokemon={pokemonFinded.pokemon}
                                            />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <UndraggedCard
                                            key={index}
                                            index={index}
                                            handleOpenCollection={
                                                handleOpenCollectionDialog
                                            }
                                            onDragOver={handleDragOver}
                                        />
                                    );
                                }
                            },
                        )}
                    </div>
                </div>
            </section>
            <ResponsiveContext.Provider
                value={{ onResponsiveClick: handleEndDrag }}
            >
                <CollectionFilteredModal
                    isDialogOpen={isDialogOpen}
                    onCancelDialog={handleCloseDialog}
                    pokemonList={pokemonMap}
                />
            </ResponsiveContext.Provider>
        </>
    );
}
