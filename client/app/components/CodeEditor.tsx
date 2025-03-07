"use client";

import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import { HStack, Box } from '@chakra-ui/react';
import Output from './Output';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { editor } from 'monaco-editor';

interface CodeEditorProps {
    username: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ username }) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const clientRef = useRef<Client | null>(null);
    const [code, setCode] = useState<string>("//Write your code here");
    const [language, setLanguage] = useState<string>("javascript");
    const isLocalUpdate = useRef(false);

    useEffect(() => {
        const ws = new SockJS("https://devcollab-j76p.onrender.com/ws");
        const stompClient = new Client({
            webSocketFactory: () => ws,
            onConnect: () => {
                console.log('Connected to WebSocket server.');

                stompClient.publish({
                    destination: "/app/getLatestCode/" + username,
                    body: JSON.stringify({
                        username: username,
                    })
                });

                stompClient.subscribe("/topic/" + username, (message) => {
                    try {
                        const data = JSON.parse(message.body);
                        // Only update if it's not a local change
                        if (!isLocalUpdate.current && data.code) {
                            setCode(data.code);
                            if (data.language) {
                                setLanguage(data.language);
                            }
                        }
                    } catch (error) {
                        console.error('Error processing message:', error);
                    }
                });
            }
        });

        stompClient.activate();
        clientRef.current = stompClient;

        return () => {
            if (stompClient.active) {
                stompClient.deactivate();
            }
        };
    }, [username]);

    const handleCodeChange = (newCode: string | undefined) => {
        if (!newCode) return;
        
        isLocalUpdate.current = true;
        setCode(newCode);

        if (clientRef.current?.active) {
            clientRef.current.publish({
                destination: "/app/editor/" + username,
                body: JSON.stringify({
                    username: username,
                    code: newCode,
                    language: language,
                })
            });
        }
        setTimeout(() => {
            isLocalUpdate.current = false;
        }, 100);
    };

    const onSelect = (newLanguage: string) => {
        setLanguage(newLanguage);
        if (clientRef.current?.active) {
            clientRef.current.publish({
                destination: "/app/editor/" + username,
                body: JSON.stringify({
                    username: username,
                    code: code,
                    language: newLanguage,
                })
            });
        }
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
                        value={code}
                        defaultValue="//Write your code here"
                        onChange={handleCodeChange}
                        onMount={(editor) => {
                            editorRef.current = editor;
                            editor.focus();
                        }}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            wordWrap: 'on',
                            automaticLayout: true,
                            scrollBeyondLastLine: false,
                            renderWhitespace: 'selection',
                            renderControlCharacters: true,
                            formatOnPaste: true,
                            formatOnType: true,
                            lineNumbers: 'on',
                            tabSize: 2,
                        }}
                    />
                </Box>
                <Output editorRef={editorRef} language={language} />
            </HStack>
        </div>
    );
};

export default CodeEditor;