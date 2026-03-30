import React from 'react';

export function CoinCard() {
    return (
        <article className="flex h-full w-full flex-col items-center justify-start rounded-xl border border-blue-100 p-5 shadow-[0px_2px_10px_0px] shadow-blue-500 hover:shadow-[0px_5px_30px_0px]">
            <section className="flex h-64 w-48 flex-col items-center justify-center rounded-lg border border-blue-100 bg-linear-to-br from-cyan-700 to-cyan-500 text-4xl font-bold">
                <p>POKE</p>
                <p>50</p>
            </section>
            <section className="mt-6 text-2xl font-bold">Tipo de sobre</section>
            <section className="mt-3 text-gray-300">
                Descripción del tipo de sobre
            </section>
            <section className="text-gray-300">
                Contiene:
                <span className="font-bold text-amber-300"> 3 cartas</span>
            </section>
            <button className="mt-6 w-full rounded-xl bg-white p-3 font-bold text-black">
                Comprar
            </button>
        </article>
    );
}
