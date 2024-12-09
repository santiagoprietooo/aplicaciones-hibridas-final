const Admin = require('../models/adminSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = "admin";
const salt = 10;

async function createAdmin(req, res) {
    try {
        const { email, password } = req.body;
        const passwordHash = await bcrypt.hash(password, salt);
        
        if( !email || !password ) {
            res.status(401).json({ msg : "Faltan parámetros.", data : {} });
        } else {
            const newAdmin = new Admin ({
                email: email,
                password: passwordHash
            });

            await newAdmin.save();
    
            res.status(200).json({ msg: 'Admin Creado', data: newAdmin});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error al crear el usuario.', data: {}});
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({ msg: "El email no existe o no es válido.", data: {} });
        }

        const passwordOk = await bcrypt.compare(password, admin.password);
        if (!passwordOk) {
            return res.status(401).json({ msg: "La contraseña es incorrecta.", data: {} });
        }

        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            secretKey,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            msg: "¡Se inició sesión en el rol de administrador con éxito!",
            admin: { id: admin._id, email: email },
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: error.message, data: [] });
    }
}

module.exports = { createAdmin, login };