import { useState } from 'react';
import { MazeInfo } from './MazeInfo';
import '@/css/animate.css';
import { ConfirmModal } from '../modals/ConfirmModal';
import { MazeFlex } from './MazeFlex';

export function MazeWrapper({ pokemons, auth, maze }: any) {
    const [isDialogOpen, setisDialogOpen] = useState(false);
    const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);

    const handleCloseDialog = () => {
        setisDialogOpen(false);
    };

    const handleOpenDialog = () => {
        setisDialogOpen(true);
    };

    const handleDeleteConfirmed = () => {
        setIsDeleteConfirmed(!isDeleteConfirmed);
        setisDialogOpen(false);
    };

    return (
        <>
            <MazeInfo />
            {pokemons.length == 0 && (
                <h2 className="animate-opacity mt-10 text-3xl font-bold text-white">
                    Compra un sobre, empieza la colección y conviertete en el
                    mejor entrenador Pokémon de la historia
                </h2>
            )}
            {pokemons.length > 0 && (
                <MazeFlex
                    pokemons={pokemons}
                    auth={auth}
                    maze={maze}
                    handleOpenDialog={handleOpenDialog}
                    handleCloseDialog={handleCloseDialog}
                    isDeleteConfirmed={isDeleteConfirmed}
                    handleDeleteConfirmed={handleDeleteConfirmed}
                />
            )}

            {pokemons.length > 0 && (
                <ConfirmModal
                    onCancelDialog={handleCloseDialog}
                    onConfirmDialog={handleDeleteConfirmed}
                    isDialogOpen={isDialogOpen}
                />
            )}
        </>
    );
}
