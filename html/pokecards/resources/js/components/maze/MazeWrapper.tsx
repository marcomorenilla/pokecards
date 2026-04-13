import { useState } from 'react';
import CollectionFiltered from '../collection/CollectionFiltered';
import { MazeContext } from '@/js/context/MazeContext';

export function MazeWrapper({ pokemons }: any) {
    const [isDragging, setIsDragging] = useState(false);
    const pokemonObject = new Map();
    pokemons.forEach((pokemonCollected: any) => {
        pokemonObject.set(pokemonCollected.pokemons['pokeapi_id'], {
            pokemon: pokemonCollected.pokemons,
            quantity: pokemonCollected.quantity,
        });
    });
    const handleCardDrag = (pokemon: any) => {
        console.log('drag', pokemon);
        setIsDragging(true);
    };

    const handleEndDrag = () => {
        console.log('drag ended');
        setIsDragging(false);
    };
    return (
        <section className={`mt-10 flex !cursor-grabbing flex-wrap gap-1`}>
            <div className="flex w-1/2 flex-wrap gap-3">
                <MazeContext.Provider
                    value={{
                        onCardDrag: handleCardDrag,
                        onEndDrag: handleEndDrag,
                    }}
                >
                    <CollectionFiltered pokemonObject={pokemonObject} />
                </MazeContext.Provider>
            </div>
            <div className=""></div>
        </section>
    );
}
