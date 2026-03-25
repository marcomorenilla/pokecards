import { Head } from '@inertiajs/react';

import { useState } from 'react';

import { LoginForm } from '@/components/LoginForm';
import { RegisterForm } from '@/components/RegisterForm';

export default function Auth() {
    const [isRegistered, setIsRegistered] = useState(true);

    const handleFormVisibility = () => {
        setIsRegistered(!isRegistered);
    };

    return (
        <section className="flex h-screen flex-col items-center justify-center bg-radial-[at_0%_0%] from-[#222] to-[#000c] to-90%">
            <Head title="Auth">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            {isRegistered ? (
                <LoginForm handleFormVisibility={handleFormVisibility} />
            ) : (
                <RegisterForm handleFormVisibility={handleFormVisibility} />
            )}
        </section>
    );
}
