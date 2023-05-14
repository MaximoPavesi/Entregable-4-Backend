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

//Public
app.use(express.static(__dirname + "/public"))
server.listen(PORT,()=>{
    console.log("Server on port 8080")
})