export function UndraggedCard({ index, onDragOver }: any) {
    const handleDragOver = (index: any) => {
        console.log('drag en carta ', index);
        onDragOver(index);
    };
    return (
        <article
            onDragOver={() => handleDragOver(index)}
            className="flex aspect-2/3 h-80 w-full max-w-100 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-500 bg-radial from-gray-800/50 to-gray-700/50 text-white"
        >
            <p className="text-5xl font-bold text-white/50">+</p>
        </article>
    );
}
