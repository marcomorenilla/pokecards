import React from 'react';
import '../../css/animate.css';
const colorMap = {
    basic: {
        gradient: 'from-cyan-700 to-cyan-500',
        border: 'border-blue-100',
        shadow: 'shadow-blue-500',
        hover: 'hover:bg-cyan-500',
    },
    medium: {
        gradient: 'from-violet-700 to-violet-500',
        border: 'border-purple-100',
        shadow: 'shadow-purple-500',
        hover: 'hover:bg-violet-500',
    },
    vip: {
        gradient: 'from-amber-700 to-amber-500',
        border: 'border-yellow-100',
        shadow: 'shadow-yellow-500',
        hover: 'hover:bg-amber-500',
    },
} as const;

type ColorKeys = keyof typeof colorMap;
interface CoinProps {
    color: ColorKeys;
    cards: number;
    price: number;
    onCardBuy: (amount: number) => void;
    children: React.ReactNode[];
}
export function CoinCard({
    color,
    cards,
    price,
    onCardBuy,
    children,
}: CoinProps) {
    const cardColor = colorMap[color];
    return (
        <article
            className={`flex h-full w-full flex-col items-center justify-start rounded-xl border ${cardColor.border} p-5 shadow-[0px_2px_10px_0px] ${cardColor.shadow} hover:shadow-[0px_5px_30px_0px]`}
        >
            <section
                className={`animate-jump flex h-64 w-48 flex-col items-center justify-center rounded-lg border border-blue-100 bg-linear-to-br ${cardColor.gradient} text-4xl font-bold`}
            >
                <p className="">POKE</p>
                <div className="mt-5 flex items-center gap-2">
                    <p>{price}</p>
                    <svg
                        width="50px"
                        height="50px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14 10.5C14 11.8807 11.7614 13 9 13C6.23858 13 4 11.8807 4 10.5M14 10.5C14 9.11929 11.7614 8 9 8C6.23858 8 4 9.11929 4 10.5M14 10.5V14.5M4 10.5V14.5M20 5.5C20 4.11929 17.7614 3 15 3C13.0209 3 11.3104 3.57493 10.5 4.40897M20 5.5C20 6.42535 18.9945 7.23328 17.5 7.66554M20 5.5V14C20 14.7403 18.9945 15.3866 17.5 15.7324M20 10C20 10.7567 18.9495 11.4152 17.3999 11.755M14 14.5C14 15.8807 11.7614 17 9 17C6.23858 17 4 15.8807 4 14.5M14 14.5V18.5C14 19.8807 11.7614 21 9 21C6.23858 21 4 19.8807 4 18.5V14.5"
                            stroke="#ffcb05"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </section>
            {children[0]}
            {children[1]}
            <section className="mt-6 text-gray-300">
                Contiene:
                <span className="font-bold text-amber-300">
                    {' '}
                    {cards} cartas
                </span>
            </section>
            <button
                className={`mt-6 w-full rounded-xl bg-white p-3 font-bold text-black ${cardColor.hover} hover:text-white`}
                onClick={() => onCardBuy(-price)}
            >
                Comprar
            </button>
        </article>
    );
}
