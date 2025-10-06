import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";

function Graph() {
  const chartRef = useRef(null);
  const myChartRef = useRef(null);

  let temperatureData = [100, 20, 50, 55, 60];

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const data = {
      labels: ["0s", "10s", "20s", "30s", "40s"],
      datasets: [
        {
          label: "Temperatura (°C)",
          data: temperatureData,
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 3,
          fill: false,
          tension: 0.3,
        },
      ],
    };

    myChartRef.current = new Chart(ctx, {
      type: "line",
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        onClick: (event) => {
          const canvasPosition = getRelativePosition(event, myChartRef.current);
          const dataX = myChartRef.current.scales.x.getValueForPixel(
            canvasPosition.x
          );
          const dataY = myChartRef.current.scales.y.getValueForPixel(
            canvasPosition.y
          );
          console.log("Clique detectado:", { dataX, dataY });
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Tempo (s)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Temperatura (°C)",
            },
            beginAtZero: true,
          },
        },
      },
    });

    // Destruir gráfico ao desmontar
    return () => {
      myChartRef.current.destroy();
    };
  }, [temperatureData]);

  return (
    <div className="w-[95%] h-[50%] bg-white rounded-xl shadow-lg p-4">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default Graph;
