import React from "react";
import { Doughnut } from "react-chartjs-2";

function Chart({ labels, chartData, header = "" }) {
  const data = {
    labels: labels,
    datasets: [
      {
        data: chartData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-30 h-25 pb-4">
      <span className="h6 font-weight-bold">{header}</span>
      <Doughnut data={data} onClick={(e) => onClick(e)} />
    </div>
  );
}

export default Chart;
