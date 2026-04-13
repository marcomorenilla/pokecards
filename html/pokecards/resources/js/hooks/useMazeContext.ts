import { useContext } from 'react';
import { MazeContext } from '../context/MazeContext';

export const useMazeContext = () => {
    const mazeContext = useContext(MazeContext);
    return mazeContext;
};
