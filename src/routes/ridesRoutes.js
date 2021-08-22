const express = require('express');

const { getRideById, getRidesList, createRide } = require('./ridesController');

const router = express.Router();

router.post('/rides', (r, re) => createRide(r, re));

router.get('/rides', getRidesList);

router.get('/rides/:id', getRideById);

module.exports = router;
