// Importamos el modulo express 
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "UMG Web Universidad" });
});

try {
  require("./app/routes/usuario.routes.js")(app);
  console.log("✅ usuario.routes.js cargado correctamente");
} catch (err) {
  console.error("❌ Error al cargar usuario.routes.js:", err.message);
}

try {
  require("./app/routes/docente.routes.js")(app);
  console.log("✅ docente.routes.js cargado correctamente");
} catch (err) {
  console.error("❌ Error al cargar docente.routes.js:", err.message);
}

try {
  require("./app/routes/carrera.routes.js")(app);
  console.log("✅ carrera.routes.js cargado correctamente");
} catch (err) {
  console.error("❌ Error al cargar carrera.routes.js:", err.message);
}
// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado correctamente en el puerto ${PORT}.`);
}); 