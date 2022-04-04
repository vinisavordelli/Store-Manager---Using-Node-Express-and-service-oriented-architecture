const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

const salesController = require('../controllers/salesController');
const validateSale = require('../middlewares/validateSale');

router.get('/', rescue(salesController.getAll));
router.get('/:id', rescue(salesController.findById));
router.post('/', validateSale, rescue(salesController.createSale));
router.put('/:id', validateSale, rescue(salesController.updateSale));

module.exports = router;