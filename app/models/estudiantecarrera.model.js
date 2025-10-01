module.exports = (sequelize, Sequelize) => {
    const Estudiante = require("./estudiante.model")(sequelize, Sequelize);
    const Carrera = require("./carrera.model")(sequelize, Sequelize);

    const EstudianteCarrera = sequelize.define("estudiante_carrera", {
        fecha_ingreso: {
            type: Sequelize.DATE,
            allowNull: false
        },
        fecha_egreso: {
            type: Sequelize.DATE,
            allowNull: true
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });

    // Relaciones
    EstudianteCarrera.belongsTo(Estudiante, {
        foreignKey: "id_estudiante",
        targetKey: "id"
    });

    Estudiante.hasMany(EstudianteCarrera, {
        foreignKey: "id_estudiante",
        sourceKey: "id"
    });

    EstudianteCarrera.belongsTo(Carrera, {
        foreignKey: "id_carrera",
        targetKey: "id"
    });

    Carrera.hasMany(EstudianteCarrera, {
        foreignKey: "id_carrera",
        sourceKey: "id"
    });

    return EstudianteCarrera;
};
