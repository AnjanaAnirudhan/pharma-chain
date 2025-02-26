  GNU nano 7.2                                                                                                                                                                                                                        transactionController.js                                                                                                                                                                                                                                  const fabricService = require('../fabricService');


const createTransaction = async (req, res) => {
    try {
        const { transactionId, orderId, amount, payerId, payeeId, status } = req.body;

        // Validate required fields
        if (!transactionId || !orderId || !amount || !payerId || !payeeId || !status) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Interact with Fabric service to create a new transaction
        const result = await fabricService.createTransaction(transactionId, orderId, amount, payerId, payeeId, status);

        res.status(201).json({ success: true, message: "Transaction created successfully!", data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating transaction", error: error.message });
    }
};

const updateTransactionStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { transactionId } = req.params; // Extract transactionId from URL

        if (!transactionId || !status) {
            return res.status(400).json({ success: false, message: "Transaction ID and status are required." });
        }

        // Interact with Fabric service to update the transaction status
        const result = await fabricService.updateTransactionStatus(transactionId, status);

        res.status(200).json({ success: true, message: "Transaction status updated successfully!", data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating transaction status", error: error.message });
    }
};

const getTransaction = async (req, res) => {
    try {
        const { transactionId } = req.params;

        if (!transactionId) {
            return res.status(400).json({ success: false, message: "Transaction ID is required." });
        }

        // Interact with Fabric service to get the transaction details
        const result = await fabricService.getTransaction(transactionId);

        if (!result) {
            return res.status(404).json({ success: false, message: "Transaction not found." });
        }

        res.status(200).json({ success: true, message: "Transaction retrieved successfully!", data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving transaction", error: error.message });
    }
};

const getAllTransactions = async (req, res) => {
    try {
        // Interact with Fabric service to get all transactions
        const result = await fabricService.getAllTransactions();

        res.status(200).json({ success: true, message: "All transactions retrieved successfully!", data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving transactions", error: error.message });
    }
};

module.exports = {
    createTransaction,
    updateTransactionStatus,
    getTransaction,
    getAllTransactions
};
