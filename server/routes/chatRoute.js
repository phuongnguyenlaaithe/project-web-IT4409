import express from 'express'
import { getUsers } from '../controllers/chatController.js'
import adminAuth from '../middleware/adminAuth.js'

const chatRouter = express.Router()

chatRouter.get('/get-user', adminAuth, getUsers)

export default chatRouter
