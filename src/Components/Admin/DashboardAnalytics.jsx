import React, { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { FaChartLine } from "react-icons/fa";

const DashboardAnalytics = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {

    try {

      const response = await fetch(
        "https://sk-store-theta.vercel.app/dashboard/monthly-sales"
      );

      const result = await response.json();

      if (result.success) {

        const formattedData = result.sales.map((item) => ({
          month: months[item._id.month - 1],
          revenue: item.revenue,
          orders: item.orders,
        }));

        setData(formattedData);
      }

    } catch (error) {

      console.log("Monthly Sales Error:", error);

    } finally {

      setLoading(false);

    }

  };

  const totalRevenue = data.reduce(
    (total, item) => total + item.revenue,
    0
  );

  const totalOrders = data.reduce(
    (total, item) => total + item.orders,
    0
  );

  return (

    <div className="revenueAnalytics">

      {/* Header */}

      <div className="revenueHeader">

        <div>

          <div className="analyticsTitle">

            <span className="analyticsIcon">
              <FaChartLine />
            </span>

            <div>
              <h2>Revenue Analytics</h2>

              <p>
                Monitor your revenue and order performance
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* Stats */}

      <div className="analyticsStats">

        <div className="analyticsStat">

          <span>Total Revenue</span>

          <strong>
            Rs {totalRevenue.toLocaleString()}
          </strong>

        </div>


        <div className="analyticsStat">

          <span>Total Orders</span>

          <strong>
            {totalOrders.toLocaleString()}
          </strong>

        </div>

      </div>


      {/* Chart */}

      <div className="revenueChart">

        {loading ? (

          <div className="chartLoading">
            Loading analytics...
          </div>

        ) : data.length === 0 ? (

          <div className="chartLoading">
            No sales data available
          </div>

        ) : (

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart
              data={data}
              margin={{
                top: 15,
                right: 20,
                left: 10,
                bottom: 5,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.12)",
                }}
                formatter={(value, name) => {

                  if (name === "Revenue") {
                    return [
                      `Rs ${Number(value).toLocaleString()}`,
                      name,
                    ];
                  }

                  return [value, name];

                }}
              />

              <Legend />

              <Line
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#6366f1"
                strokeWidth={4}
                dot={{
                  r: 5,
                  strokeWidth: 3,
                }}
                activeDot={{
                  r: 8,
                }}
              />

              <Line
                type="monotone"
                dataKey="orders"
                name="Orders"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{
                  r: 4,
                }}
              />

            </LineChart>

          </ResponsiveContainer>

        )}

      </div>

    </div>
  );
};

export default DashboardAnalytics;