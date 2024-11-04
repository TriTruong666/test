import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// charts
import { BestSellerProductsChart } from "../../../chart/adminSummaryCharts/bestSellerProducstsChart";
import { RevenueChart } from "../../../chart/adminSummaryCharts/RevenueChart";
import { TopCustomerChart } from "../../../chart/adminSummaryCharts/TopCustomerChart";
import { TopUserContributorChart } from "../../../chart/adminSummaryCharts/TopUserContributorChart";
import { TotalOrdersPrice } from "../../../chart/adminSummaryCharts/TotalOrdersPrice";
import { Dashnav } from "../../../components/navbar/Dashnav";
//services
import * as UserService from "../../../service/account/AccountService";
import * as BlogService from "../../../service/blog/blogService";
import * as OrderService from "../../../service/order/order";
import * as ProductService from "../../../service/product/productService";
//img
import adminImg from "../../../assets/kois.png";
//styles

import "../../../styles/dashboard/adminsummary/adminsummary.css";

export const Summary = () => {
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);

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

  //query
  const { data: users = [] } = useQuery({
    queryKey: ["all-users"],
    queryFn: UserService.getUserListAdmin,
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

  // calculate funcs
  const lowStockProducts = products
    .filter((product) => product.stock < 50)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5);
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
            <div className="item1">
              <strong>Welcome admin</strong>
              <p>
                Whatever your life’s work is, do it well. A man should do his
                job so well that the living, the dead, and the unborn could do
                it no better.” —Martin Luther King, Jr. “Nothing ever comes to
                one, that is worth having, except as a result of hard work
              </p>

              <Link to={"https://www.facebook.com/"}> FaceBook</Link>
            </div>

            <div className="item2">
              <img src={adminImg} alt="admin profile pic" />
            </div>
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
            <BestSellerProductsChart products={products} />
          </div>
          <div className="item">
            <TopCustomerChart orders={orders} users={users} />
          </div>
          <div className="item">
            <TopUserContributorChart blogs={blogs} />
          </div>
        </div>
        <div className="chart-container">
          <div className="charts">
            <div className="left-chart">
              <TotalOrdersPrice orders={orders} />
            </div>
            <div className="right-chart">
              <RevenueChart orders={orders} users={users} />
            </div>
          </div>
        </div>

        <div className="summary-bottom">
          <div className="left-bottom">
            <strong>Recent orders</strong>
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
            <strong>Have less stocks</strong>
            {lowStockProducts.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Stocks</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockProducts.map((product) => (
                    <tr key={product.productId}>
                      <td>{product.productName}</td>
                      <td>{product.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No products have less in stock</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
