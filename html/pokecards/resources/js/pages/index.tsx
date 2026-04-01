import { useEffect, useState } from 'react';
import { CoinsGrid } from '@/components/CoinsGrid';
import { NavBar } from '@/components/navigation/NavBar';
import { Footer } from '@/components/Footer';
import { router } from '@inertiajs/react';
import { dbPokemonSeeder } from '@/services/dbPokemonSeeder';
import { dbTypesSeeder } from '@/services/dbTypesSeeder';

interface User {
    id: number;
    name: string;
    email: string;
    coins: number;
}

interface IndexProps {
    auth: any;
}

const Index = ({ auth }: IndexProps) => {
    const isSeeded = false;
    const { id, name, email, coins } = auth.user;
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    const asyncSeeder = async () => {
        const newPokedex = await dbPokemonSeeder();
        /*const newTypes = await dbTypesSeeder();
        const typesPayload = { types: newTypes };
        router.post('/dbCreateTypes', typesPayload, {
            onSuccess: () => console.log('exito',typesPayload),
        });*/
        const pokedexPayload = { pokedex: newPokedex };
        router.post('/dbCreatePokemon', pokedexPayload, {
            onSuccess: () => console.log('pokedex creada', pokedexPayload),
        });
    };

    useEffect(() => {
        if (!isSeeded) {
            asyncSeeder();
        }
    }, []);

    return (
        <>
            <main className="h-full bg-radial-[at_0%_0%] from-[#222] to-[#000c] to-90% p-3">
                <NavBar
                    coins={coins}
                    onOpenDialog={handleOpenDialog}
                    isDialogOpen={isDialogOpen}
                />
                <CoinsGrid coins={coins} />
            </main>
            <Footer />
        </>
    );
};

export default Index;
