import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema({
    itemName:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true
    }
})

const Item = mongoose.model("Item", itemsSchema)
export default Item;