import React, { useEffect, useState } from 'react';
import { CoinsGrid } from '@/components/CoinsGrid';
import { NavBar } from '@/components/navigation/NavBar';
import { Footer } from '@/components/Footer';
import { router } from '@inertiajs/react';
import dbSeeder from '@/services/dbSeeder';

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
    const { id, name, email, coins } = auth.user;
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        console.log('cambiando estado', isDialogOpen);
        setIsDialogOpen(!isDialogOpen);
    };

    const dbSeed = () => dbSeeder();

    useEffect(() => {
        dbSeed();
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
