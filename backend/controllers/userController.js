const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = "admin";
const salt = 10;

async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;
        const passwordHash = await bcrypt.hash(password, salt);
        
        console.log(passwordHash);
        
        if(!name || !email || !password) {
            res.status(401).json({ msg : "Faltan parámetros.", data : {} });
        } else {
            const newUser = new User ({
                name: name,
                email: email,
                password: passwordHash
            });

            await newUser.save();
    
            res.status(200).json({ msg: 'Usuario Creado', data: newUser});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error al crear el usuario.', data: {}});
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user){
            res.status(401).json({ msg : "El email no existe o no es válido.", data : {} });
        }

        const passwordOk = await bcrypt.compare( password, user.password );

        if(!passwordOk){
            res.status(401).json({ msg : "La contraseña es incorrecta.", data : {} });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: "1h" });
        res.status(200).json({ msg: "Se inició sesión con éxito", user : {id: user._id, name: user.name, email: email}, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error, data: [] });
    }
}

async function getUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).json({ msg: 'Estos son los usuarios en nuestra base de datos:', data: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error, data: [] });
    }
    
}

async function getUsersById(req, res) {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if(user){
            res.status(200).json({ msg: "Se encontró al usuario por ID.", data: user});
        } else {
            res.status(404).json({ msg: "No se encontro el usuario por ID.", data: { }});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error al buscar al usuario por ID.', data: {}})
    }
}

async function deleteUserById(req, res) {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if(user){
            res.status(200).json({ msg: "Se borró al usuario correctamente.", data: user});
        } else {
            res.status(404).json({ msg: "No se encontro el usuario.", data: { }});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error al querer borrar el usuario.', data: {}})
    }
}

async function updateUserById(req, res) {
    const { id } = req.params;
    const { name, email, password} = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, salt);
        const user = await User.findByIdAndUpdate(id, { name, email, password: passwordHash }, {new: true});

        if(user){
            res.status(200).json({ msg: "Se actualizó al usuario correctamente.", data: user});
        } else {
            res.status(404).json({ msg: "Hubo un error al actualizar al usuario.", data: { }});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error al querer actualizar el usuario.', data: {}})
    }
}

module.exports = { createUser, login, getUsers, getUsersById, deleteUserById, updateUserById };