const db = require("../models");
const TipoNotificacion = db.tipo_notificacion;  // 👈 mismo nombre que el modelo
const Op = db.Sequelize.Op;

// Crear una nueva notificación
exports.create = (req, res) => {
    if (!req.body.mensaje) {
        return res.status(400).send({ message: "El mensaje no puede estar vacío." });
    }

    const nuevaNotificacion = {
        id_notificacion: req.body.id_notificacion,
        tipo_notificacion: req.body.tipo_notificacion,
        titulo: req.body.titulo,
        mensaje: req.body.mensaje,
        fecha_envio: req.body.fecha_envio || new Date(),
        estado_notificacion: req.body.estado_notificacion || "pendiente",
        correo: req.body.correo,
        prioridad: req.body.prioridad || "media"
    };

    TipoNotificacion.create(nuevaNotificacion)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al crear la notificación." });
        });
};

// Retrieve all notificaciones from the database.
exports.findAll = (req, res) => {
    const titulo = req.query.titulo;
    var condition = titulo ? { titulo: { [Op.iLike]: `%${titulo}%` } } : null;

    TipoNotificacion.findAll({ where: condition })
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



// Obtener una notificación por ID
exports.findOne = (req, res) => {
    const id_notificacion = req.params.id_notificacion;

    TipoNotificacion.findByPk(id_notificacion)
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: "Notificación no encontrada." });
        })
        .catch(err => {
            res.status(500).send({ message: "Error al recuperar notificación con ID=" + id_notificacion });
        });
};

// Actualizar una notificación
exports.update = (req, res) => {
    const id_notificacion = req.params.id_notificacion;

    TipoNotificacion.update(req.body, {
        where: { id_notificacion: id_notificacion }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Notificacion actualizado correctamente." });
            } else {
                res.send({ message: `No se pudo actualizar notificacion con ID=${id_notificacion}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar administrador con ID=" + id_notificacion });
        });
};

// Eliminar una notificación
exports.delete = (req, res) => {
    const id_notificacion = req.params.id_notificacion;

    TipoNotificacion.destroy({ where: { id_notificacion: id_notificacion } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Notificación eliminada correctamente." });
            } else {
                res.send({ message: `No se encontró la notificación con ID=${id_notificacion}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al eliminar notificación con ID=" + id_notificacion });
        });
};

// Eliminar todas las notificaciones
exports.deleteAll = (req, res) => {
    TipoNotificacion.destroy({ where: {}, truncate: false })
        .then(nums => {
            res.send({ message: `${nums} notificaciones eliminadas correctamente.` });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al eliminar todas las notificaciones." });
        });
};

// Encontrar todas las notificaciones por estado (?estado=pendiente|enviada|leída)
exports.findAllByEstado = (req, res) => {
    const estado_notificacion = req.query.estado_notificacion || "pendiente";

    TipoNotificacion.findAll({ where: { estado_notificacion: estado_notificacion } })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al obtener notificaciones filtradas por estado." });
        });
};
