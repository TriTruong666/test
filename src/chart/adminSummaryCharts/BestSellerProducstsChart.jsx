import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export const BestSellerProductsChart = ({ products }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar",
      id: "best-seller-chart",
      toolbar: { show: true },
    },
    title: {
      text: "Top 5 best seller products",
      align: "center",
    },
    xaxis: { categories: [] },
    colors: ["#FF5733"],
    plotOptions: { bar: { horizontal: false, columnWidth: "55%" } },
    dataLabels: { enabled: false },
    tooltip: { enabled: true, theme: "dark" },
  });

  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      // Process products to get the best-selling ones
      const bestSellerProducts = products
        .map((product) => ({
          ...product,
          totalQuantity: (product.orderDetails || []).reduce(
            (sum, detail) => sum + detail.quantity,
            0
          ),
        }))
        .sort((a, b) => b.totalQuantity - a.totalQuantity)
        .slice(0, 5);

      // Set chart data
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          categories: bestSellerProducts.map(
            (product) => product.productName.split(" ")[0]
          ),
        },
      }));

      setChartSeries([
        {
          name: "Total Quantity Sold",
          data: bestSellerProducts.map((product) => product.totalQuantity),
        },
      ]);
    }
  }, [products]);

  return (
    <>
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
