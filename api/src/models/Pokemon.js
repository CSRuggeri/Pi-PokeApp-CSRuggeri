const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    img: {
      defaultValue: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/578.gif',
      type: DataTypes.STRING,
      allowNull: true,
    },
    health: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    attack: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    defense: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    speed: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    height: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    weight: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
   
  }, { timestamps: false });
};