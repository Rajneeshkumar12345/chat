const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ItemSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity can not be less then 1."]
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
}, { timestamps: true })

const CartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    items: [ItemSchema],
    subTotal: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model("carts", CartSchema);


// const CartSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//     },
//     products: [
//         {
//             productId: Number,
//             quantity: Number,
//             name: String,
//             price: Number
//         }
//     ],
//     active: {
//         type: Boolean,
//         default: true,
//     },
//     modifiedOn: {
//         type: Date,
//         default: Date.now,
//     }
// }, { timestamps: true });

// const Cart = mongoose.model("Carts", CartSchema);

// module.exports = Cart;