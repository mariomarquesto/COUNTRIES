const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Activity',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Dificultad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Duración: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Temporada: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
