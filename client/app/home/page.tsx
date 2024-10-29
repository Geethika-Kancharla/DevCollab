"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CodeEditor from '../components/CodeEditor';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    userId: string;

}

const HomePage: React.FC = () => {
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/');
        }
        else {
            if (token) {
                try {
                    const decoded = jwtDecode<DecodedToken>(token);
                    setUserId(decoded.userId);
                    console.log(userId);
                    // router.push("/home");
                } catch (error) {
                    console.error("Error decoding JWT:", error);
                }
            }

        }
    }, []);



    return (
        <div className="min-h-lvh bg-black px-6 py-8">
            <CodeEditor />
        </div>
    );
};

export default HomePage;
