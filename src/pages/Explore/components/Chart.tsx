import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartType } from "../../../api/homeApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface Props {
  data: ChartType | undefined;
}

export const Chart: React.FC<Props> = ({ data }) => {
  const itemsEntries = data?.chart.items
    ? Object.entries(data.chart.items)
    : [];

  const colors = ["rgb(74, 144, 226)", "rgb(39, 189, 156)", "rgb(227, 80, 80)"];
  const chartDatas = itemsEntries.map((item, index) => ({
    data: item[1].map((item) => item.counter),
    borderColor: colors[index],
    tension: 0.4,
    borderWidth: 2,
    pointHoverRadius: 6,
    pointRadius: 0,
    pointHoverBorderWidth: 3,
    pointBackgroundColor: "white",
  }));
  const chartLabels = data?.chart.times.map((item) => item.hour);

  const dataChart = {
    labels: chartLabels,
    datasets: chartDatas,
  };

  return (
    <div className="flex-1 text-white">
      <Line
        data={dataChart}
        options={{
          scales: {
            y: {
              ticks: {
                display: false,
              },
              grid: {
                color: "rgb(79, 79, 79)",
                drawTicks: false,
              },
              border: {
                dash: [3, 4],
                display: false,
              },
            },
            x: {
              ticks: {
                callback: function (_, index) {
                  if (index % 2 !== 0) return;

                  return `${chartLabels?.[index]}:00`;
                },
                color: "rgb(154, 151, 156)",
              },
              grid: {
                display: false,
              },
            },
          },
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          hover: {
            mode: "dataset",
            intersect: false,
          },
        }}
      />
    </div>
  );
};
