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
        foreignKey: 'prestamo_id',
        as: 'prestamoPayment'
      });
    }
  }
  Payment.init({
    prestamo: { type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, ingrese el id del prestamo'
        }, isInt: true
      }
    },
    monto: { type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, ingrese un monto'
        }, isDecimal: true
      }
    },
    fecha_pago: { type: DataTypes.DATE,
      allowNull: false,
    },
    estado: { type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    metodo_pago: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, ingrese el metodo de pago'
        }, len: [
          5, 250
        ]
      }
    }
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};