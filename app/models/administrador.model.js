// Exportamos el modelo Administrador
module.exports = (sequelize, Sequelize) => {
  const Administrador = sequelize.define("administrador", {
    id_admin: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING
    },
    apellido: {
      type: Sequelize.STRING
    },
    telefono: {
      type: Sequelize.STRING
    },
    direccion: {
      type: Sequelize.STRING
    }
  });

  return Administrador;
};