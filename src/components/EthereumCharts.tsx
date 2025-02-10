import { useEffect, useRef, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface ChartProps {
  title: string;
  labels: string[];
  dataPoints: number[];
  type: "line" | "bar";
}

export const EthereumCharts: React.FC<ChartProps> = ({ title, labels, dataPoints, type }) => {
  const chartRef = useRef<any>(null);
  const [theme, setTheme] = useState(document.documentElement.classList.contains("dark") ? "dark" : "light");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
      setTheme(newTheme);

      if (chartRef.current?.chart) {
        chartRef.current.chart.update("none");
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const createGradientFill = (ctx: CanvasRenderingContext2D, chartArea: any) => {
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);

    if (theme === "dark") {
      gradient.addColorStop(0, "rgba(111, 65, 210, 0.5)"); 
      gradient.addColorStop(1, "rgba(20, 20, 20, 0.2)"); 
    } else {
      gradient.addColorStop(0, "rgba(111, 65, 210, 0.5)"); 
      gradient.addColorStop(1, "rgba(211, 189, 255, 0.1)"); 

    }

    return gradient;
  };

  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataPoints,
        borderColor: theme === "dark" ? "#6F41D2" : "#8C52FF",
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return theme === "dark" ? "rgba(111, 65, 210, 0.3)" : "rgba(140, 82, 255, 0.3)";
          }
          return createGradientFill(ctx, chartArea);
        },
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: "start",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
          color: theme === "dark" ? "#E0E0E0" : "#333",
        },
        ticks: {
          color: theme === "dark" ? "#E0E0E0" : "#333",
        },
        grid: {
          color: theme === "dark" ? "#444" : "rgba(0, 0, 0, 0.05)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
          color: theme === "dark" ? "#E0E0E0" : "#333",
        },
        ticks: {
          color: theme === "dark" ? "#E0E0E0" : "#333",
        },
        grid: {
          color: theme === "dark" ? "#444" : "rgba(0, 0, 0, 0.05)",
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-[#0A0A0A] p-6 rounded-lg shadow-md border border-gray-300 dark:border-[#222] mt-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h2>
      <div className="h-[400px]">
        {type === "line" ? (
          <Line ref={chartRef} data={data} options={options} />
        ) : (
          <Bar ref={chartRef} data={data} options={options} />
        )}
      </div>
    </div>
  );
};
