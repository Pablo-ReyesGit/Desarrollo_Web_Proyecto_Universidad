<<<<<<< HEAD
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
=======
// Utilizamos module.exports para exportar objetos para que puedan ser utilizados en otras clases
module.exports = (sequelize, Sequelize) => {
    // usamos sequelize.define para "definir" el nombre de la entity en la BD, en este caso "student"
    // Usamos type.Sequelize para definir el tipo de datos de cada atributo de la entidad 
    const Estudiante = sequelize.define("estudiante", {
        fullname: {
            type: Sequelize.STRING
        },

        carnet: {
            type: Sequelize.STRING
        },

        fechaNacimiento: {
            type: Sequelize.DATE   // equivale a TIMESTAMP WITH TIME ZONE
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
    })

    return Estudiante
}
>>>>>>> 691eba747accc67ed4b28cf6207416fe1ce6fdfd
