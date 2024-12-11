import mongoose from 'mongoose';
import productModel from './productModel.js';

const orderItemSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: [String], required: true },
    category: { type: String, required: true, enum: ['Men', 'Women', 'Kids'] },
    subCategory: { type: String, required: true, enum: ['Topwear', 'Bottomwear', 'Winterwear'] },
    sizes: { type: [String], required: true, enum: ['S', 'M', 'L', 'XL', 'XXL'] },
    bestseller: { type: Boolean },
    date: { type: Number, required: true },
    size: { type: String, required: true, enum: ['S', 'M', 'L', 'XL', 'XXL'] },
    quantity: { type: Number, required: true }
});

const addressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    items: { type: [orderItemSchema], required: true },
    amount: { type: Number, required: true },
    address: { type: addressSchema, required: true },
    status: { 
        type: String, 
        required: true, 
        enum: ['Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered'], 
        default: 'Order Placed' 
    },
    paymentMethod: { 
        type: String, 
        required: true, 
        enum: ['COD', 'Momo'] 
    },
    payment: { type: Boolean, required: true, default: false },
    date: { type: Date, required: true, default: Date.now }
});

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;