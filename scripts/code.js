
//definición de variables
const url = 'http://localhost:3000/articulos/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalArticulos = new bootstrap.Modal(
  document.getElementById('modalArticulo')
);

const formulario = document.querySelector('form');
//inputs modal
const descripcion = document.getElementById('descripcion');
const precio = document.getElementById('precio');
const stock = document.getElementById('stock');

//crear o editar
const opcion = '';

//botón crear
btnCrear.addEventListener('click', () => {
  console.log('lalala');
  descripcion.value = '';
  precio.value = '';
  stock.value = '';
  modalArticulos.show();
});

//función mostrarData
const mostrarData = (articulos) => {
  articulos.forEach((articulo) => {
    resultados += `      <tr>
        <td>${articulo.id}</td>
        <td>${articulo.descripcion}</td>
        <td>${articulo.precio}</td>
        <td>${articulo.stock}</td>
        <button type="button" class="btn btn-success">
          Success
        </button>
        <button type="button" class="btn btn-danger">
          Danger
        </button>
      </tr>`;
  });
  contenedor.innerHTML = resultados;
};

//traer datos
fetch(url)
  .then((response) => response.json())
  .then((data) => mostrarData(data))
  .catch((error) => console.log(error));
