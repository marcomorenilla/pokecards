import { useEffect, useRef } from 'react';
import CollectionFiltered from '../collection/CollectionFiltered';

export function CollectionFilteredModal({
    isDialogOpen,
    onCancelDialog,
    pokemonList,
}: any) {
    const refDialog = useRef<HTMLDialogElement>(null);

    const handleCancelDialog = () => {
        onCancelDialog();
    };
    useEffect(() => {
        if (isDialogOpen) {
            refDialog.current?.showModal();
        } else {
            refDialog.current?.close();
        }
    }, [isDialogOpen]);

    return (
        <dialog
            ref={refDialog}
            className="fixed inset-0 h-screen max-h-none w-screen max-w-none bg-transparent backdrop-blur-lg"
            onClose={onCancelDialog}
        >
            <article className="flex h-full w-full items-center justify-center bg-black/70">
                <section className="animate-opacity flex h-fit max-h-screen flex-col items-center gap-5 rounded-xl bg-black p-5 font-bold text-white">
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="text-2xl">Selecciona tu favorito</h2>
                        <button
                            onClick={handleCancelDialog}
                            className="rounded-xl bg-green-500 p-2 font-bold text-white"
                        >
                            Volver
                        </button>
                    </div>
                    <div className="flex max-h-screen w-full flex-col items-center gap-2 overflow-scroll">
                        <CollectionFiltered pokemonObject={pokemonList} />
                    </div>
                </section>
            </article>
        </dialog>
    );
}
