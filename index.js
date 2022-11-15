require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const connectDB = require("./db/DBconfig");

// cron job
require("./utils/cronJob");

app.use(cookieParser());
app.use(express.json());

// Rutas
app.use("/api/agente/", require("./routes/agentes/agentesRouter.js"));
app.use("/api/auth/", require("./routes/agentes/authRouter.js"));
app.use("/api/fichaje/", require("./routes/fichajes/fichajesRouter.js"));
app.use("/api/google/", require("./routes/google/googleRouter.js"));
app.use("/api/holiday/", require("./routes/holidays/holidaysRoute.js"));
app.use("/api/jobtitle/", require("./routes/jobTitles/jobTitlesRouter.js"));
app.use("/api/role/", require("./routes/roles/rolesRouter.js"));
app.use("/api/ruta/", require("./routes/rutas/rutas.js"));

app.listen(PORT, () => {
  console.log(`Server running in the port ${PORT}`);
});
connectDB();
