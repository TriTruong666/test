import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { BestSellerProductsChart } from "../../../chart/adminSummaryCharts/bestSellerProducstsChart";
import { TopUserContributorChart } from "../../../chart/adminSummaryCharts/TopUserContributorChart";
import { Dashnav } from "../../../components/navbar/Dashnav";
import * as BlogService from "../../../service/blog/blogService";
import * as OrderService from "../../../service/order/order";
import * as ProductService from "../../../service/product/productService";
import "../../../styles/dashboard/adminsummary/adminsummary.css";

export const Summary = () => {
  const statusClassName = {
    pending: "pending",
    success: "success",
    cancel: "cancel",
    delivering: "delivering",
  };
  const statusTitle = {
    pending: "Pending",
    success: "Success",
    cancel: "Cancel",
    delivering: "Delivering",
  };

  // use state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [emptyList, setEmptyList] = useState(null);
  const [serverError, setServerError] = useState(null);

  // query
  const {
    data: orders = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["all-orders"],
    queryFn: OrderService.getAllOrders,
  });

  // query
  const { data: blogs = [] } = useQuery({
    queryKey: ["last-blogs"],
    queryFn: BlogService.getAllBlog,
  });

  // query
  const { data: products = [] } = useQuery({
    queryKey: ["all-products"],
    queryFn: ProductService.getAllProductAdmin,
  });

  // handle func
  const handleOrderStatusClassName = (status) => {
    if (status === "PENDING") {
      return statusClassName.pending;
    }
  };
  const handleStatusTitle = (status) => {
    if (status === "PENDING") {
      return statusTitle.pending;
    }
  };

  useEffect(() => {
    if (isLoading || isFetching) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
    if (orders && orders.length === 0) {
      setEmptyList("Empty order list");
    } else {
      setEmptyList(null);
    }
  }, [isLoading, isFetching]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);

  // calculate funcs
  const lowStockProducts = products
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5);

  const bestSellerProducts = products
    .map((product) => {
      const totalQuantity = product.orderDetails.reduce(
        (sum, detail) => sum + detail.quantity,
        0
      );
      return { ...product, totalQuantity };
    })
    .sort((a, b) => b.totalQuantity - a.totalQuantity)
    .slice(0, 5);

  const userContributions = blogs.reduce((acc, blog) => {
    acc[blog.fullname] = (acc[blog.fullname] || 0) + 1;
    return acc;
  }, {});

  // Prepare the data for the donut chart
  const topContributors = Object.entries(userContributions)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([fullname, count]) => {
      const firstName = fullname.split(" ")[0];
      return { firstName, count };
    });

  const generateFakeRevenueData = () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        date: faker.date.past().toLocaleDateString(),
        revenue: faker.number.int({ min: 1000, max: 5000 }),
        totalOrders: faker.number.int({ min: 10, max: 100 }),
        newCustomers: faker.number.int({ min: 5, max: 50 }),
        refund: faker.number.int({ min: 50, max: 500 }),
      });
    }
    return data;
  };

  const chartData = generateFakeRevenueData();

  const [revenueChartOptions, setRevenueChartOptions] = useState({
    chart: {
      type: "area",
      id: "revenue-chart",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    xaxis: {
      categories: chartData.map((data) => data.date),
    },
    colors: ["#00E396", "#0090FF", "#FF4560", "#775DD0"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    tooltip: {
      enabled: true,
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: [
      {
        title: {
          text: "Revenue",
        },
      },
      {
        opposite: true,
        title: {
          text: "Total Orders / New Customers",
        },
      },
    ],
  });

  const [revenueChartSeries, setRevenueChartSeries] = useState([
    {
      name: "Revenue",
      data: chartData.map((data) => data.revenue),
    },
    {
      name: "Total Orders",
      data: chartData.map((data) => data.totalOrders),
    },
    {
      name: "New Customers",
      data: chartData.map((data) => data.newCustomers),
    },
    {
      name: "Refund",
      data: chartData.map((data) => data.refund),
    },
  ]);

  const [accountChartOptions, setAccountChartOptions] = useState({
    chart: {
      type: "pie",
    },
    labels: ["Admin", "Member", "Guest"],
    colors: ["#1E90FF", "#32CD32", "#FF6347"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 150,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  const [accountChartSeries, setAccountChartSeries] = useState([10, 30, 60]);

  const totalSales = orders.reduce((acc, order) => acc + order.order.total, 0);
  const formattedTotalSales = formatPrice(totalSales);

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
                <strong>{formattedTotalSales}</strong>
                <p>Revenue</p>
              </div>
              <i className="bx bx-dollar"></i>
            </div>
            <div className="small-item">
              <div>
                <strong>{orders.length}</strong>
                <p>Total orders</p>
              </div>
              <i className="bx bx-credit-card"></i>
            </div>
          </div>
        </div>
        <div className="section2">
          <div className="item">
            <BestSellerProductsChart bestSellerProducts={bestSellerProducts} />
          </div>
          <div className="item"></div>
          <div className="item">
            <TopUserContributorChart topContributors={topContributors} />
          </div>
        </div>
        <div className="chart-container">
          <div className="charts">
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

        <div className="summary-bottom">
          <div className="left-bottom">
            <strong>Recently orders</strong>
            <table>
              <thead>
                <tr>
                  <th>OrderId</th>
                  <th>Owner</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.order.orderId}>
                    <td>{order.order.orderId}</td>
                    <td>{order.order.fullname} </td>
                    <td>{formatPrice(order.order.total)}</td>
                    <td>
                      {" "}
                      <span
                        className={handleOrderStatusClassName(
                          order.order.status
                        )}
                      >
                        {handleStatusTitle(order.order.status)}
                      </span>
                    </td>
                    <td>
                      <Link
                        to={`/dashboard/admin/order/detail/${order.order.orderId}`}
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="right-bottom">
            <strong>Out of stock</strong>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Stocks</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map((product) => (
                  <tr key={products.productId}>
                    <td>{product.productName}</td>
                    <td>{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
