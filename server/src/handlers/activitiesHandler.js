const { Country, Activity } = require("../db");

// Obtener todas las actividades
const getActivities = async (req, res) => {
  try {
    const allActivities = await Activity.findAll();
    
    // Verificar si no hay actividades y responder con un mensaje apropiado
    if (!allActivities.length) {
      res.status(200).send("No hay actividades aún");
    } else {
      // Enviar todas las actividades en formato JSON si existen
      res.status(200).json(allActivities);
    }
  } catch (error) {
    // Capturar cualquier error y responder con un mensaje de error
    res.status(400).json({ error: error.message });
  }
};

// Crear una nueva actividad
const postActivities = async (req, res) => {
  const { id, Nombre, Dificultad, Duración, Temporada, countries } = req.body;

  try {
    // Crear una nueva actividad en la base de datos
    const activity = await Activity.create({
      id,
      Nombre,
      Dificultad,
      Duración,
      Temporada,
    });

    // Buscar los países relacionados con la actividad
    const activitiesToAdd = await Country.findAll({
      where: { Nombre: countries },
    });

    // Asociar los países encontrados con la actividad
    await activity.addCountry(activitiesToAdd);

    // Responder con un mensaje de éxito
    res.status(200).send("Posteo exitoso");
  } catch (error) {
    // Capturar cualquier error y responder con un mensaje de error
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getActivities,
  postActivities,
};
