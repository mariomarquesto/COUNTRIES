const { Router } = require("express");

// Importar los enrutadores para las rutas de países y actividades
const countriesRouter = require('./countriesRouter.js');
const activitiesRouter = require('./activitiesRouter.js');

// Crear un enrutador principal que agrupa todas las rutas
const router = Router();

// Usar el enrutador de países para todas las rutas que comiencen con '/countries'
router.use('/countries', countriesRouter);

// Usar el enrutador de actividades para todas las rutas que comiencen con '/activities'
router.use('/activities', activitiesRouter);

// Exportar el enrutador principal para su uso en la aplicación
module.exports = router;
