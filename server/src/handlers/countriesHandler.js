const { Op } = require("sequelize");
const { Country, Activity } = require("../db");
const getApiData = require("../controllers/getApiData");

// Controlador para obtener países
const getCountries = async (req, res) => {
  // Asegurarse de que los datos de la API estén actualizados en la base de datos
  await getApiData(Country);

  // Obtener el parámetro 'name' de la consulta
  const { name } = req.query;
  try {
    if (!name) {
      // Si no se proporciona un nombre, obtener todos los países con sus actividades
      const allCountries = await Country.findAll({
        include: Activity,
      });
      return res.status(200).json(allCountries);
    } else {
      // Si se proporciona un nombre, buscar países que coincidan parcialmente con el nombre
      const country = await Country.findAll({
        where: { Nombre: { [Op.iLike]: `%${name}%` } },
      });
      if (!country)
        return res
          .status(404)
          .json({ error: "No se encontró el país o no existe" });
      return res.status(200).json(country);
    }
  } catch (error) {
    // Manejar errores y devolver una respuesta de error
    res.status(400).json({ error: error.message });
  }
};

// Controlador para obtener un país por ID
const getCountriesById = async (req, res) => {
  // Obtener el parámetro 'id' de la URL
  const { id } = req.params;
  try {
    // Convertir el ID a mayúsculas para garantizar la coincidencia
    const idCountry = id.toUpperCase();

    // Buscar un país por su ID e incluir sus actividades
    const country = await Country.findOne({
      where: { id: idCountry },
      include: Activity,
    });

    if (country) {
      // Si se encuentra el país, devolverlo en formato JSON
      return res.status(200).json(country);
    } else {
      // Si no se encuentra el país, devolver un mensaje de error
      return res.status(404).send("No existe país con ese id");
    }
  } catch (error) {
    // Manejar errores y devolver una respuesta de error
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCountries,
  getCountriesById,
};
