// docente.model.js
module.exports = (sequelize, Sequelize) => {
    const Usuario = require("./usuario.model")(sequelize, Sequelize);

    const Docente = sequelize.define("docente", {
        carnet: {
            type: Sequelize.STRING
        },
        nombre: {
            type: Sequelize.STRING
        },
        fechaNacimiento: {
            type: Sequelize.DATE   // equivale a TIMESTAMP WITH TIME ZONE
        },
        genero: {
            type: Sequelize.STRING
        },
        sueldo: {
            type: Sequelize.DECIMAL(9,2) // NUMERIC(9,2)
        },
        id_usuario: {
            type: Sequelize.INTEGER,
            unique: true // para reflejar que es uno a uno
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });

    // Relación: un docente pertenece a un usuario
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