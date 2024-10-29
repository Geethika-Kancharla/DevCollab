"use client"

import { useState, useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from './Constants';
import { HStack, Box } from '@chakra-ui/react';
import Output from './Output';


const CodeEditor: React.FC = () => {
    const editorRef = useRef<any>();


    const [code, setCode] = useState<string>(CODE_SNIPPETS["javascript"]);
    const [language, setLanguage] = useState<string>("javascript");



    const onSelect = (language: string) => {
        setLanguage(language)
        setCode(CODE_SNIPPETS[language as keyof typeof CODE_SNIPPETS])
    }

    const onMount = (editor: any) => {
        editorRef.current = editor;
        editor.focus();
    }

    return (
        <div>
            <HStack spacing={4} display={{ base: 'block', md: 'flex' }} flexDirection={{ base: 'column', md: 'row' }}>
                <Box w={{ base: '100%', md: '50%' }} mb={{ base: 4, md: 0 }}>
                    <LanguageSelector language={language} onSelect={onSelect} />
                    <Editor height={window.innerWidth < 768 ? '50vh' : '75vh'}
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