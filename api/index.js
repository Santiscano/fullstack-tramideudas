require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const connectDB = require("./db/DBconfig");

const moment = require("moment-timezone");
moment.tz.setDefault("Europe/Madrid");
process.env.TZ='Europe/Madrid'

// cron job
require("./utils/cronJob");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(
  cors({
    origin: process.env.PORT_FRONT_ORIGIN,
    credentials: true,
    exposedHeaders: ["Set-Cookie", "Date", "ETag"],
  })
);
app.use(fileUpload());

// Rutas
app.use("/api/agente/", require("./routes/agentes/agentesRouter.js"));
app.use("/api/auth/", require("./routes/agentes/authRouter.js"));
app.use("/api/client/", require("./routes/clients/clientsRouter.js"));
app.use("/api/expedientes/", require("./routes/expedientes/expedientesRouter.js"));
app.use("/api/pagos/", require("./routes/payments/paymentsRouter.js"));
app.use("/api/previsionpagos/", require("./routes/expedientes/previsionPagosRouter.js"));
app.use("/api/noteexpedientes/", require("./routes/expedientes/noteExpedientesRouter.js"));
app.use("/api/calls/", require("./routes/calls/callsRouter.js"));
app.use("/api/historychange/", require("./routes/clients/historyChangesRouter.js"));
app.use("/api/noteclient/", require("./routes/clients/noteClientsRouter.js"));
app.use("/api/documento/", require("./routes/documentos/documentosRouter.js"));
app.use("/api/fichaje/", require("./routes/fichajes/fichajesRouter.js"));
app.use("/api/google/", require("./routes/google/googleRouter.js"));
app.use("/api/holiday/", require("./routes/holidays/holidaysRoute.js"));
app.use("/api/jobtitle/", require("./routes/jobTitles/jobTitlesRouter.js"));
app.use("/api/products/", require("./routes/products/productsRouter.js"));
app.use("/api/role/", require("./routes/roles/rolesRouter.js"));
app.use("/api/ruta/", require("./routes/rutas/rutas.js"));

app.listen(PORT, () => {
  console.log(`Server running in the port ${PORT}`);
});
connectDB();
