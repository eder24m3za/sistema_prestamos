'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.belongsTo(models.Rol, { 
        foreignKey: 'rol_id',
        as: 'rol'
      });

      Usuario.hasMany(models.Documentacion, {
        foreignKey: 'usuario_id', 
        as: 'documentos'
      });

      Usuario.belongsToMany(models.Solicitud, {
        through: 'UsuarioSolicitud', // Nombre de la tabla intermedia
        foreignKey: 'usuario_id', // Clave foránea en UsuarioSolicitud
        otherKey: 'solicitud_id', // Clave foránea que referencia a Solicitud
        as: 'solicitudes' // Alias para la relación
      });

      Usuario.hasMany(models.Prestamo, {
        foreignKey: 'usuario_id',
        as: 'prestamos'
      });
    }
  }
  Usuario.init({
    nom: { type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, ingrese su nombre'
        }, len: [
          3, 50
        ]
      }
    },

    correo: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        isEmail: true, 
        len: [5, 250], 
      }
    },

    contraseña : {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notNull: {
          msg: 'Por favor, ingrese una contraseña'
        }, len: [8, 250]
      }
    },

    tel: {
      type: DataTypes.STRING,
      allowNull: true, 
      validate: {
        isNumeric: true, 
        len: [10, 15], 
      }
    },


    direccion: {
      type: DataTypes.STRING,
      allowNull: true, 
      validate: {
        len: [5, 250], 
      }
    },

    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: true, 
      validate: {
        isDate: true, 
      }
    },

    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false, 
      defaultValue: DataTypes.NOW, 
      validate: {
        isDate: true, 
      }
    },

    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false, 
      defaultValue: true, 
    },

    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: 'Rol', 
        key: 'id_r',
      },
    }
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};