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

    const nombre_materia = req.body?.nombre_materia?.toString().trim();
    const carnet_estudiante = req.body?.carnet_estudiante?.toString().trim();

    const missing = [];
    if (!nombre_materia) missing.push('nombre_materia');
    if (!carnet_estudiante) missing.push('carnet_estudiante');

    if (missing.length) {
      console.log('[Cursos.create] Validation failed, missing:', missing);
      return res.status(400).json({
        message: `Faltan campos requeridos: ${missing.join(', ')}`,
        details: {
          nombre_materia: nombre_curso || 'no enviado',
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

    Nota.findAll({ where: condition })
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
    console.log("👉 Iniciando actualización de Curso_Inscripcion...");
    console.log("📌 ID recibido en params:", req.params.id);
    console.log("📥 Datos recibidos en body:", req.body);

    const id = req.params.id;

    // Objeto acumulador de cambios
    const cambios = {};

    // Si viene un nuevo nombre de materia
    if (req.body.nombre_materia) {
      console.log("🔎 Buscando materia con nombre:", req.body.nombre_materia);
      const materia = await Materia.findOne({
        where: { nombre: req.body.nombre_materia },
        attributes: ["id"]
      });

      if (!materia) {
        console.warn("⚠️ Materia no encontrada:", req.body.nombre_materia);
        return res.status(404).json({ message: "Materia no encontrada." });
      }

      console.log("✅ Materia encontrada:", materia.id);

      console.log("🔎 Buscando curso con materia:", materia.id, "y periodo:", req.body.periodo);
      const curso = await Curso.findOne({
        where: { id_materia: materia.id, periodo: req.body.periodo },
        attributes: ["id"]
      });

      if (!curso) {
        console.warn("⚠️ Curso no encontrado para la materia y periodo dados.");
        return res.status(404).json({ message: "Curso no encontrado para la materia y periodo." });
      }

      console.log("✅ Curso encontrado:", curso.id);
      cambios.id_curso = curso.id;
    }

    // Si viene carnet de estudiante
    if (req.body.carnet_estudiante) {
      console.log("🔎 Buscando estudiante con carnet:", req.body.carnet_estudiante);
      const estudiante = await Estudiante.findOne({
        where: { carnet: req.body.carnet_estudiante },
        attributes: ["id"]
      });

      if (!estudiante) {
        console.warn("⚠️ Estudiante no encontrado:", req.body.carnet_estudiante);
        return res.status(404).json({ message: "Estudiante no encontrado." });
      }

      console.log("✅ Estudiante encontrado:", estudiante.id);
      cambios.id_estudiante = estudiante.id;
    }

    // Otros campos
    if (req.body.estado !== undefined) {
      console.log("📝 Estado recibido:", req.body.estado);
      cambios.estado = req.body.estado;
    }

    console.log("📦 Objeto de cambios a aplicar:", cambios);

    // Validar cambios
    if (Object.keys(cambios).length === 0) {
      console.warn("⚠️ No se enviaron campos para actualizar.");
      return res.status(400).json({ message: "No se enviaron campos para actualizar." });
    }

    // Ejecutar actualización
    console.log("🚀 Ejecutando actualización en DB...");
    const [updated] = await Curso_Inscripcion.update(cambios, { where: { id } });
    console.log("📊 Resultado update:", updated);

    if (updated === 1) {
      console.log("✅ Actualización exitosa. Obteniendo curso actualizado...");
      return res.status(201).json("inscripcion actualizada con exito");
    }

  } catch (err) {
    console.error("💥 Error en update:", err.message, err);
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