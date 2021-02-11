const express = require('express');
const router = express.Router();

const controller = require('../controllers/catalogController');

router.get('/', controller.index);

module.exports = router;