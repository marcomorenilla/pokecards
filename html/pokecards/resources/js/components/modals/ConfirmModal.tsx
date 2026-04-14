import { useEffect, useRef, useState } from 'react';

export function ConfirmModal({
    onConfirmDialog,
    isDialogOpen,
    onCancelDialog,
}: any) {
    const refDialog = useRef<HTMLDialogElement>(null);

    const handleConfirmDialog = () => {
        onConfirmDialog();
    };

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
                <section className="animate-opacity flex h-fit flex-col items-center gap-5 rounded-xl border border-red-600 bg-white p-5 font-bold text-red-700">
                    <h2 className="text-3xl">
                        ¿Estás seguro de realizar esta acción?
                    </h2>
                    <h3 className="text-2xl">
                        Una vez pulses en aceptar no podrás recuperar la
                        información
                    </h3>

                    <div className="flex items-center justify-center gap-3">
                        <button
                            onClick={handleCancelDialog}
                            className="w-auto cursor-pointer rounded-xl bg-blue-700 p-3 text-center text-white hover:bg-blue-800"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleConfirmDialog}
                            className="w-auto cursor-pointer rounded-xl bg-red-700 p-3 text-center text-white hover:bg-red-800"
                        >
                            Aceptar
                        </button>
                    </div>
                </section>
            </article>
        </dialog>
    );
}
