const fs = require('fs');
const { Country } = require('../../api/db.json');

const getApiData = async () => {
  try {
    // Leer el contenido del archivo JSON
    const rawData = fs.readFileSync('db.json', 'utf8');
    const countries = JSON.parse(rawData);

    // Utilizar map para procesar cada país
    const countriesToInsert = countries.map((country) => {
      return {
        id: country.cca3,
        Nombre: country.name.common,
        Imagendelabandera: country.flags.png,
        Continente: country.continents?.[0],
        Capital: country.capital ? country.capital[0] : 'no tiene capital',
        Subregión: country.subregion ? country.subregion : 'no tiene subregión',
        Área: country.area,
        Población: country.population,
        createdAt:toPostgresTimestamp(new Date()),
        updatedAt: toPostgresTimestamp(new Date()),
      };
    });

    // Verificar si los países ya existen en la base de datos antes de insertarlos
    const existingCountries = await Country.findAll({ where: { id: countriesToInsert.map((c) => c.id) } });

    // Filtrar los países que no existen en la base de datos
    const countriesToCreate = countriesToInsert.filter((country) =>
      !existingCountries.some((existingCountry) => existingCountry.id === country.id)
    );

    if (countriesToCreate.length > 0) {
      // Insertar los países que no existen en la base de datos
      await Country.bulkCreate(countriesToCreate);
      console.log('Datos del archivo JSON cargados en la base de datos');
    } else {
      console.log('Los datos del archivo JSON ya están en la base de datos');
    }
  } catch (error) {
    console.error('Error al obtener datos del archivo JSON:', error);
  }
};
function toPostgresTimestamp(date) {
  // Format the date into 'YYYY-MM-DD HH:mm:ssZ' format
  const formattedDate = date.toISOString().replace('T', ' ').substring(0, 19);
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const hours = Math.floor(Math.abs(offset) / 60).toString().padStart(2, '0');
  const minutes = (Math.abs(offset) % 60).toString().padStart(2, '0');

  return `${formattedDate}${sign}${hours}:${minutes}`;
}

module.exports = getApiData;
