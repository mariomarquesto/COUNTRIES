const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'country',
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      Imagendelabandera: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      Continente: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      Capital: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      Subregión: {
        type: DataTypes.STRING,
      },

      Área: {
        type: DataTypes.FLOAT,
      },

      Población: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      timetamps:true,
    }
  );
};
