"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CodeEditor from '../components/CodeEditor';
import { jwtDecode } from 'jwt-decode'; // Ensure you are using the correct import for jwt-decode

interface DecodedToken {
    id: string;
}

const HomePage: React.FC = () => {
    const router = useRouter();
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/'); // Redirect if no token is found
        } else {
            try {
                console.log(token);
                const decoded = jwtDecode<DecodedToken>(token); // Use the correct decoding method
                console.log("Decoded token:", decoded);
                setId(decoded.id); // Set the user ID from the decoded token
                console.log("User ID is:", decoded.id); // Log the ID to the console
            } catch (error) {
                console.error("Error decoding JWT:", error);
            }
        }
    }, [router]); // Add router as a dependency

    return (
        <div className="min-h-lvh bg-black px-6 py-8">
            <CodeEditor />
        </div>
    );
};

export default HomePage;
