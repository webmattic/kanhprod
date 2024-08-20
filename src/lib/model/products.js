

// import mongoose, { Schema } from "mongoose";

// // Define the schema for product variations
// const VariationSchema = new Schema({
//     color: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     colorCode: {
//         type: String,
//         required: true,
//     },
//     colorImage: {
//         type: String,
//         required: true,
//     },
//     image: {
//         type: String,
//         required: true,
//     },
// });


// const ProductSchema = new Schema({
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: "admindatas",  
//         required: true,
//     },
//     category: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     type: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     name: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     gender: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     new: {
//         type: Boolean,
//         default: false,
//     },
//     sale: {
//         type: Boolean,
//         default: false,
//     },
//     rate: {
//         type: Number,
//         required: true,
//     },
//     price: {
//         type: Number,
//         required: true,
//     },
//     originPrice: {
//         type: Number,
//         required: true,
//     },
//     brand: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     sold: {
//         type: Number,
//         default: 0,
//     },
//     quantity: {
//         type: Number,
//         required: true,
//     },
//     quantityPurchase: {
//         type: Number,
//         default: 1,
//     },
//     sizes: {
//         type: [String],
//         required: true,
//     },
//     variation: {
//         type: [VariationSchema],
//         required: true,
//     },
//     thumbImage: {
//         type: [String],
//         required: true,
//     },
//     images: {
//         type: [String],
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     action: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     slug: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });


// const Product = mongoose.models.products || mongoose.model("products", ProductSchema);

// export default Product;

import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import connectDB from "@/lib/db";


const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    brand: {
        type: String,
        required: true,
        trim: true,
    },
    sold: {
        type: Number,
        default: 0,
    },
    quantity: {
        type: Number,
        required: true,
    },
    quantityPurchase: {
        type: Number,                       
        default: 1,

    },
    sizes: {
        type: [String],
        required: true,
    },
    variation: {
        type: [String],
        required: true,
    },
    thumbImage: {
        type: [String],
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    action: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const Product = mongoose.models.products || mongoose.model("products", ProductSchema);

export default Product;
