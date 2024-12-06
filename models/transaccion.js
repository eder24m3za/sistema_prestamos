'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaccion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaccion.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario'
      });

      Transaccion.belongsTo(models.Solicitud, {
        foreignKey: 'solicitud_id',
        as: 'solicitud'
      });
    }
  }
  Transaccion.init({
    solicutud_presta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Solicitud',
        key: 'id_s'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      validate: {
        notNull: {
          msg: 'Por favor, ingrese el id de la solicitud'
        }
    }
  },
    monto: { 
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, ingrese un monto'
        }, isDecimal: true
      }
    },
    fecha_transaccion: { type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, ingrese una descripción'
        }, len: [
          5, 250
        ]
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
      onUpdate: 'CASCADE',
      validate: {
        notNull: {
          msg: 'Por favor, ingrese el id del usuario'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Transaccion',
  });
  return Transaccion;
};