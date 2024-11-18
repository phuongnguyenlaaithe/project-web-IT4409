import userModel from '../models/userModel.js';
import productModel from '../models/productModel.js';

//add products to user favourite list
const addToFavourite = async (req, res) => {
    try {
        const { userId, productId } = req.body

        const userData = await userModel.findById(userId)
        let favoriteProducts = await userData.favoriteProducts;

        if (favoriteProducts.includes(productId)) {
            res.json({ success: false, message: "Product already in favourite list" })
        } else {
            favoriteProducts.push(productId)
            await userModel.findByIdAndUpdate(userId, { favoriteProducts })

            res.json({ success: true, message: "Added To Favourite", favouriteProduct: await productModel.findOne({ _id: productId }) })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//delete products from user favourite list
const deleteFromFavourite = async (req, res) => {
    try {
        const { productId } = req.query
        const { userId } = req.body

        const userData = await userModel.findById(userId)
        let favoriteProducts = await userData.favoriteProducts;

        const index = favoriteProducts.indexOf(productId)
        if (index > -1) {
            favoriteProducts.splice(index, 1)
        }

        await userModel.findByIdAndUpdate(userId, { favoriteProducts })

        res.json({ success: true, message: "Removed From Favourite" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//get user favourite list data
const getUserFavourite = async (req, res) => {
    try {
        const { userId } = req.body

        const userData = await userModel.findById(userId)
        let favoriteProducts = await userData.favoriteProducts;

        res.json({ success: true, favoriteProducts })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addToFavourite, deleteFromFavourite, getUserFavourite };