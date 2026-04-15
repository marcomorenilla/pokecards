import React, { useEffect, useMemo, useState } from 'react';
import { CollectionFilter } from './CollectionFilter';
import CollectionGrid from './CollectionGrid';
import { CollectionInfo } from './CollectionInfo';
import { CardContext } from '@/js/context/CardContext';
import PokemonStatsModal from '../modals/PokemonStatsModal';

export function CollectionWrapper({ pokemons: initialPokemons }: any) {
    const [isFiltered, setIsFiltered] = useState(false);
    const [isReverse, setIsReverse] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [pokemon, setPokemon] = useState(null);
    useEffect(() => {
        if (sortCriteria == 'unfiltered') setIsFiltered(false);
    }, [sortCriteria]);

    const displayedPokemons = useMemo(() => {
        let result = [...initialPokemons].filter((p: any) =>
            p.pokemons.name.toLowerCase().includes(filterText.toLowerCase()),
        );

        if (sortCriteria === 'quantity') {
            if (isReverse) {
                result.sort((a, b) => b.quantity - a.quantity);
            } else {
                result.sort((a, b) => a.quantity - b.quantity);
            }
        } else if (sortCriteria === 'name') {
            if (isReverse) {
                result.sort((a, b) =>
                    b.pokemons.name.localeCompare(a.pokemons.name),
                );
            } else {
                result.sort((a, b) =>
                    a.pokemons.name.localeCompare(b.pokemons.name),
                );
            }
        } else if (sortCriteria === 'id') {
            if (isReverse) {
                result.sort(
                    (a, b) => b.pokemons.pokeapi_id - a.pokemons.pokeapi_id,
                );
            } else {
                result.sort(
                    (a, b) => a.pokemons.pokeapi_id - b.pokemons.pokeapi_id,
                );
            }
        }

        return result;
    }, [filterText, sortCriteria, isReverse, initialPokemons]);

    const handleInputChange = (value: string) => {
        setFilterText(value);
        setIsFiltered(value.trim() !== '');
    };

    const handleSelectionChange = (sortCriteria: any) => {
        const value = sortCriteria;
        if (value) setIsFiltered(true);
        setSortCriteria(value);
    };

    const handleReverse = () => {
        setIsReverse(!isReverse);
    };

    const handleOpenDialog = (pokemon: any) => {
        console.log(isDialogOpen);
        setIsDialogOpen(true);
        setPokemon(pokemon);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <CollectionInfo quantity={displayedPokemons.length} />
            {initialPokemons.length == 0 && (
                <h2 className="animate-opacity mt-10 text-3xl font-bold text-white">
                    Compra un sobre, empieza la colección y conviertete en el
                    mejor entrenador Pokémon de la historia
                </h2>
            )}
            {initialPokemons.length > 0 && (
                <CardContext.Provider value={{ onCardClick: handleOpenDialog }}>
                    <CollectionFilter
                        onInputChange={handleInputChange}
                        onSelectionChange={handleSelectionChange}
                        onReverseClick={handleReverse}
                    />
                    <CollectionGrid
                        pokemons={displayedPokemons}
                        isFiltered={isFiltered}
                    />
                </CardContext.Provider>
            )}
            {pokemon && (
                <PokemonStatsModal
                    isDialogOpen={isDialogOpen}
                    pokemon={pokemon}
                    handleDialog={handleCloseDialog}
                />
            )}
        </>
    );
}
