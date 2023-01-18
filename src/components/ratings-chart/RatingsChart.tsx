import { RatingsDistribution } from "../../types";
import { Card } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  Tooltip,
  LinearScale,
  CategoryScale,
} from "chart.js";

Chart.register(BarElement, Tooltip, LinearScale, CategoryScale);

export interface RatingsChartProps {
  ratingDistribution: RatingsDistribution;
}

const getLabel = (starCount: number) => {
  return new Array(starCount).fill("☆").join("");
};

export const RatingsChart = (props: RatingsChartProps) => {
  const { ratingDistribution } = props;

  const options = {
    indexAxis: "y" as "y",
    elements: {
      bar: {
        borderWidth: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  const data = {
    labels: Object.keys(ratingDistribution).map((value) =>
      getLabel(Number(value))
    ),
    datasets: [
      {
        id: 1,
        label: "Rating Count",
        data: Object.values(ratingDistribution),
        borderColor: "rgba(255, 140, 0, 1)",
        backgroundColor: "rgba(255, 140, 0, 1)",
      },
    ],
  };

  return (
    <Card
      sx={{
        padding: "12px",
        flex: "1 1 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "stretch",
      }}
      variant={"outlined"}
    >
      <Bar options={options} data={data} />
    </Card>
  );
};
