const express = require("express");

function createApiRouter(pool) {
  const router = express.Router();

  // ✅ Rota para listar todos os lotes
  router.get("/lotes", async (req, res) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM lotes ORDER BY lote_id ASC"
      );
      res.json(rows);
    } catch (err) {
      console.error("Erro ao buscar lotes:", err.message);
      res.status(500).json({ error: "Erro ao buscar lotes." });
    }
  });

  // ✅ Rota para buscar últimas leituras
  router.get("/leituras", async (req, res) => {
    try {
      const query = `
        SELECT
          m.sensor_id,
          m.timestamp,
          m.temp_c,
          m.umidade_pct,
          m.bateria_pct,
          m.status,
          l.lote_id,
          l.nome_lote
        FROM medicoes m
        JOIN lotes l ON m.lote_id = l.lote_id
        ORDER BY m.timestamp DESC
        LIMIT 100;
      `;
      const { rows } = await pool.query(query);
      res.json(rows);
    } catch (err) {
      console.error("Erro ao executar a query SQL:", err.message);
      res.status(500).send("Erro no servidor ao buscar dados.");
    }
  });

  // ✅ Rota para cadastrar novo lote
  router.post("/lotes", async (req, res) => {
    const { nome_lote, endereco_mac } = req.body;

    if (!nome_lote || nome_lote.trim() === "") {
      return res.status(400).json({ error: "O nome da estufa é obrigatório." });
    }
    if (!endereco_mac || endereco_mac.trim() === "") {
      return res.status(400).json({ error: "O endereço MAC é obrigatório." });
    }

    const macRegex = /^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/;
    if (!macRegex.test(endereco_mac)) {
      return res.status(400).json({ error: "Endereço MAC inválido." });
    }

    try {
      const existeMac = await pool.query(
        "SELECT * FROM lotes WHERE endereco_mac = $1",
        [endereco_mac]
      );

      if (existeMac.rows.length > 0) {
        return res
          .status(409)
          .json({ error: "Esse endereço MAC já está cadastrado." });
      }

      const ultimoLoteResult = await pool.query(
        "SELECT lote_id FROM lotes ORDER BY lote_id DESC LIMIT 1"
      );

      let novoLoteId;
      if (ultimoLoteResult.rows.length > 0) {
        const ultimoId = ultimoLoteResult.rows[0].lote_id;
        const numero = parseInt(ultimoId.replace("L", ""), 10);
        novoLoteId = "L" + String(numero + 1).padStart(3, "0");
      } else {
        novoLoteId = "L001";
      }

      const query = `
        INSERT INTO lotes (lote_id, nome_lote, endereco_mac)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const { rows } = await pool.query(query, [
        novoLoteId,
        nome_lote,
        endereco_mac,
      ]);

      res.status(201).json(rows[0]);
    } catch (err) {
      console.error("Erro ao cadastrar estufa:", err.message);
      res.status(500).json({ error: "Erro no servidor ao cadastrar estufa." });
    }
  });

  // 👇 ESSA LINHA É FUNDAMENTAL
  return router;
}

module.exports = createApiRouter;
