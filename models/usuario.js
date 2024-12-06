'use strict';
const bcrypt = require('bcrypt');
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
    id_u: {
      type: DataTypes.INTEGER, // Tipo de dato para la clave primaria
      primaryKey: true,        // Indicar que es la clave primaria
      autoIncrement: true      // Si quieres que sea autoincrementable
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, ingrese su nombre',
        },
        len: {
          args: [3, 50],
          msg: 'El nombre debe tener entre 3 y 50 caracteres',
        },
      },
    },

    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, ingrese un correo electrónico',
        },
        isEmail: {
          msg: 'Ingrese un correo electrónico válido',
        },
        len: {
          args: [5, 250],
          msg: 'El correo debe tener entre 5 y 250 caracteres',
        },
      },
    },

    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, ingrese una contraseña',
        },
        len: {
          args: [8],
          msg: 'La contraseña debe tener al menos 8 caracteres',
        },
      },
    },

    tel: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isNumeric: {
          msg: 'El número de teléfono solo debe contener números',
        },
        len: {
          args: [10, 15],
          msg: 'El número de teléfono debe tener entre 10 y 15 dígitos',
        },
      },
    },

    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [5, 250],
          msg: 'La dirección debe tener entre 5 y 250 caracteres',
        },
      },
    },

    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: {
          msg: 'Ingrese una fecha de nacimiento válida',
        },
      },
    },

    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: {
          msg: 'Ingrese una fecha de registro válida',
        },
      },
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
      validate: {
        notNull: {
          msg: 'Por favor, seleccione un rol válido',
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
  });

  Usuario.beforeSave(async (usuario) => {
    if (usuario.changed('contraseña')) {
      const salt = await bcrypt.genSalt(10); // Genera el salt
      usuario.contraseña = await bcrypt.hash(usuario.contraseña, salt); // Hashea la contraseña
    }
  });

  return Usuario;
};