//traigo el modulo 'dotenv' con método config para que app.js busque las variables de entorno
require('dotenv').config();

const express = require('express');
const mysql = require('mysql');

const app = express();

app.get('/', (req, res) => res.send('Hola mundo...'));

//variable de entorno para que pueda variar el puerto defecto en caso de que este ocupado
const puerto = 3000 || process.env.PUERTO;

app.listen(puerto, () => console.log(`Corriendo Servidor en puerto ${puerto}`));
