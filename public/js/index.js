const socket = io()
const express = require('express');
const router = express.Router();
const realTimeProductsRouter = require('./realTimeProductsRouter');

socket.on("Wellcome", (data)=>{
    console.log(data)
})

socket.on("message-all", (data)=>{
    render(data)
})

router.get('/', (req, res) => {
  // Obtén la lista de productos (reemplaza esto con tu lógica para obtener los productos)
  const products = obtenerProductos();

  // Renderiza la vista "realTimeProducts" y pasa la lista de productos como contexto
  res.render('realTimeProducts', { products });
});

app.use('/realtimeproducts', realTimeProductsRouter);

function render(data){
    const html = data.map(elem=>{
        return (`
        <div>
            <strong> ${elem.author} </strong> dice <em> ${elem.text} </em>
        </div>
    `) 
}).join(" ")

document.getElementById("caja").innerHTML = html

function addmessage(){
    const mensaje = {
        author: document.getElementById("username").value,
        text: document.getElementById("texto").value
    }
    socket.emit("new-message", mensaje)
    console.log(mensaje)
    return false
    }
}