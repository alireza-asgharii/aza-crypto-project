import React, { useEffect } from "react";
import "chartjs-adapter-date-fns";


//Chartjs
import { Line } from "react-chartjs-2";

//styls
import styles from "../../styles/chartCoin.module.scss";

//helper
import { toLocaleS } from "../../helper/function";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { useGetCoinChart } from "../../hooks/useQueries";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,

  //for time scale
  TimeScale
);

let width, height, gradient;
function getGradient(ctx, chartArea) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, "#ea3943");
    gradient.addColorStop(0.5, "#16c784");
    // gradient.addColorStop(1, 'blue');
  }

  return gradient;
}

//Custom Tooltip
const footer = (tooltipItems) => {
  let sum = 0;

  tooltipItems.forEach(function (tooltipItem) {
    sum += tooltipItem.parsed.y;
  });
  return `Price: $${toLocaleS(sum)}`;
};

const ChartCoin = ({ id, range }) => {
  //Chart Query 
  const {data, isLoading, isError} = useGetCoinChart(id, range)

  let x = [];
  let y = [];

  if (data?.prices) {
    for (let i of data.prices) {
      x.push(i[0]);
    }
    for (let i of data.prices) {
      y.push(i[1]);
    }
  }
  return (
    <>
      <div className={isLoading || isError ? styles.chartLoading : ""}>
        <Line
          data={{
            labels: x,
            datasets: [
              {
                id: 1,
                data: y,
                fill: true,
                lineTension: 0,
                backgroundColor: "#fff",
                borderWidth: 2.5,
                borderColor: function (context) {
                  const chart = context.chart;
                  const { ctx, chartArea } = chart;
                  if (!chartArea) {
                    // This case happens on initial chart load
                    return;
                  }
                  return getGradient(ctx, chartArea);
                },
                label: "",
                tickLength: 1,
                tickWidth: 10,
                pointBackgroundColor: "#fff",

                //pointSizeHover
                pointHitRadius: 2,

                //sizePoint. for Performance set in 0
                pointRadius: 0,

                //style point
                pointStyle: "circle",

                pointHoverRadius: 5,
              },
            ],
          }}
          width={300}
          height={400}
          options={{
            spanGaps: true,
            maintainAspectRatio: false,
            responsive: true,
            backdropPadding: 10,
            radius: 5,
            hitRadius: 30,
            hoverRadius: 12,
            plugins: {
              tooltip: {
                callbacks: {
                  footer: footer,
                },
              },
              legend: {
                display: false,
              },
            },
            interaction: {
              intersect: false,
              mode: "index",
            },

            scales: {
              xAxes: {
                display: true,
                type: "time",
                time: {
                  unit: () => {
                    if (range === 1) {
                      return "hour";
                    } else if (range === 7 || range === 14 || range === 30) {
                      return "day";
                    } else if (range === 90) {
                      return "week";
                    } else if (range === 180 || range === 360) {
                      return "month";
                    } else if (range === "max") {
                      return "year";
                    }
                  },
                  displayFormats: {
                    quarter: "MMM YYYY",
                  },
                },

                ticks: {
                  callback: (value, index) => {
                    // return `${new Date(value).toISOString()}`;
                    if (range === 14 || range === 30) {
                      return index % 2 !== 1 ? value : null;
                    }
                    return value;
                  },
                },
                grid: {
                  display: false,
                },
              },
              yAxes: {
                display: true,
                ticks: {
                  min: toLocaleS(Math.min.apply(null, y).toFixed(2)),
                  max: toLocaleS(Math.max.apply(null, y).toFixed(2)),
                  callback: (val, index) => {
                    return `$${toLocaleS(val)}`;
                  },
                },
                grid: {
                  color: "#6560603c",
                },
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default ChartCoin;
