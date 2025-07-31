import express from 'express'
import { cancelOrder, createOrder, getAllOrders, getOrdersByCustomer, updateOrderStatus } from '../controllers/customerController.js';


const router = express.Router();

router.post('/orders', createOrder);
router.get('/orders', getAllOrders);
router.get('/customers/:id/orders', getOrdersByCustomer);
router.patch('/orders/:id/status', updateOrderStatus);
router.delete('/orders/:id', cancelOrder);

export default router;