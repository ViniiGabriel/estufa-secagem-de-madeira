const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "estufa",
  password: "1010",
  port: 5432,
});

const createLoginRouter = require("./src/loginApi/login.js");
const loginRouter = createLoginRouter(pool);
app.use("/login", loginRouter);

const createRegisterRouter = require("./src/registerApi/register.js");
const registerRouter = createRegisterRouter(pool);
app.use("/register", registerRouter);

const createApiRouter = require("./src/api/api.js");
const apiRouter = createApiRouter(pool);
app.use("/api", apiRouter);

// ✅ Adiciona aqui o router de sensores
const createSensoresRouter = require("./src/sensoresApi/sensores.js");
const sensoresRouter = createSensoresRouter(pool);
app.use("/api/sensores", sensoresRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
