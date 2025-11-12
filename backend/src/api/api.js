const express = require("express");

function createApiRouter(pool) {
  const router = express.Router();

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

  router.post("/lotes", async (req, res) => {
    const { nome_lote } = req.body;

    if (!nome_lote || nome_lote.trim() === "") {
      return res.status(400).json({ error: "O nome da estufa é obrigatório." });
    }

    try {
      // 🔹 Gera novo ID incremental no formato L001, L002...
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
        INSERT INTO lotes (lote_id, nome_lote)
        VALUES ($1, $2)
        RETURNING *;
      `;
      const { rows } = await pool.query(query, [novoLoteId, nome_lote]);

      res.status(201).json(rows[0]);
    } catch (err) {
      console.error("Erro ao cadastrar estufa:", err.message);
      res.status(500).json({ error: "Erro no servidor ao cadastrar estufa." });
    }
  });

  return router;
}

module.exports = createApiRouter;
