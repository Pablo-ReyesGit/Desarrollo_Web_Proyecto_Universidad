// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");
const Carrera = db.carreras;
const Op = db.Sequelize.Op;

// Create and Save a new Carrera
exports.create = (req, res) => {
  if (!req.body.nombre || !req.body.facultad || !req.body.duracion) {
    return res.status(400).send({ message: "Debe incluir todos los detalles necesarios." });
  }

  const carrera = {
    nombre: req.body.nombre,
    facultad: req.body.facultad,
    duracion: req.body.duracion,
  };

  Carrera.create(carrera)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({ message: err.message || "Error al crear la carrera." });
    });
};

// Retrieve all Carreras
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  Carrera.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al recuperar carreras."
      });
    });
};

// Find a single Carrera with id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const carrera = await Carrera.findByPk(id);
    if (!carrera) {
      return res.status(404).send({ message: "Carrera no encontrada" });
    }

    res.send(carrera);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update a Carrera by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Carrera.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Carrera actualizada correctamente." });
      } else {
        res.send({ message: `No se pudo actualizar carrera con id=${id}.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error al actualizar carrera con id=" + id });
    });
};

// Delete a Carrera with the specified id
exports.delete = (req, res) => {
  const id = req.params.id;
  Carrera.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Carrera eliminada correctamente!" });
      } else {
        res.send({ message: `No se pudo eliminar carrera con id=${id}.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "No se pudo eliminar carrera con id=" + id });
    });
};

// Delete all Carreras
exports.deleteAll = (req, res) => {
  Carrera.destroy({ where: {}, truncate: false })
    .then(nums => {
      res.send({ message: `${nums} carreras eliminadas correctamente!` });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Ocurrió un error al eliminar todas las carreras." });
    });
};

// Find all active Carreras
exports.findAllStatus = (req, res) => {
  Carrera.findAll({ where: { status: true } })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al recuperar carreras activas."
      });
    }); 
};
