import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export const SizeAndWeightChart = ({ koiGrowthLogs }) => {
  const [formattedData, setFormattedData] = useState({
    dates: [],
    weights: [],
    sizes: [],
  });

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "line",
      id: "koi-log-chart",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
        },
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    grid: {
      show: true,
      borderColor: "#90A4AE",
      strokeDashArray: 0,
      position: "back",
      padding: {
        right: 20,
      },
    },
    colors: ["#581845", "#FFC300"],
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 4,
      colors: ["#581845", "#FFC300"],
      strokeWidth: 2,
      strokeColors: "#fff",
      hover: {
        size: 6,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(1);
      },
      offsetY: -10,
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      x: {
        formatter: function (val) {
          return new Date(val).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          });
        },
      },
      y: {
        formatter: function (val) {
          return val.toFixed(1);
        },
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: function (val) {
          return new Date(val).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        },
        rotateAlways: false,
        rotate: -45,
      },
      title: {
        text: "Date and Time",
      },
    },
    yaxis: [
      {
        title: {
          text: "Weight (kg)",
          style: {
            fontSize: "12px",
          },
        },
        labels: {
          formatter: function (val) {
            return val.toFixed(1);
          },
        },
        min: function (min) {
          return min - 1;
        },
        max: function (max) {
          return max + 1;
        },
      },
      {
        opposite: true,
        title: {
          text: "Size (cm)",
          style: {
            fontSize: "12px",
          },
        },
        labels: {
          formatter: function (val) {
            return val.toFixed(1);
          },
        },
        min: function (min) {
          return min - 1;
        },
        max: function (max) {
          return max + 1;
        },
      },
    ],
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Weight (kg)",
      data: [],
    },
    {
      name: "Size (cm)",
      data: [],
    },
  ]);

  useEffect(() => {
    if (koiGrowthLogs && koiGrowthLogs.length > 0) {
      // Sort logs by date and time
      const sortedLogs = [...koiGrowthLogs].sort((a, b) => {
        const dateA = new Date(`${a.koiLogDate} ${a.logTime}`);
        const dateB = new Date(`${b.koiLogDate} ${b.logTime}`);
        return dateA - dateB;
      });

      const formatted = {
        dates: sortedLogs.map((log) =>
          new Date(`${log.koiLogDate} ${log.logTime}`).getTime()
        ),
        weights: sortedLogs.map((log) => log.weight),
        sizes: sortedLogs.map((log) => log.size),
      };

      setFormattedData(formatted);

      setChartOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: formatted.dates,
        },
      }));

      setSeries([
        {
          name: "Weight (kg)",
          data: formatted.weights,
        },
        {
          name: "Size (cm)",
          data: formatted.sizes,
        },
      ]);
    }
  }, [koiGrowthLogs]);

  if (!koiGrowthLogs?.length) {
    return <p>No koi growth data available</p>;
  }

  return (
    <div>
      <p>
        <br />
        <span style={{ color: "#581845" }}>●</span> Weight (kg)
        <br />
        <span style={{ color: "#FFC300" }}>●</span> Size (cm)
        <br />
      </p>
      <Chart
        options={chartOptions}
        series={series}
        type="line"
        width="100%"
        height={300}
      />
    </div>
  );
};
