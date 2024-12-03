const express = require('express');
const router = express.Router();
const { addRopa, getRopa, getRopaById, getRopaPorColor, getRopaPorCategoria, deleteRopaById, updateRopaById } = require('../controllers/ropaController');
/* const validateToken = require('../middleware/auth'); */

router.get('/', getRopa);
router.get('/:id', getRopaById);
router.get('/color/:color', getRopaPorColor);
router.get('/categorias/:categoria', getRopaPorCategoria);

router.post('/', /* validateToken, */ addRopa);
router.put('/:id', updateRopaById);
router.delete('/:id', deleteRopaById);

module.exports = router;