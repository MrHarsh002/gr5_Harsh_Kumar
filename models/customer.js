import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: Number,
        required: true
    }
})

const Customer = mongoose.model("Customer", customerSchema)
export default Customer;