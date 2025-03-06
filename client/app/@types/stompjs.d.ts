declare module 'stompjs' {
  export interface Client {
      connect(headers: object, connectCallback: () => void): void;
      subscribe(destination: string, callback: (message: any) => void): void;
      send(destination: string, headers?: object, body?: string): void;
      disconnect(disconnectCallback?: () => void): void;
  }

  export function over(socket: any): Client;
}