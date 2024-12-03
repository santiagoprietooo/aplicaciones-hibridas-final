const Ropa = require('../models/ropaSchema');

async function addRopa(req, res) {
    const { prenda, precio, imagen_principal, imagen_secundaria, imagen_terciaria, imagen_cuartaria, temporada, color, genero, talle, unidades } = req.body;

    if (!prenda || !precio || !imagen_principal || !temporada ) {
        res.status(400).json({ msg: "Faltan parámetros obligatorios.", data: [{ prenda: prenda, precio: precio, imagen_principal: imagen_principal, temporada: temporada }] });
    }

    try {
        const newRopa = new Ropa({ prenda, precio, imagen_principal, imagen_secundaria, imagen_terciaria, imagen_cuartaria, temporada, color, genero, talle, unidades });
        await newRopa.save();
        res.status(200).json({ msg: "Se agregó la prenda de ropa correctamente: " + `${newRopa.prenda}`, data: {newRopa} });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al querer agregar una prenda de ropa.", data: {} });
    }
};

async function getRopa(req, res) {
    const ropa = await Ropa.find();
    res.status(500).json({ msg: "Estas son las prendas de ropa disponibles:", data: ropa });
};

async function getRopaById(req, res) {
    const { id } = req.params;

    try {
        const ropa = await Ropa.findById(id);

        if (ropa) {
            res.status(200).json({ msg: `Se encontró la prenda de ropa con el ID "${id}": "${ropa.prenda}"`, data: ropa });
        } else {
            res.status(404).json({ msg: `No se encontró la prenda de ropa con el ID: ${id}.`, data: {} });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al buscar prendas de ropa por ID.", data: {} });
    }
};

const getRopaPorColor = async (req, res) => {
    const { color } = req.params;

    try {
        const ropa = await Ropa.find({ color });

        if (ropa.length > 0) {
            res.status(200).json({ msg: `Estas son las prendas de ropa del color ${color} disponibles:`, data: ropa });
        } else {
            res.status(404).json({ msg: `No se encontraron prendas de ropa con color ${color}`, data:{} });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al filtrar prendas de ropa por color.", data: {} });
    }
};

async function getRopaPorCategoria(req, res) {
    const { categoria } = req.params;

    try {
        const ropa = await Ropa.find({ categoria });

        if (ropa.length > 0) {
            res.status(200).json({ msg: `Estas son las prendas de ropa de la categoria ${categoria} disponibles:`, data: ropa });
        } else {
            res.status(404).json({ msg: `No se encontraron prendas de ropa en la categoria ${categoria}.`, data:{} });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al filtrar prendas de ropa por categoria.", data: {} });
    }
};

async function deleteRopaById(req, res) {
    const { id } = req.params;

    try {
        const ropa = await Ropa.findByIdAndDelete(id);

        if (ropa) {
            res.status(200).json({ msg: `La camiseta ${ropa.prenda} ha sido borrada por ID.`, data: ropa });
        } else {
            res.status(404).json({ msg: `No se pudo borrar la prenda de ropa con ID: ${id}.`, data: {} });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al querer borrar la prenda de ropa por ID.", data: {} });
    }
};

async function updateRopaById(req, res) {
    const { id } = req.params;
    const { prenda, precio, imagen_principal, imagen_secundaria, imagen_terciaria, imagen_cuartaria, temporada, color, genero, talle, unidades } = req.body;

    try {
        const updateRopa = await Ropa.findByIdAndUpdate(id, { prenda, precio, imagen_principal, imagen_secundaria, imagen_terciaria, imagen_cuartaria, temporada, color, genero, talle, unidades }, {new: true});

        if (updateRopa) {
            res.status(200).json({ msg: `Se actualizó la prenda de ropa: ${updateRopa.prenda}`, data: updateRopa });
        } else {
            res.status(404).json({ msg: "No se pudo actualizar la prenda de ropa.", data: {} });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al querer actualizar la prenda de ropa.", data: {} });
    }
};

module.exports = { addRopa, getRopa, getRopaById, getRopaPorColor, getRopaPorCategoria, deleteRopaById, updateRopaById };