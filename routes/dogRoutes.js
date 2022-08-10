const express = require('express');
const router = express.Router();
const dogController = require('../controllers/dogController');

// Dog routes
router.get('/create', dogController.dog_create_get);

router.get('', dogController.dog_index);

router.get('/:id', dogController.dog_details);

router.post('/', dogController.dog_create_post);

router.delete('/:id', dogController.dog_delete);

module.exports = router;