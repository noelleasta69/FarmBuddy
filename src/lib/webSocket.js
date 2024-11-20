import { WebSocketServer } from 'ws';
import ChatRoom from '@/models/ChatRoom';
import Message from '@/models/Message';
import dbConnect from '@/lib/dbConnect';

// Create a WebSocket server
const wss = new WebSocketServer({ port: 8080 });

// Store connections (in-memory for simplicity; consider Redis for scaling)
const clients = new Map();

wss.on('connection', async (ws, req) => {
  // Parse query parameters (e.g., ?userId=123&chatRoomId=456)
  const urlParams = new URLSearchParams(req.url.replace('/?', ''));
  const userId = urlParams.get('userId');
  const chatRoomId = urlParams.get('chatRoomId');

  if (!userId || !chatRoomId) {
    ws.close(4000, "Invalid connection parameters");
    return;
  }

  // Authenticate user and associate WebSocket connection
  clients.set(userId, ws);

  ws.on('message', async (data) => {
    try {
      const parsedData = JSON.parse(data);

      if (parsedData.type === 'SEND_MESSAGE') {
        const { content } = parsedData;

        // Save the message in the database
        const message = await Message.create({
          chatRoomId,
          sender: userId,
          senderType: parsedData.senderType, // 'Farmer' or 'Vet'
          content,
        });

        // Broadcast the message to the room
        broadcastToRoom(chatRoomId, {
          type: 'NEW_MESSAGE',
          message,
        });
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', () => {
    clients.delete(userId);
  });
});

function broadcastToRoom(chatRoomId, data) {
  for (const [userId, ws] of clients) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    }
  }
}
