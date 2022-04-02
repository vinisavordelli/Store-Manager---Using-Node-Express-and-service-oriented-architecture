const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

const salesController = require('../controllers/salesController');

router.get('/', rescue(salesController.getAll));
router.get('/:id', rescue(salesController.findById));
router.post('/', rescue(salesController.createSale));
router.put('/:id', rescue(salesController.updateSale));

module.exports = router;