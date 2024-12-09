const express = require('express');
const router = express.Router();
const { createAdmin, login } = require('../controllers/adminController');

router.post('/', createAdmin);
router.post('/login', login);

module.exports = router;