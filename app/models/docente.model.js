// docente.model.js
module.exports = (sequelize, Sequelize) => {
    const Usuario = require("./usuario.model")(sequelize, Sequelize);

    const Docente = sequelize.define("docente", {
        DPI: {
            type: Sequelize.STRING
        },
        carnet: {
            type: Sequelize.STRING
        },
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        },
        fechaNacimiento: {
            type: Sequelize.DATE   // equivale a TIMESTAMP WITH TIME ZONE
        },
        genero: {
            type: Sequelize.BOOLEAN
        },
        sueldo: {
            type: Sequelize.DECIMAL(9,2) // NUMERIC(9,2)
        },
        id_usuario: {
            type: Sequelize.INTEGER
        },
        id_carrera: {
            type: Sequelize.INTEGER
        },
        status_carrera: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
            // true: carrera asignada
            // false: sin asignar carrera
        }

        
    });

    Docente.belongsTo(Usuario, {
        foreignKey: "id_usuario",
        targetKey: "id",
    });

    Usuario.hasOne(Docente, {
        foreignKey: "id_usuario",
        sourceKey: "id",
    });
    return Docente;
};