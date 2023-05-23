//Creamos el servidor
const express = require("express")
const app = express()
//http import
const http = require("http")
const server = http.createServer(app)

const PORT = 8080 || process.env.PORT

//Views engine
const handlebars = require("express-handlebars")

//Import routes
const homeRouter = require("./router/home.router")

//Import socket
const {Server} = require("socket.io")
const io = new Server(server)

const products = "./products.json"


//Views
app.engine("handlebars", handlebars.engine())
app.set("views engine", "handlebars")
app.set("views", __dirname + "/views")

app.use("/home", homeRouter)

//Socket
io.on("connection", (socket) => {
    console.log("New user conected")
    socket.emit("Wellcome", "Hola bienvenido cliente")
    
    socket.on("new-message", (data)=>{
    console.log(data)
    messages.push(data)
    io.socket.emit("message-all", messages)
    }) 
})


// Ruta para la vista index.handlebars
app.get('/', (req, res) => {
    const products = obtenerProductos(); // Obtener la lista de productos desde donde sea que los almacenes
    res.render('index', { products });
});

// Ruta para la vista realTimeProducts.handlebars
app.get('/realtimeproducts', (req, res) => {
    const products = obtenerProductos(); // Obtener la lista de productos desde donde sea que los almacenes
    res.render('realTimeProducts', { products });
});

// Configurar la conexión WebSocket
io.on('connection', (socket) => {
    console.log('Cliente conectado');

    // Escuchar eventos de agregar productos
    socket.on('addProduct', (product) => {
        // Agregar el producto a la lista y emitir el evento a todos los clientes conectados
        agregarProducto(product);
        io.emit('productAdded', product);
    });

    // Escuchar eventos de eliminar productos
    socket.on('removeProduct', (product) => {
        // Eliminar el producto de la lista y emitir el evento a todos los clientes conectados
        eliminarProducto(product);
        io.emit('productRemoved', product);
    });

    // Manejar la desconexión del cliente
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

//Public
app.use(express.static(__dirname + "/public"))
server.listen(PORT,()=>{
    console.log("Server on port 8080")
})