const messageSchema = new mongoose.Schema({
    chatRoomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatRoom',
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'senderType',
      required: true,
    },
    senderType: {
      type: String,
      enum: ['Farmer', 'Vet'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  }, { timestamps: true });
  
  const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);
  
  export default Message;
  