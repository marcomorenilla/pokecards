import { useEffect, useState } from 'react';
import { IndexGridSection } from './IndexGridSection';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { ErrorModal } from '../modals/ErrorModal';
import '@/css/animate.css';
import { NewCardsModal } from '../modals/NewCardsModal';
interface CoinsProps {
    coins: number;
}

const initialPackContent: any = [];
export function IndexGrid({ coins }: CoinsProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isErrored, setIsErrored] = useState(false);
    const [cardIndex, setCardIndex] = useState(0);
    const [packContent, setPackContent] = useState(initialPackContent);

    useEffect(() => {
        setCardIndex(0);
    }, [packContent]);

    const handleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    const handleIsErrored = () => {
        setIsErrored(!isErrored);
    };

    const handleCardBuy = (amount: number) => {
        const cost: any = {
            5: 50,
            10: 100,
            15: 200,
        }[amount];
        if (coins - cost >= 0) {
            router.post('/users/addCoins', { coins: -cost });
            handleShowCards(amount);
        } else {
            handleIsErrored();
        }
    };

    const handleShowCards = async (number: any) => {
        console.log('cards', number);
        const response = await axios.post('/cards/open', { cards: number });
        const data = response.data;
        console.log(data.length);
        setPackContent(data);
        handleDialog();
    };

    const handleNextCard = () => {
        if (cardIndex < packContent.length - 1) {
            setCardIndex(cardIndex + 1);
        } else {
            setCardIndex(0);
            setPackContent(initialPackContent);
            handleDialog();
        }
    };

    return (
        <>
            <section className="grid h-fit grid-cols-1 justify-evenly gap-5 p-10 text-white lg:grid-cols-3">
                <IndexGridSection
                    color="basic"
                    price={50}
                    cards={5}
                    onCardBuy={handleCardBuy}
                >
                    <section className="mt-6 text-2xl font-bold">
                        Sobre Básico
                    </section>
                    <section className="mt-3 text-gray-300">
                        Para los que necesitan lo justo
                    </section>
                </IndexGridSection>
                <IndexGridSection
                    color="medium"
                    price={100}
                    cards={10}
                    onCardBuy={handleCardBuy}
                >
                    <section className="mt-6 text-2xl font-bold">
                        Sobre Estándard
                    </section>
                    <section className="mt-3 text-gray-300">
                        Para los que van más allá
                    </section>
                </IndexGridSection>
                <IndexGridSection
                    color="vip"
                    price={200}
                    cards={15}
                    onCardBuy={handleCardBuy}
                >
                    <section className="mt-6 text-2xl font-bold">
                        Sobre Premium
                    </section>
                    <section className="mt-3 text-gray-300">
                        Para los inconformistas
                    </section>
                </IndexGridSection>
            </section>
            {isDialogOpen && (
                <NewCardsModal
                    isDialogOpen={isDialogOpen}
                    handleDialog={handleDialog}
                    pokemon={packContent[cardIndex]}
                    handleNextCard={handleNextCard}
                />
            )}
            {isErrored && (
                <ErrorModal
                    title="No tienes suficientes monedas"
                    message="Recarga monedas antes de realizar una compra"
                    onCloseDialog={handleIsErrored}
                />
            )}
        </>
    );
}
