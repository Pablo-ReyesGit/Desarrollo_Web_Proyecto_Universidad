// Cargamos el archivo de configuración que contiene los datos de conexión a la base de datos
const dbConfig = require("../config/db.config.js");

// Importamos Sequelize, el ORM que nos permite trabajar con PostgreSQL como objetos JS
const Sequelize = require("sequelize");

// Creamos una instancia de Sequelize con los parámetros de conexión, incluyendo SSL para NeonDB
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: {
      require: true, // 👈 corregido: antes decía "requere"
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

// Creamos un objeto `db` que exportaremos para acceder a Sequelize y los modelos desde otras partes del proyecto
const db = {};

// Asignamos la clase Sequelize al objeto `db`, útil si se requiere usar métodos del ORM manualmente
db.Sequelize = Sequelize;

// Asignamos la instancia de conexión Sequelize con los parámetros definidos
db.sequelize = sequelize;

// Importamos modelos y los registramos en el objeto `db`
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
  db.administradores = require("./administrador.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'administrador' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'administrador':", err.message);
}

try {
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
//db.notificacionpago = require("./notificacion_pago.model.js")(sequelize, Sequelize);

try {
  db.tipo_notificacion = require("./tipo_notificacion.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'tipo_notificacion' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'tipo_notificacion':", err.message);
}

// Aquí puedes seguir importando otros modelos de forma similar
// Ejemplo: db.productos = require("./producto.model.js")(sequelize, Sequelize);

// Exportamos el objeto `db` para que pueda ser usado por otros módulos (por ejemplo, en el `server.js`)
module.exports = db;
