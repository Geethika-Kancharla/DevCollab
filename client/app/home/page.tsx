"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CodeEditor from '../components/CodeEditor';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    username: string;
    exp: number;
}

const HomePage: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
        } else {
            try {
                const decoded = jwtDecode<DecodedToken>(token);
                setUsername(decoded.username);

                // Redirect to login if token is expired
                if (decoded.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                    router.push('/');
                }
            } catch (error) {
                console.error("Error decoding JWT:", error);
                router.push('/');
            }
        }
    }, [router]);

    return (
        <div className="min-h-lvh bg-black px-6 py-8">
            {username && <CodeEditor username={username} />}
        </div>
    );
};

export default HomePage;
