import React from 'react';
import ReverseCard from '../components/cards/ReverseCard';
import MainLayout from '../layouts/MainLayout';
import CollectionGrid from '../components/collection/CollectionGrid';

export default function Collection({ pokemons }: any) {
    console.log('mensaje colección', pokemons);
    return <CollectionGrid pokemons={pokemons} />;
}

Collection.layout = (page: any) => {
    const { auth } = page.props;
    return <MainLayout auth={auth}>{page}</MainLayout>;
};
