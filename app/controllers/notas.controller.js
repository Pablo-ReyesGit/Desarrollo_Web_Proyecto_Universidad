// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");
const Nota = db.notas;
const Curso_Inscripcion = db.inscripciones;
const Estudiante = db.estudiantes;
const Curso = db.cursos;
const Materia = db.materias;
const Op = db.Sequelize.Op;

// Create and Save a new Nota
exports.create = async (req, res) => {
  try {
    console.log('==================== [Nota.create] START ====================');
    console.log('[Nota.create] Request body:', JSON.stringify(req.body, null, 2));

    // Extraer parámetros
    const nombre_materia = req.body?.nombre_materia?.toString().trim();
    const carnet_estudiante = req.body?.carnet_estudiante?.toString().trim();
    const periodo = req.body?.periodo?.toString().trim();

    console.log('[Nota.create] Campos recibidos:', {
      nombre_materia,
      carnet_estudiante,
      periodo
    });

    // Validar campos faltantes
    const missing = [];
    if (!nombre_materia) missing.push('nombre_materia');
    if (!carnet_estudiante) missing.push('carnet_estudiante');
    if (!periodo) missing.push('periodo');

    if (missing.length) {
      console.warn('[Nota.create] Campos faltantes:', missing);
      return res.status(400).json({
        message: `Faltan campos requeridos: ${missing.join(', ')}`,
        details: {
          nombre_materia: nombre_materia || 'no enviado',
          carnet_estudiante: carnet_estudiante || 'no enviado',
          periodo: periodo || 'no enviado'
        }
      });
    }

    // 1) Buscar estudiante
    console.log('[Nota.create] Buscando estudiante con carnet:', carnet_estudiante);
    const estudiante = await Estudiante.findOne({
      where: { carnet: carnet_estudiante },
      attributes: ['id']
    });
    if (!estudiante) {
      console.warn('[Nota.create] Estudiante no encontrado:', carnet_estudiante);
      return res.status(404).json({ message: 'Estudiante no encontrado.' });
    }
    console.log('[Nota.create] Estudiante encontrado:', estudiante.id);

    // 2) Buscar materia
    console.log('[Nota.create] Buscando materia con nombre:', nombre_materia);
    const materia = await Materia.findOne({
      where: { nombre: nombre_materia },
      attributes: ['id']
    });
    if (!materia) {
      console.warn('[Nota.create] Materia no encontrada:', nombre_materia);
      return res.status(404).json({ message: 'Materia no encontrada.' });
    }
    console.log('[Nota.create] Materia encontrada:', materia.id);

    // 3) Buscar curso
    console.log('[Nota.create] Buscando curso con materia:', materia.id, 'y periodo:', periodo);
    const curso = await Curso.findOne({
      where: {
        id_materia: materia.id,
        periodo: periodo
      },
      attributes: ['id']
    });
    if (!curso) {
      console.warn('[Nota.create] Curso no encontrado para materia:', materia.id, 'en periodo:', periodo);
      return res.status(404).json({ message: 'Curso no encontrado en ese periodo.' });
    }
    console.log('[Nota.create] Curso encontrado:', curso.id);

    // 4) Buscar inscripción
    console.log('[Nota.create] Verificando inscripción de estudiante:', estudiante.id, 'en curso:', curso.id);
    const inscripcion = await Curso_Inscripcion.findOne({
      where: {
        id_estudiante: estudiante.id,
        id_curso: curso.id
      }
    });
    if (!inscripcion) {
      console.warn('[Nota.create] Estudiante no inscrito en este curso:', {
        estudiante: estudiante.id,
        curso: curso.id
      });
      return res.status(404).json({ message: 'El estudiante no está inscrito en este curso.' });
    }
    console.log('[Nota.create] Inscripción encontrada:', inscripcion.id);

    // 5) Crear la nota
    console.log('[Nota.create] Creando nota con datos:', {
      id_estudiante: estudiante.id,
      id_curso: curso.id,
      primer_parcial: req.body.primer_parcial || 0,
      segundo_parcial: req.body.segundo_parcial || 0,
      parcial_final: req.body.parcial_final || 0,
      actividades: req.body.actividades || 0
    });

    const nota = await Nota.create({
      id_estudiante: estudiante.id,
      id_curso: curso.id,
      primer_parcial: req.body.primer_parcial || 0,
      segundo_parcial: req.body.segundo_parcial || 0,
      parcial_final: req.body.parcial_final || 0,
      actividades: req.body.actividades || 0
    });

    console.log('[Nota.create] Nota creada exitosamente:', nota.id);
    console.log('==================== [Nota.create] END ====================');
    return res.status(201).json(nota);

  } catch (err) {
    console.error('[Nota.create] Error inesperado:', err);
    return res.status(500).json({ message: err.message || 'Error al crear la nota.' });
  }
};



