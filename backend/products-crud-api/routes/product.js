const express = require('express');
const router = express.Router();
const controller = require('../controller/productController');

router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProductById);
router.post('/add', controller.addProducts);
router.put('/update/:id', controller.updateProduct);
router.delete('/delete/:id', controller.deleteProduct);

module.exports = router;