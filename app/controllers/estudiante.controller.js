const db = require("../models");
<<<<<<< HEAD
const Estudiante = db.estudiantes;
const Op = db.Sequelize.Op;

// 🔹 Función para generar carnet automático
async function generarCarnet() {
    const year = new Date().getFullYear();

    // Buscar último carnet de este año
    const ultimo = await Estudiante.findOne({
        where: { carnet: { [Op.like]: `${year}%` } },
        order: [["carnet", "DESC"]],
        attributes: ["carnet"]
    });

    let secuencia = 1;
    if (ultimo && ultimo.carnet) {
        const ultimoNumero = parseInt(ultimo.carnet.slice(4));
        secuencia = ultimoNumero + 1;
    }

    return `${year}${String(secuencia).padStart(4, "0")}`;
}

// Create and Save a new Estudiante
exports.create = async (req, res) => {
    try {
        if (!req.body.fullname) {
            return res.status(400).send({
                message: "El nombre no puede estar vacío!"
            });
        }

        // Generar carnet automático
        const carnetGenerado = await generarCarnet();

        let estudiante = await Estudiante.create({
            fullname: req.body.fullname,
            carnet: carnetGenerado, // 👈 generado automáticamente
            fechaNacimiento: req.body.fechaNacimiento,
            dpi: req.body.dpi,
            ingreso: req.body.ingreso,
            id_usuario: req.body.id_usuario || null, // relación con usuario si aplica
            status: req.body.status ? req.body.status : false
        });

        res.send(estudiante);

    } catch (err) {
        res.status(500).send({
            message: err.message || "Ocurrió un error al crear el Estudiante."
        });
    }
=======
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
>>>>>>> 691eba747accc67ed4b28cf6207416fe1ce6fdfd
};

// Retrieve all Estudiantes
exports.findAll = (req, res) => {
    const fullname = req.query.fullname;
    var condition = fullname ? { fullname: { [Op.iLike]: `%${fullname}%` } } : null;

    Estudiante.findAll({ where: condition })
<<<<<<< HEAD
        .then(data => res.send(data))
=======
        .then(data => {
            res.send(data);
        })
>>>>>>> 691eba747accc67ed4b28cf6207416fe1ce6fdfd
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
<<<<<<< HEAD
            if (data) res.send(data);
            else res.status(404).send({ message: `No se encontró Estudiante con id=${id}` });
        })
        .catch(err => {
            res.status(500).send({ message: "Error al obtener Estudiante con id=" + id });
=======
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
>>>>>>> 691eba747accc67ed4b28cf6207416fe1ce6fdfd
        });
};

// Update a Estudiante by the id
exports.update = (req, res) => {
    const id = req.params.id;

<<<<<<< HEAD
    Estudiante.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Estudiante actualizado correctamente." });
            } else {
                res.send({ message: `No se pudo actualizar Estudiante con id=${id}. Tal vez no existe o req.body está vacío!` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar Estudiante con id=" + id });
=======
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
>>>>>>> 691eba747accc67ed4b28cf6207416fe1ce6fdfd
        });
};

// Delete a Estudiante with the specified id
exports.delete = (req, res) => {
    const id = req.params.id;

<<<<<<< HEAD
    Estudiante.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) res.send({ message: "Estudiante eliminado correctamente!" });
            else res.send({ message: `No se pudo eliminar Estudiante con id=${id}. No encontrado!` });
        })
        .catch(err => {
            res.status(500).send({ message: "No se pudo eliminar Estudiante con id=" + id });
=======
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
>>>>>>> 691eba747accc67ed4b28cf6207416fe1ce6fdfd
        });
};

// Delete all Estudiantes
exports.deleteAll = (req, res) => {
<<<<<<< HEAD
    Estudiante.destroy({ where: {}, truncate: false })
        .then(nums => res.send({ message: `${nums} Estudiantes fueron eliminados correctamente!` }))
        .catch(err => {
            res.status(500).send({ message: err.message || "Ocurrió un error al eliminar todos los Estudiantes." });
=======
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
>>>>>>> 691eba747accc67ed4b28cf6207416fe1ce6fdfd
        });
};

// Find all active Estudiantes (status = true)
exports.findAllStatus = (req, res) => {
    Estudiante.findAll({ where: { status: true } })
<<<<<<< HEAD
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Ocurrió un error al obtener Estudiantes activos." });
        });
};



=======
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al obtener Estudiantes activos."
            });
        });
};
>>>>>>> 691eba747accc67ed4b28cf6207416fe1ce6fdfd
