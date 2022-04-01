const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

const salesController = require('../controllers/salesController');

router.get('/', rescue(salesController.getAll));
router.get('/:id', rescue(salesController.findById));
router.post('/', rescue(salesController.createSale));

module.exports = router;