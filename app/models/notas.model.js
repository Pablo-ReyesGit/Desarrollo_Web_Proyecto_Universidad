// models/nota.model.js
module.exports = (sequelize, Sequelize) => {
  const Nota = sequelize.define("nota", {
    id: { 
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    primer_parcial: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    segundo_parcial: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    parcial_final: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    actividades: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    id_estudiante: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    id_curso: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ["id_estudiante", "id_curso"] // 🔹 cada estudiante solo una nota por curso
      }
    ]
  });

  return Nota;
};
