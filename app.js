//traigo el modulo 'dotenv' con método config para que app.js busque las variables de entorno
require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors')

//variable de entorno para que pueda variar el puerto defecto en caso de que este ocupado
const puerto = 3000 || process.env.PUERTO;

app.listen(puerto, () => console.log(`Servidor ok!...puerto ${puerto}`));
//indico que voy utilizar json para las req
app.use(express.json());

//cors
app.use(cors())

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

//endpoints
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
  conexion.query(
    'SELECT * FROM tbl_articulos WHERE id = ?',
    [req.params.id],
    (error, data) => {
      if (error) {
        throw error;
      } else {
        res.send(data);
        //res.send(data[0].descripcion) // data[0] es porque tenemos un solo elemento
      }
    }
  );
});

//post
app.post('/articulos', (req, res) => {
  let data = {
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock,
  };
  const sql = 'INSERT INTO tbl_articulos SET ?';
  conexion.query(sql, data, function (error, resultados) {
    if (error) {
      throw error;
    } else {
      console.log('Articulo agregado ;)');
      res.send(resultados);
    }
  });
});

//put
//get id (capturamos un item) + post (enviamos datos y recibimos data)
app.put('/articulos/:id', (req, res) => {
  let id = req.params.id; //captura el articulo desde el params!!!
  let descripcion = req.body.descripcion;
  let precio = req.body.precio;
  let stock = req.body.stock;
  let sql =
    'UPDATE tbl_articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?';
  conexion.query(sql,[descripcion, precio, stock, id], function(error, resultados){
    if (error) {
      throw error;
    } else {
      console.log('Articulo actualizado :D');
      res.send(resultados);
    }
  })
});

//delete
app.delete('/articulos/:id', (req, res) => {
  conexion.query('DELETE FROM tbl_articulos WHERE id = ?', [req.params.id], function(error, resultados){
    if (error) {
      throw error;
    } else {
      console.log('Articulo eliminado x)');
      res.send(resultados);
    }
  })
})
