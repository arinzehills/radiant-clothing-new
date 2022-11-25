import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const RevenueChart = () => {
  const revenueByMonths = {
    labels: [
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
    ],
    data: [250, 200, 300, 280, 100, 220, 310, 190, 200, 120, 250, 350],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      yAxes: {
        grid: {
          display: false,
          drawBorder: false,
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
    elements: {
      bar: {
        backgroundColor: "#ff724a",
        borderRadius: 20,
        borderSkipped: "bottom",
      },
    },
  };
  const chartData = {
    labels: revenueByMonths.labels,
    datasets: [
      {
        label: "Revenue",
        data: revenueByMonths.data,
      },
    ],
  };
  return (
    <>
      <div className="revenue_chart">
        <h1>Revenue by months charts</h1>
        <div>
          <Bar height={`250px`} data={chartData} options={chartOptions} />
        </div>
      </div>
    </>
  );
};

export default RevenueChart;
