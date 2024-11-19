import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import favouriteListRouter from './routes/favouriteListRouter.js';
import revenueRouter from './routes/revenueRoute.js';
import chatRouter from './routes/chatRoute.js';
import { handleConnection } from './controllers/chatController.js';

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server,
    {
        cors: {
        origin: '*',
        },
    },
);

// Connect to MongoDB and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());

// API Endpoints
app.use('/api/users', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/favourite', favouriteListRouter);
app.use('/api/order', orderRouter);
app.use('/api/revenue', revenueRouter);
app.use('/api/chat', chatRouter);

// WebSocket Connection
io.on('connection', (socket) => handleConnection(socket, io));

// Start Server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});