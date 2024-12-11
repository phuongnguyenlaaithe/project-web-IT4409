import axios from 'axios';
import crypto from 'crypto';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

const momoConfig = {
    partnerCode: process.env.MOMO_PARTNER_CODE,
    accessKey: process.env.MOMO_ACCESS_KEY,
    secretKey: process.env.MOMO_SECRET_KEY,
    endpoint: 'https://test-payment.momo.vn/v2/gateway/api/create',
    returnUrl: 'https://nguyenmaiphuong20210698.name.vn/order',
    notifyUrl: 'https://project-web-it4409-backend.onrender.com/api/order/verify'
};

// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



// All Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve orders', error });
    }
};

// User Order Data For Frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// update order status from Admin Panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Status Updated' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Place order using Momo payment method
const placeOrderMomo = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'Momo',
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const requestId = `${newOrder._id}-${Date.now()}`;
        const orderId = newOrder._id.toString();
        const orderInfo = 'Payment for order ' + orderId;
        const requestType = 'payWithATM';
        const extraData = '';
        const exchangeRate = 25000;
        const VNDamount = amount * exchangeRate;

        const rawSignature = `accessKey=${momoConfig.accessKey}&amount=${VNDamount}&extraData=${extraData}&ipnUrl=${momoConfig.notifyUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${momoConfig.partnerCode}&redirectUrl=${momoConfig.returnUrl}&requestId=${requestId}&requestType=${requestType}`;
        const signature = crypto.createHmac('sha256', momoConfig.secretKey)
            .update(rawSignature)
            .digest('hex');

        const momoRequest = {
            partnerCode: momoConfig.partnerCode,
            partnerName: 'TEST',
            storeId: 'TESTMOMO',
            requestId,
            amount: VNDamount.toString(),
            orderId,
            orderInfo,
            redirectUrl: momoConfig.returnUrl,
            ipnUrl: momoConfig.notifyUrl,
            lang: 'vi',
            requestType,
            autoCapture: true,
            extraData,
            orderGroupId: '',
            signature,
        };

        const momoResponse = await axios.post(momoConfig.endpoint, momoRequest);

        if (momoResponse.data.resultCode === 0) {
            console.log(momoResponse.data.payUrl)
            res.json({ success: true, payUrl: momoResponse.data.payUrl });
        } else {
            res.json({ success: false, message: momoResponse.data.localMessage });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// verify payment from Momo
const verifyMoMoPayment = async (req, res) => {
    const { orderId, resultCode } = req.body;
    try {
        if (resultCode === 0) {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            //find user id from order id
            const order = await orderModel.findById(orderId);
            const userId = order.userId;
            //clear cart data
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true, message: 'Payment Successful' });
        } else {
            res.json({ success: false, message: 'Payment Failed' });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {
    placeOrder,
    placeOrderMomo,
    allOrders,
    userOrders,
    updateStatus,
    verifyMoMoPayment
};
