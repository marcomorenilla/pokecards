import React from 'react';
import { CoinsGrid } from '@/components/CoinsGrid';
import { DesktopBar } from '@/components/navigation/DesktopBar';

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
    console.log('auth', auth);
    return (
        <main className="bg-radial-[at_0%_0%] from-[#222] to-[#000c] to-90% p-3">
            <DesktopBar />
            <CoinsGrid />
        </main>
    );
};

export default Index;
