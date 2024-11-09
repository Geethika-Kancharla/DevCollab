# DevCollab

DevCollab is a real-time collaborative code editor that enables multiple users to write and edit code simultaneously. Built with Next.js and Tailwind CSS for the frontend and Spring Boot for the backend, it provides a secure and efficient platform for real-time code collaboration through WebSocket technology and JWT authentication.

## Features

- **Real-Time Code Collaboration:** Multiple users can edit code simultaneously with instant synchronization
- **Syntax Highlighting:** Support for multiple programming languages with automatic syntax highlighting
- **Secure Authentication:** JWT-based authentication system ensuring secure access to collaborative sessions
- **WebSocket Integration:** Real-time updates and communication between users using WebSocket protocol
- **Responsive Design:** Fully responsive interface that works seamlessly across all devices
- **Multiple Language Support:** Supports various programming languages including JavaScript, Python, Java, and C

## Tech Stack

### Frontend
- **Next.js** 
- **Tailwind CSS**
- **TypeScript**
- **SockJS & STOMP** 
- **Monaco Editor** 

### Backend
- **Spring Boot**
- **WebSocket**
- **JWT**

### Database
- **MongoDB**

## Installation

### Prerequisites

- Node.js (v16 or higher)
- Java JDK 17 or higher
- MongoDB
- Maven

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Geethika-Kancharla/DevCollab
   ```

2. Frontend Setup:
   ```bash
   cd client
   npm install
   ```

3. Backend Setup - Configure MongoDB in application.properties:
   ```properties
   spring.data.mongodb.uri=mongodb://localhost:27017/codecollab
   spring.data.mongodb.database=your_database_name
   ```

4. Start the Backend:
   ```bash
   cd server
   mvn spring-boot:run
   ```

5. Start the Frontend:
   ```bash
   cd client
   npm run dev
   ```

The application will be available at http://localhost:3000

## Usage

- **Create Session:** Start a new coding session and share the session ID
- **Join Session:** Enter a session ID to join an existing collaboration
- **Real-Time Editing:** All changes are instantly synchronized across all participants
- **Language Selection:** Choose from various supported programming languages
- **Code Execution:** Run code directly in the browser


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
