'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.belongsTo(models.Prestamo, {
        foreignKey: 'prestamo',
        as: 'prestamoPayment'
      });
    }
  }
  Payment.init({
    id_pa: {
      type: DataTypes.INTEGER, // Tipo de dato para la clave primaria
      primaryKey: true,        // Indicar que es la clave primaria
      autoIncrement: true      // Si quieres que sea autoincrementable
    },
    prestamo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, ingrese el id del préstamo'
        },
        isInt: {
          msg: 'El id del préstamo debe ser un número entero'
        }
      }
    },
    monto: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, ingrese un monto'
        },
        isDecimal: {
          msg: 'El monto debe ser un número decimal válido'
        }
      }
    },
    fecha_pago: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, ingrese la fecha de pago'
        },
        isDate: {
          msg: 'La fecha de pago debe ser válida'
        }
      }
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    metodo_pago: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, ingrese el método de pago'
        },
        len: {
          args: [5, 250],
          msg: 'El método de pago debe tener entre 5 y 250 caracteres'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Payment',
    tableName: 'payments',
  });
  return Payment;
};