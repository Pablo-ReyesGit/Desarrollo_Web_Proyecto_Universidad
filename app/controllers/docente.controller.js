// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");
const Docente = db.docentes;  // usamos el modelo docente
const Op = db.Sequelize.Op;

// Create and Save a new Docente
exports.create = (req, res) => {
    // Validamos que dentro del  request no venga vacio el nombre, de lo contrario retorna error
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Docente, definiendo una variable con la estructura del request para luego solo ser enviada como parametro mas adelante. 
    const docente = {
        carnet: req.body.carnet,
        nombre: req.body.nombre,
        fechaNacimiento: req.body.fechaNacimiento,
        genero: req.body.genero,
        sueldo: req.body.sueldo,
        id_usuario: req.body.id_usuario,   // FK hacia usuario
        
        status: req.body.status ? req.body.status : false
    };

    // Save a new Docente into the database
    Docente.create(docente)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Docente."
            });
        });
};

// Retrieve all Docentes from the database.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Docente.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Docentes."
            });
        });
};

// Find a single Docente with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Docente.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Docente with id=" + id
            });
        });
};

// Update a Docente by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Docente.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Docente was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Docente with id=${id}. Maybe Docente was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Docente with id=" + id
            });
        });
};

// Delete a Docente with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    // utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante where id = parametro que recibimos 
    Docente.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Docente was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Docente with id=${id}. El docente no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Docente with id=" + id
            });
        });
};

// Delete all Docentes from the database.
exports.deleteAll = (req, res) => {
    Docente.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Docentes were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Docentes."
            });
        });
};

// find all Docentes activos, basado en el atributo status (si existiera en tu modelo de docente) 
// Nota: como el modelo Docente no tiene "status", puedes adaptar este endpoint si luego lo agregas.
exports.findAllStatus = (req, res) => {
    Docente.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Docentes."
            });
        }); 
};
