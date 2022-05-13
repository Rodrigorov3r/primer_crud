//traigo el modulo 'dotenv' con método config para que app.js busque las variables de entorno
require('dotenv').config();

const express = require('express');
const { createConnection } = require('mysql');
const mysql = require('mysql');
const app = express();

//establezco los parametros de conexión db
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'articulosdb',
});

//probando la conexión a db
conexion.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log('conectaste la db :)');
  }
});

app.get('/', (req, res) => res.send('Hola mundo...'));

//get articulos
app.get('/articulos', (req, res) => {
  conexion.query('SELECT * FROM tbl_articulos', (error, data) => {
    if (error) {
      throw error;
    } else {
      res.send(data);
    }
  });
});

    //get un articulo
app.get('/articulos/:id', (req, res) => {
  conexion.query('SELECT * FROM tbl_articulos WHERE id = ?',[req.params.id] ,  (error, data) => {
    if (error) {
      throw error;
    } else {
      res.send(data);
      //res.send(data[0].descripcion) // data[0] es porque tenemos un solo elemento
    }
  });
});

//variable de entorno para que pueda variar el puerto defecto en caso de que este ocupado
const puerto = 3000 || process.env.PUERTO;

app.listen(puerto, () => console.log(`Servidor ok en puerto ${puerto}`));
