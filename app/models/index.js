// =======================
// Configuración de Sequelize
// =======================
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

// Creamos una instancia de Sequelize con los parámetros de conexión, incluyendo SSL para NeonDB
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// =======================
// Inicializamos el objeto DB
// =======================
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// =======================
// Importamos los modelos
// =======================
try {
  db.usuarios = require("./usuario.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'usuario' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'usuario':", err.message);
}

try {
  db.docentes = require("./docente.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'docente' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'docente':", err.message);
}

try {
  db.carreras = require("./carrera.model.js")(sequelize, Sequelize);
    console.log("✅ Modelo 'carrera' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'carrera':", err.message);
}

  try{
db.administradores = require("./administrador.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'administrador' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'administrador':", err.message);
}

try{
db.carreras = require("./carrera.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'carrera' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'carrera':", err.message);
}

try {
  db.materias = require("./materia.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'materia' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'materia':", err.message);
}

try {
  db.cursos = require("./curso.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'curso' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'curso':", err.message);
}

try {
  db.estudiantes = require("./estudiante.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'estudiante' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'estudiante':", err.message);
}

try {
  db.estudiante_carreras = require("./estudiantecarrera.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'estudiante_carrera' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'estudiante_carrera':", err.message);
}

try {
  db.inscripciones = require("./curso_inscripcion.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'inscripcion' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'inscripcion':", err.message);
}

try {
  db.horarios = require("./horario.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'horario' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'horario':", err.message);
}

// =======================
// Exportamos db
// =======================
module.exports = db;
