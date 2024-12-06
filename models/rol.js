'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rol.hasMany(models.Usuario, { 
        foreignKey: 'rol_id', // Clave foránea en Usuario
        as: 'usuarios' // Alias para acceder a los usuarios asociados
      });
    }
  }
  Rol.init({
    id_r: {
      type: DataTypes.INTEGER, // Tipo de dato para la clave primaria
      primaryKey: true,        // Indicar que es la clave primaria
      autoIncrement: true      // Si quieres que sea autoincrementable
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, ingrese un tipo de rol',
        },
        notEmpty: {
          msg: 'El campo tipo de rol no puede estar vacío',
        },
        len: {
          args: [2, 250],
          msg: 'El tipo de rol debe tener entre 2 y 250 caracteres',
        },
      },
    }    
  }, {
    sequelize,
    modelName: 'Rol',
    tableName: 'roles',  
  });
  return Rol;
};