"use client"

import { useState, useRef } from 'react'
import Editor from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';

const CodeEditor: React.FC = () => {
    const editorRef = useRef();

    const onMount = (editor: any) => {
        editorRef.current = editor;
        editor.focus();
    }

    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("javascript");

    const onSelect = (language: string) => {
        setLanguage(language)
    }

    return (
        <div>
            <LanguageSelector language={language} onSelect={onSelect} />
            <Editor height="75vh"
                theme='vs-dark'
                defaultValue="// Write your code here"
                language={language}
                onMount={onMount}
                value={code}
                onChange={() => setCode(code)}
            />
        </div>
    )
}

export default CodeEditor