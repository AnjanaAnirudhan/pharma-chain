const fabricService = require('../fabricService');


const createOrder = async (req, res) => {
    try {
        const { orderId, drugId, quantity, buyerId, sellerId, price } = req.body;

        // Validate required fields
        if (!orderId || !drugId || !quantity || !buyerId || !sellerId || !price) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Interact with Fabric service to create a new order
        const result = await fabricService.createOrder(orderId, drugId, quantity, buyerId, sellerId, price);

        res.status(201).json({ success: true, message: "Order created successfully!", data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating order", error: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const { status } = req.body;
        const { orderId } = req.params; // Extract orderId from URL

        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: "Order ID and status are required." });
        }

        // Interact with Fabric service to update the order status
        const result = await fabricService.updateOrder(orderId, status);

        res.status(200).json({ success: true, message: "Order updated successfully!", data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating order", error: error.message });
    }
};

const getOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        if (!orderId) {
            return res.status(400).json({ success: false, message: "Order ID is required." });
        }

        // Interact with Fabric service to get the order details
        const result = await fabricService.getOrder(orderId);

        if (!result) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }

        res.status(200).json({ success: true, message: "Order retrieved successfully!", data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving order", error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        // Interact with Fabric service to get all orders
        const result = await fabricService.getAllOrders();

        res.status(200).json({ success: true, message: "All orders retrieved successfully!", data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving orders", error: error.message });
    }
};

module.exports = {
    createOrder,
    updateOrder,
    getOrder,
    getAllOrders
};
