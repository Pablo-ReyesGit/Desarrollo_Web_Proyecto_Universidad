const db = require("../models");
const Nota = db.notas;
const Curso_Inscripcion = db.inscripciones;
const Estudiante = db.estudiantes;
const Curso = db.cursos;
const Materia = db.materias;

// Create
exports.create = async (req, res) => {
  try {
    const nombre_materia = req.body?.nombre_materia?.toString().trim();
    const carnet_estudiante = req.body?.carnet_estudiante?.toString().trim();
    const periodo = req.body?.periodo?.toString().trim();

    const missing = [];
    if (!nombre_materia) missing.push("nombre_materia");
    if (!carnet_estudiante) missing.push("carnet_estudiante");
    if (!periodo) missing.push("periodo");
    if (missing.length) {
      return res.status(400).json({
        message: `Faltan campos requeridos: ${missing.join(", ")}`,
        details: { nombre_materia, carnet_estudiante, periodo }
      });
    }

    const estudiante = await Estudiante.findOne({
      where: { carnet: carnet_estudiante },
      attributes: ["id"]
    });
    if (!estudiante) return res.status(404).json({ message: "Estudiante no encontrado." });

    const materia = await Materia.findOne({
      where: { nombre: nombre_materia },
      attributes: ["id"]
    });
    if (!materia) return res.status(404).json({ message: "Materia no encontrada." });

    const curso = await Curso.findOne({
      where: { id_materia: materia.id, periodo },
      attributes: ["id"]
    });
    if (!curso) return res.status(404).json({ message: "Curso no encontrado en ese periodo." });

    const inscripcion = await Curso_Inscripcion.findOne({
      where: { id_estudiante: estudiante.id, id_curso: curso.id },
      attributes: ["id"]
    });
    if (!inscripcion) {
      return res.status(404).json({ message: "El estudiante no está inscrito en este curso." });
    }

    const nota = await Nota.create({
      id_estudiante: estudiante.id,
      id_curso: curso.id,
      primer_parcial: req.body.primer_parcial ?? 0,
      segundo_parcial: req.body.segundo_parcial ?? 0,
      parcial_final: req.body.parcial_final ?? 0,
      actividades: req.body.actividades ?? 0
    });

    return res.status(201).json(nota);
  } catch (err) {
    return res.status(500).json({ message: err.message || "Error al crear la nota." });
  }
};

// List all
exports.findAll = async (req, res) => {
  try {
    const data = await Nota.findAll({
      include: [
        { model: Estudiante, attributes: ["id", "carnet", "fullname"] },
        {
          model: Curso,
          attributes: ["id", "periodo"],
          include: [{ model: Materia, attributes: ["id", "nombre"] }]
        }
      ],
      order: [["id", "ASC"]]
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Find one
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const nombre_materia = req.query?.nombre_materia?.toString().trim();
    const carnet_estudiante = req.query?.carnet_estudiante?.toString().trim();
    const periodo = req.query?.periodo?.toString().trim();

    if (id) {
      const nota = await Nota.findByPk(id, {
        include: [
          { model: Estudiante, attributes: ["id", "carnet", "fullname"] },
          {
            model: Curso,
            attributes: ["id", "periodo"],
            include: [{ model: Materia, attributes: ["id", "nombre"] }]
          }
        ]
      });
      if (!nota) return res.status(404).send({ message: "Nota no encontrada" });
      return res.send(nota);
    }

    const missing = [];
    if (!nombre_materia) missing.push("nombre_materia");
    if (!carnet_estudiante) missing.push("carnet_estudiante");
    if (!periodo) missing.push("periodo");
    if (missing.length) {
      return res.status(400).json({
        message: `Debe enviar id en la ruta o los parámetros: ${missing.join(", ")}`
      });
    }

    const estudiante = await Estudiante.findOne({
      where: { carnet: carnet_estudiante },
      attributes: ["id"]
    });
    if (!estudiante) return res.status(404).json({ message: "Estudiante no encontrado." });

    const materia = await Materia.findOne({
      where: { nombre: nombre_materia },
      attributes: ["id"]
    });
    if (!materia) return res.status(404).json({ message: "Materia no encontrada." });

    const curso = await Curso.findOne({
      where: { id_materia: materia.id, periodo },
      attributes: ["id"]
    });
    if (!curso) return res.status(404).json({ message: "Curso no encontrado en ese periodo." });

    const nota = await Nota.findOne({
      where: { id_estudiante: estudiante.id, id_curso: curso.id },
      include: [
        { model: Estudiante, attributes: ["id", "carnet", "fullname"] },
        {
          model: Curso,
          attributes: ["id", "periodo"],
          include: [{ model: Materia, attributes: ["id", "nombre"] }]
        }
      ]
    });

    if (!nota) return res.status(404).send({ message: "Notas no encontradas" });
    return res.send(nota);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).send({ message: "Debe enviar id." });

    const cambios = {};

    if (req.body.nombre_materia || req.body.periodo) {
      const nombre_materia = req.body?.nombre_materia?.toString().trim();
      const periodo = req.body?.periodo?.toString().trim();
      if (!nombre_materia || !periodo) {
        return res.status(400).json({ message: "Se requiere nombre_materia y periodo para cambiar el curso." });
      }
      const materia = await Materia.findOne({ where: { nombre: nombre_materia }, attributes: ["id"] });
      if (!materia) return res.status(404).json({ message: "Materia no encontrada." });
      const curso = await Curso.findOne({
        where: { id_materia: materia.id, periodo },
        attributes: ["id"]
      });
      if (!curso) return res.status(404).json({ message: "Curso no encontrado en ese periodo." });
      cambios.id_curso = curso.id;
    }

    if (req.body.carnet_estudiante) {
      const estudiante = await Estudiante.findOne({
        where: { carnet: req.body.carnet_estudiante.toString().trim() },
        attributes: ["id"]
      });
      if (!estudiante) return res.status(404).json({ message: "Estudiante no encontrado." });
      cambios.id_estudiante = estudiante.id;
    }

    if (req.body.primer_parcial !== undefined) cambios.primer_parcial = req.body.primer_parcial;
    if (req.body.segundo_parcial !== undefined) cambios.segundo_parcial = req.body.segundo_parcial;
    if (req.body.parcial_final !== undefined) cambios.parcial_final = req.body.parcial_final;
    if (req.body.actividades !== undefined) cambios.actividades = req.body.actividades;

    if (Object.keys(cambios).length === 0) {
      return res.status(400).json({ message: "No se enviaron campos para actualizar." });
    }

    const [updated] = await Nota.update(cambios, { where: { id } });
    if (updated !== 1) {
      return res.status(404).json({ message: `No se encontró nota con id=${id}.` });
    }

    const notaActualizada = await Nota.findByPk(id, {
      include: [
        { model: Estudiante, attributes: ["id", "carnet", "fullname"] },
        {
          model: Curso,
          attributes: ["id", "periodo"],
          include: [{ model: Materia, attributes: ["id", "nombre"] }]
        }
      ]
    });

    return res.send({ message: "Nota actualizada correctamente.", nota: notaActualizada });
  } catch (err) {
    res.status(500).send({
      message: "Error al actualizar nota con id=" + req.params.id,
      error: err.message
    });
  }
};

// Delete
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const num = await Nota.destroy({ where: { id } });
    if (num === 1) return res.send({ message: "Nota borrada con éxito!" });
    return res.status(404).send({ message: `No se pudo borrar nota con id=${id}. No se encontró la nota!` });
  } catch (err) {
    res.status(500).send({ message: "No se pudo borrar nota con id=" + req.params.id });
  }
};
