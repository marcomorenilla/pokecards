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
        <div className="flex min-h-screen flex-col bg-radial-[at_0%_0%] from-[#222] to-[#000c] to-90%">
            <div className="p-3">
                <NavBar coins={coins} onAddCoins={handleDialog} />
            </div>
            <main className="flex-1 p-3">{children}</main>
            <Footer />
            <AddCoinsModal
                isDialogOpen={isDialogOpen}
                onHandleDialog={handleDialog}
            />
        </div>
    );
}
