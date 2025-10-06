import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";

function Graph({ graphData, graphType }) {
  const chartRef = useRef(null);
  const myChartRef = useRef(null);

  useEffect(() => {
    <Graph />;
    const ctx = chartRef.current.getContext("2d");

    const data = {
      labels: ["0s", "10s", "20s", "30s", "40s"],
      datasets: [
        {
          label: graphType,
          data: graphData,
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
              text: graphType,
            },
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      myChartRef.current.destroy();
    };
  }, [graphData]);

  return (
    <div className="w-[30%] h-[50%] bg-white rounded-xl flex shadow-lg p-4">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default Graph;
