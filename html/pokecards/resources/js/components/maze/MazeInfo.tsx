export function MazeInfo() {
    return (
        <>
            <section className="flex justify-center gap-3 text-4xl font-black text-white">
                CREA TU<span className="text-[#ffcb05]"> MAZO</span>
            </section>
            <section className="mx-auto mt-5 hidden w-1/2 rounded-xl border border-white/80 bg-gray-700/80 p-2 text-lg font-bold text-white/70">
                Selecciona las cartas de tú colección y arrástralas al mazo, en
                dispositivos móviles, pulsa en el + y luego selecciona un
                pokemon de tu colección
            </section>
        </>
    );
}
