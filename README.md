# **DevCollab**  

**DevCollab** is a real-time collaborative code editor that enables multiple users to write and edit code simultaneously.  

---

## Demo Video

https://github.com/user-attachments/assets/f35261fe-5901-461d-9ce6-8fa7a923f1d3

---


## 🌐 Try It Here

👉 **[Click the link above to try out DevCollab live!](https://dev-collab-eight.vercel.app/)**  

---

## 🚀 **Features**  

✅ **Real-Time Code Collaboration** – Multiple users can edit code simultaneously with instant synchronization.  

✅ **Syntax Highlighting** – Supports multiple programming languages with automatic syntax highlighting.  

✅ **Secure Authentication** – JWT-based authentication ensures secure access to collaborative sessions.  

✅ **WebSocket Integration** – Enables real-time updates and communication between users.    

✅ **Multiple Language Support** – Supports **JavaScript, Python, Java, C**.  

---

## 🛠 **Tech Stack**  

### **Frontend**  
-  **Next.js** – React-based framework for fast, scalable web applications.  
-  **Tailwind CSS** – Utility-first CSS framework for a sleek UI.  
-  **TypeScript** – Adds static typing for better maintainability.  
-  **SockJS & STOMP** – WebSocket-based communication protocol for real-time collaboration.   

### **Backend**  
-  **Spring Boot** – Robust backend framework for scalable API development.  
-  **WebSocket** – Enables real-time bidirectional communication.  

### **Database**  
-  **MongoDB** – NoSQL database for efficient session storage and user data management.

### Deployment & DevOps  

- Dockerized with **GitHub Actions** automating CI/CD—publishing images to **DockerHub** on each push event.  
- Frontend deployed on **Vercel**, backend on **Render** for seamless scalability.  


--- 

## 🐳 Docker Setup

To run the application using Docker:

1. Navigate to the project root directory.
2. Build and start the containers:
   ```sh
   docker-compose up --build
   ```
3. The application should now be accessible at **http://localhost:3000** (frontend) and **http://localhost:8080** (backend).

---

## 📜 **License**  

This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---
