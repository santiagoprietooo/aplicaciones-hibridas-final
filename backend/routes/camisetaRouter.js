const express = require('express');
const router = express.Router();
const { addCamiseta, getCamisetas, getCamisetaById, getCamisetasPorTemporada, getCamisetasPorCategoria, deleteCamisetasById, updateCamisetasById } = require('../controllers/camisetasController');
/* const validateToken = require('../middleware/auth'); */

router.get('/', getCamisetas);
router.get('/:id', getCamisetaById);
router.get('/season/:season', getCamisetasPorTemporada);
router.get('/category/:category', getCamisetasPorCategoria);

router.post('/', /* validateToken, */ addCamiseta);
router.put('/:id', updateCamisetasById);
router.delete('/:id', deleteCamisetasById);

module.exports = router;