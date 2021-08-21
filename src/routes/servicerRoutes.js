const express = require('express');

const router = express.Router();

router.get('/health', (req, res) => res.status(200).json({ response: 'Healthy' }));

module.exports = router;
