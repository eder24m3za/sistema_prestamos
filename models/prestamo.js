'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prestamo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Prestamo.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario'
      });

      Prestamo.belongsToMany(models.Solicitud, {
        through: 'SolicitudPrestamo', // Nombre de la tabla intermedia
        foreignKey: 'prestamo_id', // Clave foránea en SolicitudPrestamo
        otherKey: 'solicitud_id', // Clave foránea que referencia a Solicitud
        as: 'solicitudes' // Alias para la relación
      });

      Prestamo.hasMany(models.Payment, {
        foreignKey: 'prestamo',
        as: 'payments'
      });
    }
  }
  Prestamo.init({
    id_p: {
      type: DataTypes.INTEGER, // Tipo de dato para la clave primaria
      primaryKey: true,        // Indicar que es la clave primaria
      autoIncrement: true      // Si quieres que sea autoincrementable
    },
    monto: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, ingrese un monto'
        },
        isDecimal: {
          msg: 'El monto debe ser un número decimal'
        }
      }
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'La fecha de fin debe ser una fecha válida'
        }
      }
    },
    tasa_interes: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, ingrese una tasa de interés'
        },
        isDecimal: {
          msg: 'La tasa de interés debe ser un número decimal'
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
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Prestamo',
    tableName: 'prestamos'
  });
  return Prestamo;
};