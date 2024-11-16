import productModel from "../models/productModel.js";
import orderModel from '../models/orderModel.js';

export async function updateBestSellers(req, res, next) {
    // Tính tổng số lượng đặt hàng cho từng sản phẩm
    const topProducts = await orderModel.aggregate([
        { $unwind: "$items" }, // Tách từng sản phẩm trong mảng items
        { 
            $group: { 
                _id: "$items._id", 
                totalQuantity: { $sum: "$items.quantity" } // Tính tổng số lượng đặt hàng
            }
        },
        { $match: { totalQuantity: { $gte: 1 } } }, // Lọc sản phẩm có ít nhất 1 đơn hàng
        { $sort: { totalQuantity: -1 } }, // Sắp xếp theo số lượng giảm dần
        { $limit: 10 } // Chọn top 10 sản phẩm
    ]);

    // Lấy danh sách ID sản phẩm trong top
    const topProductIds = topProducts.map(product => product._id);

    // Đặt `bestseller` là true cho sản phẩm trong top
    await productModel.updateMany(
        { _id: { $in: topProductIds } },
        { $set: { bestseller: true } }
    );

    // Đặt `bestseller` là false cho các sản phẩm còn lại
    await productModel.updateMany(
        { _id: { $nin: topProductIds } },
        { $set: { bestseller: false } }
    );

    console.log("Bestseller status updated!");
    next();
}
