export default function Error({ status }: { status: number }) {
    const title = {
        503: '503: Servicio No Disponible',
        500: '500: Error del Servidor',
        404: '404: Página No Encontrada',
        403: '403: Prohibido',
    }[status];

    const description = {
        503: 'Lo sentimos, estamos en mantenimiento.',
        500: 'Vaya, algo salió mal en nuestros servidores.',
        404: 'Lo sentimos, la página que buscas no existe.',
        403: 'No tienes permiso para acceder a este recurso.',
    }[status];

    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
}
