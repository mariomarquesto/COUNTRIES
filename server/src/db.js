const { Sequelize } = require("sequelize");

const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize({
  database: "countries", // Nombre  de datos
  username: "postgres",  //  usuario
  password: "mario123",  //  contraseña
  host: "localhost",     // Host de la base de datos
  dialect: "postgres",   // Tipo de base de datos 
  port: 5433,
  logging: false,        
});

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Activity, Country } = sequelize.models;

// Definir relaciones aquí
Country.belongsToMany(Activity, {
  through: 'ActivityCountry',
  timestamps: false,
});
Activity.belongsToMany(Country, {
  through: 'ActivityCountry',
  timestamps: false,
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};