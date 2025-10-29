const { Pool } = require("pg");
const mqtt = require("mqtt");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "estufa",
  password: "1010",
  port: 5432,
});

//TODO: Add login credentials to the mqtt broker
//TODO: Create a locally run broker with Mosquitto
const mqttClient = mqtt.connect("mqtt://broker.hivemq.com");

mqttClient.on("connect", () => {
  console.log("Conectado ao broker MQTT");
  mqttClient.subscribe("Estufa/+/sensor/+", (err) => {
    if (err) {
      console.error("Erro ao se inscrever no tópico:", err);
    }
  });
});

mqttClient.on("message", async (topic, payload) => {
  console.log(`Mensagem recebida no tópico ${topic}: ${payload.toString()}`);

  const topicParts = topic.split("/");
  const sensor_id = topicParts[2];

  try {
    const data = JSON.parse(payload.toString());
    const { lote_id, temp_c, umidade_pct, bateria_pct, status } = data;

    // Verifica se o lote existe, se não, cria um novo
    const loteResult = await pool.query(
      "SELECT lote_id FROM lotes WHERE lote_id = $1",
      [lote_id]
    );
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
    await pool.query(query, values);
    console.log("Dados inseridos no banco de dados com sucesso.");
  } catch (err) {
    console.error(
      "Erro ao processar a mensagem MQTT e inserir no banco de dados:",
      err.message
    );
  }
});

mqttClient.on("error", (err) => {
  console.error("Erro no cliente MQTT:", err);
});
