const db = require("../models");
const TipoNotificacion = db.tipo_notificacion;
const { Op } = db.Sequelize;

exports.create = async (req, res) => {
  try {
    const {
      id_notificacion,
      tipo_notificacion,
      titulo,
      mensaje,
      fecha_envio,
      estado_notificacion,
      correo,
      prioridad
    } = req.body;

    if (!mensaje || String(mensaje).trim() === "") {
      return res.status(400).send({ message: "El mensaje no puede estar vacío." });
    }

    const nuevaNotificacion = await TipoNotificacion.create({
      id_notificacion,
      tipo_notificacion,
      titulo,
      mensaje,
      fecha_envio: fecha_envio || new Date(),
      estado_notificacion: estado_notificacion || "pendiente",
      correo,
      prioridad: prioridad || "media"
    });

    return res.status(201).send(nuevaNotificacion);
  } catch (err) {
    return res.status(500).send({ message: err.message || "Error al crear la notificación." });
  }
};

exports.findAll = async (req, res) => {
  try {
    const { titulo } = req.query;
    const condition = titulo
      ? { titulo: { [Op.iLike]: `%${titulo}%` } }
      : undefined;

    const data = await TipoNotificacion.findAll({ where: condition });
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ message: err.message || "Error al obtener notificaciones." });
  }
};

exports.findOne = async (req, res) => {
  try {
    const { id_notificacion } = req.params;
    if (!id_notificacion) {
      return res.status(400).send({ message: "Debe proporcionar id_notificacion." });
    }
    const data = await TipoNotificacion.findByPk(id_notificacion);
    if (!data) return res.status(404).send({ message: "Notificación no encontrada." });
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ message: "Error al recuperar notificación con ID=" + req.params.id_notificacion });
  }
};

exports.update = async (req, res) => {
  try {
    const { id_notificacion } = req.params;
    if (!id_notificacion) {
      return res.status(400).send({ message: "Debe proporcionar id_notificacion." });
    }
    const result = await TipoNotificacion.update(req.body, { where: { id_notificacion } });
    const affected = Array.isArray(result) ? result[0] : result;
    if (affected === 1) {
      const updated = await TipoNotificacion.findByPk(id_notificacion);
      return res.send({ message: "Notificación actualizada correctamente.", notificacion: updated });
    }
    return res.status(404).send({ message: `No se pudo actualizar notificación con ID=${id_notificacion}.` });
  } catch (err) {
    return res.status(500).send({ message: "Error al actualizar notificación con ID=" + req.params.id_notificacion });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id_notificacion } = req.params;
    if (!id_notificacion) {
      return res.status(400).send({ message: "Debe proporcionar id_notificacion." });
    }
    const num = await TipoNotificacion.destroy({ where: { id_notificacion } });
    if (num === 1) return res.send({ message: "Notificación eliminado correctamente." });
    return res.status(404).send({ message: `No se encontró la notificación con ID=${id_notificacion}.` });
  } catch (err) {
    return res.status(500).send({ message: "Error al eliminar notificación con ID=" + req.params.id_notificacion });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const nums = await TipoNotificacion.destroy({ where: {}, truncate: false });
    return res.send({ message: `${nums} notificaciones eliminadas correctamente.` });
  } catch (err) {
    return res.status(500).send({ message: err.message || "Error al eliminar todas las notificaciones." });
  }
};

exports.findAllByEstado = async (req, res) => {
  try {
    const estado = req.query.estado || req.query.estado_notificacion || "pendiente";
    const data = await TipoNotificacion.findAll({ where: { estado_notificacion: estado } });
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ message: err.message || "Error al obtener notificaciones filtradas por estado." });
  }
};
