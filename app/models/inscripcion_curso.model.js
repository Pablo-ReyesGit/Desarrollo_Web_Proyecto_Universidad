module.exports = (sequelize, Sequelize) => {
    const Estudiante = require("./estudiante.model")(sequelize, Sequelize);
    const Curso = require("./curso.model")(sequelize, Sequelize);

    const Curso_Inscripcion = sequelize.define("curso_inscripcion", {
        estado: {
            type: Sequelize.BOOLEAN
        },
        fecha_inscripcion: {
            type: Sequelize.DATE
        },
        id_estudiante: {
            type: Sequelize.INTEGER
        },
        id_curso: {
            type: Sequelize.INTEGER
        }
    });

    // Relacion de materia con curos
    Curso.belongsTo(Curso_Inscripcion, {
        foreignKey: "id_curso",
        targetKey: "id",
    });

    Curso_Inscripcion.hasMany(Curso, {
        foreignKey: "id_curso",
        sourceKey: "id",
    });

    // Relacion entre docente y curso
    Estudiante.belongsTo(Curso_Inscripcion, {
        foreignKey: "id_estudiante",
        targetKey: "id",
    });

    Curso_Inscripcion.hasMany(Estudiante, {
        foreignKey: "id_estudiante",
        sourceKey: "id",
    });

    return Curso_Inscripcion;
};