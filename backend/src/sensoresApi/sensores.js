const express = require("express");

function createSensoresRouter(pool) {
  const router = express.Router();

  console.log("✅ [sensoresApi] Router de sensores carregado");

  // 📋 GET - Listar sensores (com filtro opcional por lote_id)
  router.get("/", async (req, res) => {
    const { lote_id } = req.query;
    console.log("[GET /sensores] lote_id recebido:", lote_id);

    try {
      let query = `
        SELECT 
          s.sensor_id, 
          s.endereco_mac, 
          s.lote_id, 
          l.nome_lote, 
          s.data_cadastro
        FROM sensores s
        LEFT JOIN lotes l ON s.lote_id = l.lote_id
      `;
      const params = [];

      if (lote_id && lote_id.trim() !== "") {
        query += " WHERE s.lote_id = $1";
        params.push(lote_id);
      }

      query += " ORDER BY s.sensor_id ASC;";

      console.log("[GET /sensores] SQL:", query.trim(), "PARAMS:", params);
      const { rows } = await pool.query(query, params);
      res.json(rows);
    } catch (err) {
      console.error("❌ Erro ao buscar sensores:", err);
      res.status(500).json({ error: "Erro ao buscar sensores." });
    }
  });

  // ➕ POST - Adicionar novo sensor
  router.post("/", async (req, res) => {
    const { endereco_mac, lote_id } = req.body;
    console.log("[POST /sensores] Dados recebidos:", req.body);

    if (!endereco_mac || !lote_id) {
      return res
        .status(400)
        .json({ error: "Endereço MAC e lote são obrigatórios." });
    }

    // Verificação básica de formato MAC
    const macRegex = /^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/;
    if (!macRegex.test(endereco_mac)) {
      return res.status(400).json({ error: "Formato de MAC inválido." });
    }

    try {
      const result = await pool.query(
        `INSERT INTO sensores (endereco_mac, lote_id, data_cadastro)
         VALUES ($1, $2, NOW())
         RETURNING *`,
        [endereco_mac, lote_id]
      );

      console.log("[POST /sensores] Sensor cadastrado:", result.rows[0]);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      if (err.code === "23505") {
        // erro de duplicidade (MAC já existente)
        return res.status(409).json({ error: "Este MAC já está cadastrado." });
      }
      console.error("❌ Erro ao cadastrar sensor:", err);
      res.status(500).json({ error: "Erro ao cadastrar sensor." });
    }
  });

  // ❌ DELETE - Remover sensor
  router.delete("/:sensor_id", async (req, res) => {
    const { sensor_id } = req.params;
    console.log("[DELETE /sensores]", sensor_id);

    try {
      const result = await pool.query(
        "DELETE FROM sensores WHERE sensor_id = $1 RETURNING *",
        [sensor_id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Sensor não encontrado." });
      }

      console.log("[DELETE /sensores] Sensor excluído:", result.rows[0]);
      res.json({ message: "Sensor excluído com sucesso." });
    } catch (err) {
      console.error("❌ Erro ao excluir sensor:", err);
      res.status(500).json({ error: "Erro ao excluir sensor." });
    }
  });

  return router;
}

module.exports = createSensoresRouter;
