import mongoose from 'mongoose';
import userModel from './userModel.js'; // Giả sử bạn có userModel.js để xác định mô hình user

const chatMessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.Mixed, required: true },
  receiver: { type: mongoose.Schema.Types.Mixed, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

chatMessageSchema.pre('save', async function(next) {
  try {
    const senderIsAdmin = this.sender === 'admin';
    const receiverIsAdmin = this.receiver === 'admin';

    if (!senderIsAdmin) {
      const sender = await userModel.findById(this.sender);
      if (!sender) {
        throw new Error('Sender must be a valid user or "admin"');
      }
    }

    if (!receiverIsAdmin) {
      const receiver = await userModel.findById(this.receiver);
      if (!receiver) {
        throw new Error('Receiver must be a valid user or "admin"');
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});

const ChatMessage = mongoose.models.ChatMessage || mongoose.model('ChatMessage', chatMessageSchema);

export default ChatMessage;