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
    <div className="flex justify-center items-center h-screen space-x-96 bg-black">
      <div className="mr-5">
        <img src="path/to/your/image.png" alt="Login Image" className="w-300px h-auto" />
      </div>
      <form onSubmit={handleLogin} className="bg-black bg-opacity-50 p-5 rounded-lg space-y-6">
        <div className="space-y-2">
          <label className="text-white font-bold">Room Name:</label>
          <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} required className="block mb-2.5 w-96 h-14 text-white border-gray-300 border-2 bg-slate-900 rounded-lg " />
        </div>

        <div className="space-y-2">
          <label className="text-white font-bold mt-4">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="block mb-2.5 w-96 h-14 text-white border-gray-300 border-2 bg-slate-900 rounded-lg" />
        </div>
        {error && <p className="error text-red-500">{error}</p>}
        <button type="submit" className="block mt-2.5 w-full bg-green-500 text-white text-center py-2 px-4 rounded-lg">Login</button>
      </form>
    </div>
  );
}