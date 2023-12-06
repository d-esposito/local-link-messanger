# LocalLink Messenger
Simple messaging app for people on the same WiFi network

## Purpose
This project was mainly a learning exercise to gain some experience with a high level of understanding of how the WebSocket protocol works, as well as using a simple MongoDB database. As an added bonus, the abbreviation for the app is LLM, which might score some points with any automated resume scanning tools :)

## Project Structure
The application is set using docker, with a docker-compose file orchestrating the three containers used: frontend (nginx), backend (python), and database (MongoDB).

### Frontend
The frontend is written in React and served on an nginx container. Some notible features of the frontend are the ability for the user to select a display name, and a message viewer that assigns a random color to the messages based on the display name attached to the message.

### Backend
The backend is a python WebSocket server that interacts with the frontend and the MongoDB database. The server pulls up the latest 50 messages from the database to send to the client when a new connection is established, and whenever a message is received, it is broadcasted to all connected clients and stored in the database.