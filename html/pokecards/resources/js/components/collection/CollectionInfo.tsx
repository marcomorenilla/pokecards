import React from 'react';

export function CollectionInfo({ quantity }: any) {
    const collectionProgress = Math.round((quantity * 100) / 151);
    console.log('collection qty', collectionProgress);

    return (
        <section className="p-5">
            <div className="flex h-auto flex-wrap items-center justify-between gap-3">
                <article className="flex items-center justify-start gap-3">
                    <svg
                        fill="#ffcb05"
                        width="50"
                        height="50px"
                        viewBox="0 0 32 32"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M30 32h-10c-1.105 0-2-0.895-2-2v-10c0-1.105 0.895-2 2-2h10c1.105 0 2 0.895 2 2v10c0 1.105-0.895 2-2 2zM30 20h-10v10h10v-10zM30 14h-10c-1.105 0-2-0.896-2-2v-10c0-1.105 0.895-2 2-2h10c1.105 0 2 0.895 2 2v10c0 1.104-0.895 2-2 2zM30 2h-10v10h10v-10zM12 32h-10c-1.105 0-2-0.895-2-2v-10c0-1.105 0.895-2 2-2h10c1.104 0 2 0.895 2 2v10c0 1.105-0.896 2-2 2zM12 20h-10v10h10v-10zM12 14h-10c-1.105 0-2-0.896-2-2v-10c0-1.105 0.895-2 2-2h10c1.104 0 2 0.895 2 2v10c0 1.104-0.896 2-2 2zM12 2h-10v10h10v-10z"
                            className="group-focus-within:stroke-white"
                            strokeWidth="1"
                        ></path>
                    </svg>
                    <div className="">
                        <h1 className="text-2xl font-black text-white">
                            COLECCIÓN
                        </h1>
                        <h3 className="text-gray-500">
                            Pokédex de Kanto (151)
                        </h3>
                    </div>
                </article>
                <article className="flex w-fit flex-wrap items-center gap-3 rounded-xl border border-[#ffcb05] bg-[#ffcb05]/5 p-4 text-gray-200">
                    <div className="">
                        <h1 className="text-2xl font-black">Progreso:</h1>
                        <p className="text-xl font-black">
                            <span className="text-2xl text-[#ffcb05]">
                                {quantity}
                            </span>
                            /151
                        </p>
                    </div>
                    <div className="h-5 w-48 overflow-hidden rounded-full bg-gray-600">
                        <div
                            style={{ width: `${collectionProgress}%` }}
                            className={`h-full bg-[#ffcb05]`}
                        ></div>
                    </div>
                </article>
            </div>
        </section>
    );
}
