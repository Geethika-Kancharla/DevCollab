"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Home() {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        'http://localhost:8080/login',
        {
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      console.log("Login response:", response.data); 
      const token = response.data.token;
      console.log("Token from response:", token); 

      if (token) {
        localStorage.setItem('token', token);
        console.log("Token stored in localStorage:", localStorage.getItem('token'));
        router.push("/home");
      } else {
        setError('No token received from server.');
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(`Error ${error.response.status}: ${error.response.data || 'Login failed. Please try again later.'}`);
        } else {
          setError('Network error: Please check your connection and try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}
