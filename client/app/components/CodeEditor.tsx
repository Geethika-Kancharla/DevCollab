"use client";

import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import { HStack, Box } from '@chakra-ui/react';
import Output from './Output';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface CodeEditorProps {
    username: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ username }) => {
    const editorRef = useRef<any>();
    const clientRef = useRef<Client | null>(null);
    const [code, setCode] = useState<string>("//Write your code here");
    const [language, setLanguage] = useState<string>("javascript");

    useEffect(() => {
        const socketUrl = 'http://localhost:8080/ws';
        const client = new Client({
            webSocketFactory: () => new SockJS(socketUrl),
            onConnect: () => {
                console.log('Connected to WebSocket server.');


                client.publish({
                    destination: `/app/getLatestCode/${username}`,
                });


                client.subscribe(`/topic/${username}`, (message) => {
                    const data = JSON.parse(message.body);
                    if (data.language === language) {
                        setCode(data.code);
                    }
                });
            },
            onStompError: (error) => {
                console.error('STOMP error:', error);
            },
        });

        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, [username, code]);


    const handleCodeChange = (newCode: string) => {
        setCode(newCode);
        if (clientRef.current) {
            clientRef.current.publish({
                destination: `/app/editor/${username}`,
                body: JSON.stringify({
                    username,
                    code: newCode,
                    language,
                }),
            });
        }
    };

    const onSelect = (newLanguage: string) => {
        setLanguage(newLanguage);
        setCode(code);
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