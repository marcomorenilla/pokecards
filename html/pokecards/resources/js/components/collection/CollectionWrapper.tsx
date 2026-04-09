import React, { useMemo, useState } from 'react';
import { CollectionFilter } from './CollectionFilter';
import CollectionGrid from './CollectionGrid';
import { CollectionInfo } from './CollectionInfo';

export function CollectionWrapper({ pokemons: initialPokemons }: any) {
    const [isFiltered, setIsFiltered] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');

    const displayedPokemons = useMemo(() => {
        let result = [...initialPokemons].filter((p: any) =>
            p.pokemons.name.toLowerCase().includes(filterText.toLowerCase()),
        );

        if (sortCriteria === 'quantity') {
            result.sort((a, b) => a.quantity - b.quantity);
            console.log(result);
        } else if (sortCriteria === 'name') {
            result.sort((a, b) =>
                a.pokemons.name.localeCompare(b.pokemons.name),
            );
        } else if (sortCriteria === 'id') {
            result.sort(
                (a, b) => a.pokemons.pokeapi_id - b.pokemons.pokeapi_id,
            );
        }

        return result;
    }, [filterText, sortCriteria, initialPokemons]);

    const handleInputChange = (value: string) => {
        setFilterText(value);
        setIsFiltered(value.trim() !== '');
    };

    const handleSelectionChange = (sortCriteria: any) => {
        console.log(sortCriteria);
        const value = sortCriteria;
        if (value) setIsFiltered(true);
        setSortCriteria(value);
    };

    return (
        <>
            <CollectionInfo quantity={displayedPokemons.length} />
            <CollectionFilter
                onInputChange={handleInputChange}
                onSelectionChange={handleSelectionChange}
            />
            <CollectionGrid
                pokemons={displayedPokemons}
                isFiltered={isFiltered}
            />
        </>
    );
}
