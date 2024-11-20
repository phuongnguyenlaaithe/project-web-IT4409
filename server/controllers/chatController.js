import ChatMessage from '../models/chatModel.js';
import userModel from '../models/userModel.js';

const handleConnection = (socket, io) => {
  //   console.log('a user connected');

  // Listen for the join event to send previous messages
  socket.on('join', async ({ userId, adminId }) => {
    socket.join(userId); // Join a room with the user's ID

    // Fetch previous messages between the user and admin
    try {
      const messages = await ChatMessage.find({
        $or: [
          { sender: userId, receiver: adminId },
          { sender: adminId, receiver: userId },
        ],
      });
      socket.emit('previousMessages', messages);
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  });

  // Listen for new messages
  socket.on('privateMessage', (msg) => {
    const message = new ChatMessage(msg);
    message.save().then(() => {
      io.to(msg.receiver).emit('privateMessage', msg); // Send the message to the specific receiver
      io.to(msg.sender).emit('privateMessage', msg); // Send the message to the sender
    });
  });

  //   socket.on('disconnect', () => {
  //     console.log('user disconnected');
  //   });
};

// get the list of users who have chatted with the admin and return their usernames
const getUsers = async (req, res) => {
  try {
    const users = await ChatMessage.distinct('sender', { receiver: "admin" });
    const usersWithNames = await Promise.all(users.map(async (userId) => {
      const user = await userModel.findById(userId); 
      return { userId, username: user.name };
    }));
    res.json({ success: true, users: usersWithNames });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { handleConnection, getUsers };