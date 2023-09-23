const { Router } = require("express");

// Crear un enrutador para las rutas relacionadas con los países
const countriesRouter = Router();

// Importar los controladores para manejar las rutas
const {
  getCountries,
  getCountriesById,
} = require("../handlers/countriesHandler");

// Definir una ruta GET para obtener todos los países, se manejará en el controlador 'getCountries'
countriesRouter.get("/", getCountries);

// Definir una ruta GET con un parámetro de ID para obtener un país específico por su ID,
// se manejará en el controlador 'getCountriesById'
countriesRouter.get("/:id", getCountriesById);

// Exportar el enrutador para su uso en otras partes de la aplicación
module.exports = countriesRouter;
