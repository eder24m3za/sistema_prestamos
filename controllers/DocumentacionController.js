const { Documentacion } = require('../models');
const multer = require('multer');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

// Configuración de Multer para almacenar archivos PDF
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files/'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    // Definir el nombre del archivo (asegurarse de que sea único)
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único con la extensión del archivo
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.pdf') {
      return cb(new Error('Solo se permiten archivos PDF'), false);
    }
    cb(null, true);
  }
}).single('archivo_pdf'); // El campo de FormData debe ser 'archivo_pdf'

module.exports = {
    createDocumentacion: async (req, res) => {
        upload(req, res, async (err) => {
          if (err) {
            return res.status(400).json({
              message: err.message || 'Error al cargar el archivo',
            });
          }
    
          try {
            // Obtener la URL del archivo cargado
            const archivoUrl = req.file ? `http://localhost:3000/files/${req.file.filename}` : null;
            console.log(archivoUrl);
    
            // Crear la documentación con la URL del archivo PDF
            const documentacion = await Documentacion.create({
              ...req.body,
              archivo_url: archivoUrl, // Guardar la URL en la base de datos
            });
    
            res.status(201).send({ data: documentacion });
          } catch (error) {
            if (error.name === 'SequelizeValidationError') {
              return res.status(400).json({
                message: 'Validation error',
                errors: error.errors.map(err => err.message)
              });
            }
    
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to create the documentacion' });
          }
        });
      },

    getDocumentacion: async (req, res) => {
        try {
            const documentacion = await Documentacion.findByPk(req.params.id);
            res.status(200).send({data: documentacion});
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to get the documentacion' });
        }
    },

    getDocumentaciones: async (req, res) => {
        try {
            const documentaciones = await Documentacion.findAll();
            res.status(200).send({data: [documentaciones]});
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to get the documentaciones' });
        }
    },
};