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
    const clientRef = useRef<Client | null>(null);  // WebSocket client ref
    const [code, setCode] = useState<string>(CODE_SNIPPETS["javascript"]);
    const [language, setLanguage] = useState<string>("javascript");

    useEffect(() => {
        const socketUrl = 'http://localhost:8080/ws';
        const client = new Client({
            webSocketFactory: () => new SockJS(socketUrl),
            onConnect: () => {
                console.log('Connected to WebSocket server.');

                // Fetch the latest code from the server upon connecting
                client.publish({
                    destination: `/app/getLatestCode/${username}`,
                });

                // Subscribe to code updates for this username
                client.subscribe(`/topic/${username}`, (message) => {
                    const data = JSON.parse(message.body);
                    if (data.language === language) {
                        setCode(data.code);  // Update code with the latest from server
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
            client.deactivate();  // Cleanup on unmount
        };
    }, [username, language]);

    // Handle code changes and publish updates to WebSocket
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
        setCode(CODE_SNIPPETS[newLanguage as keyof typeof CODE_SNIPPETS]);
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
