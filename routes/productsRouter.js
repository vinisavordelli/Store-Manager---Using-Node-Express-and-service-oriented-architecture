const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

const productsController = require('../controllers/productsController');
const validateProducts = require('../middlewares/validateProducts');

router.get('/', rescue(productsController.getAll));
router.get('/:id', rescue(productsController.findById));
router.post('/', validateProducts, rescue(productsController.createProduct));
router.put('/:id', validateProducts, rescue(productsController.updateProduct));
router.delete('/:id', rescue(productsController.removeProduct));

module.exports = router;
