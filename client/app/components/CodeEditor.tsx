"use client";

import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import { HStack, Box, Input, Button, Text } from '@chakra-ui/react';
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
    const [roomId, setRoomId] = useState<string>("");
    const [currentRoom, setCurrentRoom] = useState<string>("");

    useEffect(() => {
        const socketUrl = 'http://localhost:8080/ws';
        const client = new Client({
            webSocketFactory: () => new SockJS(socketUrl),
            onConnect: () => {
                console.log('Connected to WebSocket server.');
                
            
                client.publish({
                    destination: `/app/getLatestCode/${currentRoom || username}`,
                });

                
                client.subscribe(`/topic/${currentRoom || username}`, (message) => {
                    const data = JSON.parse(message.body);
                    if (data.sender !== username) { 
                        setCode(data.code);
                        if (data.language) setLanguage(data.language);
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
            if (client.connected) {
                client.deactivate();
            }
        };
    }, [username, currentRoom]); 

    const handleCodeChange = (newCode: string | undefined) => {
        if (!newCode) return;
        setCode(newCode);

        if (clientRef.current?.connected) {
            clientRef.current.publish({
                destination: `/app/editor/${currentRoom || username}`,
                body: JSON.stringify({
                    sender: username,
                    code: newCode,
                    language,
                }),
            });
        }
    };

    const joinRoom = () => {
        if (roomId) {
            setCurrentRoom(roomId);
        }
    };

    const createNewRoom = () => {
        const newRoomId = Math.random().toString(36).substring(7);
        setRoomId(newRoomId);
        setCurrentRoom(newRoomId);
    };

    const leaveRoom = () => {
        setCurrentRoom("");
        setCode("//Write your code here");
    };

    return (
        <div>
            <Box mb={4}>
                <HStack spacing={4}>
                    <Input 
                        placeholder="Enter room ID"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                    <Button onClick={joinRoom}>Join Room</Button>
                    <Button onClick={createNewRoom}>Create New Room</Button>
                    {currentRoom && <Button onClick={leaveRoom}>Leave Room</Button>}
                </HStack>
                {currentRoom && <Text mt={2}>Current Room: {currentRoom}</Text>}
            </Box>

            <HStack spacing={4} display={{ base: 'block', md: 'flex' }} flexDirection={{ base: 'column', md: 'row' }}>
                <Box w={{ base: '100%', md: '50%' }} mb={{ base: 4, md: 0 }}>
                    <LanguageSelector language={language} onSelect={setLanguage} />
                    <Editor
                        height={window.innerWidth < 768 ? '50vh' : '75vh'}
                        theme='vs-dark'
                        language={language}
                        value={code}
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
                        }}
                    />
                </Box>
                <Output editorRef={editorRef} language={language} />
            </HStack>
        </div>
    );
};

export default CodeEditor;