import '@/css/animate.css';

export function StatRow({ statName, statValue, statColor }: any) {
    return (
        <>
            <div className="flex items-center justify-between text-xs font-bold text-white/60">
                <p>{statName.toUpperCase()}</p>
                <p>{statValue}</p>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-xl bg-gray-500">
                <div
                    style={{ width: `${statValue}%` }}
                    className={`animate-stats h-full ${statColor}`}
                ></div>
            </div>
        </>
    );
}
