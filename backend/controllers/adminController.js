const Admin = require('../models/adminSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = "admin";
const salt = 10;

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        const passwordHash = await bcrypt.hash(password, salt);

        if(!admin){
            res.status(401).json({ msg : "El email no existe o no es válido.", data : {} });
        }

        const passwordOk = await bcrypt.compare( password, admin.password );
        if(!passwordOk){
            res.status(401).json({ msg : "La contraseña es incorrecta.", data : {} });
        }

        const token = jwt.sign({ id: admin._id, email: admin.email, password: passwordHash }, secretKey, { expiresIn: "1h" });
        res.status(200).json({ msg: "¡Se inició sesión en el rol de administrador con éxito!", admin : {id: admin._id, email: email}, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error, data: [] });
    }
}

module.exports = { login };