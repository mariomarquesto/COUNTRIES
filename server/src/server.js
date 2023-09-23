// Importar los módulos y paquetes necesarios
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js"); // Importar las rutas de la aplicación
require("./db.js"); // Importar la configuración de la base de datos

// Crear una instancia de Express
const server = express();

// Definir el nombre de la aplicación
server.name = "API";

// Configurar middlewares y opciones de la aplicación
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

// Configurar encabezados CORS para permitir solicitudes desde cualquier origen
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Permitir cualquier origen (se puede personalizar)
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Configurar las rutas de la aplicación
server.use("/", routes);

// Middleware para capturar errores
server.use((err, req, res, next) => {
  const status = err.status || 500; // Obtener el código de estado del error o usar 500 (error interno del servidor) por defecto
  const message = err.message || err; // Obtener el mensaje de error o usar el propio error como mensaje
  console.error(err);
  res.status(status).send(message); // Responder con el código de estado y el mensaje de error
});

// Exportar la instancia de Express como el servidor de la aplicación
module.exports = server;
