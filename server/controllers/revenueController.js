import orderModel from '../models/orderModel.js';
import productModel from '../models/productModel.js';

// get revenue data for every month in a year
const getRevenueByMonth = async (req, res) => {
    try {
        const { year } = req.params;
        const orders = await orderModel.find({ date: { $gte: new Date(`${year}-01-01`), $lt: new Date(`${year}-12-31`) } });
        let revenue = Array(12).fill(0);
        orders.forEach(order => {
            const month = new Date(order.date).getMonth();
            revenue[month] += order.amount;
        });
        res.json({ success: true, revenue });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// get revenue data for every category in all years by query all orders
const getRevenueByCategory = async (req, res) => {
    try {
        const products = await productModel.find({});
        const orders = await orderModel.find({});
        let revenue = {};
        products.forEach(product => {
            revenue[product.category] = 0;
        });
        orders.forEach(order => {
            order.items.forEach(item => {
                const product = products.find(product => product._id.toString() === item.productId);
                revenue[product.category] += item.quantity * product.price;
            });
        });
        res.json({ success: true, revenue });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

//get revenue data for every subcategory in all years by query all orders
const getRevenueBySubCategory = async (req, res) => {
    try {
        const products = await productModel.find({});
        const orders = await orderModel.find({});
        let revenue = {};
        products.forEach(product => {
            revenue[product.subCategory] = 0;
        });
        orders.forEach(order => {
            order.items.forEach(item => {
                const product = products.find(product => product._id.toString() === item.productId);
                revenue[product.subCategory] += item.quantity * product.price;
            });
        });
        res.json({ success: true, revenue });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { getRevenueByMonth, getRevenueByCategory, getRevenueBySubCategory };
