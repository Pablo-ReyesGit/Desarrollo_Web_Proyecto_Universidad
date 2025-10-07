const db = require("../models");
const EstudianteCarrera = db.estudiante_carreras;
const Estudiante = db.estudiantes;
const Carrera = db.carreras;

exports.create = async (req, res) => {
  try {
    if (!req.body.carnet_estudiante || !req.body.nombre_carrera || !req.body.fecha_ingreso) {
      return res.status(400).send({ message: "Debe incluir carnet_estudiante, nombre_carrera y fecha_ingreso." });
    }

    const estudiante = await Estudiante.findOne({
      where: { carnet: req.body.carnet_estudiante },
      attributes: ["id"]
    });
    if (!estudiante) {
      return res.status(404).json({ message: "Estudiante no encontrado." });
    }

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

    const data = await EstudianteCarrera.create(registro);
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || "Error al crear EstudianteCarrera." });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await EstudianteCarrera.findAll({
      include: [
        { model: Estudiante, attributes: ["id", "carnet", "nombre"] },
        { model: Carrera, attributes: ["id", "nombre"] }
      ],
      order: [["id", "ASC"]]
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    if(!id){
      return res.status(400).send({ message: "Debe incluir el id del registro a buscar." });
    }
    const data = await EstudianteCarrera.findByPk(id, {
      include: [
        { model: Estudiante, attributes: ["id", "carnet", "nombre"] },
        { model: Carrera, attributes: ["id", "nombre"] }
      ]
    });
    if (!data) return res.status(404).send({ message: "No encontrado" });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    if(!id){
      return res.status(400).send({ message: "Debe incluir el id del registro a actualizar." });
    }
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
      const actualizado = await EstudianteCarrera.findByPk(id, {
        include: [
          { model: Estudiante, attributes: ["id", "carnet", "nombre"] },
          { model: Carrera, attributes: ["id", "nombre"] }
        ]
      });
      res.send({ message: "EstudianteCarrera actualizado correctamente.", estudianteCarrera: actualizado });
    } else {
      res.status(404).json({ message: `No se encontró registro con id=${id}.` });
    }
  } catch (err) {
    res.status(500).send({ message: "Error al actualizar EstudianteCarrera", error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    if(!id){
      return res.status(400).send({ message: "Debe incluir el id del registro a eliminar." });
    }
    const num = await EstudianteCarrera.destroy({ where: { id } });
    if (num === 1) res.send({ message: "Eliminado correctamente" });
    else res.status(404).send({ message: "No se encontró registro" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


