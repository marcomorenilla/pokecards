import React, { useEffect, useRef, useState } from 'react';
import { CoinCard } from './CoinCard';
import { router } from '@inertiajs/react';

interface CoinsProps {
    coins: number;
}
export function CoinsGrid({ coins }: CoinsProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isDialogOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isDialogOpen]);

    const handleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    const handleCardBuy = (amount: number) => {
        if (coins + amount > 0) {
            router.post('/users/addCoins', { coins: amount });
            handleDialog();
        } else {
            alert('no dinero');
        }
    };

    return (
        <>
            <section className="grid h-fit grid-cols-1 justify-evenly gap-5 p-10 text-white lg:grid-cols-3">
                <CoinCard
                    color="basic"
                    price={50}
                    cards={5}
                    onCardBuy={handleCardBuy}
                >
                    <section className="mt-6 text-2xl font-bold">
                        Sobre Básico
                    </section>
                    <section className="mt-3 text-gray-300">
                        Para los que necesitan lo justo
                    </section>
                </CoinCard>
                <CoinCard
                    color="medium"
                    price={100}
                    cards={10}
                    onCardBuy={handleCardBuy}
                >
                    <section className="mt-6 text-2xl font-bold">
                        Sobre Estándard
                    </section>
                    <section className="mt-3 text-gray-300">
                        Para los que van más allá
                    </section>
                </CoinCard>
                <CoinCard
                    color="vip"
                    price={200}
                    cards={15}
                    onCardBuy={handleCardBuy}
                >
                    <section className="mt-6 text-2xl font-bold">
                        Sobre Premium
                    </section>
                    <section className="mt-3 text-gray-300">
                        Para los inconformistas
                    </section>
                </CoinCard>
            </section>
            <dialog
                ref={dialogRef}
                className="h-screen max-h-none w-screen max-w-none bg-transparent backdrop-blur-lg"
            >
                <div className="flex h-full items-center justify-center text-white">
                    <div className="flex h-5/6 w-1/2 flex-col items-center justify-start gap-3 rounded-xl bg-gray-600 p-5 shadow-[0px_0px_20px_20px] shadow-cyan-500">
                        <h1 className="text-3xl font-bold">SOBRE CONSEGUIDO</h1>
                        <article className="h-5/6 w-3/5 rounded-xl bg-white"></article>
                        <button
                            onClick={handleDialog}
                            className="w-full rounded-xl bg-yellow-500 p-2 text-xl font-bold hover:bg-yellow-600"
                        >
                            Siguiente carta
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}
