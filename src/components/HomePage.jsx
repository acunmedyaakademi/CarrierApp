import "../assets/HomePage.css";

import Layout from "./Layout";
import { supabase } from "../../supabaseClient";
import { useEffect } from "react";
import { useState } from "react";

export default function HomePage() {
  const [isHistory, setHistory] = useState(false);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("order_details")
        .select("*, orders(*, status(*)), products(*)");

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    setFilteredOrders(
      isHistory
        ? orders.filter((x) => x.orders.status.name === "received")
        : orders.filter((x) => x.orders.status.name !== "received")
    );
  }, [isHistory, orders]);

  return (
    <Layout>
      <div className="home-container">
        <h1 className="page-header">Order</h1>
        <div className="home-orders-tab-btns">
          <button
            className={"home-orders-tab-btn" + (isHistory ? "" : " active")}
            onClick={() => setHistory(false)}
          >
            Upcoming
          </button>
          <button
            className={"home-orders-tab-btn" + (isHistory ? " active" : "")}
            onClick={() => setHistory(true)}
          >
            History
          </button>
        </div>
        <div className="home-orders-list">
          {filteredOrders.map((order) => (
            <Order key={order.id} {...order} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

const deliveryDateFormat = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "short" });
  return `${day}, ${month}`;
};

const Order = ({ orders, products }) => {
  return (
    <div className="home-order-card">
      <img src={products.img} />
      <div className="home-order-card-info">
        <div className="home-order-status">
          <span>{orders.status.name}</span>
          <span>{deliveryDateFormat(orders.created_at)}</span>
        </div>
        <h2 className="home-order-name">{products.name}</h2>
      </div>
      <svg
        width="48"
        height="48"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};
