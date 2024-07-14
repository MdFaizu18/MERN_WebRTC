# WebRTC P2P with SDP and ICE using Sockets

This project demonstrates a peer-to-peer (P2P) video communication application using WebRTC with SDP (Session Description Protocol) and ICE (Interactive Connectivity Establishment), facilitated by WebSockets.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. **Install dependencies for both the client and server:**

    ```sh
    cd client
    npm install
    cd ../server
    npm install
    ```

### Running the Application

1. **Start the backend server:**

    ```sh
    cd server
    nodemon server
    ```

2. **Start the frontend development server:**

    ```sh
    cd client
    npm run dev
    ```

### Folder Structure

- `client/`: Contains the React frontend code.
- `server/`: Contains the backend code for handling WebSocket connections.

### Features

- Peer-to-peer video communication.
- WebRTC implementation using SDP and ICE.
- WebSockets for signaling.

### Technologies Used

- React
- Material UI
- WebRTC
- WebSockets
- Node.js
  
Here the Preview of my project

### Login Page
![Screenshot (321)](https://github.com/user-attachments/assets/57c74d37-d4b6-46ec-bde9-28657e21ac0b)
![Screenshot (322)](https://github.com/user-attachments/assets/bf653b27-8614-414b-8b84-ef1bd93a15a7)

### After Logged In
![Screenshot (323)](https://github.com/user-attachments/assets/95b5ae7e-8166-46a4-b7f3-443a4f38014a)

### Second Person Authentication from other device
![Screenshot (324)](https://github.com/user-attachments/assets/d2a4d598-0f2c-475f-b6c8-2140e7e01c02)

### First Person Get the Acknowledgement of second person joining
![Screenshot (325)](https://github.com/user-attachments/assets/487ca166-bf52-4fd0-9313-951d7dea76c3)

### Then Clicking the Make Call Button
![Screenshot (330)](https://github.com/user-attachments/assets/5f4ef236-472d-448c-b409-282c52f09451)
![Screenshot (326)](https://github.com/user-attachments/assets/ee1db208-3ec7-4e24-bb0e-f6898ce35be6)

### After Clicking the Send Streams you will initially connect with second person via stream
![Screenshot (328)](https://github.com/user-attachments/assets/5e87d091-641d-471a-b77c-d71d0a6d787d)

### It will redirect to the page once you click the end video
![Screenshot (331)](https://github.com/user-attachments/assets/bd90459b-4aad-4cba-b4b8-6993601f3f61)





## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

