export function UndraggedCard({
    index,
    onDragOver,
    handleOpenCollection,
}: any) {
    const handleDragOver = (index: any) => {
        console.log('drag en carta ', index);
        onDragOver(index);
    };
    return (
        <article
            onDragOver={() => handleDragOver(index)}
            className="relative flex aspect-2/3 h-80 max-w-100 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-500 bg-radial from-gray-800/50 to-gray-700/50 text-white"
        >
            <button
                onClick={() => handleOpenCollection(index)}
                className="absolute -top-4 right-0 size-8 animate-bounce rounded-full border border-white/50 bg-green-500 font-black text-white/50 lg:hidden"
            >
                +
            </button>
            <p className="hidden text-5xl font-bold text-white/50 lg:block">
                +
            </p>
        </article>
    );
}
