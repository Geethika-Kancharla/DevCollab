"use client"

import axios from 'axios'
import { LanguageOptions } from '@/app/components/Constants'
import { useState } from 'react'

const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston"
})


export const executeCode = async (language: string, sourceCode: string) => {
    const selectedLanguage = LanguageOptions[language as keyof typeof LanguageOptions];
    console.log("Sending payload:", {
        language,
        version: selectedLanguage,
        files: [{ content: sourceCode }]
    });

    try {
        const response = await API.post("/execute", {
            language,
            version: selectedLanguage,
            files: [
                {
                    content: sourceCode
                }
            ]
        });
        return response.data;
    } catch (error: any) {
        console.error("Error executing code:", error.response?.data || error.message);
        throw error;
    }
}


