import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

function Graph({ graphData, graphType }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current && graphData.length > 0) {
      const ctx = chartRef.current.getContext("2d");
      const lastFiveDataPoints = graphData.slice(-5);

      const labels = lastFiveDataPoints.map((point) =>
        format(new Date(point.x), "HH:mm")
      );
      const dataValues = lastFiveDataPoints.map((point) => point.y);

      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: graphType,
              data: dataValues,
              borderColor: "rgb(75, 192, 192)",
              borderWidth: 3,
              fill: false,
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: "category",
              title: {
                display: true,
                text: "Horário da Medição",
              },
            },
            y: {
              title: {
                display: true,
                text: graphType,
              },
              beginAtZero: false,
              ticks: {
                maxTicksLimit: 6,
              },
            },
          },
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          adapters: {
            date: {
              locale: ptBR,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [graphData, graphType]);

  return (
    <div className="w-[30%] h-[50%] bg-white rounded-xl flex shadow-lg p-4">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default Graph;
