import dbConnect from '@/lib/dbConnect';
import ChatRoom from '@/models/ChatRoom';
import Message from '@/models/Message';

// Fetch all messages for a specific chat room (e.g., for pagination)
export async function GET(req, res) {
  await dbConnect();

  const { chatRoomId } = req.query;

  if (!chatRoomId) {
    return res.status(400).json({ message: 'ChatRoom ID is required' });
  }

  try {
    const messages = await Message.find({ chatRoomId })
      .sort({ timestamp: -1 })
      .limit(50); // Pagination logic (latest 50 messages)

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
