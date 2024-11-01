"use client";

import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from './Constants';
import { HStack, Box } from '@chakra-ui/react';
import Output from './Output';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface CodeEditorProps {
    username: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ username }) => {
    const editorRef = useRef<any>();
    const clientRef = useRef<Client | null>(null);  // Use ref to store the client
    const [code, setCode] = useState<string>(CODE_SNIPPETS["javascript"]);
    const [language, setLanguage] = useState<string>("javascript");

    useEffect(() => {
        const socketUrl = 'http://localhost:8080/ws';
        const client = new Client({
            webSocketFactory: () => new SockJS(socketUrl),
            onConnect: () => {
                console.log('Connected to WebSocket server.');

                client.subscribe(`/topic/${username}`, (message) => {
                    const data = JSON.parse(message.body);
                    if (data.username !== username && data.language === language) {
                        setCode(data.code);
                    }
                });
            },
            onStompError: (error) => {
                console.error('STOMP error:', error);
            },
        });

        client.activate();
        clientRef.current = client;  // Store the client in ref

        return () => {
            client.deactivate();
        };
    }, [username, language]);

    const handleCodeChange = (newCode: string) => {
        setCode(newCode);
        // Access client via ref
        if (clientRef.current) {
            clientRef.current.publish({
                destination: `/app/editor/${username}`,
                body: JSON.stringify({ username, code: newCode, language }),
            });
        }
    };

    const onSelect = (language: string) => {
        setLanguage(language);
        setCode(CODE_SNIPPETS[language as keyof typeof CODE_SNIPPETS]);
    };

    const onMount = (editor: any) => {
        editorRef.current = editor;
        editor.focus();
    };

    return (
        <div>
            <HStack spacing={4} display={{ base: 'block', md: 'flex' }} flexDirection={{ base: 'column', md: 'row' }}>
                <Box w={{ base: '100%', md: '50%' }} mb={{ base: 4, md: 0 }}>
                    <LanguageSelector language={language} onSelect={onSelect} />
                    <Editor
                        height={window.innerWidth < 768 ? '50vh' : '75vh'}
                        theme='vs-dark'
                        defaultValue={CODE_SNIPPETS["javascript"]}
                        language={language}
                        onMount={onMount}
                        value={code}
                        onChange={(value) => value && handleCodeChange(value)}
                    />
                </Box>
                <Output editorRef={editorRef} language={language} />
            </HStack>
        </div>
    );
};

export default CodeEditor;
