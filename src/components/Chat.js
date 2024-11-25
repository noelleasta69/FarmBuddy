import React, { useEffect, useState } from 'react';

const Chat = ({ userId, chatRoomId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080/?userId=${userId}&chatRoomId=${chatRoomId}`);

    socket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'NEW_MESSAGE') {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close(); // Cleanup connection on component unmount
    };
  }, [userId, chatRoomId]);

  const sendMessage = () => {
    const socket = new WebSocket(`ws://localhost:8080/?userId=${userId}&chatRoomId=${chatRoomId}`);
    socket.send(
      JSON.stringify({
        type: 'SEND_MESSAGE',
        senderType: 'Farmer', // Replace with dynamic sender type
        content: input,
      })
    );
    setInput(''); // Clear the input field
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.content}</li>
        ))}
      </ul>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
