const { Pool } = require("pg");
const mqtt = require("mqtt");

const pool = new Pool({
  user: process.env.DB_USER || "myuser",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_DATABASE || "mydatabase",
  password: process.env.DB_PASSWORD || "mypassword",
  port: 5432,
});

//TODO: Add login credentials to the mqtt broker
//TODO: Create a locally run broker with Mosquitto
const mqtt_host = process.env.MQTT_HOST || "mqtt://localhost";
const mqttClient = mqtt.connect(mqtt_host);

mqttClient.on("connect", () => {
  console.log("Conectado ao broker MQTT");
  mqttClient.subscribe("#", (err) => {
    if (err) {
      console.error("Erro ao se inscrever no tópico:", err);
    }
  });
});

mqttClient.on("message", async (topic, payload) => {
  console.log(`Mensagem recebida no tópico ${topic}: ${payload.toString()}`);

  const topicParts = topic.split("/");
  const sensor_id = topicParts[3];

  try {
    const data = JSON.parse(payload.toString());
    const { lote_id, temp_c, umidade_pct, bateria_pct, status } = data;

    // Verifica se o lote existe, se não, cria um novo
    const loteResult = await pool.query(
      "SELECT lote_id FROM lotes WHERE lote_id = $1",
      [lote_id]
    );

    // Log para depuração
    console.log('Resultado da verificação de lote:', loteResult.rows);

    if (loteResult.rows.length === 0) {
      await pool.query(
        "INSERT INTO lotes (lote_id, nome_lote) VALUES ($1, $2)",
        [lote_id, `Lote ${lote_id}`]
      );
      console.log(`Lote ${lote_id} criado.`);
    }

    const query = `
      INSERT INTO medicoes (sensor_id, lote_id, timestamp, temp_c, umidade_pct, bateria_pct, status)
      VALUES ($1, $2, NOW(), $3, $4, $5, $6)
    `;
    const values = [
      sensor_id,
      lote_id,
      temp_c,
      umidade_pct,
      bateria_pct,
      status,
    ];
    console.log("Tentando inserir os seguintes dados no banco de dados:", values);
    await pool.query(query, values);
    console.log("Dados inseridos no banco de dados com sucesso.");
  } catch (err) {
    console.error("Erro ao processar a mensagem MQTT e inserir no banco de dados:", err);
    if (err.code) { // pg specific error
      console.error("Erro SQL:", {
        code: err.code,
        detail: err.detail,
        schema: err.schema,
        table: err.table,
        column: err.column,
        constraint: err.constraint,
      });
    }
  }
});

mqttClient.on("error", (err) => {
  console.error("Erro no cliente MQTT:", err);
});
