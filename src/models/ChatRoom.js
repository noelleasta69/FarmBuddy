import mongoose from 'mongoose';

const chatRoomSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'participantTypes',
      required: true,
    },
  ],
  participantTypes: [
    {
      type: String,
      enum: ['Farmer', 'Vet'],
      required: true,
    },fadsfadfasd
  ],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message', // Optional, for easy access to the last message
  },
}, { timestamps: true });

const ChatRoom = mongoose.models.ChatRoom || mongoose.model('ChatRoom', chatRoomSchema);


export default ChatRoom;
