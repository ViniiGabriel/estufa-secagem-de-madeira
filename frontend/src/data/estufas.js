// src/data/estufas.js
export async function fetchEstufas() {
  try {
    const response = await fetch("http://localhost:5000/api/leituras");
    const data = await response.json();

    const estufasMap = {};

    data.forEach((row) => {
      const nome = row.nome_lote || `Estufa ${row.sensor_id}`;

      const temp = parseFloat(row.temp_c) || 0;
      const umid = parseFloat(row.umidade_pct) || 0;
      const press = (Math.random() * 1 + 0.5).toFixed(2);

      if (!estufasMap[nome]) {
        estufasMap[nome] = {
          id: row.sensor_id,
          nome: nome,
          temperatura: `${temp.toFixed(1)} °C`,
          umidade: `${umid.toFixed(1)}%`,
          pressao: `${press} atm`,
          graficos: {
            temperatura: [temp],
            umidade: [umid],
            pressao: [parseFloat(press)],
          },
        };
      } else {
        estufasMap[nome].graficos.temperatura.push(temp);
        estufasMap[nome].graficos.umidade.push(umid);
        estufasMap[nome].graficos.pressao.push(parseFloat(press));
      }
    });

    return Object.values(estufasMap);
  } catch (error) {
    console.error("Erro ao buscar estufas:", error);
    return [];
  }
}
