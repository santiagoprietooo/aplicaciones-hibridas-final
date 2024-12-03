const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv/config')

const port = process.env.PORT;
const uribd = process.env.URI_BD;

console.log(uribd);

const routerAPI = require('./routes/index');
const app = express();
app.use(cors());

mongoose.connect(uribd, {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error de conexión de MongoDB"));
db.once('open', () => {
    console.log("Conexión exitosa a MongoDB");
});

app.use(express.json()); 
app.get('/', (req, res) => {
    res.status(200).send('<h1> CAMISETAS </h1>');
});

routerAPI(app);

app.listen(port, () => { 
    console.log(`Servidor en el puerto ${port}`);
});