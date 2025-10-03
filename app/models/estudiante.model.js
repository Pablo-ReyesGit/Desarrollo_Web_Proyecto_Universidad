module.exports = (sequelize, Sequelize) => {
    const Usuario = require("./usuario.model")(sequelize, Sequelize);

    const Estudiante = sequelize.define("estudiante", {

        idusuario:{
            type: Sequelize.INTEGER
        },

        fullname: {
            type: Sequelize.STRING
        },
        carnet: {
            type: Sequelize.STRING
        },
        fechaNacimiento: {
            type: Sequelize.DATE
        },
        dpi: {
            type: Sequelize.STRING
        },
        ingreso: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.BOOLEAN
        }
    });

    // Relación con usuario (1:1)
    Estudiante.belongsTo(Usuario, {
        foreignKey: "id_usuario",
        targetKey: "id"
    });

    Usuario.hasOne(Estudiante, {
        foreignKey: "id_usuario",
        sourceKey: "id"
    });

    return Estudiante;
};