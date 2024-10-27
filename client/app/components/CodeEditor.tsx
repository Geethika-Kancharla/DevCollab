"use client"

import { useState, useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from './Constants';
import { HStack, Box } from '@chakra-ui/react';
import Output from './Output';

const CodeEditor: React.FC = () => {
    const editorRef = useRef();

    const onMount = (editor: any) => {
        editorRef.current = editor;
        editor.focus();
    }

    const [code, setCode] = useState(CODE_SNIPPETS["javascript"]);
    const [language, setLanguage] = useState("javascript");

    const onSelect = (language: string) => {
        setLanguage(language)
        setCode(CODE_SNIPPETS[language as keyof typeof CODE_SNIPPETS])
    }



    return (
        <div>
            <HStack spacing={4}>
                <Box w="50%">
                    <LanguageSelector language={language} onSelect={onSelect} />
                    <Editor height="75vh"
                        theme='vs-dark'
                        defaultValue={CODE_SNIPPETS["javascript"]}
                        language={language}
                        onMount={onMount}
                        value={code}
                        onChange={(value) => setCode(value || "")}
                    />
                </Box>
                <Output editorRef={editorRef} language={language} />
            </HStack>

        </div>
    )
}

export default CodeEditor