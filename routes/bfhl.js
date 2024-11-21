const express = require('express');
const router = express.Router();
const { processPostRequest } = require('../utils/helper');

router.post('/', (req, res) => {
    try {
        const result = processPostRequest(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ is_success: false, message: error.message });
    }
});


router.get('/', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

module.exports = router; 
