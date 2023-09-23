const { Router } = require("express");
const {
  getActivities,
  postActivities,
} = require("../handlers/activitiesHandler");

// Crear un enrutador para las rutas relacionadas con las actividades
const activitiesRouter = Router();

// Definir una ruta POST que se manejará en el controlador 'postActivities'
activitiesRouter.post("/", postActivities);

// Definir una ruta GET que se manejará en el controlador 'getActivities'
activitiesRouter.get("/", getActivities);

// Exportar el enrutador para su uso en otras partes de la aplicación
module.exports = activitiesRouter;
