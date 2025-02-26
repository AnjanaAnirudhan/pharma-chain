const fabricService = require('../fabricService');

const addDrug = async (req, res) => {
    try {
        const { drugId, name, manufacturer, price } = req.body;

        // Interact with Fabric service to create a new drug on the blockchain
        const result = await fabricService.addDrug(drugId, name, manufacturer, price);

        res.status(201).json({ success: true, message: "Drug added successfully!", data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding drug", error: error.message });
    }
};

const updateDrug = async (req, res) => {
    try {
        const { drugId, name, manufacturer, price } = req.body;

        // Interact with Fabric service to update the drug on the blockchain
        const result = await fabricService.updateDrug(drugId, name, manufacturer, price);

        res.status(200).json({ success: true, message: "Drug updated successfully!", data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating drug", error: error.message });
    }
};

const getDrug = async (req, res) => {
    try {
        const { drugId } = req.params;

        // Interact with Fabric service to get the drug info from the blockchain
        const result = await fabricService.getDrug(drugId);

        res.status(200).json({ success: true, message: "Drug retrieved successfully!", data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving drug", error: error.message });
    }
};

const getAllDrugs = async (req, res) => {
    try {
        // Interact with Fabric service to get all drugs from the blockchain
        const result = await fabricService.getAllDrugs();

        res.status(200).json({ success: true, message: "All drugs retrieved successfully!", data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving drugs", error: error.message });
    }
};


module.exports = {
    addDrug,
    updateDrug,
    getDrug,
    getAllDrugs
};

