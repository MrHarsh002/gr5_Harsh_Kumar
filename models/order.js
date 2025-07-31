import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    items: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    },
    status: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered"],
        default: "Pending"
    }
})

const Order = mongoose.model("Order", orderSchema)
export default Order;