import { useEffect, useState } from "react";
import "../../Styles/dashboardrecentorders.css";
const DashboardRecentOrders = () => {
  const [orders, setOrders] = useState([]);

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
      console.log(error);
    }
  };

  return (
    <div className="recent-orders-card">

      <h2>Recent Orders</h2>

      <table className="recent-orders-table">

        <thead>
          <tr>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

<tbody>

{orders.map((order)=>(

<tr key={order._id}>

<td>

<div className="customer-box">

<div className="customer-avatar">

{order.customerName.charAt(0)}

</div>

<div>

<h4>{order.customerName}</h4>

</div>

</div>

</td>

<td>

Rs {order.totalPrice.toLocaleString()}

</td>

<td>

<span
className={`status ${order.orderStatus.toLowerCase()}`}
>

{order.orderStatus}

</span>

</td>

<td>

{new Date(order.createdAt).toLocaleDateString()}

</td>

</tr>

))}

</tbody>

      </table>

    </div>
  );
};

export default DashboardRecentOrders;