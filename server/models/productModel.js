import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: [String], required: true },
    category: { 
        type: String, 
        required: true, 
        enum: ['Men', 'Women', 'Kids'] 
    },
    subCategory: { 
        type: String, 
        required: true, 
        enum: ['Topwear', 'Bottomwear', 'Winterwear'] 
    },
    sizes: { 
        type: [String], 
        required: true, 
        enum: ['S', 'M', 'L', 'XL', 'XXL'] 
    },
    bestseller: { type: Boolean },
    date: { type: Number, required: true }
});

const productModel = mongoose.models.product || mongoose.model('product', productSchema);

export default productModel;