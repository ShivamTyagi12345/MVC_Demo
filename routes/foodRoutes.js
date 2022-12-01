const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

// food routes
router.get('/create', foodController.food_create_get);

router.get('', foodController.food_index);

router.get('/:id', foodController.food_details);

router.post('/', foodController.food_create_post);

router.delete('/:id', foodController.food_delete);

module.exports = router;