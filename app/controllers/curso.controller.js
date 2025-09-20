// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");
const Curso = db.cursos;
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.create = (req, res) => {
    if (!req.body.id_materia) {
        return res.status(400).send({ message: "debe incluir todos los detalles necesarios." });
    }

    const curso = {
        periodo: req.body.periodo,
        seccion: req.body.seccion,
        cupo_maximo: req.body.cupo_maximo,
        id_docente: req.body.id_docente,
        id_materia: req.body.id_materia,
   };

    Curso.create(curso)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al crear el notificacion." });
        });
};

// Retrieve all Client from the database.
exports.findAll = (req, res) => {
    const id_materia = req.query.id_materia;
    var condition = id_materia ? { id_materia: { [Op.iLike]: `%${id_materia}%` } } : null;

    Curso.findAll({ where: condition })
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

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
    try {
        const curso = await Curso.findOne({ where: { id_materia: req.body.id_materia } });
        if (!curso) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }

        res.send({ message: "Login exitoso", token });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Curso.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    // utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante where id = parametro que recibimos 
    Curso.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. El usuario no fue encontado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
    Curso.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} User were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
        });
};

// find all active Client, basado en el atributo status vamos a buscar que solo los clientes activos
exports.findAllStatus = (req, res) => {
    Curso.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving User."
            });
        }); 
};