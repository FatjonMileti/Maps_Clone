const express = require('express');
const mapController = require('../controllers/map.controller')
const router = express.Router();

router.get('/search', mapController.search);

module.exports = router