module.exports = (sequelize, Sequelize) => {
    const Curso = require("./curso.model")(sequelize, Sequelize);

    const Horario = sequelize.define("horario", {
        dia_semana: {
            type: Sequelize.STRING,
            allowNull: false
        },
        hora_inicio: {
            type: Sequelize.TIME,
            allowNull: false
        },
        hora_fin: {
            type: Sequelize.TIME,
            allowNull: false
        },
        aula: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    // Relación con curso
    Horario.belongsTo(Curso, {
        foreignKey: "id_curso",
        targetKey: "id"
    });

    Curso.hasMany(Horario, {
        foreignKey: "id_curso",
        sourceKey: "id"
    });

    return Horario;
};
