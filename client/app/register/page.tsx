"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface FormData {
    username: string;
    password: string;
}

const Register = () => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: ''
    });

    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');

        if (!formData.username || !formData.password) {
            setError('Both fields are required.');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post('https://devcollab-j76p.onrender.com/register', formData);

            if (response.status === 200) {
                setSuccess('User registered successfully');
                router.push("/");
            } else {
                setError('Unexpected response from server');
            }
        } catch (err) {
            setError('Error registering user');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-center items-center lg:space-x-10 h-screen bg-black bg-opacity-90 p-4">

            <div className="mr-5 mb-4 md:mb-0">
                <Image
                    src="/images/home.svg"
                    alt="Logo"
                    width={500}
                    height={500}
                    className="w-full md:w-[400px] lg:w-[500px] h-auto"
                />
            </div>

            <form onSubmit={handleSubmit} className="bg-black bg-opacity-50 p-6 rounded-lg space-y-6 max-w-md w-full">
                <div className="space-y-2">
                    <label className="text-white font-bold">Room Name:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="block mb-2.5 w-full h-14 text-white border-gray-300 border-2 bg-slate-900 rounded-lg"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-white font-bold mt-4">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="block mb-2.5 w-full h-14 text-white border-gray-300 border-2 bg-slate-900 rounded-lg"
                    />
                </div>

                {error && <p className="error text-red-500 mt-2">{error}</p>}
                {success && <p className="success text-green-500 mt-2">{success}</p>}

                <button
                    type="submit"
                    className={`block mt-2.5 w-full bg-green-500 text-white text-center py-2 px-4 rounded-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Registering...' : 'Register'}
                </button>

                <div className="flex justify-center mt-4">
                    <Link href="/" className="text-green-500">
                        Back to Login
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;