"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/router';


const HomePage: React.FC = () => {

    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
  
      // If no token, redirect to login page
      if (!token) {
        router.push('/login');
      }
  
      // Optionally, verify token or fetch user-specific data here
    }, []);

    return (
        <div>
            <h1>Welcome to the Home Page</h1>

        </div>
    );
};

export default HomePage;
