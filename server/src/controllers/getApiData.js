const fs = require("fs");
const path = require("path");

const getApiData = async (countryDb) => {
  try {
    // 1. Leer el contenido del archivo JSON
    const filePath = path.join(__dirname, "db.json"); // Ruta del archivo JSON
    const rawData = fs.readFileSync(filePath, "utf8"); // Leer el archivo
    const data = JSON.parse(rawData); // Parsear el contenido JSON

    // 2. Utilizar map para procesar cada país
    const countriesToInsert = data.countries.map((country) => {
      return {
        // Mapear los campos del país
        id: country.cca3, // ID del país
        Nombre: country.name.common, // Nombre del país
        Imagendelabandera: country.flags.png, // URL de la bandera del país
        Continente: country.continents?.[0], // Continente del país
        Capital: country.capital ? country.capital[0] : "no tiene capital", // Capital del país (si existe)
        Subregión: country.subregion ? country.subregion : "no tiene subregión", // Subregión del país (si existe)
        Área: country.area, // Área del país
        Población: country.population, // Población del país
        createdAt: toPostgresTimestamp(new Date()), // Fecha de creación (formateada)
        updatedAt: toPostgresTimestamp(new Date()), // Fecha de actualización (formateada)
      };
    });

    // 3. Verificar si los países ya existen en la base de datos antes de insertarlos
    const existingCountries = await countryDb.findAll({
      where: { id: countriesToInsert.map((c) => c.id) }, // Buscar los IDs en la base de datos
    });

    // 4. Filtrar los países que no existen en la base de datos
    const countriesToCreate = countriesToInsert.filter(
      (country) =>
        !existingCountries.some(
          (existingCountry) => existingCountry.id === country.id
        )
    );

    if (countriesToCreate.length > 0) {
      // 5. Insertar los países que no existen en la base de datos
      await countryDb.bulkCreate(countriesToCreate);
      console.log("Datos del archivo JSON cargados en la base de datos");
    } else {
      console.log("Los datos del archivo JSON ya están en la base de datos");
    }
  } catch (error) {
    // 6. Manejar errores
    console.error("Error al obtener datos del archivo JSON:", error);
  }
};

function toPostgresTimestamp(date) {
  // Función para formatear fechas en formato PostgreSQL
  const formattedDate = date.toISOString().replace("T", " ").substring(0, 19);
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const hours = Math.floor(Math.abs(offset) / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (Math.abs(offset) % 60).toString().padStart(2, "0");

  return `${formattedDate}${sign}${hours}:${minutes}`;
}

module.exports = getApiData;
