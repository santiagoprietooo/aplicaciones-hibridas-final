const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv/config');

const port = process.env.PORT;
const uribd = process.env.URI_BD;

console.log(uribd);

const routerAPI = require('./routes/index');
const app = express();

const allowedOrigins = [
    'https://aplicaciones-hibridas-final.vercel.app',
    'https://aplicaciones-hibridas-final-1zp7.vercel.app'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));

app.options('*', cors());

mongoose.connect(uribd, {})
    .then(() => {
        console.log("Conexión exitosa a MongoDB");
    })
    .catch(err => {
        console.error("Error de conexión de MongoDB", err);
    });

app.use(express.json()); 
app.get('/', (req, res) => {
    res.status(200).send('<h1> CAMISETAS </h1>');
});

routerAPI(app);

app.listen(port, () => { 
    console.log(`Servidor en el puerto ${port}`);
});