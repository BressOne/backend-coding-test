const express = require('express');

const { getRideById, getRidesList, createRide } = require('../controllers/ridesController');

const router = express.Router();

router.post('/rides', createRide);

router.get('/rides', getRidesList);

router.get('/rides/:id', getRideById);

module.exports = router;
