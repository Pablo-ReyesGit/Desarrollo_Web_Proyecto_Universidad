const db = require("../models");
const Administrador = db.administradores;  // ← Evita conflictos de nombre
const Op = db.Sequelize.Op;

// Crear un nuevo libro
exports.create = (req, res) => {
    if (!req.body.nombre) {
        return res.status(400).send({ 
            message: "El nombre del administrador no puede estar vacío." 
        });
    }

    const nuevoAdministrador = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
    };

    Administrador.create(nuevoAdministrador)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ 
                message: err.message || "Error al crear el Administrador." 
            });
        });
};

// Obtener todos los Adminsitradores (con filtro opcional por nombre)
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    const condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Administrador.findAll({ where: condition })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al obtener Administradores." });
        });
};

// Obtener un solo libro por ID
exports.findOne = (req, res) => {
    const id_admin = req.params.id_admin;

    Administrador.findByPk(id_admin)
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: "Administrador  no encontrado." });
        })
        .catch(err => {
            res.status(500).send({ message: "Error al recuperar Administrador con ID=" + id_admin });
        });
};

// Actualizar libro
exports.update = (req, res) => {
    const id_admin = req.params.id_admin;

    Administrador.update(req.body, {
        where: { id_admin: id_admin }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Administrador actualizado correctamente." });
            } else {
                res.send({ message: `No se pudo actualizar administrador con ID=${id_admin}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar administrador con ID=" + id_admin });
        });
};

// Eliminar un libro
exports.delete = (req, res) => {
    const id_admin = req.params.id_admin;

    Administrador.destroy({ where: { id_admin: id_admin } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Administrador eliminado correctamente." });
            } else {
                res.send({ message: `No se encontró administrador con ID=${id_admin}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al eliminar administrador con ID=" + id_admin });
        });
};

// Eliminar todos los libros
exports.deleteAll = (req, res) => {
    Administrador.destroy({ where: {}, truncate: false })
        .then(nums => {
            res.send({ message: `${nums} Administradores eliminados correctamente.` });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al eliminar todos los administradores." });
        });
};

// Encontrar todos los libros activos
exports.findAllStatus = (req, res) => {
    Administrador.findAll({ where: { status: true } })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al obtener administradores activos." });
        });
};