// Retrieve all Client from the database.
exports.findAll = (req, res) => {
  Nota.findAll({
    include: [
      { model: Estudiante, attributes: ["id", "carnet", "fullname"] },
      { model: Curso, attributes: ["id", "periodo"] },
      { model: Materia, attributes: ["id", "nombre"] }
    ]
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
    try {
// 1) Buscar estudiante
    const estudiante = await Estudiante.findOne({
      where: { carnet: carnet_estudiante },
      attributes: ['id']
    });
    if (!estudiante) {
      return res.status(404).json({ message: 'Estudiante no encontrado.' });
    }

    // 2) Buscar materia
    const materia = await Materia.findOne({
      where: { nombre: nombre_materia },
      attributes: ['id']
    });
    if (!materia) {
      return res.status(404).json({ message: 'Materia no encontrada.' });
    }

    // 3) Buscar curso
    const curso = await Curso.findOne({
      where: {
        id_materia: materia.id,
        periodo: periodo
      },
      attributes: ['id']
    });
    if (!curso) {
      return res.status(404).json({ message: 'Curso no encontrado en ese periodo.' });
    }

        const nota = await Curso_Inscripcion.findOne({ 
          where: {
           id_curso: curso.id,
           id_estudiante: estudiante.id
           } });
        if (!nota) {
            return res.status(404).send({ message: "notas no encontradas" });
        }

        res.send({ message: "nota a curso encontrada " });
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
    if (req.body.primer_parcial !== undefined) cambios.primer_parcial = req.body.primer_parcial;
    if (req.body.segundo_parcial !== undefined) cambios.segundo_parcial = req.body.segundo_parcial;
    if (req.body.parcial_final !== undefined) cambios.parcial_final = req.body.parcial_final;
    if (req.body.actividades !== undefined) cambios.actividades = req.body.actividades;

    // Si no hay nada para actualizar, devolvemos error
    if (Object.keys(cambios).length === 0) {
      return res.status(400).json({ message: "No se enviaron campos para actualizar." });
    }

    // Ejecutar actualización
    const [updated] = await Nota.update(cambios, { where: { id } });

    if (updated === 1) {
      const notaActualizada = await Nota.findByPk(id, {
        include: [
          { model: Curso, attributes: ["id", "id_materia", "periodo"] },
          { model: Estudiante, attributes: ["id", "carnet"] }
        ]
      });

      return res.send({
        message: "Nota actualizado correctamente.",
        curso: notaActualizada
      });
    } else {
      return res.status(404).json({ message: `No se encontró nota con id=${id}.` });
    }

  } catch (err) {
    res.status(500).send({
      message: "Error al actualizar nota con id=" + req.params.id,
      error: err.message
    });
  }
};


// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    // utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante where id = parametro que recibimos 
    Nota.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Nota borrada con exito!"
                });
            } else {
                res.send({
                    message: `No se pudo borrar nota con id =${id}. No se encontró la nota!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "no se pudo borrar nota con id =" + id
            });
        });
};