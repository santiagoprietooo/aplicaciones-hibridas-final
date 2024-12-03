const Camiseta = require('../models/camisetasSchema');

async function addCamiseta(req, res) {
    const { camiseta, categoria, precio, imagen_principal, imagen_secundaria, imagen_terciaria, imagen_cuaternaria, temporada, color, genero, talle, unidades } = req.body;

    if (!camiseta || !categoria || !precio || !imagen_principal || !temporada || !genero || !talle || !unidades ) {
        res.status(400).json({ msg: "Faltan parámetros obligatorios.", data: [{ camiseta: camiseta, categoria: categoria, precio: precio, imagen_principal: imagen_principal, temporada: temporada, genero: genero, talle: talle, unidades: unidades }] });
    }

    try {
        const added_product = new Camiseta({ camiseta, categoria, precio, imagen_principal, imagen_secundaria, imagen_terciaria, imagen_cuaternaria, temporada, color, genero, talle, unidades });
        await added_product.save();
        res.status(200).json({ msg: "Se agregó el producto correctamente: " + `${added_product.camiseta}`, data: {added_product} });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al querer agregar un producto.", data: {} });
    }
};

async function getCamisetas(req, res) {
    const camiseta = await Camiseta.find();
    res.status(500).json({ msg: "Estas son las camisetas disponibles:", data: camiseta });
};

async function getCamisetaById(req, res) {
    const { id } = req.params;

    try {
        const camiseta = await Camiseta.findById(id);

        if (camiseta) {
            res.status(200).json({ msg: `Se encontró la camiseta con el ID "${id}": "${camiseta.camiseta}"`, data: camiseta });
        } else {
            res.status(404).json({ msg: `No se encontró la camiseta con el ID: ${id}.`, data: {} });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al buscar la camiseta por ID.", data: {} });
    }
};

const getCamisetasPorTemporada = async (req, res) => {
    const { temporada } = req.params;

    try {
        const camisetas = await Camiseta.find({ temporada });

        if (camisetas.length > 0) {
            res.status(200).json({ msg: `Estas son las camisetas disponibles de la temporada ${temporada}:`, data: camisetas });
        } else {
            res.status(404).json({ msg: `No se encontraron camisetas de la temporada ${temporada}`, data:{} });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al filtrar por temporadas.", data: {} });
    }
};

async function getCamisetasPorCategoria(req, res) {
    const { categoria } = req.params;

    try {
        const camisetas = await Camiseta.find({ categoria });

        if (camisetas.length > 0) {
            res.status(200).json({ msg: `Estas son las camisetas ${categoria} disponibles:`, data: camisetas });
        } else {
            res.status(404).json({ msg: `No se encontraron camisetas ${categoria}.`, data:{} });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al filtrar camisetas por categoria.", data: {} });
    }
};

async function deleteCamisetasById(req, res) {
    const { id } = req.params;

    try {
        const camisetas = await Camiseta.findByIdAndDelete(id);

        if (camisetas) {
            res.status(200).json({ msg: `La camiseta ${camisetas.camiseta} ha sido borrada por ID.`, data: camisetas });
        } else {
            res.status(404).json({ msg: `No se pudo la camiseta con ID: ${id}.`, data: {} });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al querer borrar la camiseta por ID.", data: {} });
    }
};

async function updateCamisetasById(req, res) {
    const { id } = req.params;
    const { camiseta, categoria, precio, imagen_principal, imagen_secundaria, imagen_terciaria, imagen_cuaternaria, temporada, color, genero, talle, unidades } = req.body;

    try {
        const updateCamiseta = await Camiseta.findByIdAndUpdate(id, { camiseta, categoria, precio, imagen_principal, imagen_secundaria, imagen_terciaria, imagen_cuaternaria, temporada, color, genero, talle, unidades }, {new: true});

        if (updateCamiseta) {
            res.status(200).json({ msg: `Se actualizó la camiseta: ${updateCamiseta.camiseta}`, data: updateCamiseta });
        } else {
            res.status(404).json({ msg: "No se pudo actualizar la camiseta.", data: {} });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al querer actualizar la camiseta.", data: {} });
    }
};

module.exports = { addCamiseta, getCamisetas, getCamisetaById, getCamisetasPorTemporada, getCamisetasPorCategoria, deleteCamisetasById, updateCamisetasById };