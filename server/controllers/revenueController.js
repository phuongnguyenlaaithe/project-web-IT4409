import orderModel from '../models/orderModel.js';

// get revenue data for every month in a year
const getRevenueByMonth = async (req, res) => {
    try {
        const { year } = req.params;
        const orders = await orderModel.find({ date: { $gte: new Date(`${year}-01-01`), $lt: new Date(`${year}-12-31`) } });
        let revenue = Array(12).fill(0);
        orders.forEach(order => {
            const month = new Date(order.date).getMonth();
            order.items.forEach(item => {
                if (!revenue[month]) {
                    revenue[month] = 0;
                }
                revenue[month] += item.quantity * item.price;
            });
        });
        res.json({ success: true, revenue });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// get revenue data for every category in all years by query all orders
const getRevenueByCategory = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        let revenue = {};

        orders.forEach(order => {
            order.items.forEach(item => {
                if (!revenue[item.category]) {
                    revenue[item.category] = 0;
                }
                revenue[item.category] += item.quantity * item.price;
            });
        });

        res.json({ success: true, revenue });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// get revenue data for every subcategory in all years by query all orders
const getRevenueBySubCategory = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        let revenue = {};

        orders.forEach(order => {
            order.items.forEach(item => {
                if (!revenue[item.subCategory]) {
                    revenue[item.subCategory] = 0;
                }
                revenue[item.subCategory] += item.quantity * item.price;
            });
        });

        res.json({ success: true, revenue });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { getRevenueByMonth, getRevenueByCategory, getRevenueBySubCategory };
