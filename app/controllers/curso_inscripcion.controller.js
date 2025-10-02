// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");
const Curso_Inscripcion = db.inscripciones;
const Estudiante = db.estudiantes;
const Curso = db.cursos;
const Materia = db.materias;
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.create = async (req, res) => {
  try {
    console.log('[Cursos.create] body:', JSON.stringify(req.body));

    const nombre_curso = req.body?.nombre_curso?.toString().trim();
    const carnet_estudiante = req.body?.carnet_estudiante?.toString().trim();

    const missing = [];
    if (!nombre_curso) missing.push('nombre_curso');
    if (!carnet_estudiante) missing.push('carnet_estudiante');

    if (missing.length) {
      console.log('[Cursos.create] Validation failed, missing:', missing);
      return res.status(400).json({
        message: `Faltan campos requeridos: ${missing.join(', ')}`,
        details: {
          nombre_curso: nombre_curso || 'no enviado',
          carnet_estudiante: carnet_estudiante || 'no enviado'
        }
      });
    }

    // Buscar docente por carnet
    const estudiante = await Estudiante.findOne({
      where: { carnet: carnet_estudiante },
      attributes: ['id']
    });

    if (!estudiante) {
      return res.status(404).json({ message: 'estudiante no encontrado.' });
    }

      const materia = await Materia.findOne({
        where: { nombre: req.body.nombre_materia },
        attributes: ["id"]
      });
      const curso = await Curso.findOne({
        where: { 
          id_materia: materia.id,
          periodo: req.body.periodo
         },
        attributes: ["id"]
      })
      id_curso = curso.id;

    if (!curso) {
      return res.status(404).json({ message: 'Materia no encontrada.' });
    }

    let now= new Date();
    console.log('La fecha actual es',now);
    console.log('UNIX time:',now.getTime());

    const curso_inscripcion = await Curso_Inscripcion.create({
      estado: req.body.estado,
      fecha_inscripcion: now,
      id_curso: curso.id,
      id_estudiante: estudiante.id
    });

    return res.status(201).json(curso_inscripcion);
  } catch (err) {
    console.error('[Cursos.create] Error:', err);
    return res.status(500).json({ message: err.message || 'Error al crear el inscripcion de curso.' });
  }
};


// Retrieve all Client from the database.
exports.findAll = (req, res) => {
    const id_curso = req.query.id_curso;
    var condition = id_curso ? { id_curso: { [Op.iLike]: `%${id_curso}%` } } : null;

    Curso_.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Hubo un error al buscar todas las inscripciones."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
    try {
        const curso_inscripcion = await Curso_Inscripcion.findOne({ where: { id: req.body.id_curso_inscripcion } });
        if (!curso_inscripcion) {
            return res.status(404).send({ message: "inscripcion a curso no encontrada" });
        }

        res.send({ message: "inscripcion a curso encontrada " });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    // Creamos un objeto vacío para acumular los cambios
    const cambios = {};

    // Si viene un nuevo nombre de materia, buscarla y asignar su id
    if (req.body.nombre_materia) {
      const materia = await Materia.findOne({
        where: { nombre: req.body.nombre_materia },
        attributes: ["id"]
      });

      const curso = await Curso.findOne({
        where: { 
          id_materia: materia.id,
          periodo: req.body.periodo
         },
        attributes: ["id"]
      })
      cambios.id_curso = curso.id;
    }

    // Si viene un carnet de docente, buscarlo y asignar su id
    if (req.body.carnet_estudiante) {
      const estudiante = await Estudiante.findOne({
        where: { carnet: req.body.carnet_estudiante },
        attributes: ["id"]
      });
      cambios.id_estudiante = estudiante.id;
    }

    // Otros campos directos (solo si vienen en req.body)
    if (req.body.estado !== undefined) cambios.estado = req.body.estado;

    // Si no hay nada para actualizar, devolvemos error
    if (Object.keys(cambios).length === 0) {
      return res.status(400).json({ message: "No se enviaron campos para actualizar." });
    }

    // Ejecutar actualización
    const [updated] = await Curso_Inscripcion.update(cambios, { where: { id } });

    if (updated === 1) {
      const cursoActualizado = await Curso_Inscripcion.findByPk(id, {
        include: [
          { model: Curso, attributes: ["id", "id_materia", "periodo"] },
          { model: Estudiante, attributes: ["id", "carnet"] }
        ]
      });

      return res.send({
        message: "Curso actualizado correctamente.",
        curso: cursoActualizado
      });
    } else {
      return res.status(404).json({ message: `No se encontró curso con id=${id}.` });
    }

  } catch (err) {
    res.status(500).send({
      message: "Error al actualizar curso con id=" + req.params.id,
      error: err.message
    });
  }
};


// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    // utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante where id = parametro que recibimos 
    Curso_Inscripcion.destroy({
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
    Curso_Inscripcion.destroy({
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