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

      // Assuming the token is sent in the response data
      const token = response.data.token;
      localStorage.setItem('token', token);
      router.push("/");
      console.log("Login successfull");

      // // Redirect to home page after successful login
      // router.push('/home');

    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Check if the error response exists
        if (error.response) {
          // Server responded with a status other than 200 range
          setError(`Error ${error.response.status}: ${error.response.data || 'Login failed. Please try again later.'}`);
        } else {
          // The request was made but no response was received
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
      {error && <p className="error">{error}</p>} {/* Display the error message */}
      <button type="submit">Login</button>
    </form>
  );
}