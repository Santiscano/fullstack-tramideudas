require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const connectDB = require("./db/DBconfig");

app.use(express.json());

// Rutas
app.use("/api/agente/", require("./routes/agentes/agentesRouter.js"));
app.use("/api/auth/", require("./routes/agentes/authLoginRouter.js"));

app.listen(PORT, () => {
  console.log(`Server running in the port ${PORT}`);
});
connectDB();
