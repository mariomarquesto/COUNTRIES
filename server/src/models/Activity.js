const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Define el modelo 'Activity' en la base de datos
  sequelize.define(
    'Activity',
    {
      // Campo 'id' que es una clave primaria autoincremental de tipo entero
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false, // No se permite un valor nulo para 'id'
        primaryKey: true, // Es una clave primaria
      },
      // Campo 'Nombre' de tipo cadena de texto (string)
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false, // No se permite un valor nulo para 'Nombre'
      },
      // Campo 'Dificultad' de tipo entero
      Dificultad: {
        type: DataTypes.INTEGER,
        allowNull: false, // No se permite un valor nulo para 'Dificultad'
      },
      // Campo 'Duración' de tipo entero
      Duración: {
        type: DataTypes.INTEGER,
        allowNull: false, // No se permite un valor nulo para 'Duración'
      },
      // Campo 'Temporada' de tipo cadena de texto (string)
      Temporada: {
        type: DataTypes.STRING,
        allowNull: false, // No se permite un valor nulo para 'Temporada'
      },
    },
    {
      timestamps: false, // No se incluirán campos de registro de tiempo (createdAt y updatedAt)
    }
  );
};
