const db = require("../models");
const EstudianteCarrera = db.estudiante_carreras;
const Estudiante = db.estudiantes;
const Carrera = db.carreras;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

// Create and Save a new EstudianteCarrera
exports.create = async (req, res) => {
  if (!req.body.carnet_estudiante || !req.body.nombre_carrera || !req.body.fecha_ingreso) {
    return res.status(400).send({ message: "Debe incluir carnet_estudiante, nombre_carrera y fecha_ingreso." });
  }

  // Buscar estudiante por carnet
  const estudiante = await Estudiante.findOne({
    where: { carnet: req.body.carnet_estudiante },
    attributes: ["id"]
  });

  if (!estudiante) {
    return res.status(404).json({ message: "Estudiante no encontrado." });
  }

  // Buscar carrera por nombre
  const carrera = await Carrera.findOne({
    where: { nombre: req.body.nombre_carrera },
    attributes: ["id"]
  });

  if (!carrera) {
    return res.status(404).json({ message: "Carrera no encontrada." });
  }

  const registro = {
    id_estudiante: estudiante.id,
    id_carrera: carrera.id,
    fecha_ingreso: req.body.fecha_ingreso,
    fecha_egreso: req.body.fecha_egreso,
    estado: req.body.estado
  };

  EstudianteCarrera.create(registro)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error al crear EstudianteCarrera." }));
};

// Retrieve all registros
exports.findAll = (req, res) => {
  EstudianteCarrera.findAll({
    include: [
      { model: Estudiante, attributes: ["id", "carnet", "nombre"] },
      { model: Carrera, attributes: ["id", "nombre"] }
    ]
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Find one by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  EstudianteCarrera.findByPk(id, {
    include: [Estudiante, Carrera]
  })
    .then(data => {
      if (!data) return res.status(404).send({ message: "No encontrado" });
      res.send(data);
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Update registro
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const cambios = {};

    if (req.body.carnet_estudiante) {
      const estudiante = await Estudiante.findOne({
        where: { carnet: req.body.carnet_estudiante },
        attributes: ["id"]
      });
      if (!estudiante) return res.status(404).json({ message: "Estudiante no encontrado." });
      cambios.id_estudiante = estudiante.id;
    }

    if (req.body.nombre_carrera) {
      const carrera = await Carrera.findOne({
        where: { nombre: req.body.nombre_carrera },
        attributes: ["id"]
      });
      if (!carrera) return res.status(404).json({ message: "Carrera no encontrada." });
      cambios.id_carrera = carrera.id;
    }

    if (req.body.fecha_ingreso !== undefined) cambios.fecha_ingreso = req.body.fecha_ingreso;
    if (req.body.fecha_egreso !== undefined) cambios.fecha_egreso = req.body.fecha_egreso;
    if (req.body.estado !== undefined) cambios.estado = req.body.estado;

    if (Object.keys(cambios).length === 0) {
      return res.status(400).json({ message: "No se enviaron campos para actualizar." });
    }

    const [updated] = await EstudianteCarrera.update(cambios, { where: { id } });

    if (updated === 1) {
      const actualizado = await EstudianteCarrera.findByPk(id, { include: [Estudiante, Carrera] });
      return res.send({ message: "EstudianteCarrera actualizado correctamente.", estudianteCarrera: actualizado });
    } else {
      return res.status(404).json({ message: `No se encontró registro con id=${id}.` });
    }
  } catch (err) {
    res.status(500).send({ message: "Error al actualizar EstudianteCarrera", error: err.message });
  }
};

// Delete registro
exports.delete = (req, res) => {
  const id = req.params.id;
  EstudianteCarrera.destroy({ where: { id } })
    .then(num => {
      if (num === 1) res.send({ message: "Eliminado correctamente" });
      else res.send({ message: "No se encontró registro" });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Delete all
exports.deleteAll = (req, res) => {
  EstudianteCarrera.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} registros eliminados.` }))
    .catch(err => res.status(500).send({ message: err.message }));
};
