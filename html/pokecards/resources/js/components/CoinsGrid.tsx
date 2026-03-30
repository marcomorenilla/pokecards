import React from 'react';
import { CoinCard } from './CoinCard';

export function CoinsGrid() {
    return (
        <section className="grid h-fit grid-cols-1 justify-evenly gap-5 p-10 text-white md:grid-cols-2 lg:grid-cols-3">
            <CoinCard />
            <CoinCard />
            <CoinCard />
        </section>
    );
}
