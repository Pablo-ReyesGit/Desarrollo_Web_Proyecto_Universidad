// Exportamos el modelo TipoNotificacion
module.exports = (sequelize, Sequelize) => {
    const TipoNotificacion = sequelize.define("tipo_notificacion", {
        id_notificacion: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
       /* id_carrera: {
            type: Sequelize.INTEGER,
            references: {
                model: "carrera", // 👈 nombre de la tabla relacionada
                key: "id_carrera"
            }
        },*/
        tipo_notificacion: {
            type: Sequelize.ENUM(
                "TAREA_ASIGNADA",
                "TAREA_CALIFICADA",
                "RECORDATORIO_ENTREGA",
                "AVISO_GENERAL"
            ),
            allowNull: false
        },
        titulo: {
            type: Sequelize.STRING(150),
            allowNull: false
        },
        mensaje: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        fecha_envio: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        estado_notificacion: {
            type: Sequelize.ENUM("pendiente", "enviada", "leída"),
            allowNull: false,
            defaultValue: "pendiente"
        },
       correo: {
           type: Sequelize.STRING
        },
        prioridad: {
            type: Sequelize.ENUM("alta", "media", "baja"),
            allowNull: false,
            defaultValue: "media"
        }
    });

    return TipoNotificacion;
};
