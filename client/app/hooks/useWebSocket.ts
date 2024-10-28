import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export const useWebSocket = (
    onMessageReceived: (message: { userId: string; code: string; language: string }) => void
) => {
    const stompClient = useRef<Stomp.Client | null>(null);
    const [connected, setConnected] = useState<boolean>(false); // Track connection state

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        stompClient.current = Stomp.over(socket);

        stompClient.current.connect({}, () => {
            setConnected(true); // Set connected state to true on successful connection
            stompClient.current?.subscribe("/topic/code", (message) => {
                onMessageReceived(JSON.parse(message.body));
            });
        });

        return () => {
            if (stompClient.current) {
                stompClient.current.disconnect();
                setConnected(false); // Reset connected state on disconnect
            }
        };
    }, [onMessageReceived]);

    const sendMessage = (userId: string, code: string) => {
        if (stompClient.current && connected) { // Use connected state to check
            stompClient.current.send(
                "/app/code/update",
                {},
                JSON.stringify({ userId, code })
            );
        }
    };

    return { sendMessage, connected }; // Return connected state if needed
};
