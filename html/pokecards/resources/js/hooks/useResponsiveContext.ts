import { useContext } from 'react';
import { ResponsiveContext } from '../context/ResponsiveContext';

export function useResponsiveContext() {
    const context = useContext(ResponsiveContext);

    return context;
}
