import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as TooltipChart,
  Legend,
} from "chart.js";
import { ChartType } from "../../../api/homeApi";
import { memo, useState } from "react";
import { Tooltip } from "./Tooltip";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  TooltipChart,
  Legend,
);

export interface TooltipData {
  img: string;
  songName: string;
  artistName: string;
  percent: number;
}

interface Props {
  data: ChartType | undefined;
  tooltipData: TooltipData[] | undefined;
}

export interface Tooltip {
  isVisible: boolean;
  top: number;
  left: number;
  bgColor: string;
  type: "red" | "green" | "blue";
}

export const Chart: React.FC<Props> = ({ data, tooltipData }) => {
  const [tooltip, setTooltip] = useState<Tooltip>({
    isVisible: false,
    left: 0,
    top: 0,
    bgColor: "",
    type: "blue",
  });

  let tooltipDataProp: TooltipData | undefined = undefined;

  if (tooltip.type === "blue") {
    tooltipDataProp = tooltipData?.[0];
  } else if (tooltip.type === "green") {
    tooltipDataProp = tooltipData?.[1];
  } else {
    tooltipDataProp = tooltipData?.[2];
  }

  return (
    <div className="hidden flex-1 text-white sm:block">
      <NewLine data={data} setTooltip={setTooltip} />
      <Tooltip tooltip={tooltip} data={tooltipDataProp} />
    </div>
  );
};

interface NewLineProps {
  data: ChartType | undefined;
  setTooltip: React.Dispatch<React.SetStateAction<Tooltip>>;
}

const NewLine: React.FC<NewLineProps> = memo(({ data, setTooltip }) => {
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
          tooltip: {
            enabled: false,
            external: ({ chart, tooltip }) => {
              let bgColor = "";
              if (tooltip.dataPoints[0].datasetIndex === 0) {
                setTooltip((prev) => ({ ...prev, type: "blue" }));
                bgColor = "rgb(74, 144, 226)";
              } else if (tooltip.dataPoints[0].datasetIndex === 1) {
                setTooltip((prev) => ({ ...prev, type: "green" }));
                bgColor = "rgb(39, 189, 156)";
              } else {
                setTooltip((prev) => ({ ...prev, type: "red" }));
                bgColor = "rgb(227, 80, 80)";
              }
              if (tooltip.opacity === 0) {
                setTooltip((prev) => ({ ...prev, isVisible: false }));
              } else {
                setTooltip((prev) => ({
                  ...prev,
                  bgColor,
                  isVisible: true,
                  left: chart.canvas.getBoundingClientRect().left + tooltip.x,
                  top: chart.canvas.getBoundingClientRect().top + tooltip.y,
                }));
              }
            },
          },
        },
        hover: {
          mode: "dataset",
          intersect: false,
        },
      }}
    />
  );
});
