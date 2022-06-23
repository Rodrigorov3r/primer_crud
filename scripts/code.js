//definición de variables
const url = 'http://localhost:3000/articulos/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalArticulos = new bootstrap.Modal(
  document.getElementById('modalArticulo')
);

const formulario = document.getElementById('super-form');
//inputs modal
const descripcion = document.getElementById('descripcion');
const precio = document.getElementById('precio');
const stock = document.getElementById('stock');

//opcion para if en crear o editar
let opcion = '';

//botón crear
btnCrear.addEventListener('click', () => {
  descripcion.value = '';
  precio.value = '';
  stock.value = '';
  opcion = 'crear';
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
  //ese objeto/promesa lo meto en mi variable data para poder manipularlo
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

let formId = 0;
//modal con datos de producto
on(document, 'click', '.btnEditar', (e) => {
  const row = e.target.parentNode.parentNode;
  formId = row.children[0].innerHTML;

  //capturo datos
  const formDescripcion = row.children[1].innerHTML;
  const formPrecio = row.children[2].innerHTML;
  const formStock = row.children[3].innerHTML;

  //se los paso al form
  descripcion.value = formDescripcion;
  precio.value = formPrecio;
  stock.value = formStock;

  opcion = 'editar';

  //disparo el modal con los datos
  modalArticulos.show();
});

//crear y editar
formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  if (opcion == 'crear') {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        descripcion: descripcion.value,
        precio: precio.value,
        stock: stock.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const nuevoArticulo = [];
        //meto data en mi array vacío
        nuevoArticulo.push(data);

        //y con la func lo agrego al front
        mostrarData(nuevoArticulo);
      });
  }
  if (opcion == 'editar') {
    fetch(url + formId, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        descripcion: descripcion.value,
        precio: precio.value,
        stock: stock.value,
      }),
    })
      .then((response) => response.json())
      .then((response) => location.reload());
  }
  modalArticulos.hide();
});
