"use client"

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

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
                setError('');
            }
        } catch (err) {
            setError('Error registering user');
            console.log(error);
            setSuccess('');
        }
    };

    return (
        <div className="register-form">
            <h2>Register</h2>
            {success && <p className="success">{success}</p>}
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
