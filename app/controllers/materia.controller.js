// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");
const Materia = db.materias;
const Carrera = db.carreras;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

// Create and Save a new Client
exports.create = async (req, res) => {
    if (!req.body.nombre || !req.body.nombre_carrera) {
        return res.status(400).send({ message: "debe incluir todos los detalles necesarios." });
    }

    const carrera = await Carrera.findOne({
      where: { nombre: req.body.nombre_carrera }, // 👈 asumiendo que el campo se llama "carnet"
      attributes: ["id"]
    });

    if (!carrera) {
      return res.status(404).json({ message: "Carrera no encontrado." });
    }

    const materia = {
        nombre: req.body.nombre,
        creditos: req.body.creditos,
        Semestre: req.body.Semestre,
        Obligacion: req.body.Obligacion,
        id_carrera: carrera.id
   };

    Materia.create(materia)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al crear el notificacion." });
        });
};

// Retrieve all Client from the database.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Materia.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {

    const nombre = req.params.nombre;

    if (!nombre) {
        console.warn("No se proporcionó nombre en la consulta");
        return res.status(400).send({
            message: "debe proporcionar el nombre de la materia."
        });
    }

    // Para Oracle: búsqueda insensible a mayúsculas
    var condition = sequelize.where(
        sequelize.fn("UPPER", sequelize.col("nombre")),
        { [Op.like]: `%${nombre.toUpperCase()}%` }
    );

    Materia.findOne({ where: condition })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: "Materia no encontrado con nombre " + nombre
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error ocurrido al obtener Materia."
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    // Creamos un objeto vacío para acumular los cambios
    const cambios = {};

    // Si viene un nuevo nombre de materia, buscarla y asignar su id
    if (req.body.nombre_carrera) {
      const carrera = await Carrera.findOne({
        where: { nombre: req.body.nombre_carrera },
        attributes: ["id"]
      });
      
      if (!carrera) {
        return res.status(404).json({ message: "Carrera no encontrada." });
      }
      cambios.id_carrera = carrera.id;
    }


    // Otros campos directos (solo si vienen en req.body)
    if (req.body.nombre !== undefined) cambios.nombre = req.body.nombre;
    if (req.body.creditos !== undefined) cambios.creditos = req.body.creditos;
    if (req.body.Semestre !== undefined) cambios.Semestre = req.body.Semestre;
    if (req.body.Obligacion !== undefined) cambios.Obligacion = req.body.Obligacion;

    // Si no hay nada para actualizar, devolvemos error
    if (Object.keys(cambios).length === 0) {
      return res.status(400).json({ message: "No se enviaron campos para actualizar." });
    }

    // Ejecutar actualización
    const [updated] = await Materia.update(cambios, { where: { id } });

    if (updated === 1) {
      const materiaActualizado = await Materia.findByPk(id, {
        include: [
          { model: Carrera, attributes: ["id", "nombre"] }
        ]
      });

      return res.send({
        message: "Materia actualizado correctamente.",
        materia: materiaActualizado
      });
    } else {
      return res.status(404).json({ message: `No se encontró materia con id=${id}.` });
    }

  } catch (err) {
    res.status(500).send({
      message: "Error al actualizar materia con id=" + req.params.id,
      error: err.message
    });
  }
};

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    // utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante where id = parametro que recibimos 
    Materia.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. El usuario no fue encontado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
    Materia.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} User were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
        });
};

// find all active Client, basado en el atributo status vamos a buscar que solo los clientes activos
exports.findAllStatus = (req, res) => {
    Materia.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving User."
            });
        }); 
};