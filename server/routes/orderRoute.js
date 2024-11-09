import express from 'express'
import { placeOrder, placeOrderMomo, allOrders, userOrders, updateStatus, verifyMoMoPayment } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.get('/list', adminAuth, allOrders)
orderRouter.put('/status', adminAuth, updateStatus)

// Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/place/momo', authUser, placeOrderMomo)

// User Feature
orderRouter.get('/userorders', authUser, userOrders)

//verify payment
orderRouter.post('/verify', verifyMoMoPayment)

export default orderRouter
