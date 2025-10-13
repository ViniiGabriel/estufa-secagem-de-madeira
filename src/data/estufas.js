const estufas = [
  {
    id: 1,
    nome: "Estufa 1",
    temperatura: "60 °C",
    umidade: "14%",
    pressao: "1 atm",
    graficos: {
      temperatura: [100, 20, 50, 55, 60],
      umidade: [20, 40, 10, 70, 40],
      pressao: [70, 10, 20, 55, 60],
    },
  },
  {
    id: 2,
    nome: "Estufa 2",
    temperatura: "45 °C",
    umidade: "18%",
    pressao: "0.9 atm",
    graficos: {
      temperatura: [40, 50, 45, 47, 46],
      umidade: [30, 35, 40, 32, 30],
      pressao: [90, 85, 88, 89, 87],
    },
  },
  {
    id: 3,
    nome: "Estufa 3",
    temperatura: "65 °C",
    umidade: "20%",
    pressao: "0.3 atm",
    graficos: {
      temperatura: [25, 10, 25, 57, 26],
      umidade: [20, 55, 40, 22, 90],
      pressao: [44, 80, 28, 20, 17],
    },
  },
];

export default estufas;
