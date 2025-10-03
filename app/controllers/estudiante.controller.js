const db = require("../models");
const Estudiante = db.estudiantes;   // 👈 tu modelo se llama "estudiante"
const Op = db.Sequelize.Op;

// Create and Save a new Estudiante
exports.create = (req, res) => {
    if (!req.body.fullname) {
        res.status(400).send({
            message: "El nombre no puede estar vacío!"
        });
        return;
    }

    const estudiante = {
        fullname: req.body.fullname,
        carnet: req.body.carnet,
        fechaNacimiento: req.body.fechaNacimiento,
        dpi: req.body.dpi,
        ingreso: req.body.ingreso,
        status: req.body.status ? req.body.status : false
    };

    Estudiante.create(estudiante)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el Estudiante."
            });
        });
};

// Retrieve all Estudiantes
exports.findAll = (req, res) => {
    const fullname = req.query.fullname;
    var condition = fullname ? { fullname: { [Op.iLike]: `%${fullname}%` } } : null;

    Estudiante.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al obtener los Estudiantes."
            });
        });
};

// Find a single Estudiante with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Estudiante.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró Estudiante con id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener Estudiante con id=" + id
            });
        });
};

// Update a Estudiante by the id
exports.update = (req, res) => {
    const id = req.params.id;

    Estudiante.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Estudiante actualizado correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar Estudiante con id=${id}. Tal vez no existe o req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar Estudiante con id=" + id
            });
        });
};

// Delete a Estudiante with the specified id
exports.delete = (req, res) => {
    const id = req.params.id;

    Estudiante.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Estudiante eliminado correctamente!" });
            } else {
                res.send({ message: `No se pudo eliminar Estudiante con id=${id}. No encontrado!` });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar Estudiante con id=" + id
            });
        });
};

// Delete all Estudiantes
exports.deleteAll = (req, res) => {
    Estudiante.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Estudiantes fueron eliminados correctamente!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar todos los Estudiantes."
            });
        });
};

// Find all active Estudiantes (status = true)
exports.findAllStatus = (req, res) => {
    Estudiante.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al obtener Estudiantes activos."
            });
        });
};
