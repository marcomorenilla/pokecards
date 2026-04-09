import React from 'react';
import ReverseCard from '../components/cards/ReverseCard';
import MainLayout from '../layouts/MainLayout';
import { CollectionWrapper } from '../components/collection/CollectionWrapper';

export default function Collection({ pokemons }: any) {
    return <CollectionWrapper pokemons={pokemons} />;
}

Collection.layout = (page: any) => {
    const { auth } = page.props;
    return <MainLayout auth={auth}>{page}</MainLayout>;
};
