import { router } from '@inertiajs/react';

export default function Error({ status }: { status: number }) {
    const handleClick = () => {
        return router.visit('/auth');
    };
    const title = {
        503: '503',
        500: '500',
        404: '404',
        403: '403',
        401: '401',
    }[status];

    const description = {
        503: 'Lo sentimos, estamos en mantenimiento.',
        500: 'Vaya, algo salió mal en nuestros servidores.',
        404: 'Lo sentimos, la página que buscas no existe.',
        403: 'No tienes permiso para acceder a este recurso.',
        401: 'Las credenciales no coinciden con las de ningún usuario, vuelve a intentarlo.',
    }[status];

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-radial-[at_0%_0%] from-[#222] to-[#000c] to-90% p-10 text-white">
            <h1 className="text-center text-5xl font-bold">{title}</h1>
            <p className="mt-10 text-2xl">{description}</p>
            <button
                onClick={handleClick}
                className="mt-10 w-full rounded-xl bg-white p-3 text-xl font-bold text-black hover:bg-yellow-600 hover:text-white"
            >
                Volver a inicio de sesión
            </button>
        </div>
    );
}
