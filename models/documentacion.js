'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Documentacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Documentacion.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario'
      });
    }
  }
  Documentacion.init({
    id_d: {
      type: DataTypes.INTEGER, // Tipo de dato para la clave primaria
      primaryKey: true,        // Indicar que es la clave primaria
      autoIncrement: true      // Si quieres que sea autoincrementable
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, ingrese una descripción'
        }, len: [
          2, 250
        ]
      }
    }, 
    archivo_url: { 
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        customValidator(value) {
          const regex = /^http:\/\/localhost:\d+\/files\//;
          if (value && !regex.test(value)) {
            throw new Error('Por favor, ingrese una URL válida');
          }
        }
      }
    },
    usuario_id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id_u'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },

    fecha_subida: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, 
    },

    estado: { 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, 
    }
  }, {
    sequelize,
    modelName: 'Documentacion',
    tableName: 'documentaciones',
  });
  return Documentacion;
};