const { Sequelize } = require("sequelize");

const fs = require('fs');
const path = require('path');

// Crear una instancia de Sequelize para establecer la conexión a la base de datos
const sequelize = new Sequelize({
  database: "countries", // Nombre de la base de datos
  username: "postgres",  // Nombre de usuario de la base de datos
  password: "mario123",  // Contraseña de la base de datos
  host: "localhost",     // Host de la base de datos
  dialect: "postgres",   // Tipo de base de datos (PostgreSQL en este caso)
  port: 5433,            // Puerto de la base de datos
  logging: false,        // Desactivar la salida de registros SQL en la consola
});

// Obtener el nombre del archivo actual
const basename = path.basename(__filename);
const modelDefiners = [];

// Leer los archivos de modelos en el directorio '/models' y cargarlos
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Ejecutar la función de cada modelo para definirlos en Sequelize
modelDefiners.forEach(model => model(sequelize));

// Convertir el nombre de los modelos a mayúsculas para convención
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Obtener los modelos definidos, como 'Activity' y 'Country'
const { Activity, Country } = sequelize.models;

// Definir relaciones entre modelos, en este caso, una relación muchos a muchos entre 'Country' y 'Activity'
Country.belongsToMany(Activity, {
  through: 'ActivityCountry', // Tabla intermedia que almacena las relaciones
  timestamps: false, // No utilizar marcas de tiempo en la tabla intermedia
});
Activity.belongsToMany(Country, {
  through: 'ActivityCountry', // Tabla intermedia que almacena las relaciones
  timestamps: false, // No utilizar marcas de tiempo en la tabla intermedia
});

// Exportar los modelos definidos y la instancia de Sequelize para su uso en la aplicación
module.exports = {
  ...sequelize.models, // Exportar todos los modelos
  conn: sequelize, // Exportar la instancia de Sequelize para realizar consultas y operaciones en la base de datos
};
