import { useState } from 'react';
import { NavBar } from '../components/navigation/NavBar';
import { Footer } from '../components/Footer';
import AddCoinsModal from '../components/modals/AddCoinsModal';

export default function MainLayout({ auth, children }: any) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleDialog = () => setIsDialogOpen(!isDialogOpen);
    const { user } = auth;
    const { coins } = user;
    return (
        <>
            <NavBar coins={coins} onAddCoins={handleDialog} />
            <main className="min-h-screen bg-radial-[at_0%_0%] from-[#222] to-[#000c] to-90% p-3">
                {children}
            </main>
            <Footer />
            <AddCoinsModal
                isDialogOpen={isDialogOpen}
                onHandleDialog={handleDialog}
            />
        </>
    );
}
