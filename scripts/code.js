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
  descripcion.value = '';
  precio.value = '';
  stock.value = '';
  modalArticulos.show();
});

//función mostrarData
const mostrarData = (articulos) => {
  articulos.forEach((articulo) => {
    resultados += `
    <tr>
        <td>${articulo.id}</td>
        <td>${articulo.descripcion}</td>
        <td>${articulo.precio}</td>
        <td>${articulo.stock}</td>
        <td>
        <button type="button" class="btnEditar btn-success">
          Editar
        </button>
        <button type="button" class="btnBorrar btn-danger">
          Borrar
        </button>
        </td>
      </tr>`;
  });
  contenedor.innerHTML = resultados;
};

//traer datos
fetch(url)
  .then((response) => response.json())
  .then((data) => mostrarData(data))
  .catch((error) => console.log(error));

//botones
const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

//borrar
on(document, 'click', '.btnBorrar', (e) => {
  const row = e.target.parentNode.parentNode;
  const cap_id = row.firstElementChild.innerHTML;
  //console.log(cap_id);

  alertify.confirm(
    'Desea borrar el articulo ??',
    function () {
      fetch(url + cap_id, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then(() => location.reload());

      alertify.success('Eliminado');
    },
    function () {
      alertify.error('Cancelar');
    }
  );
});

//editar