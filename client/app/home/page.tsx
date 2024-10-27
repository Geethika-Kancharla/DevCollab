"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CodeEditor from '../components/CodeEditor';
import axios from 'axios'
import { fetchLanguagesAndVersions } from '../components/Constants';


const HomePage: React.FC = () => {

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/');
        }

    }, []);

    const API = axios.create({
        baseURL: "https://emkc.org/api/v2/piston"
    })



    useEffect(() => {
        const initialize = async () => {
            try {
                await fetchLanguagesAndVersions();
            } catch (error) {
                console.error("Failed to fetch languages and versions:", error);
            }
        };

        initialize();
    }, []);


    return (
        <div className="min-h-lvh bg-black px-6 py-8">
            <CodeEditor />
        </div>
    );
};

export default HomePage;