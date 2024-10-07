"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/');
        }

    }, []);

    return (
        <div>
            <h1>Welcome to the Home Page</h1>

        </div>
    );
};

export default HomePage;