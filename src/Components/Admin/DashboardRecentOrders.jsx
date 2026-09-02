import { useEffect, useState } from "react";
import "../../Styles/dashboardrecentorders.css";

const DashboardRecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://shop-cobackend.onrender.com/dashboard/recent-orders"
      );

      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log("Recent Orders Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getInitial = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="recent-orders-card">

      <div className="recent-orders-header">

        <div>
          <span className="section-label">
            ORDER MANAGEMENT
          </span>

          <h2>Recent Orders</h2>

          <p>
            Latest orders placed by your customers
          </p>
        </div>

        <button className="view-all-btn">
          View All →
        </button>

      </div>

      <div className="orders-table-wrapper">

        {loading ? (

          <div className="orders-loading">
            <div className="loading-spinner"></div>
            <span>Loading orders...</span>
          </div>

        ) : orders.length === 0 ? (

          <div className="orders-empty">
            <div className="empty-icon">🛒</div>
            <h3>No Orders Yet</h3>
            <p>
              Your recent customer orders will appear here.
            </p>
          </div>

        ) : (

          <table className="recent-orders-table">

            <thead>
              <tr>
                <th>Customer</th>
                <th>Order ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {orders.map((order) => (

                <tr key={order._id}>

                  {/* Customer */}

                  <td>

                    <div className="customer-box">

                      <div className="customer-avatar">
                        {getInitial(order.customerName)}
                      </div>

                      <div className="customer-info">

                        <h4>
                          {order.customerName || "Unknown Customer"}
                        </h4>

                        <span>
                          Customer
                        </span>

                      </div>

                    </div>

                  </td>

                  {/* Order ID */}

                  <td>

                    <span className="order-id">
                      #{order._id.slice(-6).toUpperCase()}
                    </span>

                  </td>

                  {/* Amount */}

                  <td>

                    <strong className="order-amount">
                      Rs {Number(order.totalPrice || 0).toLocaleString()}
                    </strong>

                  </td>

                  {/* Status */}

                  <td>

                    <span
                      className={`status ${(
                        order.orderStatus || "Pending"
                      ).toLowerCase()}`}
                    >
                      <span className="status-dot"></span>

                      {order.orderStatus || "Pending"}
                    </span>

                  </td>

                  {/* Date */}

                  <td>

                    <span className="order-date">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "—"}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
};

export default DashboardRecentOrders;