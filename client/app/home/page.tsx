"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CodeEditor from '../components/CodeEditor';

const HomePage: React.FC = () => {

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/');
        }

    }, []);

    return (
        <div className="min-h-lvh bg-gray-500 px-6 py-8">
            <CodeEditor />
        </div>
    );
};

export default HomePage;