'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Solicitud extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Solicitud.belongsToMany(models.Usuario, {
        through: 'UsuarioSolicitud', // Nombre de la tabla intermedia
        foreignKey: 'solicitud_id', // Clave foránea en UsuarioSolicitud
        otherKey: 'usuario_id', // Clave foránea que referencia a Usuario
        as: 'usuarios' // Alias para la relación
      });

      Solicitud.belongsToMany(models.Prestamo, {
        through: 'SolicitudPrestamo', // Nombre de la tabla intermedia
        foreignKey: 'solicitud_id', // Clave foránea en SolicitudPrestamo
        otherKey: 'prestamo_id', // Clave foránea que referencia a Prestamo
        as: 'prestamosSolicitud' // Alias para la relación
      });
    }
  }
  Solicitud.init({
    descripcion: { type: 
      DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, ingrese una descripción'
        }, len: [
          5, 250
        ]
      }
    }, 
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    monto_solicitado: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, ingrese un monto'
        }, isDecimal: true
      }
    }
  }, {
    sequelize,
    modelName: 'Solicitud',
  });
  return Solicitud;
};