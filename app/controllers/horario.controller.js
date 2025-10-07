const db = require("../models");
const Horario = db.horarios;
const Curso = db.cursos;

// Create
exports.create = async (req, res) => {
  if (!req.body.dia_semana || !req.body.hora_inicio || !req.body.hora_fin || !req.body.aula || !req.body.periodo) {
    return res.status(400).send({ message: "Debe incluir todos los campos requeridos." });
  }

  // Buscar curso por nombre
  const curso = await Curso.findOne({
    where: { periodo: req.body.periodo },
    attributes: ["id"]
  });

  if (!curso) {
    return res.status(404).json({ message: "Curso no encontrado." });
  }

  const horario = {
    dia_semana: req.body.dia_semana,
    hora_inicio: req.body.hora_inicio,
    hora_fin: req.body.hora_fin,
    aula: req.body.aula,
    id_curso: curso.id
  };

  Horario.create(horario)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Retrieve all
exports.findAll = (req, res) => {
  Horario.findAll({
    include: [{ model: Curso, attributes: ["id", "periodo"] }] //nombre no existe directamente en la bd
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Find one by id
exports.findOne = (req, res) => {
  const id = req.params.id;
  if(!id){
    return res.status(400).send({ message: "Debe proporcionar el id del horario." });
  }
  Horario.findByPk(id, { include: [Curso] })
    .then(data => {
      if (!data) return res.status(404).send({ message: "No encontrado" });
      res.send(data);
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Update
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    if(!id){
      return res.status(400).send({ message: "Debe proporcionar el id del horario." });
    }
    const cambios = {};

    if (req.body.nombre_curso) {
      const curso = await Curso.findOne({
        where: { nombre: req.body.nombre_curso },
        attributes: ["id"]
      });
      if (!curso) return res.status(404).json({ message: "Curso no encontrado." });
      cambios.id_curso = curso.id;
    }

    if (req.body.dia_semana !== undefined) cambios.dia_semana = req.body.dia_semana;
    if (req.body.hora_inicio !== undefined) cambios.hora_inicio = req.body.hora_inicio;
    if (req.body.hora_fin !== undefined) cambios.hora_fin = req.body.hora_fin;
    if (req.body.aula !== undefined) cambios.aula = req.body.aula;

    if (Object.keys(cambios).length === 0) {
      return res.status(400).json({ message: "No se enviaron campos para actualizar." });
    }

    const [updated] = await Horario.update(cambios, { where: { id } });

    if (updated === 1) {
      const actualizado = await Horario.findByPk(id, { include: [Curso] });
      return res.send({ message: "Horario actualizado correctamente.", horario: actualizado });
    } else {
      return res.status(404).json({ message: `No se encontró horario con id=${id}.` });
    }
  } catch (err) {
    res.status(500).send({ message: "Error al actualizar horario", error: err.message });
  }
};

// Delete
exports.delete = (req, res) => {
  const id = req.params.id;
  if(!id){
    return res.status(400).send({ message: "Debe proporcionar el id del horario." });
  }
  Horario.destroy({ where: { id } })
    .then(num => {
      if (num === 1) res.send({ message: "Horario eliminado correctamente" });
      else res.send({ message: "No se encontró horario" });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};
