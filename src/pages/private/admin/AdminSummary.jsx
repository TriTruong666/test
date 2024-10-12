import { faker } from "@faker-js/faker";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Dashnav } from "../../../components/navbar/Dashnav";
import "../../../styles/dashboard/adminsummary/adminsummary.css";

export const Summary = () => {
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);

  // Generate fake data for the charts
  const generateFakeRevenueData = () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        date: faker.date.past().toLocaleDateString(),
        revenue: faker.number.int({ min: 1000, max: 5000 }),
      });
    }
    return data;
  };

  const chartData = generateFakeRevenueData();

  // Revenue area chart configuration (right)
  const [revenueChartOptions, setRevenueChartOptions] = useState({
    chart: {
      type: "area", // Changed from 'line' to 'area'
      id: "revenue-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: chartData.map((data) => data.date),
    },
    colors: ["#006400"], // Set the color to dark green
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    tooltip: {
      enabled: true,
      theme: "dark",
    },
    stroke: {
      curve: "smooth",
    },
  });

  const [revenueChartSeries, setRevenueChartSeries] = useState([
    {
      name: "Revenue",
      data: chartData.map((data) => data.revenue),
    },
  ]);

  // Pie chart configuration (left) for accounts
  const [accountChartOptions, setAccountChartOptions] = useState({
    chart: {
      type: "pie",
    },
    labels: ["Admin", "Member", "Guest"], // Account types
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  const [accountChartSeries, setAccountChartSeries] = useState([10, 30, 60]); // Number of Admins, Members, Guests

  // Fake data for different charts in section2
  const generateBarChartData = () => {
    return {
      categories: Array.from({ length: 5 }, () => faker.commerce.department()),
      series: [
        faker.number.int({ min: 50, max: 150 }),
        faker.number.int({ min: 50, max: 150 }),
        faker.number.int({ min: 50, max: 150 }),
        faker.number.int({ min: 50, max: 150 }),
        faker.number.int({ min: 50, max: 150 }),
      ],
    };
  };

  const barChartData = generateBarChartData();

  const [barChartOptions, setBarChartOptions] = useState({
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: barChartData.categories,
    },
    colors: ["#1E90FF"], // Blue for bar chart
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 5,
      },
    },
  });

  const [barChartSeries, setBarChartSeries] = useState([
    {
      name: "Products",
      data: barChartData.series,
    },
  ]);

  const radarChartData = {
    labels: ["Design", "Functionality", "Performance", "Security", "Usability"],
    series: [
      faker.number.int({ min: 30, max: 100 }),
      faker.number.int({ min: 30, max: 100 }),
      faker.number.int({ min: 30, max: 100 }),
      faker.number.int({ min: 30, max: 100 }),
      faker.number.int({ min: 30, max: 100 }),
    ],
  };

  const [radarChartOptions, setRadarChartOptions] = useState({
    chart: {
      type: "radar",
    },
    colors: ["#FF6347"], // Tomato color for radar chart
    fill: {
      opacity: 0.3,
    },
  });

  const [radarChartSeries, setRadarChartSeries] = useState([
    {
      name: "Features",
      data: radarChartData.series,
    },
  ]);

  const [donutChartOptions, setDonutChartOptions] = useState({
    chart: {
      type: "donut",
    },
    labels: ["Blogs", "Articles", "Tutorials"],
    colors: ["#FF4500", "#32CD32", "#1E90FF"], // Use different colors
  });

  const [donutChartSeries, setDonutChartSeries] = useState([40, 30, 30]);

  return (
    <div className="admin-summary-container">
      <Dashnav />
      <div className="summary">
        <div className="admin-summary-header">
          <strong>Summary</strong>
        </div>
        <div className="section1">
          <div className="item">
            <strong>Welcome admin</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
              minima aliquam totam sint cupiditate voluptas minus facere, veniam
              quasi autem voluptates libero ea recusandae numquam suscipit
              mollitia nam rem maiores.
            </p>
          </div>
          <div className="info">
            <div className="small-item">
              <div>
                <strong>{formatPrice(2500)}</strong>
                <p>Revenue</p>
              </div>
              <i className="bx bx-dollar"></i>
            </div>
            <div className="small-item">
              <div>
                <strong>20</strong>
                <p>Total orders</p>
              </div>
              <i className="bx bx-credit-card"></i>
            </div>
          </div>
        </div>
        <div className="section2">
          <div className="item">
            <strong>Total active account</strong>
            {/* Bar Chart for Active Accounts
            <Chart
              options={barChartOptions}
              series={barChartSeries}
              type="radar"
              width="100%"
              height="200"
            /> */}
          </div>
          <div className="item">
            <strong>Total active products</strong>
            {/* Radar Chart for Product Features */}
            <Chart
              options={radarChartOptions}
              series={radarChartSeries}
              type="radar"
              width="100%"
              height="200"
            />
          </div>
          <div className="item">
            <strong>Total active blogs</strong>
            {/* Donut Chart for Blog Distribution */}
            <Chart
              options={donutChartOptions}
              series={donutChartSeries}
              type="donut"
              width="100%"
              height="200"
            />
          </div>
        </div>
        <div className="chart-container">
          <div className="charts">
            {/* Left Pie Chart for Account Types */}
            <div className="left-chart">
              <h3>Account Distribution</h3>
              <Chart
                options={accountChartOptions}
                series={accountChartSeries}
                type="pie"
                width="100%"
                height="300"
              />
            </div>
            {/* Right Area Chart for Revenue */}
            <div className="right-chart">
              <h3>Revenue</h3>
              <Chart
                options={revenueChartOptions}
                series={revenueChartSeries}
                type="area"
                width="100%"
                height="300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
