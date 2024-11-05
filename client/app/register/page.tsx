"use client"

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface FormData {
    username: string;
    password: string;
}

const Register = () => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: ''
    });

    const router = useRouter();


    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/register', formData);
            if (response.status === 201) {
                setSuccess('User registered successfully');
                console.log("Registered successfully");
                router.push("/")
                setError('');
            }
        } catch (err) {
            setError('Error registering user');
            console.log(error);
            setSuccess('');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen space-x-96 bg-black">
            <div className="mr-5">
                <img src="path/to/your/image.png" alt="Login Image" className="w-300px h-auto" />
            </div>
            <form onSubmit={handleSubmit} className="bg-black bg-opacity-50 p-5 rounded-lg space-y-6">
                <div className="space-y-2">
                    <label className="text-white font-bold">Room Name:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="block mb-2.5 w-96 h-14 text-white border-gray-300 border-2 bg-slate-900 rounded-lg " />
                </div>

                <div className="space-y-2">
                    <label className="text-white font-bold mt-4">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required className="block mb-2.5 w-96 h-14 text-white border-gray-300 border-2 bg-slate-900 rounded-lg" />
                </div>
                {error && <p className="error text-red-500">{error}</p>}
                <button type="submit" className="block mt-2.5 w-full bg-green-500 text-white text-center py-2 px-4 rounded-lg">Register</button>
            </form>
        </div>
    );
};

export default Register;

