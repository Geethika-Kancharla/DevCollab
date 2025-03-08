import { NextResponse } from 'next/server';
import axios from 'axios';
import { LanguageOptions } from '@/app/components/Constants';

const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston"
})

async function executeCode(language: string, sourceCode: string) {
    try {
        const selectedLanguage = LanguageOptions[language as keyof typeof LanguageOptions];
        const response = await API.post("/execute", {
            language,
            version: selectedLanguage,
            files: [{ content: sourceCode }]
        });
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error executing code:", error.message);
            throw error;
        }
        console.error("Unknown error executing code");
        throw new Error("Unknown error occurred");
    }
}

export async function POST(request: Request) {
    try {
        const { language, sourceCode } = await request.json();
        const result = await executeCode(language, sourceCode);
        return NextResponse.json(result);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
