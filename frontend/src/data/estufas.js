export async function fetchEstufas() {
  try {
    const response = await fetch("http://localhost:5000/api/leituras");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const chronologicalData = data.reverse();
    const estufasMap = {};

    chronologicalData.forEach((row) => {
      const nome = row.nome_lote || `Estufa ${row.sensor_id}`;
      const temp = parseFloat(row.temp_c) || 0;
      const umid = parseFloat(row.umidade_pct) || 0;
      const bateria = parseFloat(row.bateria_pct) || 0;
      const timestamp = new Date(row.timestamp);

      if (!estufasMap[nome]) {
        estufasMap[nome] = {
          id: row.sensor_id,
          nome: nome,
          temperatura: "0 °C",
          umidade: "0%",
          bateria: "0%",
          graficos: {
            temperatura: [],
            umidade: [],
            bateria: [],
          },
        };
      }

      estufasMap[nome].graficos.temperatura.push({ x: timestamp, y: temp });
      estufasMap[nome].graficos.umidade.push({ x: timestamp, y: umid });
      estufasMap[nome].graficos.bateria.push({ x: timestamp, y: bateria });

      estufasMap[nome].temperatura = `${temp.toFixed(1)} °C`;
      estufasMap[nome].umidade = `${umid.toFixed(1)}%`;
      estufasMap[nome].bateria = `${bateria.toFixed(1)}%`;
    });

    return Object.values(estufasMap);
  } catch (error) {
    console.error("Erro ao buscar estufas:", error);
    return [];
  }
}
