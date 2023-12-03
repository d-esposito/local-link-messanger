import { React, useState, useEffect } from 'react';

import MessageView from './components/MessageView';
import MessageBox from './components/MessageBox';

function App() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!socket) {
      const newSocket = new WebSocket('ws://localhost:8081/');

      newSocket.onopen = () => {
        console.log("Connected to WebSocket server");
      }
  
      newSocket.addEventListener('message', (e) => {
        try {
          const message = JSON.parse(e.data);
          setMessages((prevMessages) => [...prevMessages, message]);
        } catch (error) {
          console.error("Error parsing JSON:", error)
        }
      });

      setSocket(newSocket);

      return () => {
        if (socket) {
          socket.close();
        }
      }
    }
  }, [])

  const sendMessage = (message) => {
    socket.send(message);
  }

  return (
    <>
      <MessageView messages={messages}/>
      <MessageBox sendMessage={sendMessage}/>
    </>
  );
}

export default App;
