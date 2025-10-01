// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");
const Curso = db.cursos;
const Docente = db.docentes;
const Materia = db.materias;
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.create = async (req, res) => {
  try {
    console.log('[Cursos.create] body:', JSON.stringify(req.body));

    const nombre_materia = req.body?.nombre_materia?.toString().trim();
    const carnet_docente = req.body?.carnet_docente?.toString().trim();

    const missing = [];
    if (!nombre_materia) missing.push('nombre_materia');
    if (!carnet_docente) missing.push('carnet_docente');

    if (missing.length) {
      console.log('[Cursos.create] Validation failed, missing:', missing);
      return res.status(400).json({
        message: `Faltan campos requeridos: ${missing.join(', ')}`,
        details: {
          nombre_materia: nombre_materia || 'no enviado',
          carnet_docente: carnet_docente || 'no enviado'
        }
      });
    }

    // Buscar docente por carnet
    const docente = await Docente.findOne({
      where: { carnet: carnet_docente },
      attributes: ['id']
    });

    if (!docente) {
      return res.status(404).json({ message: 'Docente no encontrado.' });
    }

    const materia = await Materia.findOne({
      where: { nombre: nombre_materia },
      attributes: ['id']
    });

    if (!materia) {
      return res.status(404).json({ message: 'Materia no encontrada.' });
    }

    const curso = await Curso.create({
      periodo: req.body.periodo,
      seccion: req.body.seccion,
      cupo_maximo: req.body.cupo_maximo,
      id_materia: materia.id,
      id_docente: docente.id
    });

    return res.status(201).json(curso);
  } catch (err) {
    console.error('[Cursos.create] Error:', err);
    return res.status(500).json({ message: err.message || 'Error al crear el curso.' });
  }
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
            return res.status(404).send({ message: "Curso no encontrado" });
        }

        res.send({ message: "Curso encontrado " });
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
      
      if (!materia) {
        return res.status(404).json({ message: "Materia no encontrada." });
      }
      cambios.id_materia = materia.id;
    }

    // Si viene un carnet de docente, buscarlo y asignar su id
    if (req.body.carnet_docente) {
      const docente = await Docente.findOne({
        where: { carnet: req.body.carnet_docente },
        attributes: ["id"]
      });

      if (!docente) {
        return res.status(404).json({ message: "Docente no encontrado." });
      }
      cambios.id_docente = docente.id;
    }

    // Otros campos directos (solo si vienen en req.body)
    if (req.body.periodo !== undefined) cambios.periodo = req.body.periodo;
    if (req.body.seccion !== undefined) cambios.seccion = req.body.seccion;
    if (req.body.cupo_maximo !== undefined) cambios.cupo_maximo = req.body.cupo_maximo;

    // Si no hay nada para actualizar, devolvemos error
    if (Object.keys(cambios).length === 0) {
      return res.status(400).json({ message: "No se enviaron campos para actualizar." });
    }

    // Ejecutar actualización
    const [updated] = await Curso.update(cambios, { where: { id } });

    if (updated === 1) {
      const cursoActualizado = await Curso.findByPk(id, {
        include: [
          { model: Materia, attributes: ["id", "nombre"] },
          { model: Docente, attributes: ["id", "carnet"] }
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