require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const connectDB = require("./db/DBconfig");

app.use(express.json());

// Rutas
app.use("/api/agente/", require("./routes/agentes/agentesRouter.js"));
app.use("/api/auth/", require("./routes/agentes/authLoginRouter.js"));
app.use("/api/jobtitle/", require("./routes/jobTitles/jobTitlesRouter.js"));
app.use("/api/role/", require("./routes/roles/rolesRouter.js"))
app.use("/api/ruta/", require("./routes/rutas/rutas.js"))

app.listen(PORT, () => {
  console.log(`Server running in the port ${PORT}`);
});
connectDB();
