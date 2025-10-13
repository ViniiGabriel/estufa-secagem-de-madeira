const express = require('express');

function createApiRouter(pool) {
    const router = express.Router();

    router.get('/leituras', async (req, res) => {
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
        FROM
          medicoes m
        JOIN
          lotes l ON m.lote_id = l.lote_id
        ORDER BY
          m.timestamp DESC
        LIMIT 100; 
      `;
            const { rows } = await pool.query(query);
            res.json(rows);
        } catch (err) {
            console.error("Erro ao executar a query SQL:", err.message);
            res.status(500).send('Erro no servidor ao buscar dados.');
        }
    });

    return router;
}

module.exports = createApiRouter;
