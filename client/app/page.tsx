"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link'

export default function Home() {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();


  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    setError(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);


    if (!username || !password) {
      setError('Both fields are required.');
      setIsSubmitting(false);
      return;
    }

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
          setError(`${error.response.data || 'Login failed. Please try again later.'}`);
        } else {
          setError('Network error: Please check your connection and try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center lg:space-x-10 h-screen bg-black bg-opacity-90 p-4">

      <div className="mr-5 mb-4 md:mb-0 lg:mr-12">
        <Image
          src="/images/home.svg"
          alt="Logo"
          width={500}
          height={500}
          className="w-full md:w-[400px] lg:w-[500px] h-auto"
        />
      </div>

      <form onSubmit={handleLogin} className="bg-black bg-opacity-50 p-6 rounded-lg space-y-6 max-w-md w-full">
        <div className="space-y-2">
          <label className="text-white font-bold">Room Name:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
            className="block mb-2.5 w-full h-14 text-white border-gray-300 border-2 bg-slate-900 rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <label className="text-white font-bold mt-4">Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="block mb-2.5 w-full h-14 text-white border-gray-300 border-2 bg-slate-900 rounded-lg"
          />
        </div>

        {error && <p className="error text-red-500 mt-2">{error}</p>}

        <button
          type="submit"
          className={`block mt-2.5 w-full bg-green-500 text-white text-center py-2 px-4 rounded-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <div className="flex justify-center mt-4">
          <Link href="/register" className="text-green-500">
            Create a Room
          </Link>
        </div>
      </form>
    </div>
  );
}