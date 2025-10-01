module.exports = (sequelize, Sequelize) => {
    const Materia = require("./materia.model")(sequelize, Sequelize);
    const Docente = require("./docente.model")(sequelize, Sequelize);

    const Curso = sequelize.define("curso", {
        periodo: {
            type: Sequelize.STRING
        },
        seccion: {
            type: Sequelize.CHAR(1)
        },
        cupo_maximo: {
            type: Sequelize.INTEGER
        },
        id_docente: {
            type: Sequelize.INTEGER
        },
        id_materia: {
            type: Sequelize.INTEGER
        }
    });

    // Relacion de materia con curos
    Curso.belongsTo(Materia, {
        foreignKey: "id_materia",
        targetKey: "id",
    });

    Materia.hasMany(Curso, {
        foreignKey: "id_materia",
        sourceKey: "id",
    });

    // Relacion entre docente y curso
    Curso.belongsTo(Docente, {
        foreignKey: "id_docente",
        targetKey: "id",
    });

    Docente.hasMany(Curso, {
        foreignKey: "id_docente",
        sourceKey: "id",
    });

    return Curso;
};