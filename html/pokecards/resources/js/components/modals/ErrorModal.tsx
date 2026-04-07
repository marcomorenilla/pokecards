import { useEffect, useRef, useState } from 'react';
import '@/css/app.css';
interface ErrorModalProps {
    title: string;
    message: string;
    onCloseDialog: () => void;
}
export function ErrorModal({ title, message, onCloseDialog }: ErrorModalProps) {
    const refDialog = useRef<HTMLDialogElement>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(true);

    const handleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
        onCloseDialog();
    };
    useEffect(() => {
        if (refDialog && refDialog.current?.open) {
            refDialog.current.close();
        } else {
            refDialog.current?.showModal();
        }
    }, [isDialogOpen]);

    return (
        <dialog
            ref={refDialog}
            className="fixed inset-0 h-screen max-h-none w-screen max-w-none bg-transparent backdrop-blur-lg"
        >
            <article className="animate-opacity flex h-full w-full items-center justify-center">
                <section className="flex h-fit flex-col items-center gap-5 rounded-full border border-red-600 bg-red-100 p-5 font-bold text-red-700">
                    <h2 className="text-3xl">{title}</h2>
                    <h3 className="text-2xl">{message}</h3>
                    <button
                        onClick={handleDialog}
                        className="w-auto rounded-xl border border-red-700 bg-white p-1 text-center text-red-700 hover:bg-red-700 hover:text-white"
                    >
                        Aceptar
                    </button>
                </section>
            </article>
        </dialog>
    );
}
