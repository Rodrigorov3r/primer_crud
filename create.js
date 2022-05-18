const botonCrear = document.querySelector("#crear")
const tRow = document.querySelector("#t-row")
const form = document.querySelector("carga-producto")
const tdCodigo = document.querySelector("#codigo-producto")
codigo = tdCodigo.textContent
console.log(codigo)
botonCrear.addEventListener("click",function(event){
    event.preventDefault();
    console.log(1)
    console.log(codigo)
})
