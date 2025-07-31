import Order from '../models/order.js';
import Item from '../models/items.js';

export const createOrder = async (req, res) => {
    try {
        const { customerId, items } = req.body;

        const order = await Order.create({
            customer: customerId,
            items,
        });

        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('customer items');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getOrdersByCustomer = async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.params.id }).populate('items');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) return res.status(404).json({ error: 'Order not found' });

        const validTransitions = {
            Pending: ['Shipped'],
            Shipped: ['Delivered'],
            Delivered: [],
        };

        if (!validTransitions[order.status].includes(status)) {
            return res.status(400).json({ error: 'Invalid status transition' });
        }
        order.status = status;
        await order.save();

        res.json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const cancelOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};