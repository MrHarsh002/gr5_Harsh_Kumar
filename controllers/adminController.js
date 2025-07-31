import Customer from "../models/customer.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, userName, phoneNo } = req.body;

        if (!fullName || !email || !password || !userName || !phoneNo) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const oldUser = await Customer.findOne({ email });
        if (oldUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Customer({
            fullName,
            email,
            password: hashedPassword,
            userName,
            phoneNo
        });

        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully",
            success: true
        });

    } catch (err) {
        console.error("Error in registerUser:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are required" });
        }

        const user = await Customer.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        return res.status(200).json({
            message: "Login Successful",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                userName: user.userName,
                phoneNo: user.phoneNo
            }
        });

    } catch (err) {
        console.error("Error in loginUser:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
