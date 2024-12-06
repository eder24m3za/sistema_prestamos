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
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    archivo_url: { 
      type: DataTypes.STRING,
      allowNull: true,
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
  });
  return Documentacion;
};