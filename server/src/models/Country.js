const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Define el modelo 'country' en la base de datos
  sequelize.define(
    'country',
    {
      // Campo 'id' que es una clave primaria de tipo cadena de texto (string)
      id: {
        type: DataTypes.STRING,
        allowNull: false, // No se permite un valor nulo para 'id'
        primaryKey: true, // Es una clave primaria
      },
      // Campo 'Nombre' de tipo cadena de texto (string)
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false, // No se permite un valor nulo para 'Nombre'
      },
      // Campo 'Imagendelabandera' de tipo cadena de texto (string)
      Imagendelabandera: {
        type: DataTypes.STRING,
        allowNull: false, // No se permite un valor nulo para 'Imagendelabandera'
      },
      // Campo 'Continente' de tipo cadena de texto (string)
      Continente: {
        type: DataTypes.STRING,
        allowNull: false, // No se permite un valor nulo para 'Continente'
      },
      // Campo 'Capital' de tipo cadena de texto (string)
      Capital: {
        type: DataTypes.STRING,
        allowNull: false, // No se permite un valor nulo para 'Capital'
      },
      // Campo 'Subregión' de tipo cadena de texto (string) que puede ser nulo
      Subregión: {
        type: DataTypes.STRING,
      },
      // Campo 'Área' de tipo número decimal (float)
      Área: {
        type: DataTypes.FLOAT,
      },
      // Campo 'Población' de tipo número decimal (float) que no permite un valor nulo
      Población: {
        type: DataTypes.FLOAT,
        allowNull: false, // No se permite un valor nulo para 'Población'
      },
    },
    {
      timetamps: true, // Se incluirán campos de registro de tiempo (createdAt y updatedAt)
    }
  );
};
