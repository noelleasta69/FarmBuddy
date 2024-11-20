import { createServer } from 'http';
import { initializeWebSocketServer } from './src/lib/webSocket';
import dbConnect from './src/lib/dbConnect';

// Connect to MongoDB
await dbConnect();

const server = createServer();
initializeWebSocketServer(server);

server.listen(8080, () => {
  console.log('WebSocket server running on http://localhost:8080');
});
