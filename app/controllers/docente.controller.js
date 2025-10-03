// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");
const Docente = db.docentes;  // usamos el modelo docente
const Op = db.Sequelize.Op;
const Carrera = db.carreras;

// Create and Save a new Docente
exports.create = async (req, res) => {
    try {
        if (!req.body.nombre) {
            return res.status(400).send({ message: "Content can not be empty!" });
        }

        // 1. Crear registro sin carnet
        let docente = await Docente.create({
            DPI: req.body.DPI,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            fechaNacimiento: req.body.fechaNacimiento,
            genero: req.body.genero,
            sueldo: req.body.sueldo,
            id_usuario: req.body.id_usuario,
            status: req.body.status ? req.body.status : false
        });

        // 2. Generar carnet con el ID ya creado
        const añoActual = new Date().getFullYear();
        const carnet = `D-${añoActual}-${docente.id}`;

        // 3. Actualizar el registro con el carnet
        docente.carnet = carnet;
        await docente.save();

        // 4. Responder al cliente
        res.status(201).send(docente);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Docente."
        });
    }
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

// Find a single Docente with an carnet
exports.getByCarnet = async (req, res) => {

    const carnet = req.params.carnet;

    if (!carnet) {
        console.warn("No se proporcionó carnet en la consulta");
        return res.status(400).send({
            message: "Debe proporcionar un carnet para la búsqueda."
        });
    }

    // Para Oracle: búsqueda insensible a mayúsculas
    var condition = sequelize.where(
        sequelize.fn("UPPER", sequelize.col("carnet")),
        { [Op.like]: `%${carnet.toUpperCase()}%` }
    );

    Estudiante.findOne({ where: condition })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: "Estudiante no encontrado con carnet " + carnet
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error ocurrido al obtener estudiante."
            });
        });
};

// Update a Docente by the id in the request
exports.update = (req, res) => {
    const id = req.params.carnet;

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
                    message: `Cannot update Docente with carnet=${carnet}. Maybe Docente was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Docente with carnet=" + carnet
            });
        });
};

exports.asignacionCarrera = async (req, res) => {
  const carnet = req.params.carnet;
  const nombre = req.body.nombre_carrera;

  try {
    // 1. Buscar la carrera por nombre

    const carrera = await Carrera.findOne({
      where: { nombre },
      attributes: ["id"]
    });

    if (!carrera) {
      return res.status(404).json({ message: "Carrera no encontrada" });
    }

    const id = carrera.id;

    // 2. Actualizar el docente con el id_carrera encontrado
    const [num] = await Docente.update(
      { id_carrera: id, status_carrera: true}, // usamos solo lo que necesitamos
      {
        where: { carnet },
        fields: ["id_carrera", "status_carrera"] // reforzamos que solo se actualice ese campo
      }
    );

    // 3. Respuesta
    if (num === 1) {
      res.send({
        message: "Se asignó correctamente la carrera al docente"
      });
    } else {
      res.status(404).send({
        message: `No se pudo actualizar Docente con carnet=${carnet}. Posiblemente no existe.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error al actualizar Docente con carnet=" + carnet
    });
  }
};


exports.desasignacionCarrera = async (req, res) => {
    try{
    const carnet = req.params.carnet;

    const [num] = await Docente.update(
      { status_carrera: false}, // usamos solo lo que necesitamos
      {
        where: { carnet },
        fields: ["status_carrera"] // reforzamos que solo se actualice ese campo
      }
    )
        if (num === 1) {
        res.send({
            message: "Se desasigno correctamente"
        });
        } else {
        res.status(404).send({
            message: `No se pudo actualizar Docente con carnet=${carnet}. Posiblemente no existe.`
        });
        }
    } catch (err) {
        res.status(500).send({
        message: "Error al actualizar Docente con carnet=" + carnet
        });
    }
};

// Delete a Docente with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.carnet;
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
