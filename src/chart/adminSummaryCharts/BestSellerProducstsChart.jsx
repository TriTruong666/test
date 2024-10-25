import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export const BestSellerProductsChart = ({ bestSellerProducts }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar",
      id: "best-seller-chart",
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      categories: [],
    },
    colors: ["#FF5733"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      theme: "dark",
    },
  });

  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    if (bestSellerProducts && bestSellerProducts.length > 0) {
      const categories = bestSellerProducts.map(
        (product) => product.productName
      );
      const data = bestSellerProducts.map((product) => product.totalQuantity);

      setChartOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          categories,
        },
      }));

      setChartSeries([
        {
          name: "Total Quantity Sold",
          data,
        },
      ]);
    }
  }, [bestSellerProducts]);

  return (
    <>
      <strong>Best Seller Products</strong>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        width="100%"
        height="350"
      />
    </>
  );
};
