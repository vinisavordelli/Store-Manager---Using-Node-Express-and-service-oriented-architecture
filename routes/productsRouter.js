const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

const productsController = require('../controllers/productsController');

router.get('/', rescue(productsController.getAll));
router.get('/:id', rescue(productsController.findById));
router.post('/', rescue(productsController.createProduct));

module.exports = router;
