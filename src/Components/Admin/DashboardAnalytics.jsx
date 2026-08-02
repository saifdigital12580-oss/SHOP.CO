import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", sales: 12000 },
  { month: "Feb", sales: 18000 },
  { month: "Mar", sales: 15000 },
  { month: "Apr", sales: 26000 },
  { month: "May", sales: 32000 },
  { month: "Jun", sales: 42000 },
];

const DashboardAnalytics = () => {

  const [data, setData] = useState([]);
  useEffect(() => {
  fetchSales();
}, []);
const fetchSales = async () => {
  try {

    const response = await fetch(
      "https://shop-cobackend.onrender.com/dashboard/monthly-sales"
    );

    const result = await response.json();

    if (result.success) {

      const monthNames = [
        "",
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

 const months = [

{ month:"Jan", sales:0 },

{ month:"Feb", sales:0 },

{ month:"Mar", sales:0 },

{ month:"Apr", sales:0 },

{ month:"May", sales:0 },

{ month:"Jun", sales:0 },

{ month:"Jul", sales:0 },

{ month:"Aug", sales:0 },

{ month:"Sep", sales:0 },

{ month:"Oct", sales:0 },

{ month:"Nov", sales:0 },

{ month:"Dec", sales:0 },

];

result.sales.forEach((item)=>{

months[item._id.month-1].sales=item.sales;

});

setData(months);



    }

  } catch (error) {

    console.log(error);

  }
};



  return (
    <div style={{ width: "100%", height: 350 }}>
      <h2 style={{ marginBottom: 20 }}>
        📈 Sales Analytics
      </h2>

      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

<YAxis
tickFormatter={(value)=>

`${value/1000}k`

}
/>

<Tooltip

contentStyle={{
borderRadius:"12px",
border:"none",
boxShadow:"0 15px 35px rgba(0,0,0,.15)"
}}

formatter={(value)=>[
`Rs ${value.toLocaleString()}`,
"Revenue"
]}

/>

<Line
type="monotone"

dataKey="sales"

stroke="#6C63FF"

strokeWidth={5}

dot={{
r:6,
stroke:"#6C63FF",
strokeWidth:2,
fill:"#fff"
}}

activeDot={{
r:9
}}

animationDuration={1800}

/>

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardAnalytics;