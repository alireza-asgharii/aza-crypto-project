import React, { useState } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart7d = ({ data, upDown }) => {
  const [src, setSrc] = useState("");

  setTimeout(() => {
    const canvas = document.querySelector(`#canvas${data.name.split(" ")[0]}`);
    if (canvas) {
      const img = canvas.toDataURL("image/png");
      setSrc(img);
    }
  }, 500);

  return (
    <>
      {src && <img src={src} alt="chart" width={170} height="100%" />}

      <Line
        style={{ display: "none" }}
        id={`canvas${data.name.split(" ")[0]}`}
        data={{
          labels: Array(data.sparkline_in_7d.price.length).fill("-"),
          datasets: [
            {
              id: 1,
              data: data.sparkline_in_7d.price,
              fill: false,
              lineTension: 0,
              backgroundColor: "#fff",
              borderWidth: 1.2,
              borderColor: `${upDown ? "#4fc280" : "#d6455d"}`,
              label: "",
              tickLength: 1,
              tickWidth: 10,
              pointBackgroundColor: "",

              //pointSizeHover
              pointHitRadius: 0,

              //sizePoint
              pointRadius: 0,

              pointStyle: "cross",
            },
          ],
        }}
        width={300}
        height={400}
        options={{
          animation: false,
          maintainAspectRatio: false,
          responsive: true,
          backdropPadding: 10,
          radius: 5,
          hitRadius: 30,
          hoverRadius: 12,
          plugins: {
            decimation: {
              enabled: true
            },
            legend: {
              display: false,
            },
          },

          scales: {
            xAxes: {
              display: false,

              grid: {
                display: false,
              },
            },
            yAxes: {
              display: false,
              grid: {
                display: false,
              },
              // ticks: {
              //   min: Math.min
              //     .apply(null, data.sparkline_in_7d.price)
              //     .toFixed(2)
              //     .toLocaleString(),
              //   max: Math.max
              //     .apply(null, data.sparkline_in_7d.price)
              //     .toFixed(2)
              //     .toLocaleString(),
              //   callback: function (val, index) {
              //     return `$${val}`;
              //   },
              // },
            },
          },
        }}
      />
    </>
  );
};

export default Chart7d;
